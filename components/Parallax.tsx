'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Effet de parallaxe vertical, doux et borné, pour donner de la profondeur
 * aux visuels. Le contenu (typiquement une <Image fill>) est légèrement
 * agrandi pour qu'aucun bord n'apparaisse pendant le déplacement.
 * Désactivé si `prefers-reduced-motion` est actif.
 */
export default function Parallax({
  children,
  speed = 0.12,
  className = '',
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const max = rect.height * 0.08; // amplitude bornée pour éviter les bords
      setY(Math.max(-max, Math.min(max, -center * speed)));
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="relative h-full w-full"
        style={{ transform: `translate3d(0, ${y}px, 0) scale(1.18)`, willChange: 'transform' }}
      >
        {children}
      </div>
    </div>
  );
}
