'use client';

import { useEffect, useRef } from 'react';

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

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      video.pause();
      return;
    }
    // La lecture auto peut être refusée par le navigateur : on l'ignore
    // (le poster reste affiché).
    void video.play().catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      className="expertises__video"
      src={videoUrl}
      poster={posterUrl ?? undefined}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      aria-hidden="true"
    />
  );
}
