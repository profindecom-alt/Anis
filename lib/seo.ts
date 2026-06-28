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
    robots: noIndex
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
