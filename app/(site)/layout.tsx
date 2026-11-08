import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ConsentManager from '@/components/ConsentManager';
import AnalyticsEvents from '@/components/AnalyticsEvents';
import WhatsAppButton from '@/components/WhatsAppButton';
import FloatingChatbot from '@/components/FloatingChatbot';
import CtaPopup from '@/components/CtaPopup';
import ScrollProgress from '@/components/ScrollProgress';
import EyebrowAnimator from '@/components/EyebrowAnimator';
import { site } from '@/lib/site';
import { jsonLdHtml } from '@/lib/seo';
import { getSiteSettings, resolveTracking } from '@/lib/settings';
import { getSiteInfo } from '@/lib/siteInfo';

/**
 * Balises de vérification de propriété (Google Search Console, Bing, etc.),
 * gérées depuis Sanity (Paramètres du site) et injectées dans l'en-tête.
 * Ce ne sont pas des traceurs : elles ne nécessitent pas de consentement.
 */
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  if (!settings) return {};
  // Balises de vérification nommées (fournisseurs courants) + balises libres
  // saisies dans « Autres balises de vérification ».
  const namedTags: Array<[string, string | undefined]> = [
    ['msvalidate.01', settings.bingVerification],
    ['p:domain_verify', settings.pinterestVerification],
    ['facebook-domain-verification', settings.facebookDomainVerification],
  ];
  const other = Object.fromEntries([
    ...namedTags.filter((t): t is [string, string] => Boolean(t[1])),
    ...(settings.verificationTags ?? [])
      .filter((t) => t.name && t.content)
      .map((t) => [t.name, t.content] as [string, string]),
  ]);
  return {
    verification: {
      ...(settings.googleSiteVerification
        ? { google: settings.googleSiteVerification }
        : {}),
      ...(settings.yandexVerification
        ? { yandex: settings.yandexVerification }
        : {}),
      ...(Object.keys(other).length > 0 ? { other } : {}),
    },
  };
}

/**
 * Habillage du site public : fil d'Ariane visuel, en-tête, contenu, pied de
 * page et utilitaires (consentement, WhatsApp, progression de défilement).
 * Tout ce qui ne doit PAS apparaître dans le Studio /studio vit ici.
 */
export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, info] = await Promise.all([getSiteSettings(), getSiteInfo()]);
  const sameAs = [...new Set(Object.values(info.social).filter(Boolean))];
  // Données structurées Organization (JSON-LD) pour le SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${site.url}/#organization`,
    name: site.name,
    legalName: info.legalName,
    description: site.description,
    url: site.url,
    logo: {
      '@type': 'ImageObject',
      url: `${site.url}/icon-512.png`,
      width: 512,
      height: 512,
    },
    image: `${site.url}/opengraph-image`,
    email: info.email,
    telephone: info.phone,
    address: {
      '@type': 'PostalAddress',
      streetAddress: info.address.street,
      postalCode: info.address.zip,
      addressLocality: info.address.city,
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: site.geo.lat,
      longitude: site.geo.lng,
    },
    hasMap: `https://www.google.com/maps?q=${encodeURIComponent(
      `${info.address.street} ${info.address.zip} ${info.address.city}`
    )}`,
    // Mêmes horaires que ceux affichés sur la page Contact.
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: info.phone,
      email: info.email,
      availableLanguage: ['fr'],
      areaServed: 'FR',
    },
    foundingDate: info.foundedOn,
    identifier: [
      {
        '@type': 'PropertyValue',
        name: 'SIREN',
        value: info.siren,
      },
      {
        '@type': 'PropertyValue',
        name: 'SIRET',
        value: info.siret,
      },
      {
        '@type': 'PropertyValue',
        name: 'ORIAS',
        value: info.orias,
        url: info.oriasUrl,
      },
    ],
    areaServed: {
      '@type': 'Country',
      name: 'France',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml(jsonLd) }}
      />
      <a
        href="#contenu"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest focus:px-5 focus:py-3 focus:text-sm focus:font-medium focus:text-cream focus:shadow-elevated"
      >
        Aller au contenu
      </a>
      <EyebrowAnimator />
      <ScrollProgress />
      <Header />
      <main id="contenu" tabIndex={-1} className="flex-1">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <FloatingChatbot />
      <CtaPopup />
      <AnalyticsEvents />
      <ConsentManager tracking={resolveTracking(settings)} />
    </>
  );
}
