'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Dessine un cadre (filet) à l'entrée dans le viewport : les bordures se
 * tracent depuis le coin supérieur gauche, le haut puis le côté droit, etc.,
 * via un clip-path qui s'ouvre. Pensé pour habiller un visuel encadré.
 * Respecte `prefers-reduced-motion` (affiché d'emblée).
 */
export default function FrameDraw({
  children,
  className = '',
  delay = 0,
}: {
  children: React.ReactNode;
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
      { threshold: 0.3 }
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
        clipPath: drawn
          ? 'inset(0 0 0 0)'
          : 'inset(0 100% 100% 0)',
      }}
      className={`pointer-events-none transition-[clip-path] duration-[1100ms] ease-out ${className}`}
    >
      {children}
    </span>
  );
}
