'use client';

import { useEffect, useRef, useState } from 'react';
import { values } from '@/lib/site';

const romans = ['I', 'II', 'III', 'IV'];

/**
 * Grille « registre » des valeurs du cabinet, animée à l'entrée dans le
 * viewport : chaque cellule glisse depuis sa colonne, son numéral romain
 * s'échelonne, et un filet doré se trace sous lui.
 */
export default function ValuesGrid() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="grid gap-px overflow-hidden rounded-2xl border border-gold/20 bg-gold/20 sm:grid-cols-2"
    >
      {values.map((v, i) => {
        // Cascade diagonale : colonne (i % 2) + rangée (i / 2).
        const col = i % 2;
        const cardDelay = i * 120;
        return (
          <div
            key={v.title}
            style={{ transitionDelay: `${cardDelay}ms` }}
            className={`group relative overflow-hidden bg-[#0e2143] p-8 transition-[opacity,transform,background-color] duration-700 ease-out hover:bg-[#13315c] md:p-10 ${
              visible
                ? 'translate-x-0 translate-y-0 opacity-100'
                : `${col === 0 ? '-translate-x-6' : 'translate-x-6'} translate-y-6 opacity-0`
            }`}
          >
            {/* Voile doré qui balaie la cellule à l'apparition */}
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${cardDelay + 120}ms` }}
              className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-gold/[0.08] via-transparent to-transparent transition-opacity duration-1000 ease-out ${
                visible ? 'opacity-0' : 'opacity-100'
              }`}
            />

            <div className="relative flex items-baseline gap-5">
              <span
                style={{ transitionDelay: `${cardDelay + 160}ms` }}
                className={`font-serif text-[2.6rem] italic leading-none text-gold/60 transition-all duration-700 ease-out group-hover:text-gold md:text-5xl ${
                  visible
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-3 opacity-0'
                }`}
              >
                {romans[i]}
              </span>
              <h3 className="font-serif text-xl font-semibold text-cream md:text-[1.55rem]">
                {v.title}
              </h3>
            </div>

            {/* Filet doré qui se trace sous le numéral */}
            <span
              aria-hidden="true"
              style={{ transitionDelay: `${cardDelay + 320}ms` }}
              className={`mt-5 block h-px origin-left bg-gradient-to-r from-gold/60 to-transparent transition-transform duration-700 ease-out md:ml-[3.9rem] ${
                visible ? 'scale-x-100' : 'scale-x-0'
              }`}
            />

            <p
              style={{ transitionDelay: `${cardDelay + 260}ms` }}
              className={`relative mt-4 max-w-md text-sm leading-relaxed text-cream/55 transition-all duration-700 ease-out md:pl-[3.9rem] ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
              }`}
            >
              {v.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}
