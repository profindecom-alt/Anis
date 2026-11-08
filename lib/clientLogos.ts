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
  /** Relation et droit d'usage du logo confirmés dans Sanity. */
  verified?: boolean;
}

/**
 * Seuls les logos explicitement vérifiés, avec un vrai nom de partenaire
 * (le nom sert de texte alternatif), peuvent être publiés.
 */
export function publishableLogos(logos: ClientLogo[] | undefined): ClientLogo[] {
  return (logos ?? []).filter(
    (l) =>
      l.verified === true &&
      Boolean(l.src) &&
      /\p{L}/u.test(l.name ?? '')
  );
}

export interface ClientLogos {
  enabled: boolean;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  logos: ClientLogo[];
}

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
