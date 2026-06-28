'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Révèle son contenu en fondu/translation quand il entre dans le viewport.
 * `delay` en ms pour échelonner les apparitions.
 */
export default function Reveal({
  children,
  delay = 0,
  className = '',
  as: Tag = 'div',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Mouvement réduit : on affiche immédiatement, sans animation.
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
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const Component = Tag;

  return (
    <Component
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ease-out ${
        visible
          ? 'translate-y-0 scale-100 opacity-100 blur-0'
          : 'translate-y-8 scale-[0.985] opacity-0 blur-[2px]'
      } ${className}`}
    >
      {children}
    </Component>
  );
}
