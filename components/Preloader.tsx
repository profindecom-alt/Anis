'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Écran d'accueil (preloader) affiché au premier chargement du site.
 * Écusson « élan » centré sur fond bleu nuit, wordmark, et une fine barre de
 * progression dorée qui défile, puis disparition en fondu une fois la page prête.
 *
 * Le voile s'affiche une seule fois par session (sessionStorage) pour ne pas
 * gêner la navigation interne. Il respecte « prefers-reduced-motion » : pas
 * d'animation, durée minimale réduite.
 */
export default function Preloader() {
  // `null` tant qu'on n'a pas décidé côté client si on doit l'afficher,
  // afin d'éviter tout flash côté serveur (le composant ne rend rien au SSR).
  const [show, setShow] = useState<boolean | null>(null);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    // Déjà vu pendant cette session : on n'affiche rien.
    if (sessionStorage.getItem('elan:preloaded') === '1') {
      setShow(false);
      return;
    }

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setShow(true);
    // On verrouille le défilement pendant l'affichage du voile.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const minDuration = reduce ? 400 : 1400; // durée d'affichage minimale
    const fadeDuration = reduce ? 200 : 600; // durée du fondu de sortie
    const start = performance.now();

    let fadeTimer: ReturnType<typeof setTimeout>;
    let removeTimer: ReturnType<typeof setTimeout>;

    const finish = () => {
      const elapsed = performance.now() - start;
      const wait = Math.max(0, minDuration - elapsed);
      fadeTimer = setTimeout(() => {
        setLeaving(true);
        removeTimer = setTimeout(() => {
          setShow(false);
          document.body.style.overflow = previousOverflow;
          sessionStorage.setItem('elan:preloaded', '1');
        }, fadeDuration);
      }, wait);
    };

    if (document.readyState === 'complete') {
      finish();
    } else {
      window.addEventListener('load', finish, { once: true });
    }

    return () => {
      window.removeEventListener('load', finish);
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (!show) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center overflow-hidden bg-forest transition-all duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)] ${
        leaving
          ? 'pointer-events-none scale-[1.04] opacity-0 blur-[6px]'
          : 'scale-100 opacity-100 blur-0'
      }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Écusson : apparition douce, sans animation en boucle. */}
        <Image
          src="/logos/icon-gold.svg"
          alt=""
          width={320}
          height={320}
          priority
          className="h-36 w-36 motion-safe:animate-[preloader-in_0.9s_ease-out_both] md:h-44 md:w-44"
        />

        {/* Wordmark : fondu doux. */}
        <span className="font-serif text-xs uppercase tracking-[0.42em] text-cream/80 motion-safe:animate-[preloader-in_0.9s_ease-out_0.1s_both] md:text-sm">
          Élan&nbsp;Patrimoine
        </span>

        {/* Barre de progression dorée qui défile une fois le wordmark posé. */}
        <span className="relative h-[3px] w-44 overflow-hidden rounded-full bg-cream/10">
          <span className="absolute inset-y-0 left-0 w-1/3 rounded-full bg-gold motion-safe:animate-[preloader-bar_1.3s_ease-in-out_infinite] motion-reduce:w-full" />
        </span>
      </div>

      <style jsx>{`
        @keyframes preloader-in {
          0% {
            opacity: 0;
            transform: translateY(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes preloader-bar {
          0% {
            left: -35%;
          }
          100% {
            left: 100%;
          }
        }
      `}</style>
    </div>
  );
}
