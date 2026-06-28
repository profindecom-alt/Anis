/**
 * Réglages du héro de la page d'accueil, pilotés depuis Sanity (/studio).
 *
 * L'admin choisit d'afficher un diaporama d'images ou une vidéo, et importe le
 * média correspondant. Sans configuration Sanity (ou si le singleton n'est pas
 * encore renseigné), `getHeroSettings` renvoie `null` : la page d'accueil
 * retombe alors sur son diaporama d'images par défaut.
 */
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { heroSettingsQuery } from '@/sanity/lib/queries';

export interface HeroSettings {
  mediaType: 'slider' | 'video';
  images: Array<{ _key: string; asset?: unknown; alt?: string } & SanityImageSource>;
  videoUrl: string | null;
  posterUrl: string | null;
  uploadedBy?: string;
  uploadedAt?: string;
}

/** Réglages du héro depuis Sanity, ou `null` (repli sur le héro par défaut). */
export async function getHeroSettings(): Promise<HeroSettings | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<HeroSettings | null>(
      heroSettingsQuery,
      {},
      { next: { revalidate: 60, tags: ['heroSettings'] } }
    );
  } catch (err) {
    console.error('[sanity] échec de récupération du héro :', err);
    return null;
  }
}
