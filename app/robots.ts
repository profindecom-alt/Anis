import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Back-office Sanity : hors index.
      disallow: ['/studio'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
