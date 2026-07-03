'use client';

import { useEffect } from 'react';
import { trackEvent, type EventParams } from '@/lib/analytics';

/**
 * Écouteur global des clics « conversion » déclarés directement en HTML.
 *
 * Tout élément portant `data-analytics-event="nom"` (y compris les liens rendus
 * côté serveur : WhatsApp, tel:, mailto:) émet l'événement correspondant vers
 * GTM/GA4 au clic, sans avoir à devenir un composant client. Les attributs
 * `data-analytics-*` supplémentaires deviennent des paramètres de l'événement :
 *   <a data-analytics-event="phone_click" data-analytics-location="footer">
 * envoie l'événement « phone_click » avec { location: 'footer' }.
 */
export default function AnalyticsEvents() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>('[data-analytics-event]');
      if (!el) return;
      const { analyticsEvent, ...rest } = el.dataset;
      if (!analyticsEvent) return;

      const params: EventParams = {};
      for (const [key, value] of Object.entries(rest)) {
        // Ne retenir que les data-analytics-* et retirer le préfixe :
        // analyticsLocation -> location
        if (key.startsWith('analytics') && value != null) {
          const name = key.slice('analytics'.length);
          params[name.charAt(0).toLowerCase() + name.slice(1)] = value;
        }
      }
      trackEvent(analyticsEvent, params);
    };

    // Capture : l'événement est enregistré même si un handler en aval
    // (ex. navigation) intervient ensuite.
    document.addEventListener('click', onClick, { capture: true });
    return () =>
      document.removeEventListener('click', onClick, { capture: true });
  }, []);

  return null;
}
