import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { expertises, type ExpertiseSlug } from '@/lib/site';
import { expertiseContent } from '@/lib/expertise-content';
import { getExpertiseFaqVideo } from '@/lib/expertiseFaqVideo';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import SectionHeading from '@/components/SectionHeading';
import Reveal from '@/components/Reveal';
import ExpertiseSimulator from '@/components/simulators/ExpertiseSimulator';
import ExpertiseFaqSection from '@/components/ExpertiseFaqSection';

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

/**
 * Icône par expertise (un trait fin, doré), réutilisée comme marqueur
 * de marque sur la page : badge flottant, en-têtes de section, cartes.
 * Géométrie cohérente avec la section « Nos expertises » de l'accueil.
 */
const expertiseIcons: Record<ExpertiseSlug, React.ReactNode> = {
  'gestion-de-patrimoine': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 27 H27" />
      <path d="M6 22 L13 15 L18 19 L26 9" />
      <path d="M21 9 L26 9 L26 14" />
    </svg>
  ),
  defiscalisation: (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="5.6" r="1.3" />
      <path d="M16 6.9 V26" />
      <path d="M9 26 H23" />
      <path d="M6 11 H26" />
      <path d="M6 11 V13.6" />
      <path d="M2 13.6 a4 4 0 0 0 8 0" />
      <path d="M26 11 V13.6" />
      <path d="M22 13.6 a4 4 0 0 0 8 0" />
    </svg>
  ),
  'assurance-protection': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4 L26 7.5 V16 C26 22 21.5 25.5 16 28 C10.5 25.5 6 22 6 16 V7.5 Z" />
      <path d="M11.5 16 L15 19.5 L21 12.5" />
    </svg>
  ),
  'reseau-expert': (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="16" cy="7" r="3" />
      <circle cx="7" cy="23" r="3" />
      <circle cx="25" cy="23" r="3" />
      <path d="M14 9.5 L9 20.5" />
      <path d="M18 9.5 L23 20.5" />
      <path d="M10 23 H22" />
    </svg>
  ),
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = expertiseContent[slug as ExpertiseSlug];
  if (!content) return {};
  return buildMetadata({
    title: content.title,
    description: content.metaDescription,
    path: `/nos-expertises/${content.slug}`,
    imageId: content.imageId,
  });
}

export default async function ExpertiseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = expertiseContent[slug as ExpertiseSlug];
  if (!content) notFound();

  const faqVideo = await getExpertiseFaqVideo();

  const icon = expertiseIcons[content.slug];
  const others = expertises.filter((e) => e.slug !== content.slug);

  const serviceLd = serviceJsonLd({
    name: content.title,
    description: content.metaDescription,
    path: `/nos-expertises/${content.slug}`,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      <PageHero
        eyebrow={`Pilier ${content.pillar} · Nos expertises`}
        title={content.title}
        intro={content.tagline}
        breadcrumbs={[
          { label: 'Nos Expertises', href: '/nos-expertises' },
          { label: content.title },
        ]}
        imageId={content.imageId}
      />

      {/* Présentation : intro + visuel encadré ----------------------- */}
      <section className="relative overflow-hidden bg-cream py-24 md:py-32">
        {/* Numéral géant du pilier, en filigrane */}
        <span
          aria-hidden="true"
          className="numeral-ghost absolute -top-12 right-0 select-none text-[16rem] font-semibold text-forest/[0.05] md:-top-20 md:text-[26rem]"
        >
          {content.pillar}
        </span>

        <div className="container-content relative grid items-center gap-16 lg:grid-cols-2">
          <Reveal>
            <span className="eyebrow mb-6 flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-forest/5 text-gold-dark [&_svg]:h-4 [&_svg]:w-4">
                {icon}
              </span>
              Présentation
            </span>
            <h2 className="text-balance text-3xl font-semibold text-forest md:text-[2.4rem]">
              {content.tagline}
            </h2>
            <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink/70">
              {content.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <Link href="/contact" className="btn-primary mt-8">
              Demander un conseil
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              {/* Cadre doré décalé */}
              <div
                aria-hidden="true"
                className="absolute -inset-3 -z-10 rounded-[1.9rem] border border-gold/30"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated">
                <Image
                  src={imageUrl(content.imageId, 800, 78)}
                  alt={content.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/55 via-transparent to-transparent" />
                {/* Badge pilier flottant (verre dépoli) */}
                <div className="absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl border border-cream/15 bg-forest-dark/55 p-4 backdrop-blur-md">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-gold/30 bg-gold/10 text-gold [&_svg]:h-5 [&_svg]:w-5">
                    {icon}
                  </span>
                  <div>
                    <div className="text-[0.7rem] font-semibold uppercase tracking-widest text-gold">
                      Pilier {content.pillar}
                    </div>
                    <div className="font-serif text-lg font-semibold leading-tight text-cream">
                      {content.title}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Bénéfices clés ---------------------------------------------- */}
      <section
        className="relative overflow-hidden py-20 md:py-28"
        style={{
          backgroundColor: '#0c2350',
          backgroundImage:
            'radial-gradient(120% 100% at 50% -10%, #1b4a8f 0%, #102f62 45%, #0a1d40 100%)',
        }}
      >
        {/* Fond bleu animé : halos qui dérivent (mêmes styles que la section
            « Nos expertises » de l'accueil — globals.css). */}
        <div className="expertises__aurora" aria-hidden="true">
          <span className="expertises__blob expertises__blob--1" />
          <span className="expertises__blob expertises__blob--2" />
          <span className="expertises__blob expertises__blob--3" />
        </div>
        <div className="container-content relative z-[1]">
          <div className="grid gap-12 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-cream/10">
            {content.highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 90} className="px-6 text-center">
                <div className="font-serif text-3xl font-semibold leading-tight text-cream md:text-[2.4rem]">
                  {h.value}
                </div>
                <div
                  aria-hidden="true"
                  className="mx-auto mt-4 h-[3px] w-12 rounded-full bg-gradient-to-r from-gold to-gold-light"
                />
                <div className="mt-4 text-sm leading-relaxed text-cream/70">
                  {h.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services ---------------------------------------------------- */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-content">
          <SectionHeading
            eyebrow="Nos services"
            title="Ce que nous mettons en œuvre pour vous"
            intro="Un accompagnement complet, décliné en prestations concrètes."
            className="mb-16"
          />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {content.services.map((s, i) => {
              // Cascade en diagonale : chaque carte démarre selon sa ligne ET
              // sa colonne (grille à 3 colonnes), pour une vague fluide plutôt
              // qu'une apparition ligne par ligne.
              const col = i % 3;
              const row = Math.floor(i / 3);
              const delay = (col + row) * 110;
              return (
                <Reveal key={s.title} delay={delay} className="h-full">
                  <div className="group relative flex h-full flex-col overflow-hidden bg-cream-50 p-9 transition-all duration-500 ease-out hover:z-10 hover:-translate-y-1 hover:bg-white hover:shadow-elevated">
                    {/* Voile doré qui se diffuse au survol, depuis le coin haut-droit */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-gold/0 blur-2xl transition-all duration-700 ease-out group-hover:bg-gold/15"
                    />
                    {/* Numéro filigrane, grande capitale dorée très discrète */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute -right-1 -top-3 select-none font-serif text-[5.5rem] font-semibold leading-none text-gold/[0.07] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:scale-105 group-hover:text-gold/[0.16]"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {/* Eyebrow + filet doré qui s'étire au survol */}
                    <div className="relative flex items-center gap-3">
                      <span className="text-[0.65rem] font-semibold uppercase tracking-[0.25em] text-gold">
                        Service {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        aria-hidden="true"
                        className="h-px w-8 origin-left bg-gold/40 transition-all duration-500 ease-out group-hover:w-12 group-hover:bg-gold/70"
                      />
                    </div>
                    <h3 className="relative mt-5 font-serif text-xl font-semibold leading-snug text-forest transition-transform duration-500 ease-out group-hover:translate-x-0.5">
                      {s.title}
                    </h3>
                    <p className="relative mt-3 text-sm leading-relaxed text-ink/65">
                      {s.description}
                    </p>
                    {/* Filet doré qui se déploie au survol */}
                    <span
                      aria-hidden="true"
                      className="relative mt-6 block h-[2px] w-10 origin-left rounded-full bg-gradient-to-r from-gold to-gold-light transition-all duration-500 ease-out group-hover:w-full"
                    />
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pour qui ---------------------------------------------------- */}
      <section
        className="relative overflow-hidden py-16 text-cream md:py-20"
        style={{
          backgroundColor: '#0c2350',
          backgroundImage:
            'radial-gradient(120% 100% at 50% -10%, #1b4a8f 0%, #102f62 45%, #0a1d40 100%)',
        }}
      >
        {/* Fond bleu animé identique à la section « Bénéfices clés ». */}
        <div className="expertises__aurora" aria-hidden="true">
          <span className="expertises__blob expertises__blob--1" />
          <span className="expertises__blob expertises__blob--2" />
          <span className="expertises__blob expertises__blob--3" />
        </div>
        <div className="container-content relative z-[1]">
          <SectionHeading
            eyebrow="Pour qui ?"
            light
            align="center"
            title="À qui s'adresse cette expertise"
            intro="Cette expertise répond tout particulièrement aux situations suivantes."
            className="mb-10"
          />
          {/* Liste éditoriale chic : losange doré numéroté, filet fin, énoncé en serif. */}
          <div className="mx-auto max-w-2xl divide-y divide-cream/10 border-y border-cream/10">
            {content.forWhom.map((w, i) => (
              <Reveal key={w} delay={i * 100}>
                <div className="group flex items-center gap-6 py-6 md:gap-8">
                  {/* Losange doré avec numéro */}
                  <span className="relative flex h-12 w-12 shrink-0 items-center justify-center">
                    <span
                      aria-hidden="true"
                      className="absolute inset-1 rotate-45 rounded-[10px] border border-gold/35 transition-all duration-500 group-hover:border-gold/70 group-hover:bg-gold/10"
                    />
                    <span className="relative font-serif text-base font-semibold text-gold/80 transition-colors duration-500 group-hover:text-gold">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </span>
                  <p className="flex-1 font-serif text-lg leading-snug text-cream/90 transition-colors duration-500 group-hover:text-cream md:text-xl">
                    {w}
                  </p>
                  <span
                    aria-hidden="true"
                    className="-translate-x-2 text-gold opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100"
                  >
                    <svg width="22" height="12" viewBox="0 0 22 12" fill="none">
                      <path d="M1 6h19M15 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Simulateur + capture de lead -------------------------------- */}
      <ExpertiseSimulator slug={content.slug} sujet={content.title} />

      {/* Questions fréquentes (fond bleu, vidéo optionnelle via Sanity) -- */}
      <ExpertiseFaqSection
        items={content.faq}
        videoUrl={faqVideo?.enabled ? faqVideo.videoUrl : null}
        posterUrl={faqVideo?.posterUrl}
      />

      {/* Autres expertises ------------------------------------------- */}
      <section className="bg-cream pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="container-content">
          <SectionHeading
            eyebrow="Aller plus loin"
            title="Nos autres expertises"
            className="mb-12"
          />
          <div className="grid gap-6 sm:grid-cols-3">
            {others.map((e, i) => (
              <Reveal key={e.slug} delay={i * 100}>
                <Link
                  href={`/nos-expertises/${e.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-white p-7 shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-elevated"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest/5 text-gold-dark transition-colors duration-500 group-hover:bg-forest group-hover:text-gold [&_svg]:h-5 [&_svg]:w-5">
                      {expertiseIcons[e.slug]}
                    </span>
                    <span className="font-serif text-2xl font-semibold text-gold/50">
                      {e.pillar}
                    </span>
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-semibold text-forest">
                    {e.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">
                    {e.excerpt}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-forest">
                    Découvrir
                    <svg width="15" height="11" viewBox="0 0 16 12" fill="none" aria-hidden="true" className="transition-transform group-hover:translate-x-1">
                      <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title={`Un projet lié à ${content.title.toLowerCase()} ?`}
        bgClassName="bg-cream"
      />
    </>
  );
}
