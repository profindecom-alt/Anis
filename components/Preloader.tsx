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
      {/* Fond : dégradé profond + halo doré qui respire, façon « écrin ». */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 110% at 50% 38%, rgba(27,74,143,0.30) 0%, rgba(12,35,80,0) 55%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.10] blur-[120px] motion-safe:animate-[preloader-glow_3.4s_ease-in-out_infinite]"
      />

      <div className="relative flex flex-col items-center gap-8">
        {/* Écusson + anneau doré qui pulse autour de la marque. */}
        <div className="relative flex items-center justify-center">
          <span
            aria-hidden="true"
            className="absolute h-44 w-44 rounded-full border border-gold/20 motion-safe:animate-[preloader-ring_2.6s_ease-out_infinite] md:h-56 md:w-56"
          />
          <Image
            src="/logos/icon-gold.svg"
            alt=""
            width={270}
            height={270}
            priority
            className="h-36 w-36 motion-safe:animate-[preloader-mark_2.4s_ease-in-out_infinite] md:h-48 md:w-48"
          />
        </div>

        {/* Wordmark : apparition douce avec resserrement de l'interlettrage. */}
        <span className="font-serif text-sm uppercase tracking-[0.5em] text-cream/85 motion-safe:animate-[preloader-word_1.2s_ease-out_both] md:text-base">
          Élan&nbsp;Patrimoine
        </span>

        {/* Barre de progression : balayage doux et indéterminé. */}
        <div className="relative h-px w-40 overflow-hidden rounded-full bg-cream/12">
          <div className="absolute inset-y-0 -left-1/3 w-1/3 rounded-full bg-gradient-to-r from-transparent via-gold to-transparent motion-safe:animate-[preloader-sweep_1.5s_cubic-bezier(0.45,0,0.55,1)_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes preloader-mark {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.94;
          }
          50% {
            transform: translateY(-7px) scale(1.045);
            opacity: 1;
          }
        }
        @keyframes preloader-ring {
          0% {
            transform: scale(0.82);
            opacity: 0;
          }
          35% {
            opacity: 0.7;
          }
          100% {
            transform: scale(1.18);
            opacity: 0;
          }
        }
        @keyframes preloader-glow {
          0%,
          100% {
            opacity: 0.55;
            transform: translate(-50%, -50%) scale(0.92);
          }
          50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.06);
          }
        }
        @keyframes preloader-sweep {
          0% {
            left: -35%;
          }
          100% {
            left: 100%;
          }
        }
        @keyframes preloader-word {
          0% {
            opacity: 0;
            letter-spacing: 0.85em;
            transform: translateY(6px);
          }
          100% {
            opacity: 1;
            letter-spacing: 0.5em;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
