import Link from 'next/link';
import { getFeaturedArticle, queryArticles } from '@/lib/articles';
import { site } from '@/lib/site';
import { img } from '@/lib/images';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import ArticleCard from '@/components/ArticleCard';
import Reveal from '@/components/Reveal';

type SP = { page?: string | string[] };

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const page = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;

  return {
    ...buildMetadata({
      title: page > 1 ? `Actualités · page ${page}` : 'Actualités',
      description:
        "Analyses et éclairages patrimoniaux : fiscalité, investissement, transmission, prévoyance et réglementation. Le regard d'Élan Patrimoine sur l'actualité.",
      path: '/actualites',
    }),
    alternates: { canonical: `${site.url}/actualites` },
  };
}

/** Construit l'URL d'une page de la liste. */
function hrefFor(page: number) {
  return page > 1 ? `/actualites?page=${page}` : '/actualites';
}

export default async function ActualitesPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const page = Number(Array.isArray(sp.page) ? sp.page[0] : sp.page) || 1;

  const featured = await getFeaturedArticle();
  const { items, total, totalPages, current } = await queryArticles({ page });

  return (
    <>
      <PageHero
        eyebrow="Actualités"
        title="Analyses & éclairages patrimoniaux"
        intro="Notre regard sur l'actualité fiscale, économique et réglementaire, pour éclairer vos décisions."
        breadcrumbs={[{ label: 'Actualités' }]}
        imageId={img.patrimoine}
      />

      {/* Article à la une */}
      {featured && (
        <section className="bg-cream pt-20 md:pt-24">
          <div className="container-content">
            <Reveal>
              <ArticleCard article={featured} variant="featured" />
            </Reveal>
          </div>
        </section>
      )}

      {/* Liste filtrée + paginée */}
      <section className="bg-cream py-16 md:py-20">
        <div className="container-content">
          <div className="flex flex-wrap items-baseline justify-between gap-3 border-b border-ink/10 pb-6">
            <h2 className="font-serif text-2xl font-semibold text-forest md:text-3xl">
              Tous les articles
            </h2>
            <p className="text-sm text-ink/50">
              {total} article{total > 1 ? 's' : ''}
            </p>
          </div>

          {/* Grille */}
          {items.length > 0 ? (
            <div className="mt-8 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
          ) : (
            <div className="mt-16 rounded-3xl border border-dashed border-ink/20 bg-white/50 p-16 text-center">
              <p className="font-serif text-2xl text-forest">Aucun article</p>
              <p className="mt-2 text-ink/55">
                Aucun article n'est disponible pour le moment.
              </p>
            </div>
          )}

          {/* Pagination (liens) */}
          {totalPages > 1 && (
            <nav className="mt-14 flex items-center justify-center gap-2" aria-label="Pagination">
              <PageLink
                href={hrefFor(current - 1)}
                disabled={current === 1}
                label="Page précédente"
                dir="prev"
              />
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <Link
                  key={n}
                  href={hrefFor(n)}
                  scroll={false}
                  aria-current={n === current ? 'page' : undefined}
                  className={`flex h-10 min-w-10 items-center justify-center rounded-full px-3 text-sm font-medium transition-colors ${
                    n === current
                      ? 'bg-forest text-cream'
                      : 'border border-ink/15 text-ink/65 hover:border-forest hover:text-forest'
                  }`}
                >
                  {n}
                </Link>
              ))}
              <PageLink
                href={hrefFor(current + 1)}
                disabled={current === totalPages}
                label="Page suivante"
                dir="next"
              />
            </nav>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}

function PageLink({
  href,
  disabled,
  label,
  dir,
}: {
  href: string;
  disabled: boolean;
  label: string;
  dir: 'prev' | 'next';
}) {
  const icon =
    dir === 'prev' ? (
      <path d="M10 3L5 8l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    ) : (
      <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    );
  const cls =
    'flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-forest transition-colors hover:bg-forest hover:text-cream';

  if (disabled) {
    return (
      <span
        className={`${cls} cursor-not-allowed opacity-30`}
        aria-disabled="true"
        aria-label={`${label} (indisponible)`}
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">{icon}</svg>
      </span>
    );
  }
  return (
    <Link href={href} scroll={false} className={cls} aria-label={label}>
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">{icon}</svg>
    </Link>
  );
}
