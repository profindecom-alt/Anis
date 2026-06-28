import createImageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { dataset, projectId } from '../env';

const builder = createImageUrlBuilder({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
});

/**
 * Construit une URL d'image Sanity (CDN). Renvoie `null` si la source est
 * absente, afin que les composants puissent gérer proprement le cas « pas
 * d'image ». Chaîner ensuite `.width(...).height(...).url()`.
 */
export function urlForImage(source: SanityImageSource | null | undefined) {
  if (!source || !(source as { asset?: unknown }).asset) return null;
  return builder.image(source).auto('format').fit('max');
}
