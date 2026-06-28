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

import { categories, type Category } from './categories';

export { categories };
export type { Category };

export interface Article {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string; // ISO (YYYY-MM-DD)
  author: string;
  readingTime: number; // minutes
  image: SanityImageSource | null;
  featured?: boolean;
  /** Corps de l'article (Portable Text) — présent uniquement sur la fiche détail. */
  content?: PortableTextBlock[];
}

/* ------------------------------------------------------------------ */
/* Récupération (Sanity)                                              */
/* ------------------------------------------------------------------ */

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
    return null;
  }
}

/** Tous les articles, du plus récent au plus ancien. */
export async function getAllArticles(): Promise<Article[]> {
  return (await safeFetch<Article[]>(allArticlesQuery)) ?? [];
}

/** Un article complet (avec son corps) par slug, ou null s'il n'existe pas. */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  return safeFetch<Article>(articleBySlugQuery, { slug }, [
    'article',
    `article:${slug}`,
  ]);
}

/** Article mis à la une (le plus récent coché), avec repli sur le plus récent. */
export async function getFeaturedArticle(): Promise<Article | null> {
  const featured = await safeFetch<Article | null>(featuredArticleQuery);
  if (featured) return featured;
  const all = await getAllArticles();
  return all[0] ?? null;
}

/** Articles liés : même catégorie en priorité, hors article courant. */
export async function getRelatedArticles(
  slug: string,
  limit = 3
): Promise<Article[]> {
  const all = await getAllArticles();
  const current = all.find((a) => a.slug === slug);
  const others = all.filter((a) => a.slug !== slug);
  if (!current) return others.slice(0, limit);
  return others
    .sort((a, b) => {
      const sameA = a.category === current.category ? 0 : 1;
      const sameB = b.category === current.category ? 0 : 1;
      return sameA - sameB;
    })
    .slice(0, limit);
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
