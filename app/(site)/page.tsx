import Link from 'next/link';
import Image from 'next/image';
import { imageUrl, img } from '@/lib/images';
import { site } from '@/lib/site';
import { getFeaturedArticle, getAllArticles } from '@/lib/articles';
import { buildMetadata } from '@/lib/seo';
import SectionHeading from '@/components/SectionHeading';
import CTASection from '@/components/CTASection';
import Reveal from '@/components/Reveal';
import ArticleCard from '@/components/ArticleCard';
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
  {
    id: 'eiffel-tower-and-river-seine-craig-fildes',
    alt: 'La tour Eiffel et la Seine à Paris',
  },
].map(({ id, alt }) => ({ src: imageUrl(id), alt }));

export default async function HomePage() {
  const [
    featured,
    allArticles,
    hero,
    homeVideo,
    expertisesVideo,
    approcheVideo,
    clientLogos,
  ] = await Promise.all([
    getFeaturedArticle(),
    getAllArticles(),
    getHeroSettings(),
    getHomeVideo(),
    getHomeExpertisesVideo(),
    getHomeApprocheVideo(),
    getClientLogos(),
  ]);
  const secondary = allArticles
    .filter((a) => a.slug !== featured?.slug)
    .slice(0, 3);

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
              <span className="mb-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.25em] text-gold animate-fade-up sm:text-xs">
                <span className="h-px w-8 bg-gold" aria-hidden="true" />
                Cabinet de gestion de patrimoine
              </span>
              <h1 className="text-balance font-serif text-[2.5rem] font-medium leading-[1.05] text-cream animate-fade-up sm:text-[3.25rem] md:text-[3.75rem] lg:text-[4.25rem]">
                Votre patrimoine mérite une{' '}
                <span className="whitespace-nowrap">
                  <span className="relative inline-block">
                    <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
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
                className="mt-6 max-w-lg text-base leading-relaxed text-cream/75 animate-fade-up md:mt-7 md:text-lg"
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
      <section className="bg-cream-gold py-24 md:py-32">
        <div className="container-content grid items-center gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <span className="eyebrow mb-6">Le Cabinet</span>
            <blockquote className="text-balance font-serif text-2xl font-medium leading-snug text-forest md:text-4xl">
              « La vraie richesse n'est pas dans l'accumulation, mais dans la
              cohérence des décisions. »
            </blockquote>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              Fondé sur une conviction simple (l'indépendance comme condition du
              bon conseil), Élan Patrimoine accompagne particuliers, dirigeants et
              familles dans la construction, la protection et la transmission de
              leur patrimoine. Nous ne vendons pas de produits : nous bâtissons
              des stratégies.
            </p>
            <Link href="/le-cabinet" className="link-underline mt-8">
              Découvrir le cabinet
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </Reveal>

          <Reveal delay={150} className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-elevated">
              <Parallax className="absolute inset-0" speed={0.1}>
                <Image
                  src={imageUrl(img.cabinet, 800, 78)}
                  alt="Conseillers en gestion de patrimoine en rendez-vous client"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </Parallax>
              <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-cream/95 p-5 backdrop-blur">
                <p className="font-serif text-lg font-semibold text-forest">
                  Un interlocuteur unique
                </p>
                <p className="mt-1 text-sm text-ink/60">
                  Dédié, disponible et engagé sur la durée.
                </p>
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
          continu, partagé sans couture par les sections actualités → FAQ →
          signature → CTA. */}
      <SeamLine />
      <div className="bg-cream-gold-animated">
      {/* 07 · ACTUALITÉS --------------------------------------------- */}
      {featured && (
        <section className="py-24 md:py-32">
          <div className="container-content">
            <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
              <SectionHeading
                eyebrow="Actualités"
                title="Analyses & éclairages patrimoniaux"
                intro="Décryptages de l'actualité fiscale, économique et réglementaire."
              />
              <Reveal delay={100}>
                <Link href="/actualites" className="btn-outline shrink-0">
                  Toutes les actualités
                </Link>
              </Reveal>
            </div>

            <div className="mt-14 grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-7">
                <ArticleCard article={featured} variant="featured" />
              </Reveal>
              <div className="flex flex-col gap-5 lg:col-span-5">
                {secondary.map((a, i) => (
                  <Reveal key={a.slug} delay={i * 100}>
                    <ArticleCard article={a} variant="mini" />
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

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
