import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Inter, Dancing_Script } from 'next/font/google';
import './globals.css';
import { site } from '@/lib/site';

const serif = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

// Script manuscrit, réservé à l'animation « écriture au stylo ».
const script = Dancing_Script({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-script',
  display: 'swap',
});

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} · ${site.baseline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    locale: site.locale,
    siteName: site.name,
    url: site.url,
    title: `${site.name} · ${site.baseline}`,
    description: site.description,
  },
  twitter: {
    card: 'summary_large_image',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0f2d52',
};

/**
 * Layout racine minimal : ne contient que <html>/<body>, les polices et les
 * styles globaux. L'habillage du site (en-tête, pied de page, etc.) vit dans
 * app/(site)/layout.tsx ; le Studio (app/studio) s'affiche ainsi en plein
 * écran, sans en-tête ni pied de page.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // suppressHydrationWarning : certaines extensions de navigateur injectent
    // des attributs sur <html>/<body> avant l'hydratation (ex. data-atm-ext-installed).
    <html lang="fr" className={`${serif.variable} ${sans.variable} ${script.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-cream" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
