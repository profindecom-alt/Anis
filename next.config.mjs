/** @type {import('next').NextConfig} */

const isDev = process.env.NODE_ENV !== 'production';

// En-têtes de sécurité appliqués à toutes les routes.
// En développement, Next.js (HMR / React Refresh) a besoin de 'unsafe-eval'
// et de connexions WebSocket : sans cela la CSP casse l'hydratation et les
// sections (animées au scroll) restent invisibles. En production, la CSP
// reste stricte (pas d'eval, pas de ws).
// Domaines des outils de mesure d'audience optionnels (activés depuis Sanity :
// Google Tag Manager / GA4, Hotjar, Microsoft Clarity). Ils ne se chargent
// qu'après consentement, mais la CSP doit autoriser leurs domaines en amont.
const analytics = {
  script: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://static.hotjar.com',
    'https://script.hotjar.com',
    'https://www.clarity.ms',
    'https://scripts.clarity.ms',
  ],
  connect: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    'https://*.hotjar.com',
    'https://*.hotjar.io',
    'wss://*.hotjar.com',
    'https://*.clarity.ms',
    'https://c.bing.com',
  ],
  img: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.hotjar.com',
    'https://*.clarity.ms',
  ],
  frame: ['https://*.hotjar.com'],
  font: ['https://*.hotjar.com'],
};

const scriptSrc = [
  "script-src 'self' 'unsafe-inline'",
  isDev ? "'unsafe-eval'" : '',
  'https://plausible.io',
  ...analytics.script,
]
  .filter(Boolean)
  .join(' ');

const connectSrc = [
  "connect-src 'self' https://plausible.io",
  ...analytics.connect,
  isDev ? 'ws: wss:' : '',
]
  .filter(Boolean)
  .join(' ');

const ContentSecurityPolicy = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self'",
  // next/image optimise les images Sanity côté serveur : le navigateur les
  // charge depuis 'self' (/_next/image). cdn.sanity.io n'est nécessaire que
  // pour l'image d'attente (poster) de la vidéo du héro, servie en direct.
  `img-src 'self' data: blob: https://cdn.sanity.io ${analytics.img.join(' ')}`,
  // Vidéo du héro d'accueil (importée dans Sanity), lue directement depuis le CDN.
  "media-src 'self' blob: https://cdn.sanity.io",
  `font-src 'self' ${analytics.font.join(' ')}`,
  "style-src 'self' 'unsafe-inline'",
  scriptSrc,
  connectSrc,
  `frame-src https://www.google.com https://maps.google.com ${analytics.frame.join(' ')}`,
].join('; ');

// CSP dédiée au Sanity Studio (/studio). Le Studio est une application React
// riche qui doit dialoguer avec les API Sanity et charger ses ressources ; la
// CSP stricte du site la casserait. Elle reste limitée à la route /studio.
const studioConnect = isDev
  ? "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://*.sanity.io ws: wss:"
  : "connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io wss://*.api.sanity.io https://*.sanity.io";

const StudioCSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'none'",
  "form-action 'self' https://*.sanity.io",
  "img-src 'self' data: blob: https://cdn.sanity.io https://lh3.googleusercontent.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob:",
  "worker-src 'self' blob:",
  studioConnect,
  "frame-src 'self' https://*.sanity.io",
].join('; ');

const baseSecurityHeaders = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const securityHeaders = [
  { key: 'Content-Security-Policy', value: ContentSecurityPolicy },
  ...baseSecurityHeaders,
];

const studioHeaders = [
  { key: 'Content-Security-Policy', value: StudioCSP },
  ...baseSecurityHeaders,
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    // Sert les images locales en AVIF/WebP optimisés.
    formats: ['image/avif', 'image/webp'],
    // Autorise next/image à optimiser les images hébergées par Sanity.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async headers() {
    return [
      // CSP stricte pour tout le site SAUF /studio.
      { source: '/((?!studio).*)', headers: securityHeaders },
      // CSP permissive pour le Studio uniquement.
      { source: '/studio', headers: studioHeaders },
      { source: '/studio/:path*', headers: studioHeaders },
    ];
  },
};

export default nextConfig;
