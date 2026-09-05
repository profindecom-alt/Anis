/**
 * Consentement cookies (RGPD / CNIL) et « Consent Mode v2 » de Google.
 *
 * Deux niveaux se combinent :
 *  1. Le site ne charge AUCUN script de mesure tant que le visiteur n'a pas
 *     accepté (voir ConsentManager) — c'est la garantie la plus forte.
 *  2. En complément, l'état de consentement est déclaré à Google via le
 *     « Consent Mode v2 » : les balises GTM/GA4 savent ainsi qu'elles doivent
 *     rester en mode restreint (aucun cookie) tant que rien n'est accordé, et
 *     repassent en mode normal après acceptation. Google impose ce mécanisme
 *     depuis mars 2024 pour l'EEE.
 *
 * Le script `consentDefaultScript` doit s'exécuter AVANT tout script Google :
 * il est injecté en `beforeInteractive` dans app/layout.tsx.
 */

/** Clé localStorage conservant le choix du visiteur. */
export const CONSENT_STORAGE_KEY = 'elan-consent';

/** Événement interne : rouvrir le bandeau depuis « Gérer les cookies ». */
export const CONSENT_OPEN_EVENT = 'elan:open-consent';

export type ConsentValue = 'granted' | 'denied';

/** Choix mémorisé, ou `null` si le visiteur ne s'est pas encore prononcé. */
export function readStoredConsent(): ConsentValue | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === 'granted' || stored === 'denied' ? stored : null;
  } catch {
    return null; // localStorage indisponible (navigation privée, blocage…)
  }
}

/** Mémorise le choix du visiteur (sans effet si localStorage est bloqué). */
export function storeConsent(value: ConsentValue): void {
  try {
    localStorage.setItem(CONSENT_STORAGE_KEY, value);
  } catch {
    /* ignore */
  }
}

/**
 * Snippet exécuté avant toute balise Google. Il installe `dataLayer`/`gtag`,
 * refuse par défaut TOUS les usages nécessitant un stockage, puis restaure
 * immédiatement l'accord d'un visiteur qui a déjà accepté lors d'une visite
 * précédente (sinon la première page de la session ne serait pas comptée).
 *
 * `security_storage` reste accordé : il ne sert qu'à la lutte anti-fraude et
 * ne dépose pas de cookie de mesure.
 */
export const consentDefaultScript = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  analytics_storage:'denied',
  functionality_storage:'denied',
  personalization_storage:'denied',
  security_storage:'granted',
  wait_for_update:500
});
gtag('set','ads_data_redaction',true);
gtag('set','url_passthrough',true);
try{
  if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){
    gtag('consent','update',{
      ad_storage:'granted',
      ad_user_data:'granted',
      ad_personalization:'granted',
      analytics_storage:'granted',
      functionality_storage:'granted',
      personalization_storage:'granted',
      security_storage:'granted'
    });
  }
}catch(e){}
`.trim();

/**
 * Met à jour l'état Consent Mode après un choix explicite du visiteur.
 * Sans balise Google chargée, l'appel empile seulement l'information dans
 * `dataLayer` : aucune requête réseau n'est émise.
 */
export function updateGoogleConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return;
  const state = value === 'granted' ? 'granted' : 'denied';
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: state,
      ad_user_data: state,
      ad_personalization: state,
      analytics_storage: state,
      functionality_storage: state,
      personalization_storage: state,
      security_storage: 'granted',
    });
  }
  // Événement dédié : permet de déclencher des balises GTM au moment du choix.
  window.dataLayer.push({ event: 'consent_update', consent_state: state });
}

/**
 * Supprime les cookies déposés par Google (mesure et publicité) lorsqu'un
 * visiteur retire son consentement. Les scripts déjà chargés restent en
 * mémoire jusqu'au prochain chargement de page, mais ils n'écrivent plus rien
 * (Consent Mode repassé en « denied ») et leurs cookies disparaissent.
 */
export function clearGoogleCookies(): void {
  if (typeof document === 'undefined') return;
  const names = document.cookie
    .split(';')
    .map((c) => c.split('=')[0]?.trim())
    .filter((name): name is string =>
      Boolean(
        name &&
          (name === '_ga' ||
            name === '_gid' ||
            name.startsWith('_ga_') ||
            name.startsWith('_gcl_') ||
            name.startsWith('_gac_'))
      )
    );
  if (names.length === 0) return;

  // Le cookie a pu être posé sur le domaine exact ou sur le domaine parent
  // (.exemple.fr) : on tente les deux, sinon la suppression échoue en silence.
  const host = window.location.hostname;
  const domains = [undefined, host, `.${host}`, `.${host.split('.').slice(-2).join('.')}`];
  for (const name of names) {
    for (const domain of domains) {
      document.cookie = `${name}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT${
        domain ? `; domain=${domain}` : ''
      }`;
    }
  }
}
