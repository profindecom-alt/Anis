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
  legalName?: string;
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
  orias?: string;
  oriasUrl?: string;
  acpr?: string;
  rcs?: string;
  capital?: string;
  gtmId?: string;
  ga4Id?: string;
  hotjarId?: string;
  clarityId?: string;
  googleSiteVerification?: string;
  verificationTags?: Array<{ _key: string; name: string; content: string }>;
}

/** Identifiants de suivi exposés au composant client (consentement requis). */
export type TrackingSettings = Pick<
  SiteSettings,
  'gtmId' | 'ga4Id' | 'hotjarId' | 'clarityId'
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
