import type { MetadataRoute } from 'next';
import { site, expertises } from '@/lib/site';
import { getAllArticles } from '@/lib/articles';

/**
 * Plan du site (sitemap.xml) listant toutes les pages indexables.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Date de dernière révision stable des pages institutionnelles (évite un
  // lastModified qui change à chaque build). À actualiser lors d'une refonte.
  const now = new Date('2026-06-13T00:00:00.000Z');

  const staticPaths: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
    { path: '/', priority: 1, freq: 'weekly' },
    { path: '/le-cabinet', priority: 0.8, freq: 'monthly' },
    { path: '/nos-expertises', priority: 0.9, freq: 'monthly' },
    { path: '/notre-approche', priority: 0.8, freq: 'monthly' },
    { path: '/actualites', priority: 0.9, freq: 'weekly' },
    { path: '/contact', priority: 0.7, freq: 'yearly' },
    { path: '/mentions-legales', priority: 0.2, freq: 'yearly' },
    { path: '/politique-de-confidentialite', priority: 0.2, freq: 'yearly' },
    { path: '/reclamation', priority: 0.3, freq: 'yearly' },
  ];

  const expertisePaths = expertises.map((e) => ({
    path: `/nos-expertises/${e.slug}`,
    priority: 0.8,
    freq: 'monthly' as const,
  }));

  const base: MetadataRoute.Sitemap = [...staticPaths, ...expertisePaths].map(
    (p) => ({
      url: `${site.url}${p.path === '/' ? '' : p.path}`,
      lastModified: now,
      changeFrequency: p.freq,
      priority: p.priority,
    })
  );

  const articles = await getAllArticles();
  const articlePaths: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${site.url}/actualites/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  return [...base, ...articlePaths];
}
