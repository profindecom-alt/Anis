'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useDeferredVideo } from './useDeferredVideo';

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
  // On mobile, keep the optimized poster: a decorative multi-megabyte video
  // should never compete with the heading for bandwidth or LCP.
  const shouldLoad = useDeferredVideo(ref, {
    desktopOnly: true,
    rootMargin: '0px',
    delayMs: 250,
    // The poster is the initial hero. Fetch the 6+ MB decorative motion only
    // after a genuine desktop interaction, with a late fallback for users who
    // remain on the hero without moving the pointer.
    requireInteraction: true,
    interactionFallbackMs: 30000,
  });

  return (
    <div className="absolute inset-0 bg-forest-dark">
      {poster && (
        <Image
          src={poster}
          alt=""
          aria-hidden="true"
          fill
          priority
          sizes="100vw"
          quality={65}
          className="object-cover"
        />
      )}
      <video
        ref={ref}
        className="relative h-full w-full object-cover"
        src={shouldLoad ? src : undefined}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </div>
  );
}
