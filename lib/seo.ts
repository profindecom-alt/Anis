import type { Metadata } from 'next';
import { site } from './site';
import { imageUrl } from './images';

interface PageSeo {
  title: string;
  description: string;
  path: string; // ex: "/le-cabinet"
  /** Image locale (clé de lib/images) — pages institutionnelles / expertises. */
  imageId?: string;
  /** URL d'image déjà résolue (ex : image Sanity d'un article). Prioritaire. */
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  /** Ignore le gabarit global du titre (utile pour les titres d'articles longs). */
  absoluteTitle?: boolean;
  /** Titre éditorial complet utilisé sur les cartes sociales. */
  socialTitle?: string;
  authors?: { name: string; url?: string }[];
  noIndex?: boolean;
  /**
   * La route fournit ses propres images de partage via les fichiers
   * `opengraph-image.tsx` / `twitter-image.tsx` : on n'en déclare pas ici,
   * sinon la valeur déclarée l'emporte sur l'image générée.
   */
  fileImage?: boolean;
}

/** Carte de marque utilisée quand une page ne fournit pas de visuel propre. */
export const defaultSocialImage = `${site.url}/opengraph-image`;

/** Vrai uniquement si l'indexation est explicitement activée. */
export const siteIndexable = process.env.SITE_INDEXABLE === 'true';

// Garde-fou de déploiement : sans SITE_INDEXABLE=true au moment du build,
// TOUT le site sort en noindex sans la moindre erreur. On le signale haut et
// fort dans les journaux de build et de serveur de production.
if (process.env.NODE_ENV === 'production' && !siteIndexable) {
  console.warn(
    '\n[seo] ATTENTION : SITE_INDEXABLE n’est pas "true". Toutes les pages ' +
      'seront servies en noindex,nofollow. Définissez la variable (disponible ' +
      'au build) dans l’hébergeur si le site doit être indexé.\n'
  );
}

/**
 * Construit l'objet Metadata Next.js conforme aux exigences SEO du cahier
 * des charges : canonical absolu, meta description, Open Graph, Twitter card,
 * robots index/follow et viewport (géré globalement).
 */
export function buildMetadata({
  title,
  description,
  path,
  imageId,
  image,
  type = 'website',
  publishedTime,
  modifiedTime,
  absoluteTitle = false,
  socialTitle,
  authors,
  noIndex = false,
  fileImage = false,
}: PageSeo): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;

  // Interrupteur global d'indexation. Tant que SITE_INDEXABLE n'est pas
  // explicitement « true », TOUTES les pages passent en noindex (phase de
  // pré-lancement : mentions ORIAS / adresse pas encore finalisées dans Sanity).
  // Le crawl reste autorisé (robots.txt) pour que Google VOIE la balise noindex.
  // Jour du lancement : définir SITE_INDEXABLE=true dans l'hébergeur, redéployer.
  const fullTitle =
    path === '/'
      ? `${site.name} · ${site.baseline}`
      : `${socialTitle ?? title} | ${site.name}`;

  // Un objet `openGraph` défini au niveau de la page remplace celui du layout
  // parent dans Next.js. Il faut donc toujours fournir une image ici : sans ce
  // repli explicite, les pages institutionnelles perdaient `og:image` et
  // `twitter:image` malgré la route app/opengraph-image.tsx.
  const selectedImage = image ?? (imageId ? imageUrl(imageId) : defaultSocialImage);
  const ogUrl = new URL(selectedImage, site.url).toString();
  const ogImages = [{ url: ogUrl, width: 1200, height: 630, alt: title }];

  return {
    // Home : titre absolu (sinon le gabarit "%s | nom" ne s'applique pas et la
    // balise <title> serait absente). Autres pages : titre simple + gabarit.
    title:
      path === '/' || absoluteTitle
        ? { absolute: path === '/' ? fullTitle : title }
        : title,
    description,
    ...(authors?.length ? { authors } : {}),
    alternates: {
      canonical: url,
    },
    // Page écartée individuellement (ex. article à réécrire) : noindex mais
    // liens suivis. Interrupteur global coupé : noindex,nofollow partout.
    robots: !siteIndexable
      ? { index: false, follow: false }
      : noIndex
        ? { index: false, follow: true }
        : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(fileImage ? {} : { images: ogImages }),
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(fileImage ? {} : { images: [{ url: ogUrl, alt: title }] }),
    },
  };
}

/**
 * Sérialise un objet en chaîne JSON sûre pour un `<script type="application/ld+json">`.
 * `JSON.stringify` n'échappe pas `<`, `>`, `&` ni les séparateurs de ligne U+2028/2029 :
 * un champ issu du CMS contenant `</script>` pourrait sinon rompre la balise et injecter
 * du HTML. On échappe donc ces caractères sous forme d'échappements Unicode (le JSON
 * reste valide et équivalent). À utiliser avec `dangerouslySetInnerHTML`.
 */
export function jsonLdHtml(data: unknown): string {
  // U+2028 (LINE SEPARATOR) et U+2029 (PARAGRAPH SEPARATOR) sont des sauts de
  // ligne valides en JS mais problématiques dans un script inline : on les
  // échappe au même titre que <, > et &. On les référence via fromCharCode
  // pour garder une source strictement ASCII.
  const LS = String.fromCharCode(0x2028);
  const PS = String.fromCharCode(0x2029);
  return JSON.stringify(data)
    .split('<').join('\\u003c')
    .split('>').join('\\u003e')
    .split('&').join('\\u0026')
    .split(LS).join('\\u2028')
    .split(PS).join('\\u2029');
}

/**
 * Données structurées BreadcrumbList (JSON-LD) pour le fil d'Ariane.
 * « Accueil » est ajouté automatiquement en première position.
 */
export function breadcrumbJsonLd(items: { label: string; href?: string }[]) {
  const list = [{ label: 'Accueil', href: '/' }, ...items];
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: list.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      ...(it.href
        ? { item: `${site.url}${it.href === '/' ? '' : it.href}` }
        : {}),
    })),
  };
}

/**
 * Données structurées WebSite (JSON-LD), à placer sur la page d'accueil
 * uniquement : Google s'en sert en priorité pour choisir le nom du site
 * affiché dans les résultats.
 */
export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.url}/#website`,
    url: `${site.url}/`,
    name: site.name,
    alternateName: ['Elan Patrimoine'],
    inLanguage: 'fr-FR',
    publisher: { '@id': `${site.url}/#organization` },
  };
}

/** Données structurées FAQPage (JSON-LD) pour les questions fréquentes. */
export function faqJsonLd(items: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.q,
      acceptedAnswer: { '@type': 'Answer', text: it.a },
    })),
  };
}

/** Données structurées Service (JSON-LD) pour une fiche expertise. */
export function serviceJsonLd({
  name,
  description,
  path,
}: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    serviceType: name,
    description,
    url: `${site.url}${path}`,
    areaServed: 'FR',
    provider: {
      '@type': 'FinancialService',
      '@id': `${site.url}/#organization`,
      name: site.name,
      legalName: site.legalName,
      url: site.url,
    },
  };
}
