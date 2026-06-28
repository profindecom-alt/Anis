import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { urlForImage } from '@/sanity/lib/image';
import { site } from '@/lib/site';
import { getSiteInfo } from '@/lib/siteInfo';
import {
  getAllArticles,
  getArticleBySlug,
  getRelatedArticles,
  formatDate,
} from '@/lib/articles';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import CTASection from '@/components/CTASection';
import ArticleCard from '@/components/ArticleCard';
import PortableBody from '@/components/PortableBody';
import Reveal from '@/components/Reveal';

export async function generateStaticParams() {
  const all = await getAllArticles();
  return all.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.title,
    description: article.excerpt,
    path: `/actualites/${article.slug}`,
    image: urlForImage(article.image)?.width(1200).height(630).url(),
    type: 'article',
    publishedTime: article.date,
  });
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  const related = await getRelatedArticles(slug);
  const coverUrl = urlForImage(article.image)?.width(1600).url();
  const info = await getSiteInfo();

  // Données structurées Article (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: coverUrl ?? `${site.url}/icon.png`,
    datePublished: article.date,
    dateModified: article.date,
    author: { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: info.legalName,
    },
    mainEntityOfPage: `${site.url}/actualites/${article.slug}`,
    articleSection: article.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { label: 'Actualités', href: '/actualites' },
              { label: article.title },
            ])
          ),
        }}
      />

      <article>
        {/* En-tête ------------------------------------------------- */}
        <header className="bg-forest pt-20 text-cream">
          <div className="container-content py-16 md:py-20">
            <nav aria-label="Fil d'Ariane" className="mb-8">
              <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/55">
                <li>
                  <Link href="/" className="hover:text-gold">Accueil</Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cream/30">/</span>
                  <Link href="/actualites" className="hover:text-gold">Actualités</Link>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-cream/30">/</span>
                  <span className="line-clamp-1 text-cream/80">{article.title}</span>
                </li>
              </ol>
            </nav>

            <div className="flex items-center gap-3 text-sm">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-forest-dark">
                {article.category}
              </span>
              <span className="text-cream/60">{formatDate(article.date)}</span>
              <span className="text-cream/40">·</span>
              <span className="text-cream/60">{article.readingTime} min de lecture</span>
            </div>

            <h1 className="mt-6 max-w-4xl text-balance text-4xl font-semibold leading-[1.08] md:text-5xl">
              {article.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream/75">
              {article.excerpt}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-cream/15 font-serif text-lg font-semibold text-gold">
                {article.author.split(' ').map((n) => n[0]).join('')}
              </span>
              <div>
                <p className="text-sm font-medium text-cream">{article.author}</p>
                <p className="text-xs text-cream/55">Élan Patrimoine</p>
              </div>
            </div>
          </div>
        </header>

        {/* Image de couverture ------------------------------------ */}
        <div className="bg-forest">
          <div className="container-content">
            <div className="relative aspect-[21/9] -translate-y-0 overflow-hidden rounded-3xl bg-forest-light/20 shadow-elevated">
              {coverUrl && (
                <Image
                  src={coverUrl}
                  alt={article.title}
                  fill
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              )}
            </div>
          </div>
          <div className="h-16 bg-cream md:h-24" />
        </div>

        {/* Corps -------------------------------------------------- */}
        <div className="bg-cream pb-24">
          <div className="container-content">
            <div className="mx-auto max-w-prose">
              <div className="prose-anis dropcap">
                <PortableBody value={article.content ?? []} />
              </div>

              {/* Encart auteur / partage */}
              <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-ink/10 bg-white p-8 shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-widest text-gold-dark">
                    Rédigé par
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-forest">
                    {article.author}
                  </p>
                  <p className="text-sm text-ink/55">
                    Conseiller chez Élan Patrimoine
                  </p>
                </div>
                <Link href="/contact" className="btn-primary shrink-0">
                  Poser votre question
                </Link>
              </div>

              <div className="mt-10">
                <Link href="/actualites" className="link-underline">
                  <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="rotate-180">
                    <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Retour aux actualités
                </Link>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Articles liés ------------------------------------------- */}
      <section className="border-t border-ink/10 bg-cream-200 py-20 md:py-24">
        <div className="container-content">
          <h2 className="mb-10 font-serif text-2xl font-semibold text-forest md:text-3xl">
            À lire également
          </h2>
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <ArticleCard article={a} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
