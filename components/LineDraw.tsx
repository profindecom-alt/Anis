'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Trace un filet horizontal (scaleX 0 → 1, depuis la gauche) à l'entrée dans
 * le viewport. Pensé pour les règles éditoriales (séparateurs dorés).
 * Respecte `prefers-reduced-motion` (affiché d'emblée).
 */
export default function LineDraw({
  className = '',
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setDrawn(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrawn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <span
      ref={ref}
      aria-hidden="true"
      style={{
        transitionDelay: `${delay}ms`,
        transform: drawn ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left',
      }}
      className={`block origin-left transition-transform duration-700 ease-out ${className}`}
    />
  );
}
