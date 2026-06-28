'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import TrackingScripts from '@/components/TrackingScripts';
import type { TrackingSettings } from '@/lib/settings';

type Consent = 'granted' | 'denied' | null;
const STORAGE_KEY = 'elan-consent';

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';

/**
 * Bandeau de consentement (RGPD/CNIL) + chargement conditionnel de
 * l'analytics respectueuse de la vie privée (Plausible, sans cookie).
 * Le script n'est chargé qu'après consentement explicite ET si un domaine
 * Plausible est configuré (NEXT_PUBLIC_PLAUSIBLE_DOMAIN).
 */
export default function ConsentManager({
  tracking,
}: {
  /** Identifiants de suivi (GTM/GA/Hotjar/Clarity) gérés depuis Sanity. */
  tracking?: TrackingSettings;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Consent;
      if (stored === 'granted' || stored === 'denied') setConsent(stored);
    } catch {
      /* localStorage indisponible */
    }
    setReady(true);
  }, []);

  // Permet de rouvrir le bandeau depuis « Gérer les cookies » (pied de page),
  // afin de modifier ou retirer un choix déjà exprimé.
  useEffect(() => {
    const reopen = () => setConsent(null);
    window.addEventListener('elan:open-consent', reopen);
    return () => window.removeEventListener('elan:open-consent', reopen);
  }, []);

  const choose = (value: Exclude<Consent, null>) => {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* ignore */
    }
    setConsent(value);
  };

  const consentGranted = ready && consent === 'granted';
  const plausibleEnabled = consentGranted && Boolean(PLAUSIBLE_DOMAIN);

  const showBanner = ready && consent === null;

  return (
    <>
      {plausibleEnabled && (
        <Script
          defer
          data-domain={PLAUSIBLE_DOMAIN}
          src={PLAUSIBLE_SRC}
          strategy="afterInteractive"
        />
      )}

      {/* Outils de mesure (Sanity) : chargés uniquement après consentement. */}
      {consentGranted && tracking && <TrackingScripts {...tracking} />}

      {showBanner && (
        <div
          role="dialog"
          aria-label="Gestion des cookies"
          aria-live="polite"
          className="fixed inset-x-0 bottom-0 z-[60] p-4 sm:p-6"
        >
          <div className="container-content">
            <div className="mx-auto flex max-w-3xl flex-col gap-5 rounded-2xl border border-ink/10 bg-white/95 p-6 shadow-elevated backdrop-blur md:flex-row md:items-center md:gap-8">
              <p className="flex-1 text-sm leading-relaxed text-ink/70">
                Nous utilisons une mesure d'audience respectueuse de votre vie
                privée (sans cookie publicitaire) pour améliorer notre site. Vous
                pouvez l'accepter ou la refuser.{' '}
                <Link
                  href="/politique-de-confidentialite"
                  className="font-medium text-forest underline decoration-gold/50 underline-offset-2 hover:decoration-gold"
                >
                  En savoir plus
                </Link>
              </p>
              <div className="flex shrink-0 gap-3">
                <button
                  type="button"
                  onClick={() => choose('denied')}
                  className="btn-outline px-5 py-2.5 text-sm"
                >
                  Refuser
                </button>
                <button
                  type="button"
                  onClick={() => choose('granted')}
                  className="btn-primary px-5 py-2.5 text-sm"
                >
                  Accepter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
