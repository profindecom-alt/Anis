'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Affiche un mot dans une police manuscrite et l'« écrit » au stylo lorsqu'il
 * entre dans le viewport : le tracé se révèle de gauche à droite tandis qu'un
 * stylo (image) suit le point d'écriture. L'apparence (durée, taille du stylo,
 * calage du nib) est pilotée par les variables CSS de `.handwriting`
 * (voir globals.css). Respecte `prefers-reduced-motion`.
 *
 * L'image du stylo est dans `public/` (défaut : `/images/pen.webp`), nib
 * (pointe) orienté en bas à gauche.
 */
export default function HandwritingWord({
  children,
  className = '',
  penSrc = '/images/pen.webp',
}: {
  children: React.ReactNode;
  className?: string;
  penSrc?: string;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [writing, setWriting] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReduced) {
      setWriting(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setWriting(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      className={`handwriting font-script ${className}`}
      data-writing={writing}
    >
      <span className="handwriting-ink">{children}</span>
      {/* Stylo décoratif, masqué des lecteurs d'écran. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={penSrc} alt="" aria-hidden="true" className="handwriting-pen" />
    </span>
  );
}
