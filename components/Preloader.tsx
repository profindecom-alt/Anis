'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

/**
 * Écran d'accueil (preloader) affiché au premier chargement du site.
 * Voile crème centré sur l'écusson « élan », avec un fin trait doré qui se
 * remplit, puis disparition en fondu une fois la page prête.
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
      <div className="relative flex flex-col items-center gap-6">
        {/* Écusson : apparition douce, sans animation en boucle. */}
        <Image
          src="/logos/icon-gold.svg"
          alt=""
          width={270}
          height={270}
          priority
          className="h-24 w-24 motion-safe:animate-[preloader-in_0.9s_ease-out_both] md:h-28 md:w-28"
        />

        {/* Wordmark : fondu doux. */}
        <span className="font-serif text-xs uppercase tracking-[0.42em] text-cream/80 motion-safe:animate-[preloader-in_0.9s_ease-out_0.1s_both] md:text-sm">
          Élan&nbsp;Patrimoine
        </span>

        {/* Filet doré qui se trace une seule fois. */}
        <span
          aria-hidden="true"
          className="h-px w-16 origin-left scale-x-0 bg-gradient-to-r from-transparent via-gold to-transparent motion-safe:animate-[preloader-line_1.1s_cubic-bezier(0.65,0,0.35,1)_0.2s_forwards] motion-reduce:scale-x-100"
        />
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
        @keyframes preloader-line {
          0% {
            transform: scaleX(0);
            opacity: 0;
          }
          100% {
            transform: scaleX(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
