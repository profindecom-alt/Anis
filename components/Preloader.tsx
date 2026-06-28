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
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center bg-forest transition-opacity duration-[600ms] ease-out ${
        leaving ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center gap-7">
        <Image
          src="/logos/icon-gold.svg"
          alt=""
          width={270}
          height={270}
          priority
          className="h-36 w-36 motion-safe:animate-[preloader-mark_1.6s_ease-in-out_infinite] md:h-48 md:w-48"
        />
        <div className="h-px w-32 overflow-hidden rounded-full bg-cream/15">
          <div className="h-full w-full origin-left bg-gradient-to-r from-gold-dark via-gold to-gold-light motion-safe:animate-[preloader-line_1.4s_cubic-bezier(0.16,1,0.3,1)_infinite]" />
        </div>
      </div>

      <style jsx>{`
        @keyframes preloader-mark {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.92;
          }
          50% {
            transform: translateY(-6px) scale(1.04);
            opacity: 1;
          }
        }
        @keyframes preloader-line {
          0% {
            transform: scaleX(0);
          }
          50% {
            transform: scaleX(1);
          }
          100% {
            transform: scaleX(0);
            transform-origin: right;
          }
        }
      `}</style>
    </div>
  );
}
