'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { imageUrl, img } from '@/lib/images';

const STORAGE_KEY = 'elan-cta-popup';

/**
 * Fenêtre d'incitation au rendez-vous, affichée une seule fois après un délai
 * de présence sur le site (30 s par défaut). Discrète et fermable : le choix
 * de la fermer est mémorisé (sessionStorage) afin de ne pas réapparaître
 * pendant la visite. Reprend les codes du bandeau CTASection (panneau navy,
 * ville en filigrane, halo doré, filet doré, bouton or) et met en avant
 * l'écusson « élan » comme signature de marque.
 */
export default function CtaPopup({
  delayMs = 30_000,
  title = 'Donnons un cap à votre patrimoine.',
  text = "Profitez d'un premier échange confidentiel et sans engagement avec un conseiller Élan Patrimoine.",
  href = '/contact#assistant',
}: {
  delayMs?: number;
  title?: string;
  text?: string;
  href?: string;
}) {
  const [open, setOpen] = useState(false);

  // Programme l'ouverture après le délai, sauf si la fenêtre a déjà été fermée.
  useEffect(() => {
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(STORAGE_KEY) === 'dismissed';
    } catch {
      /* sessionStorage indisponible */
    }
    if (dismissed) return;

    const timer = window.setTimeout(() => setOpen(true), delayMs);
    return () => window.clearTimeout(timer);
  }, [delayMs]);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, 'dismissed');
    } catch {
      /* ignore */
    }
  };

  // Fermeture au clavier (Échap) tant que la fenêtre est ouverte.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Prendre rendez-vous"
      className="fixed inset-0 z-[65] flex items-end justify-center p-4 sm:items-center"
    >
      {/* Voile sombre cliquable pour fermer */}
      <button
        type="button"
        aria-label="Fermer"
        onClick={close}
        className="absolute inset-0 cursor-default bg-forest-dark/40 backdrop-blur-[2px] animate-fade-in"
      />

      <div
        className="relative w-full max-w-lg overflow-hidden rounded-[28px] shadow-elevated animate-fade-up"
        style={{
          background:
            'radial-gradient(120% 140% at 85% -20%, #1c3868 0%, rgba(28,56,104,0) 50%), linear-gradient(140deg, #11254a 0%, #0d1d3b 100%)',
        }}
      >
        {/* Ville en filigrane (même image que le bandeau CTASection) */}
        <Image
          src={imageUrl(img.ctaCity, 1200, 70)}
          alt=""
          fill
          sizes="512px"
          className="pointer-events-none object-cover opacity-[0.12]"
        />
        {/* Voile dégradé pour la lisibilité + halo doré */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-forest-dark/70 via-forest-dark/30 to-forest-dark/80" />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]"
        />
        <span
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        />

        {/* Bouton fermer */}
        <button
          type="button"
          onClick={close}
          aria-label="Fermer"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full text-cream/60 transition-colors hover:bg-white/10 hover:text-cream"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            aria-hidden="true"
            className="h-5 w-5"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <div className="relative px-8 py-8 sm:px-10">
          <span className="eyebrow eyebrow-light mb-5">Premier rendez-vous</span>
          <h2 className="max-w-md text-balance text-2xl font-semibold leading-[1.15] text-cream sm:text-[1.9rem]">
            {title}
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-cream/70">
            {text}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={href} onClick={close} className="btn-gold">
              Prendre rendez-vous
            </Link>
            <button type="button" onClick={close} className="btn-outline-light">
              Plus tard
            </button>
          </div>

          {/* Réassurance */}
          <p className="mt-6 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-cream/45">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="h-4 w-4 text-gold"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Confidentiel et sans engagement
          </p>
        </div>
      </div>
    </div>
  );
}
