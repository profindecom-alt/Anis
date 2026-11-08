'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { useDeferredVideo } from './useDeferredVideo';

/**
 * Vidéo de fond de la section « Nos expertises » (plein cadre, muette, en
 * boucle). Reste derrière le voile bleu de la section. Respecte
 * `prefers-reduced-motion` : la vidéo est mise en pause (seul le poster reste
 * visible). Contenu piloté depuis Sanity (lib/homeExpertisesVideo).
 */
export default function ExpertisesVideoBg({
  videoUrl,
  posterUrl,
}: {
  videoUrl: string;
  posterUrl?: string | null;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const shouldLoad = useDeferredVideo(ref);

  return (
    <>
      {posterUrl && (
        <Image
          src={posterUrl}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="expertises__video"
        />
      )}
      <video
        ref={ref}
        className="expertises__video"
        src={shouldLoad ? videoUrl : undefined}
        autoPlay={shouldLoad}
        muted
        loop
        playsInline
        preload="none"
        aria-hidden="true"
      />
    </>
  );
}
