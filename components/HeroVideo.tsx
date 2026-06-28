'use client';

import { useEffect, useRef } from 'react';

/**
 * Vidéo de fond du héro d'accueil : lecture automatique, muette, en boucle.
 * Respecte `prefers-reduced-motion` : si l'utilisateur préfère limiter les
 * animations, la vidéo reste en pause et seule l'image d'attente est visible.
 */
export default function HeroVideo({
  src,
  poster,
}: {
  src: string;
  poster?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (reduce) {
      video.pause();
      return;
    }
    // La lecture auto peut être refusée par le navigateur : on l'ignore
    // silencieusement (l'image d'attente reste affichée).
    void video.play().catch(() => {});
  }, []);

  return (
    <div className="absolute inset-0 bg-forest-dark">
      <video
        ref={ref}
        className="h-full w-full object-cover"
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-hidden="true"
      />
    </div>
  );
}
