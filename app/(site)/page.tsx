import Link from 'next/link';
import Image from 'next/image';
import { imageUrl, img } from '@/lib/images';
import { site } from '@/lib/site';
import { buildMetadata } from '@/lib/seo';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import HeroSlideshow, { type HeroImage } from '@/components/HeroSlideshow';
import HeroVideo from '@/components/HeroVideo';
import { getHeroSettings } from '@/lib/hero';
import { urlForImage } from '@/sanity/lib/image';
import Testimonials from '@/components/Testimonials';
import Parallax from '@/components/Parallax';
import ExpertisesSection from '@/components/ExpertisesSection';
import ConvictionSection from '@/components/ConvictionSection';
import ValuesSection from '@/components/ValuesSection';
import ChiffresSection from '@/components/ChiffresSection';
import ApprocheSection from '@/components/ApprocheSection';
import VideoBandSection from '@/components/VideoBandSection';
import FaqSection from '@/components/FaqSection';
import BrandSignatureSection from '@/components/BrandSignatureSection';
import { getHomeVideo } from '@/lib/homeVideo';
import { getHomeExpertisesVideo } from '@/lib/homeExpertisesVideo';
import { getHomeApprocheVideo } from '@/lib/homeApprocheVideo';
import { getClientLogos, defaultPartnerLogos } from '@/lib/clientLogos';
import HeroStats from '@/components/HeroStats';
import SeamLine from '@/components/SeamLine';

export const metadata = buildMetadata({
  title: 'Accueil',
  description: site.description,
  path: '/',
});

// Diaporama du hero par défaut (repli si rien n'est configuré dans Sanity),
// enchaîné en fondu doux.
const defaultHeroImages: HeroImage[] = [
  { id: img.heroHome, alt: 'Architecture contemporaine symbolisant la solidité patrimoniale' },
  { id: '1505664194779-8beaceb93744', alt: 'Colonnes d\'un édifice classique évoquant la pérennité' },
  {
    id: 'bibliotheque-nationale-de-france-richelieu-bnf-m041122-t1',
    alt: 'Salle de lecture de la Bibliothèque nationale de France, site Richelieu',
  },
].map(({ id, alt }) => ({ src: imageUrl(id), alt }));

export default async function HomePage() {
  const [
    hero,
    homeVideo,
    expertisesVideo,
    approcheVideo,
    clientLogos,
  ] = await Promise.all([
    getHeroSettings(),
    getHomeVideo(),
    getHomeExpertisesVideo(),
    getHomeApprocheVideo(),
    getClientLogos(),
  ]);

  // Logos partenaires : ceux de Sanity s'ils sont activés et renseignés,
  // sinon repli sur les placeholders pour que le bandeau reste visible.
  const partnerLogos =
    clientLogos?.enabled && clientLogos.logos?.length
      ? clientLogos.logos
      : defaultPartnerLogos;

  // Choix du média de fond du héro, piloté depuis Sanity.
  const sanityImages: HeroImage[] =
    hero?.images
      ?.map((image) => ({
        src: urlForImage(image)?.width(1920).quality(80).url() ?? '',
        alt: image.alt ?? '',
      }))
      .filter((image) => image.src) ?? [];

  const heroBackground =
    hero?.mediaType === 'video' && hero.videoUrl ? (
      <HeroVideo src={hero.videoUrl} poster={hero.posterUrl ?? undefined} />
    ) : (
      <HeroSlideshow
        images={sanityImages.length > 0 ? sanityImages : defaultHeroImages}
      />
    );

  return (
    <>
      {/* 01 · HERO ---------------------------------------------------- */}
      <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
        {heroBackground}

        {/* Voiles de lecture : voile uniforme léger + dégradé renforcé en bas,
            là où se posent le titre et les actions. */}
        <div className="pointer-events-none absolute inset-0 bg-forest-dark/25" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/35 to-forest-dark/5" />

        {/* Contenu ancré en bas à gauche, façon héros éditorial. */}
        <div className="relative z-10 flex flex-1 items-end">
          <div className="container-content pb-16 pt-32 md:pb-20">
            <div className="max-w-3xl">
              <span className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gold animate-fade-up text-shadow-hero sm:text-xs">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                Cabinet de gestion de patrimoine
              </span>
              <h1 className="text-balance font-serif text-[2.5rem] font-bold leading-[1.05] text-cream animate-fade-up text-shadow-hero sm:text-[3.25rem] sm:font-medium md:text-[3.75rem] lg:text-[4.25rem]">
                Votre patrimoine mérite une{' '}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent [text-shadow:none]">
                      stratégie
                    </span>
                    <svg
                      className="absolute -bottom-2 left-0 w-full text-gold animate-fade-up"
                      style={{ animationDelay: '360ms' }}
                      viewBox="0 0 200 12"
                      fill="none"
                      preserveAspectRatio="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 8C40 3 80 3 120 6C150 8 175 7 198 4"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  ,
                </span>{' '}
                pas un produit.
              </h1>
              <p
                className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 animate-fade-up text-shadow-hero md:mt-7 md:text-lg"
                style={{ animationDelay: '120ms' }}
              >
                Cabinet indépendant, nous concevons et pilotons des stratégies
                patrimoniales sur mesure (gestion, fiscalité, protection et
                transmission) au seul service de vos intérêts.
              </p>
              <div
                className="mt-8 flex flex-col gap-3 animate-fade-up sm:flex-row sm:items-center sm:gap-4 md:mt-10"
                style={{ animationDelay: '240ms' }}
              >
                <Link
                  href="/contact#assistant"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-cream px-8 py-4 text-base font-medium text-forest-dark transition-colors duration-300 hover:bg-white sm:w-auto"
                >
                  Prendre rendez-vous
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
                <Link
                  href="/nos-expertises"
                  className="group inline-flex w-full items-center justify-center gap-2 px-2 py-3 text-base font-medium text-cream/90 transition-colors duration-300 hover:text-cream sm:w-auto sm:py-4"
                >
                  Nos expertises
                  <svg
                    aria-hidden="true"
                    width="15"
                    height="15"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  >
                    <path d="M7 17 17 7" />
                    <path d="M7 7h10v10" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bandeau bas : stats animées */}
        <div
          className="relative z-20 animate-fade-in"
          style={{ animationDelay: '480ms' }}
        >
          <div className="container-content">
            <HeroStats />
          </div>
        </div>
      </section>

      {/* 02 · INTRO CABINET ------------------------------------------ */}
      <section className="relative overflow-hidden bg-cream-gold pb-20 pt-12 md:py-32">
        {/* Filets décoratifs très discrets, ambiance « papier d'apparat ». */}
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-gold/10 blur-3xl md:h-96 md:w-96"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-forest/5 blur-3xl md:h-96 md:w-96"
          aria-hidden="true"
        />

        <div className="container-content relative grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow mb-6">Le Cabinet</span>

            {/* Citation éditoriale avec guillemet ouvrant surdimensionné. */}
            <blockquote className="relative">
              <span
                className="pointer-events-none absolute -left-1 -top-8 select-none font-serif text-7xl leading-none text-gold/25 md:-left-3 md:-top-10 md:text-8xl"
                aria-hidden="true"
              >
                «
              </span>
              <p className="text-balance font-serif text-[1.65rem] font-medium leading-[1.25] text-forest sm:text-3xl md:text-[2.5rem] md:leading-[1.2]">
                La vraie richesse n'est pas dans l'accumulation, mais dans la
                cohérence des décisions.
              </p>
            </blockquote>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/70 md:mt-8 md:text-lg">
              Fondé sur une conviction simple (l'indépendance comme condition du
              bon conseil), Élan Patrimoine accompagne particuliers, dirigeants et
              familles dans la construction, la protection et la transmission de
              leur patrimoine. Nous ne vendons pas de produits : nous bâtissons
              des stratégies.
            </p>

            {/* Petits repères de réassurance, façon « signature » du cabinet. */}
            <ul className="mt-8 flex flex-col gap-x-8 gap-y-3 text-sm font-medium text-forest sm:flex-row sm:flex-wrap">
              {['Indépendance totale', 'Conseil sur mesure', 'Engagement durable'].map(
                (item) => (
                  <li key={item} className="flex items-center gap-2.5">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
                      className="shrink-0 text-gold"
                    >
                      <path
                        d="M20 6 9 17l-5-5"
                        stroke="currentColor"
                        strokeWidth="2.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    {item}
                  </li>
                )
              )}
            </ul>

            <Link href="/le-cabinet" className="link-underline mt-9">
              Découvrir le cabinet
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative">
              {/* Cadre or en léger décalage pour un effet « encadré d'art ». */}
              <div
                className="pointer-events-none absolute -inset-3 hidden rounded-[1.75rem] border border-gold/30 md:block"
                aria-hidden="true"
              />
              <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated ring-1 ring-forest/5">
                <Parallax className="absolute inset-0" speed={0.1}>
                  <Image
                    src={imageUrl(img.cabinet, 800, 78)}
                    alt="Conseillers en gestion de patrimoine en rendez-vous client"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </Parallax>
                {/* Voile bas pour asseoir la carte flottante. */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-forest-dark/40 to-transparent"
                  aria-hidden="true"
                />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-cream/95 p-5 shadow-lg backdrop-blur md:bottom-5 md:left-5 md:right-5">
                  <div className="flex items-start gap-3">
                    <span
                      className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold"
                      aria-hidden="true"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <p className="font-serif text-lg font-semibold leading-tight text-forest">
                        Un interlocuteur unique
                      </p>
                      <p className="mt-1 text-sm leading-snug text-ink/60">
                        Dédié, disponible et engagé sur la durée.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 03 · NOS EXPERTISES (texture « Élan ») ---------------------- */}
      <SeamLine />
      <ExpertisesSection
        videoUrl={
          expertisesVideo?.enabled ? expertisesVideo.videoUrl : null
        }
        posterUrl={expertisesVideo?.posterUrl}
      />

      {/* 03·bis · TÉMOIGNAGES (preuve sociale, juste après nos services) - */}
      <Testimonials />

      {/* 03c · BANDEAU VIDÉO (ambiance, piloté Sanity) — masqué tant
          qu'aucune vidéo n'est activée dans le Studio. -------------- */}
      {homeVideo?.enabled && homeVideo.videoUrl && (
        <VideoBandSection
          videoUrl={homeVideo.videoUrl}
          posterUrl={homeVideo.posterUrl}
          eyebrow={homeVideo.eyebrow}
          title={homeVideo.title}
          ctaLabel={homeVideo.ctaLabel}
          ctaHref={homeVideo.ctaHref}
        />
      )}

      {/* CHIFFRES · bandeau « Filets », fond or crème, prolongé par le
          bandeau partenaires « Ils nous font confiance » (même section,
          fond partagé). Logos pilotés Sanity, avec repli placeholder. -- */}
      <ChiffresSection
        variant="cream"
        partnersEyebrow={clientLogos?.eyebrow}
        partnerLogos={partnerLogos}
      />

      {/* 04 · CONVICTION (citation éditoriale, bandeau sombre signature) - */}
      <ConvictionSection variant="brand" />

      {/* 05 · NOS VALEURS -------------------------------------------- */}
      <SeamLine />
      <ValuesSection />

      {/* 06 · APPROCHE EN 3 TEMPS (design handoff « Notre approche ») - */}
      <SeamLine />
      <ApprocheSection
        videoUrl={approcheVideo?.enabled ? approcheVideo.videoUrl : null}
        posterUrl={approcheVideo?.posterUrl}
      />

      {/* 07-08 · Bloc crème final : un seul dégradé « or crème » animé et
          continu, partagé sans couture par les sections FAQ →
          signature → CTA. */}
      <SeamLine />
      <div className="bg-cream-gold-animated">
      {/* 08 · FAQ (questions fréquentes + balisage FAQPage) --------- */}
      <FaqSection />

      {/* 08·bis · SIGNATURE MANUSCRITE (écrite au stylo) ------------- */}
      <BrandSignatureSection />

      {/* 09 · CTA FINAL ---------------------------------------------- */}
      <CTASection bgClassName="bg-transparent" />
      </div>
    </>
  );
}
