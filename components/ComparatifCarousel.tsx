'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const comparison = [
  {
    feature: 'Architecture de produits',
    us: 'Ouverte sur tout le marché',
    usDetail:
      'Nous sélectionnons les meilleurs supports disponibles, toutes maisons confondues, sans contrainte de référencement ni quota commercial.',
    them: 'Limitée aux produits maison',
    themDetail:
      'Le conseiller bancaire ne peut proposer que les fonds et contrats de son groupe.',
  },
  {
    feature: 'Intérêt servi',
    us: 'Le vôtre, avant tout',
    usDetail:
      'Notre rémunération est transparente et déconnectée des volumes placés. Votre rendement passe avant le nôtre.',
    them: 'Les objectifs commerciaux',
    themDetail:
      'Les conseillers bancaires ont des objectifs de collecte trimestriels qui orientent leurs recommandations.',
  },
  {
    feature: 'Interlocuteur',
    us: 'Unique, du début à la fin',
    usDetail:
      'Vous connaissez le nom de votre conseiller. Il connaît votre situation dans le détail et ne change pas.',
    them: 'Variable, par rotation',
    themDetail:
      'Les mutations internes génèrent en moyenne un changement de conseiller tous les 2 à 3 ans.',
  },
  {
    feature: 'Transparence des frais',
    us: 'Complète et expliquée',
    usDetail:
      'Chaque frais est détaillé, motivé et mis en regard de la valeur créée. Aucune ligne cachée.',
    them: 'Partielle',
    themDetail:
      'Les rétrocessions et frais indirects sont rarement mis en avant lors des souscriptions.',
  },
  {
    feature: 'Horizon du conseil',
    us: 'Votre projet de vie',
    usDetail:
      'Retraite, transmission, résidence principale : votre cap personnel structure chaque décision patrimoniale.',
    them: 'Les campagnes du trimestre',
    themDetail:
      'Les priorités commerciales changent tous les trimestres et influencent les recommandations.',
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

      {/* Banque classique — réponse en retrait */}
      <div className="mt-auto px-1 opacity-60 transition-opacity duration-500 group-hover:opacity-80">
        <div className="mb-2 flex items-center gap-2">
          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5">
            <XIcon className="h-2.5 w-2.5 text-cream/40" />
          </span>
          <span className="text-[0.6rem] font-semibold uppercase tracking-[0.2em] text-cream/40">Banque classique</span>
        </div>
        <p className="mb-1 text-sm leading-snug text-cream/55">{row.them}</p>
        <p className="text-xs leading-relaxed text-cream/30">{row.themDetail}</p>
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
        <div className="flex items-center gap-2.5" aria-hidden="true">
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
