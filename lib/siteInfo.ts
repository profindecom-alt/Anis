/**
 * Coordonnées du cabinet, fusionnées depuis Sanity (Paramètres du site ▸
 * Coordonnées & mentions) par-dessus les valeurs par défaut de `lib/site.ts`.
 * L'identité légale reste toutefois issue du code : une ancienne valeur CMS ne
 * doit jamais réintroduire une raison sociale, un capital ou un identifiant
 * d'immatriculation erroné dans les pages ou les données structurées.
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

/**
 * Retire les paramètres de suivi (`?igsh=…`, `utm_*`) et le fragment d'une
 * URL de profil social saisie dans le CMS : l'URL publiée (pied de page,
 * `sameAs`) doit être l'adresse canonique du profil.
 */
function cleanProfileUrl(value: string): string {
  try {
    const url = new URL(value);
    url.search = '';
    url.hash = '';
    return url.toString();
  } catch {
    return value;
  }
}

/** Renvoie un objet de même forme que `site`, enrichi des valeurs Sanity. */
export async function getSiteInfo() {
  const s = await getSiteSettings();
  return {
    ...site,
    // Champs légaux immuables, alignés sur le Registre national des
    // entreprises. Les anciens champs Sanity legalName/rcs/capital ont été
    // retirés du schéma et sont volontairement ignorés ici.
    legalName: site.legalName,
    legalForm: site.legalForm,
    siren: site.siren,
    siret: site.siret,
    registration: site.registration,
    foundedOn: site.foundedOn,
    foundedDisplay: site.foundedDisplay,
    activity: site.activity,
    ape: site.ape,
    rcs: site.rcs,
    capital: site.capital,
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
    // Numéro ORIAS : toujours la valeur du code, non surchargeable depuis Sanity.
    orias: site.orias,
    oriasUrl: s?.oriasUrl || site.oriasUrl,
    acpr: s?.acpr || site.acpr,
    social: {
      ...site.social,
      linkedin: cleanProfileUrl(s?.linkedin || site.social.linkedin),
      instagram: cleanProfileUrl(s?.instagram || site.social.instagram),
      // Facebook : l'identifiant du profil est porté par ?id= — on le garde.
      facebook: s?.facebook || site.social.facebook,
    },
  };
}

export type SiteInfo = Awaited<ReturnType<typeof getSiteInfo>>;
