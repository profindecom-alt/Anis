/**
 * Vidéo de fond des sections « Questions fréquentes » des pages expertise,
 * pilotée depuis Sanity (/studio). Un seul réglage, partagé par toutes les
 * pages expertise.
 *
 * `getExpertiseFaqVideo` renvoie `null` si Sanity n'est pas configuré ou si le
 * singleton n'existe pas encore. La section n'affiche la vidéo que lorsqu'elle
 * est activée et qu'une vidéo a été importée ; sinon le fond bleu d'origine
 * (avec son voile) reste affiché.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { expertiseFaqVideoQuery } from '@/sanity/lib/queries';

export interface ExpertiseFaqVideo {
  enabled: boolean;
  videoUrl: string | null;
  posterUrl: string | null;
}

export async function getExpertiseFaqVideo(): Promise<ExpertiseFaqVideo | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<ExpertiseFaqVideo | null>(
      expertiseFaqVideoQuery,
      {},
      { next: { revalidate: 60, tags: ['expertiseFaqVideo'] } }
    );
  } catch (err) {
    console.error(
      '[sanity] échec de récupération de la vidéo « Questions fréquentes » :',
      err
    );
    return null;
  }
}
