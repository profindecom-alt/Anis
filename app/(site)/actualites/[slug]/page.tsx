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
  isArticleIndexable,
  type Article,
  type Category,
} from '@/lib/articles';
import {
  buildMetadata,
  breadcrumbJsonLd,
  defaultSocialImage,
  jsonLdHtml,
} from '@/lib/seo';
import CTASection from '@/components/CTASection';
import ArticleCard from '@/components/ArticleCard';
import PortableBody from '@/components/PortableBody';
import Reveal from '@/components/Reveal';

type OfficialReference = { label: string; href: string };
type ExpertiseReference = { label: string; href: string };

/**
 * Repères institutionnels généraux par thème. Ils ne sont pas présentés
 * comme les sources particulières de l'article : ils permettent au lecteur de
 * vérifier le cadre public applicable et renforcent la transparence éditoriale.
 */
const officialReferences: Record<Category, OfficialReference[]> = {
  Fiscalité: [
    { label: 'Impôts.gouv.fr — particuliers', href: 'https://www.impots.gouv.fr/particulier' },
    { label: 'BOFiP-Impôts', href: 'https://bofip.impots.gouv.fr/' },
  ],
  Investissement: [
    { label: 'AMF — espace épargnants', href: 'https://www.amf-france.org/fr/espace-epargnants' },
    { label: 'ABE Infoservice', href: 'https://www.abe-infoservice.fr/' },
  ],
  Transmission: [
    { label: 'Service-Public.fr — succession', href: 'https://www.service-public.fr/particuliers/vosdroits/N171' },
    { label: 'Légifrance', href: 'https://www.legifrance.gouv.fr/' },
  ],
  Prévoyance: [
    { label: 'ABE Infoservice — assurance', href: 'https://www.abe-infoservice.fr/assurance' },
    { label: 'ACPR — Banque de France', href: 'https://acpr.banque-france.fr/' },
  ],
  Marchés: [
    { label: 'AMF — espace épargnants', href: 'https://www.amf-france.org/fr/espace-epargnants' },
    { label: 'Banque de France — statistiques', href: 'https://www.banque-france.fr/fr/statistiques' },
  ],
  Réglementation: [
    { label: 'Autorité des marchés financiers', href: 'https://www.amf-france.org/' },
    { label: 'ACPR — Banque de France', href: 'https://acpr.banque-france.fr/' },
  ],
};

const expertiseReferences: Record<Category, ExpertiseReference> = {
  Fiscalité: {
    label: 'Découvrir notre accompagnement fiscal',
    href: '/nos-expertises/defiscalisation',
  },
  Investissement: {
    label: 'Découvrir notre accompagnement patrimonial',
    href: '/nos-expertises/gestion-de-patrimoine',
  },
  Transmission: {
    label: 'Préparer la protection et la transmission',
    href: '/nos-expertises/assurance-protection',
  },
  Prévoyance: {
    label: 'Découvrir notre approche de la protection',
    href: '/nos-expertises/assurance-protection',
  },
  Marchés: {
    label: 'Découvrir notre accompagnement patrimonial',
    href: '/nos-expertises/gestion-de-patrimoine',
  },
  Réglementation: {
    label: 'Comprendre notre accompagnement patrimonial',
    href: '/nos-expertises/gestion-de-patrimoine',
  },
};

function resolveAuthorUrl(
  article: Pick<Article, 'authorUrl' | 'authorEntityType'>
): string | undefined {
  if (article.authorUrl) {
    try {
      const url = new URL(article.authorUrl, site.url);
      if (url.protocol === 'http:' || url.protocol === 'https:') {
        return url.toString();
      }
    } catch {
      // Une URL CMS invalide ne doit jamais empêcher le rendu de l'article.
    }
  }
  if (article.authorEntityType === 'Organization') {
    return `${site.url}/politique-editoriale`;
  }
  return undefined;
}

function authorInitials(article: Pick<Article, 'author' | 'authorEntityType'>) {
  if (article.authorEntityType === 'Organization') return 'ÉP';
  return article.author
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

function hasVisibleUpdate(article: Pick<Article, 'date' | 'updatedAt'>) {
  if (!article.updatedAt) return false;
  const published = new Date(article.date);
  const updated = new Date(article.updatedAt);
  if (Number.isNaN(published.getTime()) || Number.isNaN(updated.getTime())) {
    return false;
  }
  return updated.toISOString().slice(0, 10) > published.toISOString().slice(0, 10);
}

export async function generateStaticParams() {
  try {
    const all = await getAllArticles();
    return all.map((a) => ({ slug: a.slug }));
  } catch {
    // CMS indisponible au build : les articles seront rendus à la demande.
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  // Article inexistant : vrai 404 dès la résolution des métadonnées, avant
  // tout envoi de HTML (sinon la réponse part en 200 avec les métadonnées
  // de l'accueil).
  if (!article) notFound();
  const authorUrl = resolveAuthorUrl(article);
  return buildMetadata({
    title: article.seoTitle || article.title,
    socialTitle: article.title,
    absoluteTitle: true,
    // Article trop court ou exclu manuellement : lisible, mais hors index.
    noIndex: !isArticleIndexable(article),
    description: article.metaDescription || article.excerpt,
    path: `/actualites/${article.slug}`,
    image: urlForImage(article.image)?.width(1200).height(630).url(),
    type: 'article',
    publishedTime: article.date,
    modifiedTime: article.updatedAt,
    authors: [
      {
        name: article.author,
        ...(authorUrl ? { url: authorUrl } : {}),
      },
    ],
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
  const authorUrl = resolveAuthorUrl(article);
  const expertiseReference = expertiseReferences[article.category];
  const showUpdatedDate = hasVisibleUpdate(article);

  // Google recommande plusieurs formats d'image (16:9, 4:3, 1:1).
  const schemaImages = article.image
    ? ([
        [1200, 675],
        [1200, 900],
        [1200, 1200],
      ] as const)
        .map(([w, h]) => urlForImage(article.image)?.width(w).height(h).fit('crop').url())
        .filter((u): u is string => Boolean(u))
    : [];

  // Données structurées Article (JSON-LD)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: schemaImages.length > 0 ? schemaImages : [defaultSocialImage],
    inLanguage: 'fr-FR',
    wordCount: article.wordCount,
    datePublished: article.date,
    ...(article.updatedAt ? { dateModified: article.updatedAt } : {}),
    author: {
      '@type': article.authorEntityType ?? 'Person',
      name: article.author,
      ...(article.authorEntityType !== 'Organization' && article.authorRole
        ? { jobTitle: article.authorRole }
        : {}),
      ...(authorUrl ? { url: authorUrl } : {}),
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${site.url}/#organization`,
      name: site.name,
      legalName: info.legalName,
      url: site.url,
      logo: {
        '@type': 'ImageObject',
        url: `${site.url}/icon-512.png`,
        width: 512,
        height: 512,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${site.url}/actualites/${article.slug}`,
    },
    articleSection: article.category,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: jsonLdHtml(
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

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-gold px-3 py-1 text-xs font-medium text-forest-dark">
                {article.category}
              </span>
              <time dateTime={article.date} className="text-cream/60">
                Publié le {formatDate(article.date)}
              </time>
              {showUpdatedDate && article.updatedAt && (
                <>
                  <span className="text-cream/40">·</span>
                  <time dateTime={article.updatedAt} className="text-cream/60">
                    Mis à jour le {formatDate(article.updatedAt)}
                  </time>
                </>
              )}
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
                {authorInitials(article)}
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
                  alt={article.imageAlt?.trim() || article.title}
                  fill
                  priority
                  fetchPriority="high"
                  sizes="(max-width: 767px) calc(100vw - 48px), (max-width: 1199px) calc(100vw - 80px), 1120px"
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

              <aside className="mt-12 rounded-3xl border border-ink/10 bg-white/70 p-7" aria-labelledby="official-references-title">
                <h2
                  id="official-references-title"
                  className="font-serif text-xl font-semibold text-forest"
                >
                  Sources officielles et repères
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-ink/70">
                  Pour consulter le cadre public général lié à ce sujet :
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {officialReferences[article.category].map((reference) => (
                    <li key={reference.href}>
                      <a
                        href={reference.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium text-forest underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
                      >
                        {reference.label}
                      </a>
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm">
                  <Link
                    href={expertiseReference.href}
                    className="font-medium text-forest underline decoration-gold/50 underline-offset-4 hover:decoration-gold"
                  >
                    {expertiseReference.label}
                  </Link>
                </p>
                <p className="mt-5 border-t border-ink/10 pt-5 text-xs leading-relaxed text-ink/70">
                  Cet article fournit une information générale à sa date de
                  publication. Il ne constitue ni un conseil juridique ou fiscal,
                  ni une recommandation d’investissement personnalisée. Toute
                  décision doit tenir compte de votre situation et du cadre en vigueur.{' '}
                  <Link
                    href="/politique-editoriale"
                    className="font-medium text-forest underline decoration-gold/50 underline-offset-2"
                  >
                    Consulter notre politique éditoriale
                  </Link>
                  .
                </p>
              </aside>

              {/* Encart auteur / partage */}
              <div className="mt-14 flex flex-col gap-6 rounded-3xl border border-ink/10 bg-white p-8 shadow-card sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-forest">
                    Rédigé par
                  </p>
                  <p className="mt-1 font-serif text-xl font-semibold text-forest">
                    {article.author}
                  </p>
                  <p className="text-sm text-ink/70">
                    {article.authorRole ??
                      (article.authorEntityType === 'Organization'
                        ? 'Équipe éditoriale'
                        : 'Auteur')}
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
