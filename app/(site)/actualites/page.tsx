import { buildMetadata } from '@/lib/seo';
import ArticleArchive from '@/components/ArticleArchive';

/**
 * Première page des actualités. Page statique (revalidée avec les données
 * Sanity) : les pages suivantes vivent sous /actualites/page/N, et les
 * anciennes URL ?page=N y sont redirigées par le middleware.
 */
export const metadata = buildMetadata({
  title: 'Actualités patrimoine et fiscalité',
  description:
    "Analyses et éclairages patrimoniaux : fiscalité, investissement, transmission, prévoyance et réglementation. Le regard d'Élan Patrimoine sur l'actualité.",
  path: '/actualites',
});

export default function ActualitesPage() {
  return <ArticleArchive page={1} />;
}
