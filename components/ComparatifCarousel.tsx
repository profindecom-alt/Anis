'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const comparison = [
  {
    feature: 'Sélection des solutions',
    us: 'Un périmètre expliqué',
    usDetail:
      'Les solutions étudiées dépendent de votre besoin, de leur disponibilité et du cadre de notre mission. Les critères de sélection vous sont présentés.',
    check: 'Univers réellement comparé',
    checkDetail:
      'Demandez quelles solutions ont été examinées, auprès de quels fournisseurs et pourquoi la proposition retenue paraît adaptée.',
  },
  {
    feature: 'Rémunération',
    us: 'Présentée avant l’engagement',
    usDetail:
      'Les honoraires, commissions éventuelles et principaux conflits d’intérêts sont expliqués dans les documents applicables.',
    check: 'Coût total et conflits',
    checkDetail:
      'Vérifiez la nature de chaque rémunération, son montant ou son mode de calcul, ainsi que son incidence sur la recommandation.',
  },
  {
    feature: 'Interlocuteur',
    us: 'Un contact identifié',
    usDetail:
      'Vous savez qui suit votre dossier et comment joindre le cabinet. Les éléments utiles sont documentés pour assurer la continuité du suivi.',
    check: 'Organisation du suivi',
    checkDetail:
      'Demandez qui sera votre contact, à quelle fréquence votre situation sera revue et comment la continuité est organisée en cas d’absence.',
  },
  {
    feature: 'Transparence des frais',
    us: 'Détaillée avant décision',
    usDetail:
      'Les frais connus du conseil, des enveloppes et des supports sont présentés afin d’éclairer le coût global de la solution.',
    check: 'Ensemble des coûts',
    checkDetail:
      'Comparez les frais ponctuels et récurrents, directs et indirects, ainsi que leur effet cumulé sur la durée envisagée.',
  },
  {
    feature: 'Horizon du conseil',
    us: 'Votre situation et vos objectifs',
    usDetail:
      'La recommandation tient compte des objectifs exprimés, de l’horizon, des risques, des contraintes et des informations recueillies.',
    check: 'Actualisation dans le temps',
    checkDetail:
      'Précisez la fréquence des points de suivi et les événements qui doivent conduire à réexaminer la stratégie.',
  },
];

/** Coche (Élan) et croix (réseau) du comparatif. */
function CheckIcon({ className = 'text-gold w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M20 6 9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon({ className = 'text-cream/30 w-4 h-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BentoCard({ row }: { row: typeof comparison[0] }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cream/[0.08] bg-gradient-to-b from-white/[0.045] to-white/[0.01] p-6 transition-all duration-500 hover:border-gold/30 hover:bg-white/[0.06] hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.6)] md:p-7">
      {/* Filet doré supérieur révélé au survol */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold to-gold-light transition-transform duration-500 group-hover:scale-x-100"
      />
      {/* Intitulé du critère */}
      <h3 className="mb-6 font-serif text-lg leading-snug text-cream md:text-xl">{row.feature}</h3>

      {/* Élan — réponse mise en avant dans un panneau doré */}
      <div className="rounded-xl border border-gold/20 bg-gold/[0.05] p-4 transition-colors duration-500 group-hover:border-gold/30 group-hover:bg-gold/[0.07]">
        <div className="mb-2.5 flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold/15 border border-gold/30">
            <CheckIcon className="h-2.5 w-2.5 text-gold" />
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-gold">Élan Patrimoine</span>
        </div>
        <p className="mb-1.5 text-[0.95rem] font-medium leading-snug text-cream">{row.us}</p>
        <p className="text-xs leading-relaxed text-cream/50">{row.usDetail}</p>
      </div>

      {/* Séparateur « vs » */}
      <div className="my-4 flex items-center gap-3" aria-hidden="true">
        <span className="h-px flex-1 bg-cream/10" />
        <span className="text-[0.55rem] uppercase tracking-[0.25em] text-cream/30">vs</span>
        <span className="h-px flex-1 bg-cream/10" />
      </div>

      {/* Point de vigilance neutre — sans allégation sur un concurrent. */}
      <div className="mt-auto px-1 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
            <XIcon className="h-2.5 w-2.5 text-cream/40" />
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">À vérifier dans toute offre</span>
        </div>
        <p className="mb-1 text-sm leading-snug text-cream/55">{row.check}</p>
        <p className="text-xs leading-relaxed text-cream/30">{row.checkDetail}</p>
      </div>
    </article>
  );
}

function ArrowIcon({ dir }: { dir: 'prev' | 'next' }) {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true" className={dir === 'prev' ? 'rotate-180' : ''}>
      <path d="M1 7h15M11 1l5 6-5 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ComparatifCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  // Largeur d'une carte (+ gap) pour défiler d'un élément à la fois.
  const stepSize = useCallback(() => {
    const track = trackRef.current;
    if (!track) return 0;
    const first = track.firstElementChild as HTMLElement | null;
    if (!first) return 0;
    const gap = parseFloat(getComputedStyle(track).columnGap || '0') || 0;
    return first.offsetWidth + gap;
  }, []);

  const scrollByDir = (dir: 'prev' | 'next') => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollBy({ left: dir === 'next' ? stepSize() : -stepSize(), behavior: 'smooth' });
  };

  const goTo = (i: number) => {
    const track = trackRef.current;
    if (!track) return;
    track.scrollTo({ left: i * stepSize(), behavior: 'smooth' });
  };

  // Met à jour la puce active en fonction du défilement.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const step = stepSize() || 1;
        setActive(Math.round(track.scrollLeft / step));
      });
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      track.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [stepSize]);

  return (
    <div>
      {/* Piste défilante avec accroche (scroll-snap) */}
      <div
        ref={trackRef}
        className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:mx-0 md:px-0"
      >
        {comparison.map((row) => (
          <div
            key={row.feature}
            className="w-[85%] shrink-0 snap-start sm:w-[46%] lg:w-[31.5%]"
          >
            <BentoCard row={row} />
          </div>
        ))}
      </div>

      {/* Contrôles : flèches dorées + puces */}
      <div className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          {comparison.map((row, i) => (
            <button
              key={row.feature}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Aller au critère ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === active ? 'w-7 bg-gold' : 'w-1.5 bg-cream/25 hover:bg-cream/50'
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => scrollByDir('prev')}
            aria-label="Critère précédent"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:border-gold/60 hover:text-gold"
          >
            <ArrowIcon dir="prev" />
          </button>
          <button
            type="button"
            onClick={() => scrollByDir('next')}
            aria-label="Critère suivant"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 text-cream/70 transition-all duration-300 hover:border-gold/60 hover:text-gold"
          >
            <ArrowIcon dir="next" />
          </button>
        </div>
      </div>
    </div>
  );
}
