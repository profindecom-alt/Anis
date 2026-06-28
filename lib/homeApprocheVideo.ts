/**
 * Vidéo de fond de la section « Notre approche » de la page d'accueil, pilotée
 * depuis Sanity (/studio).
 *
 * `getHomeApprocheVideo` renvoie `null` si Sanity n'est pas configuré ou si le
 * singleton n'existe pas encore. La section n'affiche la vidéo que lorsqu'elle
 * est activée et qu'une vidéo a été importée ; sinon le fond bleu d'origine
 * reste affiché.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { homeApprocheVideoQuery } from '@/sanity/lib/queries';

export interface HomeApprocheVideo {
  enabled: boolean;
  videoUrl: string | null;
  posterUrl: string | null;
}

export async function getHomeApprocheVideo(): Promise<HomeApprocheVideo | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<HomeApprocheVideo | null>(
      homeApprocheVideoQuery,
      {},
      { next: { revalidate: 60, tags: ['homeApprocheVideo'] } }
    );
  } catch (err) {
    console.error(
      '[sanity] échec de récupération de la vidéo « Notre approche » :',
      err
    );
    return null;
  }
}
