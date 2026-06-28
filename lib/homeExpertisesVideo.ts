/**
 * Vidéo de fond de la section « Nos expertises » de la page d'accueil, pilotée
 * depuis Sanity (/studio).
 *
 * `getHomeExpertisesVideo` renvoie `null` si Sanity n'est pas configuré ou si le
 * singleton n'existe pas encore. La section n'affiche la vidéo que lorsqu'elle
 * est activée et qu'une vidéo a été importée ; sinon le fond bleu d'origine
 * reste affiché.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { homeExpertisesVideoQuery } from '@/sanity/lib/queries';

export interface HomeExpertisesVideo {
  enabled: boolean;
  videoUrl: string | null;
  posterUrl: string | null;
}

export async function getHomeExpertisesVideo(): Promise<HomeExpertisesVideo | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<HomeExpertisesVideo | null>(
      homeExpertisesVideoQuery,
      {},
      { next: { revalidate: 60, tags: ['homeExpertisesVideo'] } }
    );
  } catch (err) {
    console.error(
      '[sanity] échec de récupération de la vidéo « Nos expertises » :',
      err
    );
    return null;
  }
}
