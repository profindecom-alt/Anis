import Reveal from './Reveal';
import SectionHeading from './SectionHeading';
import ExpertisesVideoBg from './ExpertisesVideoBg';
import { faqJsonLd } from '@/lib/seo';
import type { FaqItem } from './FaqSection';

/**
 * Section « Questions fréquentes » des pages expertise, posée sur le fond bleu
 * animé de la marque (mêmes halos que les sections « Bénéfices clés » / « Pour
 * qui »). Accordéon natif (`<details>`) décliné en tons crème/or pour rester
 * lisible sur le bleu profond. Émet aussi le balisage FAQPage (JSON-LD).
 *
 * Une vidéo de fond optionnelle (pilotée depuis Sanity) peut être jouée derrière
 * le voile bleu : `videoUrl` non nul l'active ; le voile (`.expertises__tint`)
 * est conservé pour garder l'identité bleue et la lisibilité, et les halos
 * animés sont alors masqués (la vidéo apporte déjà le mouvement).
 */
export default function ExpertiseFaqSection({
  items,
  videoUrl = null,
  posterUrl = null,
}: {
  items: FaqItem[];
  videoUrl?: string | null;
  posterUrl?: string | null;
}) {
  if (!items?.length) return null;

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        backgroundColor: '#0c2350',
        backgroundImage:
          'radial-gradient(120% 100% at 50% -10%, #1b4a8f 0%, #102f62 45%, #0a1d40 100%)',
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(items)) }}
      />
      {videoUrl ? (
        /* Vidéo de fond (pilotée Sanity) + voile bleu conservé par-dessus. */
        <>
          <ExpertisesVideoBg videoUrl={videoUrl} posterUrl={posterUrl} />
          <div className="expertises__tint" aria-hidden="true" />
        </>
      ) : (
        /* Fond bleu animé : halos qui dérivent (globals.css). */
        <div className="expertises__aurora" aria-hidden="true">
          <span className="expertises__blob expertises__blob--1" />
          <span className="expertises__blob expertises__blob--2" />
          <span className="expertises__blob expertises__blob--3" />
        </div>
      )}

      <div className="container-content relative z-[1]">
        <SectionHeading
          eyebrow="Questions fréquentes"
          light
          align="center"
          title="Vos questions, nos réponses"
          intro="L’essentiel à savoir sur cette expertise."
          className="mb-8 md:mb-10"
        />

        <div className="mx-auto max-w-3xl border-t border-cream/15">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 80}>
              <details className="faq-item group border-b border-cream/15">
                <summary className="flex cursor-pointer list-none items-start justify-between gap-5 py-4 [&::-webkit-details-marker]:hidden">
                  <span className="flex items-start gap-4">
                    <span className="mt-1.5 font-sans text-xs font-semibold tracking-widest text-gold/70 transition-colors group-open:text-gold">
                      0{i + 1}
                    </span>
                    <span className="font-serif text-lg font-semibold leading-snug text-cream transition-colors group-hover:text-gold-light md:text-xl">
                      {item.q}
                    </span>
                  </span>
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 group-hover:border-gold/60 group-open:rotate-45 group-open:border-gold group-open:bg-gold group-open:text-forest-dark">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path
                        d="M7 1v12M1 7h12"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="faq-answer overflow-hidden">
                  <p className="pb-5 pl-9 pr-4 text-[15px] leading-relaxed text-cream/70 md:pr-10">
                    {item.a}
                  </p>
                </div>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
