/**
 * Bandeau vidéo de la page d'accueil, piloté depuis Sanity (/studio).
 *
 * `getHomeVideo` renvoie `null` si Sanity n'est pas configuré ou si le
 * singleton n'existe pas encore. La page d'accueil n'affiche la section que
 * lorsque celle-ci est activée et qu'une vidéo a été importée.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { homeVideoQuery } from '@/sanity/lib/queries';

export interface HomeVideo {
  enabled: boolean;
  videoUrl: string | null;
  posterUrl: string | null;
  eyebrow?: string;
  title?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export async function getHomeVideo(): Promise<HomeVideo | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<HomeVideo | null>(
      homeVideoQuery,
      {},
      { next: { revalidate: 60, tags: ['homeVideo'] } }
    );
  } catch (err) {
    console.error('[sanity] échec de récupération de la vidéo d’accueil :', err);
    return null;
  }
}
