import { groq } from 'next-sanity';

/** Champs communs renvoyés pour les cartes et listes d'articles. */
const articleFields = groq`
  "slug": slug.current,
  title,
  excerpt,
  category,
  date,
  author,
  readingTime,
  image,
  "featured": coalesce(featured, false)
`;

/** Tous les articles, du plus récent au plus ancien. */
export const allArticlesQuery = groq`
  *[_type == "article" && defined(slug.current)] | order(date desc) {
    ${articleFields}
  }
`;

/** Un article complet (avec le corps) par slug. */
export const articleBySlugQuery = groq`
  *[_type == "article" && slug.current == $slug][0] {
    ${articleFields},
    content
  }
`;

/** Article mis en avant le plus récent (s'il en existe un). */
export const featuredArticleQuery = groq`
  *[_type == "article" && featured == true] | order(date desc)[0] {
    ${articleFields}
  }
`;

/** Slugs seuls, pour generateStaticParams et le sitemap. */
export const articleSlugsQuery = groq`
  *[_type == "article" && defined(slug.current)] {
    "slug": slug.current,
    date
  }
`;

/**
 * Réglages du héro d'accueil (singleton). Renvoie le type de média choisi,
 * les images (objets image Sanity, résolus en URL côté composant) ou l'URL de
 * la vidéo et de son image d'attente.
 */
export const heroSettingsQuery = groq`
  *[_type == "heroSettings"][0] {
    "mediaType": coalesce(mediaType, "slider"),
    images[]{ _key, asset, "alt": alt },
    "videoUrl": video.asset->url,
    "posterUrl": videoPoster.asset->url,
    uploadedBy,
    uploadedAt
  }
`;

/**
 * Bandeau vidéo de la page d'accueil (singleton). Renvoie l'URL de la vidéo et
 * de son poster, l'état d'activation et les textes superposés.
 */
export const homeVideoQuery = groq`
  *[_type == "homeVideo"][0] {
    "enabled": coalesce(enabled, false),
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url,
    eyebrow,
    title,
    ctaLabel,
    ctaHref
  }
`;

/**
 * Vidéo de fond de la section « Nos expertises » (singleton). Renvoie l'état
 * d'activation, l'URL de la vidéo et celle de son image d'attente.
 */
export const homeExpertisesVideoQuery = groq`
  *[_type == "homeExpertisesVideo"][0] {
    "enabled": coalesce(enabled, false),
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url
  }
`;

/**
 * Vidéo de fond de la section « Notre approche » (singleton). Renvoie l'état
 * d'activation, l'URL de la vidéo et celle de son image d'attente.
 */
export const homeApprocheVideoQuery = groq`
  *[_type == "homeApprocheVideo"][0] {
    "enabled": coalesce(enabled, false),
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url
  }
`;

/**
 * Vidéo de fond des sections « Questions fréquentes » des pages expertise
 * (singleton, partagé par toutes les pages expertise). Renvoie l'état
 * d'activation, l'URL de la vidéo et celle de son image d'attente.
 */
export const expertiseFaqVideoQuery = groq`
  *[_type == "expertiseFaqVideo"][0] {
    "enabled": coalesce(enabled, false),
    "videoUrl": video.asset->url,
    "posterUrl": poster.asset->url
  }
`;

/**
 * Mur de logos clients (singleton). Renvoie l'état d'activation, les textes et
 * la liste des logos (URL de l'asset + nom + lien éventuel).
 */
export const clientLogosQuery = groq`
  *[_type == "clientLogos"][0] {
    "enabled": coalesce(enabled, false),
    eyebrow,
    title,
    subtitle,
    "logos": logos[]{
      name,
      url,
      "src": logo.asset->url
    }
  }
`;

/**
 * Paramètres du site (singleton) : identifiants de suivi/analytics et balises
 * de vérification de propriété.
 */
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    legalName,
    email,
    phone,
    phoneDisplay,
    whatsapp,
    address,
    linkedin,
    instagram,
    facebook,
    orias,
    oriasUrl,
    acpr,
    rcs,
    capital,
    gtmId,
    ga4Id,
    hotjarId,
    clarityId,
    googleSiteVerification,
    verificationTags[]{ _key, name, content }
  }
`;
