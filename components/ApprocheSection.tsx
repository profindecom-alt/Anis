'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { approachSteps } from '@/lib/site';

/**
 * Section « Notre approche » (design handoff — narratif + grand-livre).
 * Mise en page éditoriale asymétrique sur deux colonnes : à gauche, une colonne
 * narrative (eyebrow + titre + sous-titre + lien) ; à droite, un « grand-livre »
 * numéroté de trois étapes, lignes séparées par des filets, traitement au survol
 * (filet doré vertical, décalage, numéro qui se remplit). À l'entrée dans le
 * viewport, le contenu apparaît en fondu/translation échelonné.
 *
 * L'état au repos (CSS, dans globals.css) est entièrement visible : sans JS la
 * section s'affiche correctement, l'animation ne fait que la « rejouer » depuis
 * un état masqué (classe `play`). Polices mappées sur celles du projet (serif
 * Cormorant ; le reste hérite d'Inter via le <body>). Respecte
 * `prefers-reduced-motion`.
 */

const Arrow = () => (
  <svg
    className="approche__arrow"
    width="20"
    height="11"
    viewBox="0 0 20 11"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M1 5.5h17M13.5 1l4.5 4.5-4.5 4.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function ApprocheSection({
  videoUrl,
  posterUrl,
}: {
  videoUrl?: string | null;
  posterUrl?: string | null;
} = {}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Vidéo de fond optionnelle : mise en pause si mouvement réduit, sinon
    // lecture auto (le poster reste affiché si le navigateur la refuse).
    const video = videoRef.current;
    if (video) {
      if (reduce) video.pause();
      else void video.play().catch(() => {});
    }

    if (reduce) return; // état au repos déjà visible

    // (Re)joue l'entrée en réinitialisant la classe `play`.
    const play = () => {
      section.classList.remove('play');
      void section.offsetWidth; // force le reflow pour relancer les animations
      section.classList.add('play');
    };

    if (!('IntersectionObserver' in window)) {
      play();
      return;
    }

    let seen = false;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !seen) {
            seen = true;
            play();
          } else if (!e.isIntersecting) {
            seen = false;
          }
        });
      },
      { threshold: 0.35 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`approche${videoUrl ? ' approche--video' : ''}`}
      id="approche"
    >
      {/* Vidéo de fond optionnelle (pilotée Sanity), surmontée d'un voile bleu
          pour conserver l'identité de la section et la lisibilité du texte. */}
      {videoUrl && (
        <>
          <video
            ref={videoRef}
            className="approche__video"
            src={videoUrl}
            poster={posterUrl ?? undefined}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
          <div className="approche__tint" aria-hidden="true" />
        </>
      )}

      <div className="approche__wrap">
        <div className="approche__aside">
          <p className="approche__eyebrow">Notre approche</p>
          <h2 className="approche__title">
            Une méthode rigoureuse en trois temps
          </h2>
          <p className="approche__sub">
            De l&apos;écoute à la mise en œuvre, un chemin clair et maîtrisé, un
            seul interlocuteur à chaque étape.
          </p>
          <Link href="/notre-approche" className="approche__cta">
            Découvrir notre approche <Arrow />
          </Link>
        </div>

        <div className="approche__rows">
          {approachSteps.map((step, i) => (
            <div
              className="approche__row"
              key={step.number}
              style={{ animationDelay: `${i * 150 + 120}ms` }}
            >
              <span className="approche__n">{step.number}</span>
              <div>
                <h3 className="approche__stitle">{step.title}</h3>
                <p className="approche__stext">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
