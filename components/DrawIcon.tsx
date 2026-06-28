'use client';

import { useEffect, useRef } from 'react';

/**
 * Trace un picto SVG (paths) à l'entrée dans le viewport : chaque tracé se
 * dessine de 0 à sa longueur réelle (mesurée via getTotalLength), puis le
 * remplissage éventuel apparaît. Respecte `prefers-reduced-motion` : le picto
 * est alors affiché d'emblée, sans animation.
 */
export default function DrawIcon({
  children,
  className = '',
  delay = 0,
  size = 22,
}: {
  children: React.ReactNode;
  className?: string;
  /** Retard avant le tracé, en ms (pour échelonner avec les cartes). */
  delay?: number;
  size?: number;
}) {
  const ref = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const paths = Array.from(svg.querySelectorAll<SVGGeometryElement>('path'));

    // État initial : tracés masqués (sauf mouvement réduit).
    if (!reduce) {
      paths.forEach((p) => {
        const len = p.getTotalLength();
        p.style.strokeDasharray = `${len}`;
        p.style.strokeDashoffset = `${len}`;
      });
    }

    const play = () => {
      paths.forEach((p, i) => {
        p.style.transition = `stroke-dashoffset 900ms cubic-bezier(.22,.61,.36,1) ${
          delay + i * 140
        }ms`;
        p.style.strokeDashoffset = '0';
      });
    };

    if (reduce) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          play();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(svg);
    return () => io.disconnect();
  }, [delay]);

  return (
    <svg
      ref={ref}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}
