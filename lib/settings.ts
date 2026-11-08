/**
 * Paramètres du site pilotés depuis Sanity (/studio) : suivi d'audience et
 * balises de vérification de propriété.
 *
 * Sans configuration Sanity (ou si le singleton n'est pas renseigné),
 * `getSiteSettings` renvoie `null` et le site fonctionne sans suivi additionnel.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { siteSettingsQuery } from '@/sanity/lib/queries';

export interface SiteSettings {
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  whatsapp?: string;
  address?: {
    street?: string;
    zip?: string;
    city?: string;
    country?: string;
  };
  linkedin?: string;
  instagram?: string;
  facebook?: string;
  // orias volontairement absent : le numéro est en dur dans lib/site.ts.
  oriasUrl?: string;
  acpr?: string;
  gtmId?: string;
  ga4Id?: string;
  hotjarId?: string;
  clarityId?: string;
  metaPixelId?: string;
  linkedinPartnerId?: string;
  tiktokPixelId?: string;
  googleSiteVerification?: string;
  bingVerification?: string;
  pinterestVerification?: string;
  facebookDomainVerification?: string;
  yandexVerification?: string;
  verificationTags?: Array<{ _key: string; name: string; content: string }>;
}

/** Identifiants de suivi exposés au composant client (consentement requis). */
export type TrackingSettings = Pick<
  SiteSettings,
  | 'gtmId'
  | 'ga4Id'
  | 'hotjarId'
  | 'clarityId'
  | 'metaPixelId'
  | 'linkedinPartnerId'
  | 'tiktokPixelId'
>;

/** Paramètres du site depuis Sanity, ou `null` si non configuré. */
export async function getSiteSettings(): Promise<SiteSettings | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<SiteSettings | null>(
      siteSettingsQuery,
      {},
      { next: { revalidate: 60, tags: ['siteSettings'] } }
    );
  } catch (err) {
    console.error('[sanity] échec de récupération des paramètres :', err);
    return null;
  }
}

/**
 * Identifiants de suivi effectivement utilisés par le site.
 *
 * Ordre de priorité : Sanity (modifiable sans redéploiement) puis variables
 * d'environnement (utile si le CMS n'est pas configuré, ou pour figer les
 * identifiants côté hébergeur). Renvoie `undefined` si aucun outil n'est
 * configuré — dans ce cas aucun script de mesure n'est monté du tout.
 *
 * Les variables NEXT_PUBLIC_* sont remplacées à la compilation : elles doivent
 * être référencées littéralement, pas via un accès dynamique.
 */
export function resolveTracking(
  settings: SiteSettings | null
): TrackingSettings | undefined {
  const tracking: TrackingSettings = {
    gtmId: settings?.gtmId || process.env.NEXT_PUBLIC_GTM_ID || undefined,
    ga4Id: settings?.ga4Id || process.env.NEXT_PUBLIC_GA4_ID || undefined,
    hotjarId: settings?.hotjarId,
    clarityId: settings?.clarityId,
    metaPixelId: settings?.metaPixelId,
    linkedinPartnerId: settings?.linkedinPartnerId,
    tiktokPixelId: settings?.tiktokPixelId,
  };
  const configured = Object.values(tracking).some(Boolean);
  if (!configured) return undefined;

  // Garde-fou : GTM et GA4 direct ensemble comptent chaque page deux fois si
  // le conteneur GTM contient (comme recommandé) une balise GA4. Le rendu
  // ignore déjà ga4Id quand gtmId est présent ; on le signale en développement.
  if (process.env.NODE_ENV !== 'production' && tracking.gtmId && tracking.ga4Id) {
    console.warn(
      '[analytics] GTM et GA4 sont tous deux renseignés : ' +
        'la balise GA4 doit être configurée DANS le conteneur GTM. ' +
        "L'identifiant G-… est ignoré tant que GTM-… est présent."
    );
  }
  return tracking;
}
