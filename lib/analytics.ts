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
    /**
     * Vrai uniquement si gtag.js a été chargé EN DIRECT (GA4 sans GTM).
     * `window.gtag` existe toujours (installé par le Consent Mode), il ne peut
     * donc pas servir à détecter la présence réelle de GA4.
     */
    __elanGa4Direct?: boolean;
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
  if (window.__elanGa4Direct && typeof window.gtag === 'function') {
    window.gtag('event', event, clean);
  }
}

/**
 * Vue de page « virtuelle », émise à chaque navigation interne (App Router :
 * pas de rechargement, donc pas de page_view automatique après la première).
 *
 * Côté GTM : créer une balise GA4 « page_view » déclenchée sur l'événement
 * personnalisé `virtual_page_view` (et NON sur « Historique modifié », qui
 * ferait doublon). Voir docs/ANALYTICS.md.
 */
export function trackPageView(path: string): void {
  if (typeof window === 'undefined') return;
  const params = {
    page_path: path,
    page_location: window.location.href,
    page_title: document.title,
  };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event: 'virtual_page_view', ...params });
  if (window.__elanGa4Direct && typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', params);
  }
}
