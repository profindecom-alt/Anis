/**
 * Envoi d'événements de conversion vers Google Tag Manager (et GA4 direct).
 *
 * GTM lit la file `window.dataLayer` : chaque `push({ event })` y déclenche les
 * balises configurées côté GTM (interface web de GTM, sans redéploiement).
 * Rien n'est transmis tant que GTM (ou GA4) n'est pas chargé — ce qui n'arrive
 * qu'APRÈS le consentement aux cookies (voir ConsentManager / TrackingScripts).
 * Appeler `trackEvent` sans consentement est donc sans effet réseau : l'appel
 * empile seulement l'événement en mémoire, jamais traité si le visiteur refuse.
 */

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Paramètres additionnels attachés à un événement (facultatif). */
export type EventParams = Record<string, string | number | boolean | undefined>;

/**
 * Pousse un événement nommé dans le dataLayer GTM et, si GA4 est chargé en
 * direct (gtag.js sans GTM), le transmet également à GA4. Les paramètres vides
 * ou `undefined` sont ignorés.
 *
 * @example trackEvent('whatsapp_click', { location: 'floating' })
 */
export function trackEvent(event: string, params: EventParams = {}): void {
  if (typeof window === 'undefined') return;
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== undefined && v !== '')
  );
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, clean);
  }
}
