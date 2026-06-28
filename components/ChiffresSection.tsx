'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { stats } from '@/lib/site';
import ClientLogosSection from './ClientLogosSection';
import type { ClientLogo } from '@/lib/clientLogos';

/**
 * Section « En quelques chiffres » (design handoff — variation « Filets »).
 * Bandeau navy texturé : filets verticaux dorés entre les cellules, compteurs
 * Cormorant en chiffres elzéviriens, soulignés or qui se tracent. À l'entrée
 * dans le viewport, chaque cellule apparaît en fondu/translation (échelonnée),
 * le nombre se déroule de 0 à sa cible et le filet doré se dessine.
 *
 * L'état au repos (CSS, dans globals.css) est entièrement visible : sans JS
 * la section s'affiche correctement, l'animation ne fait que la « jouer » à
 * partir d'un état masqué. Polices mappées sur celles du projet (Cormorant +
 * Inter). Respecte `prefers-reduced-motion`.
 */

const EASE = 'cubic-bezier(.22,.61,.36,1)';
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

export default function ChiffresSection({
  variant = 'navy',
  bgImageId,
  partnerLogos = [],
  partnersEyebrow,
}: {
  /** `cream` : fond « or crème » à texte sombre (page Le Cabinet). */
  variant?: 'navy' | 'cream';
  /** Identifiant d'image (lib/images) affichée en filigrane derrière les
   *  chiffres, sous un voile crème pour préserver la lisibilité. */
  bgImageId?: string;
  /** Logos partenaires affichés en bandeau, en clôture de la section (partage
   *  le fond des chiffres). Masqué si vide. */
  partnerLogos?: ClientLogo[];
  partnersEyebrow?: string;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  // Garde « déjà joué » : l'entrée ne se déclenche qu'une fois.
  const playedRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const cells = Array.from(
      section.querySelectorAll<HTMLElement>('.chiffres__cell')
    );
    const timers: number[] = [];

    // Déroule un nombre de 0 à sa cible via requestAnimationFrame.
    const countUp = (el: HTMLElement, target: number, duration: number, delay: number) => {
      let startTs: number | undefined;
      const frame = (ts: number) => {
        if (startTs === undefined) startTs = ts;
        const p = Math.min(1, (ts - startTs) / duration);
        el.textContent = String(Math.round(easeOutCubic(p) * target));
        if (p < 1) requestAnimationFrame(frame);
        else el.textContent = String(target);
      };
      timers.push(window.setTimeout(() => requestAnimationFrame(frame), delay));
      // Filet de sécurité : valeur finale garantie même si rAF est throttlé
      // (onglet en arrière-plan).
      timers.push(
        window.setTimeout(() => {
          el.textContent = String(target);
        }, delay + duration + 250)
      );
    };

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;

      cells.forEach((cell, i) => {
        const delay = reduce ? 0 : i * 150;
        const valEl = cell.querySelector<HTMLElement>('.chiffres__num-val');
        const rule = cell.querySelector<HTMLElement>('.chiffres__rule');
        const target = Number(valEl?.dataset.count ?? '0');

        if (!reduce && typeof cell.animate === 'function') {
          cell.animate(
            [
              { opacity: 0, transform: 'translateY(18px)' },
              { opacity: 1, transform: 'none' },
            ],
            { duration: 700, delay, easing: EASE, fill: 'backwards' }
          );
          rule?.animate(
            [{ width: '0px' }, { width: '56px' }],
            { duration: 1000, delay: delay + 220, easing: EASE, fill: 'backwards' }
          );
        }

        if (valEl) {
          if (reduce) {
            valEl.textContent = String(target);
          } else {
            valEl.textContent = '0';
            countUp(valEl, target, 1200, delay);
          }
        }
      });
    };

    // Replis si l'observer se déclenche avant que la mise en page se stabilise
    // (et que rien ne défile ensuite pour le re-déclencher).
    const inView = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      return r.top < vh * 0.85 && r.bottom > 0;
    };

    let io: IntersectionObserver | undefined;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              play();
              io?.disconnect();
            }
          });
        },
        { threshold: 0.25 }
      );
      io.observe(section);
    } else {
      play();
    }

    const onLoad = () => {
      if (inView()) play();
    };
    window.addEventListener('load', onLoad);
    timers.push(
      window.setTimeout(() => {
        if (inView()) play();
      }, 600)
    );

    return () => {
      io?.disconnect();
      window.removeEventListener('load', onLoad);
      timers.forEach(clearTimeout);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`chiffres${variant === 'cream' ? ' chiffres--cream' : ''}`}
      id="chiffres"
    >
      {bgImageId && (
        <>
          <Image
            src={imageUrl(bgImageId, 1600, 55)}
            alt=""
            aria-hidden="true"
            fill
            sizes="100vw"
            className="pointer-events-none absolute inset-0 object-cover"
          />
          {/* Voile or crème : préserve la lisibilité du texte sombre. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(120% 130% at 0% 0%, rgba(238,224,190,0.82) 0%, rgba(246,240,228,0.78) 45%, rgba(240,230,210,0.86) 100%)',
            }}
          />
        </>
      )}
      <div className="chiffres__wrap">
        <div className="chiffres__head">
          <p className="chiffres__eyebrow">En quelques chiffres</p>
          <h2 className="chiffres__title">La mesure de notre engagement</h2>
        </div>

        <div className="chiffres__grid">
          {stats.map((s, i) => (
            <div className="chiffres__cell" key={s.label}>
              <span className="chiffres__idx">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="chiffres__num">
                {s.prefix && (
                  <span className="chiffres__num-pre">{s.prefix}</span>
                )}
                <span className="chiffres__num-val" data-count={s.value}>
                  {s.value}
                </span>
                {s.unit && <span className="chiffres__u">{s.unit}</span>}
              </span>
              <div className="chiffres__rule" />
              <p className="chiffres__label">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Bandeau partenaires (« Ils nous font confiance »), intégré à la même
            section que les chiffres : fond partagé, séparé par un filet doré. */}
        {partnerLogos.length > 0 && (
          <div className="chiffres__partners">
            <ClientLogosSection eyebrow={partnersEyebrow} logos={partnerLogos} />
          </div>
        )}
      </div>
    </section>
  );
}
