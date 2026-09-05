'use client';

import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import TrackingScripts from '@/components/TrackingScripts';
import {
  CONSENT_OPEN_EVENT,
  clearGoogleCookies,
  readStoredConsent,
  storeConsent,
  updateGoogleConsent,
  type ConsentValue,
} from '@/lib/consent';
import type { TrackingSettings } from '@/lib/settings';

type Consent = ConsentValue | null;

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
const PLAUSIBLE_SRC =
  process.env.NEXT_PUBLIC_PLAUSIBLE_SRC || 'https://plausible.io/js/script.js';

/**
 * Bandeau de consentement (RGPD/CNIL) + chargement conditionnel des outils de
 * mesure : Plausible (sans cookie) et les balises Google/marketing pilotées
 * depuis Sanity ou les variables d'environnement.
 *
 * Aucun script n'est chargé avant un « Accepter » explicite, et le refus est
 * aussi accessible que l'acceptation (exigence CNIL). En cas de retrait du
 * consentement, l'état Consent Mode repasse en « denied » et les cookies
 * Google déjà déposés sont supprimés.
 */
export default function ConsentManager({
  tracking,
}: {
  /** Identifiants de suivi (GTM/GA4/Hotjar/Clarity…) résolus côté serveur. */
  tracking?: TrackingSettings;
}) {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setConsent(readStoredConsent());
    setReady(true);
  }, []);

  // Permet de rouvrir le bandeau depuis « Gérer les cookies » (pied de page),
  // afin de modifier ou retirer un choix déjà exprimé.
  useEffect(() => {
    const reopen = () => setConsent(null);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  const choose = (value: ConsentValue) => {
    storeConsent(value);
    updateGoogleConsent(value);
    // Retrait du consentement : les cookies déjà posés doivent disparaître.
    if (value === 'denied') clearGoogleCookies();
    setConsent(value);
  };

  const consentGranted = ready && consent === 'granted';
  const plausibleEnabled = consentGranted && Boolean(PLAUSIBLE_DOMAIN);

  const showBanner = ready && consent === null;

  // Le texte doit décrire ce qui est réellement déposé : les outils Google et
  // marketing utilisent des cookies, Plausible seul n'en utilise aucun.
  const usesCookies = Boolean(
    tracking &&
      (tracking.gtmId ||
        tracking.ga4Id ||
        tracking.hotjarId ||
        tracking.clarityId ||
        tracking.metaPixelId ||
        tracking.linkedinPartnerId ||
        tracking.tiktokPixelId)
  );

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

      {/* Outils de mesure : chargés uniquement après consentement. */}
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
                {usesCookies
                  ? "Nous utilisons des cookies de mesure d'audience (Google Analytics) pour comprendre l'usage du site et l'améliorer. Ils ne sont déposés qu'avec votre accord, et vous pouvez le retirer à tout moment."
                  : "Nous utilisons une mesure d'audience respectueuse de votre vie privée (sans cookie publicitaire) pour améliorer notre site. Vous pouvez l'accepter ou la refuser."}{' '}
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
