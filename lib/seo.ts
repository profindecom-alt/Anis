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
  noIndex?: boolean;
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
  noIndex = false,
}: PageSeo): Metadata {
  const url = `${site.url}${path === '/' ? '' : path}`;

  // Interrupteur global d'indexation. Tant que SITE_INDEXABLE n'est pas
  // explicitement « true », TOUTES les pages passent en noindex (phase de
  // pré-lancement : mentions ORIAS / adresse pas encore finalisées dans Sanity).
  // Le crawl reste autorisé (robots.txt) pour que Google VOIE la balise noindex.
  // Jour du lancement : définir SITE_INDEXABLE=true dans l'hébergeur, redéployer.
  const indexable = process.env.SITE_INDEXABLE === 'true';
  const fullTitle =
    path === '/' ? `${site.name} · ${site.baseline}` : `${title} | ${site.name}`;

  // Si une image est fournie (articles, fiches expertise), on l'utilise comme
  // visuel de partage. Sinon, on laisse Next appliquer la carte de marque
  // générée (app/opengraph-image.tsx). `image` (URL déjà résolue, ex. Sanity)
  // est prioritaire sur `imageId` (image locale).
  const ogUrl = image ?? (imageId ? imageUrl(imageId) : undefined);
  const ogImages = ogUrl
    ? [{ url: ogUrl, width: 1200, height: 630, alt: title }]
    : undefined;

  return {
    // Home : titre absolu (sinon le gabarit "%s | nom" ne s'applique pas et la
    // balise <title> serait absente). Autres pages : titre simple + gabarit.
    title: path === '/' ? { absolute: fullTitle } : title,
    description,
    alternates: {
      canonical: url,
    },
    robots: noIndex || !indexable
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: site.name,
      locale: site.locale,
      type,
      ...(ogImages ? { images: ogImages } : {}),
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      ...(ogUrl ? { images: [ogUrl] } : {}),
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
      name: site.legalName,
      url: site.url,
    },
  };
}
