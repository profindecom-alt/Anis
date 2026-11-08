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
    // Mode Aperçu de GTM (Tag Assistant) et conversions Google Ads.
    'https://tagmanager.google.com',
    'https://tagassistant.google.com',
    'https://www.googleadservices.com',
    'https://googleads.g.doubleclick.net',
    'https://static.hotjar.com',
    'https://script.hotjar.com',
    'https://www.clarity.ms',
    'https://scripts.clarity.ms',
    'https://connect.facebook.net',
    'https://snap.licdn.com',
    'https://analytics.tiktok.com',
  ],
  connect: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    'https://*.google-analytics.com',
    'https://*.analytics.google.com',
    // Débogage GTM, remontée des conversions Ads et « ping » de consentement.
    'https://tagmanager.google.com',
    'https://tagassistant.google.com',
    'https://*.g.doubleclick.net',
    'https://www.google.com',
    'https://www.google.fr',
    'https://*.hotjar.com',
    'https://*.hotjar.io',
    'wss://*.hotjar.com',
    'https://*.clarity.ms',
    'https://c.bing.com',
    'https://www.facebook.com',
    'https://px.ads.linkedin.com',
    'https://analytics.tiktok.com',
  ],
  img: [
    'https://www.googletagmanager.com',
    'https://www.google-analytics.com',
    // Pixels de conversion Google Ads et ressources du mode Aperçu GTM.
    'https://tagmanager.google.com',
    'https://*.g.doubleclick.net',
    'https://www.google.com',
    'https://www.google.fr',
    'https://ssl.gstatic.com',
    'https://www.gstatic.com',
    'https://*.hotjar.com',
    'https://*.clarity.ms',
    'https://www.facebook.com',
    'https://px.ads.linkedin.com',
    'https://analytics.tiktok.com',
  ],
  frame: [
    'https://*.hotjar.com',
    // Mode Aperçu de GTM : la fenêtre de débogage s'affiche en iframe.
    'https://tagassistant.google.com',
    'https://td.doubleclick.net',
  ],
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
  { key: 'X-Robots-Tag', value: 'noindex, nofollow' },
  ...baseSecurityHeaders,
];

const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // Image Docker (voir Dockerfile) : serveur autonome minimal lancé par
  // `node server.js`. Activé uniquement par la variable du Dockerfile, pour
  // que `next start` (développement, Nixpacks) continue de fonctionner.
  ...(process.env.NEXT_OUTPUT === 'standalone' ? { output: 'standalone' } : {}),
  // Le site est construit sur le même petit VPS qui le sert : un build trop
  // gourmand gelait le serveur (504). On limite la génération statique à un
  // seul processus et on active les optimisations mémoire de webpack.
  experimental: {
    cpus: 1,
    webpackMemoryOptimizations: true,
  },
  // Métadonnées complètes dans le <head> pour TOUS les robots, Googlebot
  // compris. Sans cela, Next.js (>= 15.2) diffuse les métadonnées des pages
  // dynamiques dans le <body> : Google ignore alors le rel=canonical, qu'il
  // n'accepte que dans le <head>.
  htmlLimitedBots: /.*/,
  images: {
    // Sert les images locales en AVIF/WebP optimisés.
    formats: ['image/avif', 'image/webp'],
    // Qualités autorisées (75 = défaut de next/image, 65 = poster du héro).
    qualities: [65, 75],
    // Les variantes optimisées sont immuables : 30 jours de cache au lieu de
    // 60 secondes (revalidation permanente sinon, coûteuse sans CDN).
    minimumCacheTTL: 2592000,
    // Autorise next/image à optimiser les images hébergées par Sanity.
    remotePatterns: [{ protocol: 'https', hostname: 'cdn.sanity.io' }],
  },
  async redirects() {
    return [
      // Une seule origine canonique. Le certificat et le rattachement du
      // domaine `www` doivent aussi être configurés chez l'hébergeur pour que
      // cette redirection soit atteignable avant l'expiration TLS.
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'www.elanpatrimoines.fr' }],
        destination: 'https://elanpatrimoines.fr/:path*',
        permanent: true,
      },
      // Défense applicative pour les proxys qui transmettent le protocole
      // d'origine. La redirection d'infrastructure HTTP -> HTTPS reste requise.
      {
        source: '/:path*',
        has: [
          { type: 'host', value: 'elanpatrimoines.fr' },
          { type: 'header', key: 'x-forwarded-proto', value: 'http' },
        ],
        destination: 'https://elanpatrimoines.fr/:path*',
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      // CSP stricte pour tout le site SAUF /studio.
      { source: '/((?!studio).*)', headers: securityHeaders },
      // CSP permissive pour le Studio uniquement.
      { source: '/studio', headers: studioHeaders },
      { source: '/studio/:path*', headers: studioHeaders },
      {
        source: '/api/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
      },
    ];
  },
};

export default nextConfig;
