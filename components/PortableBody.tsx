import Image from 'next/image';
import Link from 'next/link';
import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlForImage } from '@/sanity/lib/image';
import { site } from '@/lib/site';

const SITE_HOSTS = new Set([
  new URL(site.url).host,
  `www.${new URL(site.url).host}`,
]);

/**
 * Renvoie le chemin interne d'un lien s'il pointe vers le site (« /… » ou
 * « https://elanpatrimoines.fr/… »), sinon null.
 */
function toInternalPath(href: string): string | null {
  if (href.startsWith('/') && !href.startsWith('//')) return href;
  try {
    const url = new URL(href);
    if ((url.protocol === 'https:' || url.protocol === 'http:') && SITE_HOSTS.has(url.host)) {
      return `${url.pathname}${url.search}${url.hash}`;
    }
  } catch {
    /* href non absolu ou invalide */
  }
  return null;
}

/**
 * Rendu du corps d'un article (Portable Text) avec la mise en forme
 * éditoriale du site (.prose-anis). Les balises standard (p, h2, h3, ul, li,
 * strong, blockquote) sont stylées globalement ; on personnalise seulement les
 * images et les liens.
 */
const components: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      const src = urlForImage(value as unknown as SanityImageSource)
        ?.width(1200)
        .url();
      if (!src) return null;
      const alt = (value as { alt?: string }).alt ?? '';
      return (
        <figure className="my-8">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl">
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
            />
          </div>
          {alt ? (
            <figcaption className="mt-3 text-center text-sm text-ink/50">
              {alt}
            </figcaption>
          ) : null}
        </figure>
      );
    },
  },
  marks: {
    link: ({ value, children }) => {
      const raw = (value as { href?: string } | undefined)?.href ?? '#';
      const href = toInternalPath(raw);
      // Lien vers le site lui-même (chemin relatif ou URL absolue du domaine) :
      // lien interne Next, même onglet. Autres URL http(s) : nouvel onglet.
      if (href) return <Link href={href}>{children}</Link>;
      if (/^https?:\/\//.test(raw)) {
        return (
          <a href={raw} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <a href={raw}>{children}</a>;
    },
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
