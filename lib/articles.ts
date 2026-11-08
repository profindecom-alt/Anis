/**
 * Accès aux articles du blog « Actualités ».
 *
 * Les données proviennent désormais de Sanity (CMS) : l'admin crée et modifie
 * les articles dans /studio. Ce module expose des fonctions asynchrones de
 * récupération, ainsi que des utilitaires purs (formatage, filtres) inchangés.
 *
 * Sans configuration Sanity (voir sanity/env.ts), les fonctions renvoient des
 * valeurs vides : le site reste fonctionnel, simplement sans articles.
 */
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import {
  allArticlesQuery,
  articleBySlugQuery,
  featuredArticleQuery,
} from '@/sanity/lib/queries';
import { seedArticles } from '@/scripts/seed-data';

import { categories, type Category } from './categories';

export { categories };
export type { Category };

export interface Article {
  slug: string;
  title: string;
  seoTitle?: string;
  excerpt: string;
  metaDescription?: string;
  category: Category;
  date: string; // ISO (YYYY-MM-DD)
  createdAt?: string; // ISO Sanity (_createdAt), utile aux audits/migrations
  updatedAt?: string; // ISO Sanity (_updatedAt)
  author: string;
  /** Type Schema.org résolu pour distinguer une personne de l'équipe éditoriale. */
  authorEntityType?: 'Person' | 'Organization';
  authorRole?: string;
  authorUrl?: string;
  /** Temps de lecture en minutes, calculé à partir de `wordCount`. */
  readingTime: number;
  /** Nombre de mots du corps de l'article (calculé par la requête GROQ). */
  wordCount?: number;
  /** Exclusion manuelle des moteurs de recherche (champ Sanity). */
  noIndex?: boolean;
  image: SanityImageSource | null;
  imageAlt?: string;
  featured?: boolean;
  /** Corps de l'article (Portable Text) — présent uniquement sur la fiche détail. */
  content?: PortableTextBlock[];
}

const LEGACY_DEMO_AUTHORS = new Set([
  'Antoine Gérard',
  'Sophie Laurent',
]);

const ORGANIZATION_AUTHORS = new Set([
  ...LEGACY_DEMO_AUTHORS,
  'Équipe éditoriale Élan Patrimoine',
]);

const correctedSeedArticles = new Map(seedArticles.map((article) => [article.slug, article]));

function decodeSeedHtml(value: string) {
  return value
    .replace(/&nbsp;/g, ' ')
    .replace(/&apos;|&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/<[^>]+>/g, '');
}

/** Convertit le HTML très limité des données de démonstration en Portable Text. */
function seedContentToPortableText(slug: string, html: string): PortableTextBlock[] {
  const blocks: PortableTextBlock[] = [];
  const blockPattern = /<(h2|h3|p|li)>([\s\S]*?)<\/\1>/gi;
  let blockMatch: RegExpExecArray | null;
  let blockIndex = 0;

  while ((blockMatch = blockPattern.exec(html))) {
    const [, tag, inlineHtml] = blockMatch;
    const children: Array<{
      _type: 'span';
      _key: string;
      text: string;
      marks: string[];
    }> = [];
    const markDefs: Array<{ _key: string; _type: 'link'; href: string }> = [];
    const inlinePattern = /<(strong|a)(?:\s+href="([^"]+)")?>([\s\S]*?)<\/\1>/gi;
    let inlineIndex = 0;
    let cursor = 0;
    let inlineMatch: RegExpExecArray | null;

    const pushSpan = (rawText: string, marks: string[] = []) => {
      const text = decodeSeedHtml(rawText);
      if (!text) return;
      children.push({
        _type: 'span',
        _key: `seed-${slug}-${blockIndex}-${inlineIndex++}`,
        text,
        marks,
      });
    };

    while ((inlineMatch = inlinePattern.exec(inlineHtml))) {
      pushSpan(inlineHtml.slice(cursor, inlineMatch.index));
      if (inlineMatch[1].toLowerCase() === 'strong') {
        pushSpan(inlineMatch[3], ['strong']);
      } else {
        const markKey = `seed-link-${slug}-${blockIndex}-${markDefs.length}`;
        markDefs.push({
          _key: markKey,
          _type: 'link',
          href: inlineMatch[2] || '#',
        });
        pushSpan(inlineMatch[3], [markKey]);
      }
      cursor = inlineMatch.index + inlineMatch[0].length;
    }
    pushSpan(inlineHtml.slice(cursor));

    blocks.push({
      _type: 'block',
      _key: `seed-block-${slug}-${blockIndex}`,
      style: tag === 'h2' || tag === 'h3' ? tag : 'normal',
      markDefs,
      children:
        children.length > 0
          ? children
          : [
              {
                _type: 'span',
                _key: `seed-${slug}-${blockIndex}-0`,
                text: '',
                marks: [],
              },
            ],
      ...(tag === 'li' ? { listItem: 'bullet', level: 1 } : {}),
    } as PortableTextBlock);
    blockIndex += 1;
  }

  return blocks;
}

/** Vitesse de lecture retenue pour le temps de lecture affiché. */
const WORDS_PER_MINUTE = 200;

/**
 * En dessous de ce volume, un article financier ne peut pas couvrir son sujet
 * (explications, exemples, sources, limites) : il reste lisible sur le site
 * mais sort de l'index et du sitemap jusqu'à sa réécriture.
 */
export const MIN_INDEXABLE_WORDS = 300;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

/** Vrai si l'article peut être proposé aux moteurs de recherche. */
export function isArticleIndexable(
  article: Pick<Article, 'noIndex' | 'wordCount'>
): boolean {
  return !article.noIndex && (article.wordCount ?? 0) >= MIN_INDEXABLE_WORDS;
}

/** Temps de lecture honnête, dérivé du nombre réel de mots. */
function withReadingTime(article: Article): Article {
  const words = article.wordCount ?? 0;
  return {
    ...article,
    readingTime: Math.max(1, Math.round(words / WORDS_PER_MINUTE)),
  };
}

/**
 * Les deux noms livrés avec les données de démonstration ne doivent pas
 * être présentés comme de vraies personnes. La signature éditoriale de la
 * marque est une Organization ; tout nouvel auteur CMS reste une Person.
 */
function normalizeArticleAuthor(article: Article): Article {
  return withReadingTime(normalizeAuthorAndSeed(article));
}

function normalizeAuthorAndSeed(article: Article): Article {
  const author = article.author?.trim() || 'Équipe éditoriale Élan Patrimoine';
  const correctedSeed = LEGACY_DEMO_AUTHORS.has(author)
    ? correctedSeedArticles.get(article.slug)
    : undefined;
  const correctedArticle: Article = correctedSeed
    ? {
        ...article,
        excerpt: correctedSeed.excerpt,
        metaDescription: correctedSeed.excerpt,
        imageAlt: correctedSeed.imageAlt,
        updatedAt: '2026-10-26T00:00:00.000Z',
        wordCount: countWords(decodeSeedHtml(correctedSeed.content)),
        ...(article.content
          ? {
              content: seedContentToPortableText(
                correctedSeed.slug,
                correctedSeed.content
              ),
            }
          : {}),
      }
    : article;

  if (!ORGANIZATION_AUTHORS.has(author)) {
    return { ...correctedArticle, author, authorEntityType: 'Person' };
  }
  return {
    ...correctedArticle,
    author: 'Équipe éditoriale Élan Patrimoine',
    authorEntityType: 'Organization',
    authorRole: undefined,
    authorUrl: undefined,
  };
}

/* ------------------------------------------------------------------ */
/* Récupération (Sanity)                                              */
/* ------------------------------------------------------------------ */

/**
 * Requête Sanity des articles. Une erreur réseau ou d'API est volontairement
 * PROPAGÉE : lors d'une revalidation, Next.js conserve alors la dernière page
 * valide au lieu de publier un sitemap vide ou un article « introuvable »
 * (noindex) à cause d'une panne passagère du CMS. Sans configuration Sanity
 * (développement), on renvoie simplement « aucun article ».
 *
 * Rappel : les articles ont des identifiants à point (`article.<slug>`), donc
 * privés — SANITY_API_READ_TOKEN est indispensable en production.
 */
async function safeFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = ['article']
): Promise<T | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<T>(query, params, {
      next: { revalidate: 60, tags },
    });
  } catch (err) {
    console.error('[sanity] échec de récupération des articles :', err);
    throw err;
  }
}

/** Tous les articles, du plus récent au plus ancien. */
export async function getAllArticles(): Promise<Article[]> {
  const articles = (await safeFetch<Article[]>(allArticlesQuery)) ?? [];
  return articles.map(normalizeArticleAuthor);
}

/** Un article complet (avec son corps) par slug, ou null s'il n'existe pas. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const article = await safeFetch<Article>(articleBySlugQuery, { slug }, [
    'article',
    `article:${slug}`,
  ]);
  return article ? normalizeArticleAuthor(article) : null;
}

/** Article mis à la une (le plus récent coché), avec repli sur le plus récent. */
export async function getFeaturedArticle(): Promise<Article | null> {
  const featured = await safeFetch<Article | null>(featuredArticleQuery);
  if (featured) return normalizeArticleAuthor(featured);
  const all = await getAllArticles();
  return all[0] ?? null;
}

/**
 * Articles liés : même catégorie en priorité, puis les plus proches dans le
 * temps. Le critère de proximité répartit les liens sur l'ensemble des
 * articles au lieu de toujours renvoyer vers les deux plus récents.
 */
export async function getRelatedArticles(
  slug: string,
  limit = 3
): Promise<Article[]> {
  const all = await getAllArticles();
  const current = all.find((a) => a.slug === slug);
  const others = all.filter((a) => a.slug !== slug);
  if (!current) return others.slice(0, limit);
  const time = (a: Article) => new Date(a.date).getTime();
  const ref = time(current);
  return others
    .sort((a, b) => {
      const sameA = a.category === current.category ? 0 : 1;
      const sameB = b.category === current.category ? 0 : 1;
      if (sameA !== sameB) return sameA - sameB;
      return Math.abs(time(a) - ref) - Math.abs(time(b) - ref);
    })
    .slice(0, limit);
}

/**
 * Articles à proposer sur une page expertise : correspondance de mots-clés
 * dans le titre (prioritaire) puis de catégorie. Une indisponibilité du CMS
 * ne doit pas casser la page expertise : on renvoie alors une liste vide.
 */
export async function getArticlesForExpertise({
  categories: wanted,
  keywords,
  limit = 3,
}: {
  categories: Category[];
  keywords: RegExp;
  limit?: number;
}): Promise<Article[]> {
  let all: Article[];
  try {
    all = await getAllArticles();
  } catch {
    return [];
  }
  return all
    .map((a) => ({
      a,
      score:
        (keywords.test(`${a.title} ${a.excerpt}`) ? 2 : 0) +
        (wanted.includes(a.category) ? 1 : 0),
    }))
    .filter((x) => x.score > 0)
    .sort((x, y) => y.score - x.score)
    .slice(0, limit)
    .map((x) => x.a);
}

/** Années distinctes de publication, décroissantes. */
export async function getYears(): Promise<number[]> {
  const all = await getAllArticles();
  const years = new Set(all.map((a) => new Date(a.date).getFullYear()));
  return [...years].sort((a, b) => b - a);
}

export const ARTICLES_PER_PAGE = 8;

/** Filtre + pagine les articles selon les critères fournis. */
export async function queryArticles({
  category = 'Toutes',
  year = 'Toutes',
  page = 1,
}: {
  category?: Category | 'Toutes';
  year?: number | 'Toutes';
  page?: number;
}) {
  const all = await getAllArticles();
  const filtered = all.filter((a) => {
    const okCat = category === 'Toutes' || a.category === category;
    const okYear = year === 'Toutes' || new Date(a.date).getFullYear() === year;
    return okCat && okYear;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PER_PAGE));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * ARTICLES_PER_PAGE;
  const items = filtered.slice(start, start + ARTICLES_PER_PAGE);

  return { items, total: filtered.length, totalPages, current };
}

/* ------------------------------------------------------------------ */
/* Utilitaires purs                                                   */
/* ------------------------------------------------------------------ */

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/** Normalise une valeur de catégorie issue de l'URL. */
export function parseCategory(value?: string | string[]): Category | 'Toutes' {
  const v = Array.isArray(value) ? value[0] : value;
  return categories.includes(v as Category) ? (v as Category) : 'Toutes';
}

/** Normalise une valeur d'année issue de l'URL. */
export function parseYear(value?: string | string[]): number | 'Toutes' {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return v && Number.isInteger(n) && n >= 2000 && n <= 2100 ? n : 'Toutes';
}
