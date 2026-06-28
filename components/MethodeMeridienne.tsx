'use client';

import { useEffect, useRef } from 'react';
import { approachSteps } from '@/lib/site';

/**
 * Section « La méthode » de la page Notre approche (signature de la page).
 *
 * Un fil d'or continu — la « méridienne » — descend le long des trois temps
 * (Diagnostic → Stratégie → Mise en œuvre) et les relie : la continuité du
 * trait porte le propos du cabinet (un cap tenu dans le temps long). À l'entrée
 * dans le viewport, le fil se trace du haut vers le bas, puis chaque station
 * s'allume à son tour (nœud en losange qui se remplit, grand chiffre elzévirien
 * qui passe du contour au plein). Style dans globals.css (`.meridienne`) ;
 * l'état au repos y est déjà entièrement visible — `play` ne fait que rejouer
 * l'entrée. Respecte prefers-reduced-motion.
 */

const Tick = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M20 6 9 17l-5-5"
      stroke="currentColor"
      strokeWidth="2.25"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Détails opérationnels de chaque temps (alignés sur approachSteps). */
const stepDetails = [
  [
    'Recueil exhaustif de votre situation patrimoniale, familiale et professionnelle',
    'Clarification de vos objectifs : revenus, transmission, protection, retraite',
    'Analyse de votre fiscalité et de vos contrats existants',
  ],
  [
    'Modélisation de scénarios chiffrés et hiérarchisés',
    'Présentation pédagogique des solutions et de leurs implications',
    "Validation conjointe d'une feuille de route claire",
  ],
  [
    'Souscription et mise en place des solutions retenues',
    'Coordination avec notaires, experts-comptables et avocats',
    'Suivi régulier et arbitrages au fil des cycles de vie et de marché',
  ],
];

export default function MethodeMeridienne() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // état au repos déjà visible

    const play = () => {
      section.classList.remove('play');
      void section.offsetWidth; // reflow pour relancer les animations
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
      { threshold: 0.2 }
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="meridienne" id="methode">
      <div className="meridienne__wrap">
        <div className="meridienne__head">
          <p className="meridienne__eyebrow">La méthode</p>
          <h2 className="meridienne__title">
            Trois temps, un seul fil conducteur
          </h2>
          <p className="meridienne__lede">
            Chaque temps est validé avec vous avant le suivant. Rien n&apos;est
            engagé sans que la trajectoire soit comprise, chiffrée et partagée.
          </p>
        </div>

        <ol className="meridienne__track">
          {approachSteps.map((step, i) => (
            <li
              className="station"
              key={step.number}
              style={{ '--d': `${0.45 + i * 0.3}s` } as React.CSSProperties}
            >
              <span className="station__node" aria-hidden="true" />
              <span className="station__num" aria-hidden="true">
                {step.number}
              </span>
              <span className="station__kicker">Temps {step.number}</span>
              <h3 className="station__title">{step.title}</h3>
              <p className="station__desc">{step.description}</p>
              <ul className="station__list">
                {stepDetails[i].map((d) => (
                  <li key={d}>
                    <Tick />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
