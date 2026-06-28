import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { expertises } from '@/lib/site';
import { expertiseContent } from '@/lib/expertise-content';
import { buildMetadata } from '@/lib/seo';
import PageHero from '@/components/PageHero';
import CTASection from '@/components/CTASection';
import Chatbot from '@/components/Chatbot';
import Reveal from '@/components/Reveal';
import ApprocheSection from '@/components/ApprocheSection';

export const metadata = buildMetadata({
  title: 'Nos Expertises',
  description:
    "Les quatre pôles d'expertise d'Élan Patrimoine : gestion de patrimoine, défiscalisation, assurance & protection et réseau d'experts. Une approche globale et coordonnée.",
  path: '/nos-expertises',
});

export default function NosExpertisesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos expertises"
        title="Quatre expertises au service d'une stratégie unique"
        intro="Chaque pôle se déploie au sein d'une vision d'ensemble. C'est leur articulation qui fait la valeur de notre accompagnement."
        breadcrumbs={[{ label: 'Nos Expertises' }]}
        imageId={expertiseContent['gestion-de-patrimoine'].imageId}
      />

      {/* Liste des 4 expertises -------------------------------------- */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-content space-y-6">
          {expertises.map((e, i) => {
            const content = expertiseContent[e.slug];
            const reversed = i % 2 === 1;
            return (
              <Reveal key={e.slug} delay={i * 60}>
                <Link
                  href={`/nos-expertises/${e.slug}`}
                  className="group grid overflow-hidden rounded-3xl border border-ink/10 bg-white shadow-card transition-all duration-500 hover:-translate-y-0.5 hover:border-gold/30 hover:shadow-elevated md:grid-cols-2"
                >
                  {/* Image panel */}
                  <div className={`relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[340px] ${reversed ? 'md:order-2' : ''}`}>
                    <Image
                      src={imageUrl(content.imageId, 1000, 75)}
                      alt={e.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-dark/65 via-forest-dark/10 to-transparent" />
                    {/* Pillar number watermark on image */}
                    <span aria-hidden="true" className="absolute right-5 bottom-3 select-none font-serif text-[7rem] font-bold leading-none text-white/20 md:text-[9rem]">
                      {e.pillar}
                    </span>
                  </div>

                  {/* Content panel */}
                  <div className={`relative flex flex-col justify-center p-8 md:p-12 ${reversed ? 'md:order-1' : ''}`}>
                    {/* Gold accent bar — animates in on hover */}
                    <span aria-hidden="true" className="absolute inset-y-0 left-0 w-1 origin-center scale-y-0 rounded-r bg-gold transition-transform duration-500 group-hover:scale-y-100" />

                    <p className="text-xs font-semibold uppercase tracking-widest text-gold-dark">
                      Pilier {e.pillar}
                    </p>
                    <h2 className="mt-3 font-serif text-3xl font-semibold text-forest md:text-4xl">
                      {e.title}
                    </h2>
                    <p className="mt-2 text-sm italic text-ink/50">
                      {content.tagline}
                    </p>
                    <p className="mt-5 leading-relaxed text-ink/70">
                      {content.intro[0]}
                    </p>
                    <span className="link-underline mt-7 w-fit">
                      Découvrir cette expertise
                      <svg
                        width="16"
                        height="12"
                        viewBox="0 0 16 12"
                        fill="none"
                        aria-hidden="true"
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* Rappel de la méthode ---------------------------------------- */}
      <ApprocheSection />

      {/* Assistant : orientation vers la bonne expertise -------------- */}
      <section className="bg-cream pt-24 pb-12 md:pt-28 md:pb-14">
        <div className="container-content grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <Reveal>
            <span className="eyebrow mb-5 !text-forest">Assistant en ligne</span>
            <h2 className="text-balance text-3xl font-semibold text-forest md:text-4xl">
              Quelle expertise pour votre situation ?
            </h2>
            <p className="mt-5 max-w-md leading-relaxed text-ink/70">
              Décrivez votre objectif en quelques mots. Notre assistant vous
              oriente vers le pôle d'expertise le plus adapté, puis un conseiller
              affine la réponse.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <Chatbot
              context="services"
              intro="Bonjour, décrivez votre objectif patrimonial : je vous oriente vers la bonne expertise et peux fixer un rendez-vous."
            />
          </Reveal>
        </div>
      </section>

      {/* Séparateur décoratif entre l'assistant et le CTA -------------- */}
      <div className="bg-cream" aria-hidden="true">
        <div className="container-content">
          <div className="flex items-center justify-center gap-4">
            <span className="h-px max-w-xs flex-1 bg-gradient-to-r from-transparent to-gold/45" />
            <span className="h-2 w-2 rotate-45 rounded-[1px] bg-gold/70 ring-4 ring-gold/10" />
            <span className="h-px max-w-xs flex-1 bg-gradient-to-l from-transparent to-gold/45" />
          </div>
        </div>
      </div>

      <CTASection bgClassName="bg-cream" />
    </>
  );
}
