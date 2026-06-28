import Link from 'next/link';
import { expertises } from '@/lib/site';
import Reveal from './Reveal';
import ExpertisesVideoBg from './ExpertisesVideoBg';

/**
 * Section « Nos expertises » (design handoff « Élan »).
 * Fond navy texturé (halo or + courbes ascendantes rappelant la flèche du
 * logo), trois cartes « Pilier » avec badge-icône doré. Les styles vivent
 * dans globals.css (.expertises / .pillar) ; le fond utilise
 * /elan-texture.svg. Polices mappées sur celles du projet (Cormorant + Inter).
 */

// Géométrie d'icônes reprise telle quelle du handoff (01 croissance,
// 02 balance / cadre légal, 03 bouclier + coche / protection).
const pillarIcons = [
  <svg key="growth" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 27 H27" />
    <path d="M6 22 L13 15 L18 19 L26 9" />
    <path d="M21 9 L26 9 L26 14" />
  </svg>,
  <svg key="balance" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="16" cy="5.6" r="1.3" />
    <path d="M16 6.9 V26" />
    <path d="M9 26 H23" />
    <path d="M6 11 H26" />
    <path d="M6 11 V13.6" />
    <path d="M2 13.6 a4 4 0 0 0 8 0" />
    <path d="M26 11 V13.6" />
    <path d="M22 13.6 a4 4 0 0 0 8 0" />
  </svg>,
  <svg key="shield" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 4 L26 7.5 V16 C26 22 21.5 25.5 16 28 C10.5 25.5 6 22 6 16 V7.5 Z" />
    <path d="M11.5 16 L15 19.5 L21 12.5" />
  </svg>,
];

export default function ExpertisesSection({
  videoUrl,
  posterUrl,
}: {
  videoUrl?: string | null;
  posterUrl?: string | null;
} = {}) {
  const items = expertises.slice(0, 3);

  return (
    <section className={`expertises${videoUrl ? ' expertises--video' : ''}`}>
      {/* Vidéo de fond optionnelle (pilotée Sanity), surmontée d'un voile bleu
          pour conserver l'identité de la section et la lisibilité du texte. */}
      {videoUrl && (
        <>
          <ExpertisesVideoBg videoUrl={videoUrl} posterUrl={posterUrl} />
          <div className="expertises__tint" aria-hidden="true" />
        </>
      )}

      {/* Fond bleu animé : grands halos bleus flous qui dérivent et
          respirent lentement sous le contenu (styles dans globals.css). */}
      <div className="expertises__aurora" aria-hidden="true">
        <span className="expertises__blob expertises__blob--1" />
        <span className="expertises__blob expertises__blob--2" />
        <span className="expertises__blob expertises__blob--3" />
      </div>

      <div className="expertises__wrap">
        <div className="expertises__head">
          <Reveal>
            <p className="expertises__eyebrow">Nos expertises</p>
            <h2 className="expertises__title">
              Trois piliers, une vision d&apos;ensemble
            </h2>
            <p className="expertises__lede">
              Chaque expertise se déploie au sein d&apos;une stratégie globale et
              cohérente.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Link className="expertises__cta" href="/nos-expertises">
              Toutes nos expertises
            </Link>
          </Reveal>
        </div>

        <div className="expertises__grid">
          {items.map((e, i) => (
            <Reveal key={e.slug} delay={i * 110}>
              <article className="pillar">
                <span className="pillar__icon" aria-hidden="true">
                  {pillarIcons[i]}
                </span>
                <p className="pillar__label">Pilier {e.pillar}</p>
                <h3 className="pillar__title">{e.title}</h3>
                <p className="pillar__text">{e.excerpt}</p>
                <Link className="pillar__more" href={`/nos-expertises/${e.slug}`}>
                  En savoir plus
                  <svg width="18" height="10" viewBox="0 0 18 10" fill="none" aria-hidden="true">
                    <path d="M1 5h15M12 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
