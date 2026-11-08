'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export interface HeroImage {
  /** URL prête à l'emploi (image locale `/images/...` ou CDN Sanity). */
  src: string;
  alt: string;
}

/**
 * Fond du hero composé de plusieurs images qui s'enchaînent en fondu doux
 * (même esthétique que les transitions au survol du site), avec un léger
 * zoom « Ken Burns ». Rotation automatique, pause au survol, puces cliquables.
 * Respecte `prefers-reduced-motion` (affiche alors la première image, figée).
 */
export default function HeroSlideshow({
  images,
  interval = 6000,
}: {
  images: HeroImage[];
  interval?: number;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // N'instancie les images que lorsqu'elles sont (ou vont être) affichées :
  // la 1re au chargement, les suivantes au fil du défilement. Évite de
  // télécharger les 4 visuels du hero au premier rendu (gain LCP).
  const [mounted, setMounted] = useState<Set<number>>(() => new Set([0]));

  useEffect(() => {
    if (images.length <= 1) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    // Laisser passer la fenêtre LCP avant de précharger la diapositive suivante,
    // tout en lui donnant le temps d'arriver avant la première transition.
    const timer = window.setTimeout(() => {
      setMounted((prev) => {
        const next = new Set(prev);
        next.add((active + 1) % images.length);
        return next;
      });
    }, Math.max(3000, interval - 1500));

    return () => window.clearTimeout(timer);
  }, [active, images.length, interval]);

  useEffect(() => {
    if (images.length <= 1 || paused) return;
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return;

    const timer = window.setTimeout(() => {
      const next = (active + 1) % images.length;
      setMounted((prev) => new Set(prev).add(next));
      setActive(next);
    }, interval);
    return () => window.clearTimeout(timer);
  }, [active, images.length, interval, paused]);

  const showSlide = (index: number) => {
    setMounted((prev) => new Set(prev).add(index));
    setActive(index);
  };

  return (
    <div
      className="absolute inset-0 bg-forest-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {images.map((image, i) => (
        <div
          key={`${image.src}-${i}`}
          aria-hidden={i !== active}
          className={`absolute inset-0 transition-opacity duration-[1200ms] ease-out ${
            i === active ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {mounted.has(i) && (
            <Image
              src={image.src}
              alt={i === 0 ? image.alt : ''}
              fill
              priority={i === 0}
              sizes="100vw"
              className={`object-cover transition-transform ease-out ${
                i === active ? 'scale-110' : 'scale-100'
              }`}
              style={{ transitionDuration: '8000ms' }}
            />
          )}
        </div>
      ))}

      {/* Puces de navigation */}
      {images.length > 1 && (
        <div className="absolute bottom-24 right-6 z-20 flex items-center gap-2.5 md:right-10">
          {images.map((image, i) => (
            <button
              key={`${image.src}-${i}`}
              type="button"
              onClick={() => showSlide(i)}
              aria-label={`Afficher l'image ${i + 1} sur ${images.length}`}
              aria-current={i === active ? 'true' : undefined}
              className={`h-2 rounded-full transition-all duration-500 ${
                i === active
                  ? 'w-7 bg-gold'
                  : 'w-2 bg-cream/40 hover:bg-cream/70'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
