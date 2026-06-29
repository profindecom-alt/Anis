'use client';

import { useEffect, useLayoutEffect, useRef } from 'react';

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

// useLayoutEffect côté client (remise à 0 avant le 1er rendu peint, pour éviter
// le flash « valeur finale → 0 »), mais useEffect côté serveur afin de ne pas
// déclencher l'avertissement SSR de React.
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

function countUp(el: HTMLElement, target: number, duration: number) {
  let start: number | undefined;
  const frame = (ts: number) => {
    if (start === undefined) start = ts;
    const p = Math.min(1, (ts - start) / duration);
    el.textContent = String(Math.round(easeOutCubic(p) * target));
    if (p < 1) requestAnimationFrame(frame);
    else el.textContent = String(target);
  };
  requestAnimationFrame(frame);
}

export default function HeroStats() {
  const yearsRef = useRef<HTMLSpanElement>(null);
  const pctRef = useRef<HTMLSpanElement>(null);
  const played = useRef(false);

  useIsomorphicLayoutEffect(() => {
    if (played.current) return;
    played.current = true;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Avant le premier rendu peint : on remet les compteurs à 0. Sans cela, la
    // valeur finale issue du SSR s'affiche d'abord, puis « recule » vers 0 au
    // démarrage de l'animation — un flash visible, surtout sur appareils lents.
    if (yearsRef.current) yearsRef.current.textContent = '0';
    if (pctRef.current) pctRef.current.textContent = '0';

    // Start after hero entrance animations settle (~800 ms)
    const t = setTimeout(() => {
      if (yearsRef.current) countUp(yearsRef.current, 8, 1100);
      if (pctRef.current) countUp(pctRef.current, 100, 1500);
    }, 820);

    return () => clearTimeout(t);
  }, []);

  return (
    <dl className="grid grid-cols-3 divide-x divide-cream/15 border-t border-cream/15 py-5 md:py-6">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <dt className="font-serif text-3xl font-medium text-gold sm:text-4xl">
          <span ref={yearsRef} className="inline-block tabular-nums">8</span> ans
        </dt>
        <dd className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/55 sm:text-[11px]">
          d&apos;expérience
        </dd>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <dt className="font-serif text-3xl font-medium text-gold sm:text-4xl">
          <span ref={pctRef} className="inline-block min-w-[3ch] text-right tabular-nums">100</span>&nbsp;%
        </dt>
        <dd className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/55 sm:text-[11px]">
          Indépendant
        </dd>
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <dt className="font-serif text-3xl font-medium text-gold sm:text-4xl">
          ORIAS
        </dt>
        <dd className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/55 sm:text-[11px]">
          Immatriculé
        </dd>
      </div>
    </dl>
  );
}
