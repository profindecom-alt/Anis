/**
 * Import initial du contenu existant dans Sanity.
 *
 *   npm run seed
 *
 * Prérequis dans .env.local :
 *   NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 *   SANITY_API_WRITE_TOKEN (jeton avec droits d'écriture, rôle « Editor »).
 *
 * Le script est idempotent : ré-exécuté, il met à jour les mêmes documents
 * (_id déterministe) et réutilise les images déjà téléversées (Sanity
 * déduplique les assets par empreinte de contenu).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { config as loadEnv } from 'dotenv';
import { createClient } from '@sanity/client';
import { JSDOM } from 'jsdom';

import { seedArticles, type SeedArticle } from './seed-data';

loadEnv({ path: '.env.local' });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    '\n✗ Configuration manquante. Renseigne dans .env.local :\n' +
      '   NEXT_PUBLIC_SANITY_PROJECT_ID\n' +
      '   NEXT_PUBLIC_SANITY_DATASET (ex : production)\n' +
      '   SANITY_API_WRITE_TOKEN (jeton « Editor » créé sur sanity.io/manage)\n'
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

/* ------------------------------------------------------------------ */
/* Conversion HTML -> Portable Text                                   */
/* ------------------------------------------------------------------ */

let keySeq = 0;
const newKey = () => `k${(keySeq++).toString(36)}${Math.random().toString(36).slice(2, 6)}`;

interface Span {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
}
interface MarkDef {
  _key: string;
  _type: string;
  href?: string;
}
interface Block {
  _type: 'block';
  _key: string;
  style: string;
  markDefs: MarkDef[];
  children: Span[];
  listItem?: 'bullet' | 'number';
  level?: number;
}

/** Parcourt le contenu inline d'un élément et produit spans + markDefs. */
function inlineChildren(el: Element): { children: Span[]; markDefs: MarkDef[] } {
  const children: Span[] = [];
  const markDefs: MarkDef[] = [];

  const walk = (node: Node, marks: string[]) => {
    node.childNodes.forEach((child) => {
      // Noeud texte
      if (child.nodeType === 3) {
        const text = (child.textContent ?? '').replace(/\s+/g, ' ');
        if (text) children.push({ _type: 'span', _key: newKey(), text, marks: [...marks] });
        return;
      }
      if (child.nodeType !== 1) return;
      const e = child as Element;
      const tag = e.tagName.toLowerCase();
      if (tag === 'strong' || tag === 'b') walk(e, [...marks, 'strong']);
      else if (tag === 'em' || tag === 'i') walk(e, [...marks, 'em']);
      else if (tag === 'a') {
        const href = e.getAttribute('href') ?? '#';
        const mk = newKey();
        markDefs.push({ _key: mk, _type: 'link', href });
        walk(e, [...marks, mk]);
      } else if (tag === 'br') {
        children.push({ _type: 'span', _key: newKey(), text: '\n', marks: [...marks] });
      } else {
        walk(e, marks);
      }
    });
  };

  walk(el, []);
  if (children.length === 0) {
    children.push({ _type: 'span', _key: newKey(), text: '', marks: [] });
  }
  return { children, markDefs };
}

function htmlToPortableText(html: string): Block[] {
  const { document } = new JSDOM(`<body>${html}</body>`).window;
  const blocks: Block[] = [];

  document.body.childNodes.forEach((node) => {
    if (node.nodeType === 3) {
      const text = (node.textContent ?? '').trim();
      if (text) {
        blocks.push({
          _type: 'block',
          _key: newKey(),
          style: 'normal',
          markDefs: [],
          children: [{ _type: 'span', _key: newKey(), text, marks: [] }],
        });
      }
      return;
    }
    if (node.nodeType !== 1) return;
    const el = node as Element;
    const tag = el.tagName.toLowerCase();

    if (tag === 'h2' || tag === 'h3' || tag === 'blockquote') {
      const { children, markDefs } = inlineChildren(el);
      blocks.push({ _type: 'block', _key: newKey(), style: tag, markDefs, children });
    } else if (tag === 'p') {
      const { children, markDefs } = inlineChildren(el);
      blocks.push({ _type: 'block', _key: newKey(), style: 'normal', markDefs, children });
    } else if (tag === 'ul' || tag === 'ol') {
      const listItem = tag === 'ul' ? 'bullet' : 'number';
      el.querySelectorAll(':scope > li').forEach((li) => {
        const { children, markDefs } = inlineChildren(li);
        blocks.push({
          _type: 'block',
          _key: newKey(),
          style: 'normal',
          listItem,
          level: 1,
          markDefs,
          children,
        });
      });
    } else {
      const { children, markDefs } = inlineChildren(el);
      if (children.some((c) => c.text.trim())) {
        blocks.push({ _type: 'block', _key: newKey(), style: 'normal', markDefs, children });
      }
    }
  });

  return blocks;
}

/* ------------------------------------------------------------------ */
/* Import                                                             */
/* ------------------------------------------------------------------ */

async function uploadImage(imageId: string, alt: string) {
  const path = join(process.cwd(), 'public', 'images', `${imageId}.jpg`);
  const buffer = readFileSync(path);
  const asset = await client.assets.upload('image', buffer, {
    filename: `${imageId}.jpg`,
  });
  return {
    _type: 'image' as const,
    asset: { _type: 'reference' as const, _ref: asset._id },
    alt,
  };
}

async function importArticle(article: SeedArticle, index: number, total: number) {
  const label = `[${index + 1}/${total}] ${article.slug}`;
  try {
    const image = await uploadImage(article.imageId, article.title);
    const doc = {
      _id: `article.${article.slug}`,
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      excerpt: article.excerpt,
      category: article.category,
      date: article.date,
      author: article.author,
      readingTime: article.readingTime,
      featured: Boolean(article.featured),
      image,
      content: htmlToPortableText(article.content),
    };
    await client.createOrReplace(doc);
    console.log(`✓ ${label}`);
  } catch (err) {
    console.error(`✗ ${label} —`, (err as Error).message);
    throw err;
  }
}

async function main() {
  console.log(
    `\nImport de ${seedArticles.length} articles vers Sanity ` +
      `(projet ${projectId}, dataset ${dataset})…\n`
  );
  for (let i = 0; i < seedArticles.length; i++) {
    await importArticle(seedArticles[i], i, seedArticles.length);
  }
  console.log('\n✓ Import terminé. Ouvre /studio pour vérifier.\n');
}

main().catch(() => process.exit(1));
