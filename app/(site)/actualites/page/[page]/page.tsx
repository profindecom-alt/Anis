import { notFound, permanentRedirect } from 'next/navigation';
import { queryArticles } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';
import ArticleArchive from '@/components/ArticleArchive';

type Params = Promise<{ page: string }>;

/**
 * N'accepte que des entiers strictement positifs écrits sans zéro initial :
 * toute autre valeur (0, -1, 02, abc…) répond 404 au lieu de dupliquer une
 * page existante.
 */
function parsePage(value: string): number | null {
  if (!/^[1-9]\d*$/.test(value)) return null;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : null;
}

/** Valide la page demandée ; redirige /page/1 vers /actualites. */
async function resolvePage(value: string): Promise<number> {
  const page = parsePage(value);
  if (page === null) notFound();
  if (page === 1) permanentRedirect('/actualites');
  const { totalPages } = await queryArticles({ page });
  if (page > totalPages) notFound();
  return page;
}

export async function generateStaticParams() {
  try {
    const { totalPages } = await queryArticles({});
    return Array.from({ length: Math.max(0, totalPages - 1) }, (_, i) => ({
      page: String(i + 2),
    }));
  } catch {
    // CMS indisponible au build : les pages seront rendues à la demande.
    return [];
  }
}

export async function generateMetadata({ params }: { params: Params }) {
  const page = await resolvePage((await params).page);
  return buildMetadata({
    title: `Actualités patrimoine et fiscalité · page ${page}`,
    description: `Page ${page} des analyses patrimoniales d'Élan Patrimoine : fiscalité, investissement, transmission, prévoyance et réglementation.`,
    path: `/actualites/page/${page}`,
  });
}

export default async function ActualitesPaginatedPage({
  params,
}: {
  params: Params;
}) {
  const page = await resolvePage((await params).page);
  return <ArticleArchive page={page} />;
}
