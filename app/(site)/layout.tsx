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
import Preloader from '@/components/Preloader';
import { site } from '@/lib/site';
import { jsonLdHtml } from '@/lib/seo';
import { getSiteSettings } from '@/lib/settings';
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
  // Données structurées Organization (JSON-LD) pour le SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${site.url}/#organization`,
    name: info.legalName,
    description: site.description,
    url: site.url,
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
    sameAs: Object.values(site.social),
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    areaServed: 'FR',
    priceRange: '€€€',
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
      <Preloader />
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
      <ConsentManager
        tracking={
          settings
            ? {
                gtmId: settings.gtmId,
                ga4Id: settings.ga4Id,
                hotjarId: settings.hotjarId,
                clarityId: settings.clarityId,
                metaPixelId: settings.metaPixelId,
                linkedinPartnerId: settings.linkedinPartnerId,
                tiktokPixelId: settings.tiktokPixelId,
              }
            : undefined
        }
      />
    </>
  );
}
