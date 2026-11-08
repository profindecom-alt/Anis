import type { MetadataRoute } from 'next';
import { site, expertises } from '@/lib/site';
import { getAllArticles, isArticleIndexable } from '@/lib/articles';

/**
 * Plan du site (sitemap.xml) listant les pages indexables.
 *
 * - Pas de `lastModified` inventé pour les pages institutionnelles : seule une
 *   date réelle (Sanity `_updatedAt`) est publiée, pour les articles.
 * - Les articles exclus de l'index (trop courts ou marqués « noIndex ») n'y
 *   figurent pas : le sitemap ne liste que des URL canoniques indexables.
 * - `priority` et `changefreq` sont omis : Google les ignore.
 * - Une panne du CMS fait échouer la génération (au lieu de publier un
 *   sitemap vidé de ses articles) : la dernière version valide est conservée.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPaths = [
    '/',
    '/le-cabinet',
    '/nos-expertises',
    '/notre-approche',
    '/actualites',
    '/politique-editoriale',
    '/contact',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/reclamation',
    ...expertises.map((e) => `/nos-expertises/${e.slug}`),
  ];

  const base: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${site.url}${path === '/' ? '' : path}`,
  }));

  const articles = await getAllArticles();
  const articlePaths: MetadataRoute.Sitemap = articles
    .filter(isArticleIndexable)
    .map((a) => ({
      url: `${site.url}/actualites/${a.slug}`,
      lastModified: new Date(a.updatedAt ?? a.date),
    }));

  return [...base, ...articlePaths];
}
