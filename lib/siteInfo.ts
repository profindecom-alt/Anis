/**
 * Coordonnées et mentions du cabinet, fusionnées depuis Sanity (Paramètres du
 * site ▸ Coordonnées & mentions) par-dessus les valeurs par défaut de
 * `lib/site.ts`. Tout champ laissé vide dans Sanity conserve la valeur du code.
 *
 * À utiliser dans les composants serveur (footer, pages légales, page contact,
 * JSON-LD…) pour afficher des coordonnées modifiables sans redéploiement.
 *
 * Remarque : les métadonnées SEO (lib/seo.ts) et la carte de partage générée
 * (lib/og-image.tsx) continuent d'utiliser les constantes de `lib/site.ts`
 * (nom de marque, URL canonique) — elles ne changent pas au fil de l'eau.
 */
import { site } from './site';
import { getSiteSettings } from './settings';

/** Renvoie un objet de même forme que `site`, enrichi des valeurs Sanity. */
export async function getSiteInfo() {
  const s = await getSiteSettings();
  return {
    ...site,
    legalName: s?.legalName || site.legalName,
    email: s?.email || site.email,
    phone: s?.phone || site.phone,
    phoneDisplay: s?.phoneDisplay || site.phoneDisplay,
    whatsapp: s?.whatsapp || site.whatsapp,
    address: {
      ...site.address,
      street: s?.address?.street || site.address.street,
      zip: s?.address?.zip || site.address.zip,
      city: s?.address?.city || site.address.city,
      country: s?.address?.country || site.address.country,
    },
    orias: s?.orias || site.orias,
    oriasUrl: s?.oriasUrl || site.oriasUrl,
    acpr: s?.acpr || site.acpr,
    rcs: s?.rcs || site.rcs,
    capital: s?.capital || site.capital,
    social: {
      ...site.social,
      linkedin: s?.linkedin || site.social.linkedin,
      instagram: s?.instagram || site.social.instagram,
      facebook: s?.facebook || site.social.facebook,
    },
  };
}

export type SiteInfo = Awaited<ReturnType<typeof getSiteInfo>>;
