'use client';

import type { ReactNode } from 'react';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Reveal from './Reveal';

/**
 * Section « Conviction » (design handoff — Direction A, éditorial asymétrique).
 * Bandeau-citation de marque : filet doré vertical, guillemet ouvrant
 * surdimensionné, citation Cormorant (avec membre de phrase en or), CTA texte
 * souligné, et monogramme doré en filigrane dans le coin.
 * Tokens de marque du projet (forest / gold / cream), polices Cormorant + Inter.
 *
 * `variant` :
 *   - `cream` (défaut) : fond crème, texte forêt — design d'origine.
 *   - `navy`           : fond bleu nuit, texte crème (utilisé sur Le Cabinet).
 *   - `brand`          : variante « bandeau sombre signature » de l'accueil.
 *                        Fond bleu nuit profond et dimensionnel (halo doré,
 *                        lueur navy, texture de points, vignette), filets d'or
 *                        en encadrement et nœud losange lumineux. Pensée pour
 *                        enchaîner sur la section Chiffres (même registre
 *                        sombre) et créer un temps fort éditorial.
 *   - `approche`       : variante crème enrichie, réservée à la page Notre
 *                        approche. Le filet d'or devient le « fil » de la
 *                        méridienne (nœud losange en tête, fondu vers le bas)
 *                        et annonce visuellement la méthode qui suit ; halo
 *                        doré et filet d'entrée ajoutent de la profondeur.
 *                        Mêmes contenus que `cream`.
 */
export default function ConvictionSection({
  variant = 'cream',
  ctaHref = '/notre-approche',
  eyebrow = "La conviction d'Élan Patrimoine",
  quote,
}: {
  variant?: 'cream' | 'navy' | 'approche' | 'brand';
  /** Cible du lien « Notre méthode ». Sur la page Notre approche, on pointe
   *  vers l'ancre #methode plutôt que vers la page elle-même. */
  ctaHref?: string;
  /** Surtitre de la citation (défaut : la conviction de marque). */
  eyebrow?: string;
  /** Citation. Si absente, la citation de marque par défaut est utilisée.
   *  Permet de varier le propos d'une page à l'autre (évite la répétition). */
  quote?: ReactNode;
}) {
  const navy = variant === 'navy';
  const approche = variant === 'approche';
  const brand = variant === 'brand';
  // Variantes à fond sombre (texte crème) : navy (Le Cabinet) + brand (Accueil).
  const dark = navy || brand;

  const quoteRef = useRef<HTMLQuoteElement>(null);

  useEffect(() => {
    const el = quoteRef.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('quote--visible');
      return;
    }

    if (!('IntersectionObserver' in window)) {
      el.classList.add('quote--visible');
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('quote--visible');
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const defaultQuote = (
    <>
      <span className="quote-line">
        Conseiller, ce n&apos;est pas suivre une mode{' '}: c&apos;est{' '}
      </span>
      <em className="quote-line font-medium italic text-gold">
        protéger un projet de vie
      </em>
      <span className="quote-line">
        {' '}contre l&apos;imprévu et le temps.
      </span>
    </>
  );

  return (
    <section
      className="relative flex items-center overflow-hidden py-24 md:min-h-[580px] md:py-32"
      style={{
        background: brand
          ? // Bleu nuit profond + lueur navy (haut-gauche) + halo doré chaud
            // (bas-droit, derrière le monogramme) pour une vraie profondeur.
            'radial-gradient(120% 130% at 86% 116%, rgba(255,184,28,0.13) 0%, rgba(255,184,28,0) 44%), radial-gradient(130% 120% at 8% -14%, #244a85 0%, rgba(36,74,133,0) 52%), linear-gradient(152deg, #12284e 0%, #0a1d3a 56%, #07162e 100%)'
          : navy
          ? // Bleu nuit + lueur navy (haut-gauche) + halo doré chaud (bas-droit,
            // derrière le monogramme) pour donner de la profondeur à la citation.
            'radial-gradient(120% 130% at 88% 112%, rgba(255,184,28,0.12) 0%, rgba(255,184,28,0) 46%), radial-gradient(140% 120% at 12% 0%, #1d4577 0%, rgba(29,69,119,0) 55%), linear-gradient(140deg, #11254a 0%, #091d38 100%)'
          : 'radial-gradient(140% 120% at 12% 0%, #FBF9F5 0%, #F5F0E8 58%, #EBE3D4 100%)',
      }}
    >
      {/* Variante approche : filet d'or en entrée + halo doré (profondeur). */}
      {approche && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 -top-24 h-[28rem] w-[28rem] rounded-full bg-gold/10 blur-[130px]"
          />
        </>
      )}

      {/* Variante navy : filet d'or en tête, texture de points discrète, halo
          doré et vignette intérieure pour enrichir la citation de marque. */}
      {navy && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)',
              backgroundSize: '26px 26px',
              maskImage: 'linear-gradient(105deg, #000 0%, transparent 60%)',
              WebkitMaskImage: 'linear-gradient(105deg, #000 0%, transparent 60%)',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-24 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-gold/[0.06] blur-[140px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 0 150px 44px rgba(4,12,28,0.5)' }}
          />
        </>
      )}

      {/* Variante brand : encadrement par filets d'or, texture de points,
          halo doré et vignette pour la profondeur. */}
      {brand && (
        <>
          <span
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/45 to-transparent"
          />
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-50"
            style={{
              backgroundImage:
                'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px)',
              backgroundSize: '24px 24px',
              maskImage: 'linear-gradient(100deg, #000 0%, transparent 62%)',
              WebkitMaskImage:
                'linear-gradient(100deg, #000 0%, transparent 62%)',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-28 top-1/2 h-[30rem] w-[30rem] -translate-y-1/2 rounded-full bg-gold/[0.07] blur-[140px]"
          />
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: 'inset 0 0 170px 50px rgba(4,12,28,0.55)' }}
          />
        </>
      )}

      {/* Monogramme doré en filigrane (déborde du coin bas-droit) */}
      <Image
        src="/logos/logo-gold.png"
        alt=""
        width={967}
        height={1160}
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-6 right-5 w-[140px] sm:w-[180px] md:bottom-auto md:right-10 md:top-1/2 md:w-[300px] md:-translate-y-1/2 ${
          brand ? 'opacity-[0.11]' : navy ? 'opacity-[0.12]' : 'opacity-[0.08]'
        }`}
      />

      <div className="container-content relative">
        <Reveal className="relative max-w-[880px] pl-8 md:pl-14">
          {approche ? (
            /* Le « fil » de la méridienne : nœud losange en tête, trait continu
               qui s'estompe vers le bas — il annonce la méthode qui suit. */
            <>
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[2px] -translate-x-[0.5px]"
                style={{
                  background:
                    'linear-gradient(180deg, #FFC94D 0%, #FFB81C 38%, rgba(255,184,28,0.12) 100%)',
                }}
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-[2px] h-2.5 w-2.5 -translate-x-[5px] rotate-45 bg-gold shadow-[0_0_0_4px_#F5F0E8]"
              />
            </>
          ) : dark ? (
            /* Filet doré lumineux à double fondu + nœud losange rayonnant
               (variantes sombres : brand & navy). */
            <>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 top-0 w-[2px] -translate-x-[0.5px] md:bottom-auto md:top-1/2 md:h-[210px] md:-translate-y-1/2"
                style={{
                  background:
                    'linear-gradient(180deg, rgba(255,201,77,0) 0%, #FFC94D 18%, #FFB81C 50%, #FFC94D 82%, rgba(255,201,77,0) 100%)',
                }}
              />
              <span
                aria-hidden="true"
                className="absolute left-0 top-1/2 hidden h-2.5 w-2.5 -translate-x-[5px] -translate-y-1/2 rotate-45 bg-gold shadow-[0_0_14px_3px_rgba(255,184,28,0.5)] md:block"
              />
            </>
          ) : (
            /* Filet doré vertical (variante cream d'origine) */
            <span
              aria-hidden="true"
              className="absolute bottom-0 left-0 top-0 w-0.5 md:bottom-auto md:top-1/2 md:h-[190px] md:-translate-y-1/2"
              style={{
                background:
                  'linear-gradient(180deg, #FFC94D 0%, #FFB81C 45%, rgba(255,184,28,0) 100%)',
              }}
            />
          )}

          {/* Guillemet ouvrant surdimensionné */}
          <span
            aria-hidden="true"
            className="-ml-1.5 mb-1.5 block h-[36px] font-serif text-[80px] italic leading-[0.6] text-gold md:h-[54px] md:text-[120px]"
          >
            &ldquo;
          </span>

          <p className="mb-[18px] text-[10.5px] font-semibold uppercase tracking-[0.26em] text-gold md:mb-[22px] md:text-xs md:tracking-[0.34em]">
            {eyebrow}
          </p>

          <blockquote
            ref={quoteRef}
            className={`m-0 text-balance font-serif text-[30px] font-medium leading-[1.24] tracking-[0.004em] md:text-[44px] md:leading-[1.18] ${
              dark ? 'text-cream' : 'text-forest'
            }`}
          >
            {quote ?? defaultQuote}
          </blockquote>

          <div className="mt-[30px] flex flex-col items-start gap-5 md:mt-[34px] md:flex-row md:items-center md:gap-6">
            <span aria-hidden="true" className="h-px w-10 bg-gold/55 md:w-[46px]" />
            <Link
              href={ctaHref}
              className={`group inline-flex items-center gap-3 whitespace-nowrap border-b-[1.5px] border-gold pb-[5px] text-[13.5px] font-semibold tracking-[0.04em] transition-colors hover:text-gold md:ml-auto ${
                dark ? 'text-cream' : 'text-forest'
              }`}
            >
              Notre méthode
              <svg
                width="20"
                height="11"
                viewBox="0 0 20 11"
                fill="none"
                aria-hidden="true"
                className="transition-transform duration-300 group-hover:translate-x-[5px]"
              >
                <path d="M1 5.5h17M13.5 1l4.5 4.5-4.5 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Filet doré de séparation (variante navy, avant la section suivante) */}
      {navy && (
        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/35 to-transparent"
        />
      )}
    </section>
  );
}
