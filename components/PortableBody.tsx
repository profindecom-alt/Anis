import Image from 'next/image';
import Link from 'next/link';
import {
  PortableText,
  type PortableTextComponents,
} from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlForImage } from '@/sanity/lib/image';

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
      const href = (value as { href?: string } | undefined)?.href ?? '#';
      const external = /^https?:\/\//.test(href);
      if (external) {
        return (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={href}>{children}</Link>;
    },
  },
};

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} components={components} />;
}
