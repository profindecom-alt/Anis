/**
 * Mur de logos clients de la page d'accueil, piloté depuis Sanity (/studio).
 *
 * `getClientLogos` renvoie `null` si Sanity n'est pas configuré. La page
 * d'accueil n'affiche la section que lorsqu'elle est activée et qu'au moins un
 * logo est renseigné.
 */
import { hasSanityConfig } from '@/sanity/env';
import { client } from '@/sanity/lib/client';
import { clientLogosQuery } from '@/sanity/lib/queries';

export interface ClientLogo {
  name: string;
  src: string | null;
  url?: string | null;
}

export interface ClientLogos {
  enabled: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  logos: ClientLogo[];
}

/**
 * Logos partenaires par défaut, affichés tant qu'aucun logo n'est renseigné
 * dans Sanity (sans image : repli texte en serif). PLACEHOLDER à remplacer
 * par les vrais partenaires (et leurs logos) avant la mise en ligne.
 */
export const defaultPartnerLogos: ClientLogo[] = [
  { name: 'Generali' },
  { name: 'Swiss Life' },
  { name: 'AXA' },
  { name: 'Spirica' },
  { name: 'Nortia' },
  { name: 'Apicil' },
  { name: 'Cardif' },
  { name: 'Abeille Assurances' },
].map((l) => ({ ...l, src: null }));

export async function getClientLogos(): Promise<ClientLogos | null> {
  if (!hasSanityConfig) return null;
  try {
    return await client.fetch<ClientLogos | null>(
      clientLogosQuery,
      {},
      { next: { revalidate: 60, tags: ['clientLogos'] } }
    );
  } catch (err) {
    console.error('[sanity] échec de récupération des logos clients :', err);
    return null;
  }
}
