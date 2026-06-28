'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Reveal from './Reveal';

/**
 * Bandeau vidéo « ambiance » de la page d'accueil (après « Nos expertises »).
 * Vidéo plein cadre en lecture automatique, muette et en boucle, surmontée d'un
 * voile dégradé pour la lisibilité, d'un surtitre, d'un titre et d'un bouton.
 *
 * Respecte `prefers-reduced-motion` : la vidéo reste en pause (seul le poster
 * est visible). Si aucune vidéo n'est fournie, le poster sert de fond statique.
 * Contenu piloté depuis Sanity (lib/homeVideo).
 */
export default function VideoBandSection({
  videoUrl,
  posterUrl,
  eyebrow,
  title,
  ctaLabel,
  ctaHref,
}: {
  videoUrl?: string | null;
  posterUrl?: string | null;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
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
    <section className="relative flex min-h-[32rem] items-center overflow-hidden bg-[#241a05] md:min-h-[40rem]">
      {videoUrl ? (
        <video
          ref={ref}
          className="absolute inset-0 h-full w-full object-cover"
          src={videoUrl}
          poster={posterUrl ?? undefined}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          aria-hidden="true"
        />
      ) : posterUrl ? (
        <Image
          src={posterUrl}
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover"
        />
      ) : null}

      {/* Voile bronze chaud : sombre à gauche (lisibilité du texte), dégradé
          doré qui s'éclaircit vers la droite. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(100deg, rgba(38,27,6,0.92) 0%, rgba(62,46,12,0.55) 48%, rgba(62,46,12,0.12) 100%)',
        }}
      />
      {/* Halo doré + profondeur basse, pour une dominante « or » assumée. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 110% at 82% 22%, rgba(255,184,28,0.22) 0%, rgba(255,184,28,0) 55%), linear-gradient(to top, rgba(30,21,4,0.66) 0%, rgba(30,21,4,0) 58%, rgba(30,21,4,0.22) 100%)',
        }}
      />
      {/* Liserés « néon » dorés sur les deux bords (haut + bas) : fin trait
          lumineux à halo doux, estompé sur les côtés. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        style={{ boxShadow: '0 0 6px rgba(255,184,28,0.75), 0 0 14px rgba(255,184,28,0.4)' }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
        style={{ boxShadow: '0 0 6px rgba(255,184,28,0.75), 0 0 14px rgba(255,184,28,0.4)' }}
      />

      <div className="container-content relative py-20 md:py-28">
        <Reveal className="max-w-xl">
          {eyebrow && (
            <span className="eyebrow eyebrow-light mb-5">{eyebrow}</span>
          )}
          {title && (
            <h2 className="text-balance font-serif text-3xl font-semibold leading-[1.1] text-cream md:text-[2.8rem]">
              {title}
            </h2>
          )}
          {ctaLabel && ctaHref && (
            <Link href={ctaHref} className="btn-gold mt-9">
              {ctaLabel}
            </Link>
          )}
        </Reveal>
      </div>
    </section>
  );
}
