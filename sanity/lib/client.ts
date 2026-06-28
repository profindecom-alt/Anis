import { createClient } from 'next-sanity';

import { apiVersion, dataset, projectId } from '../env';

/**
 * Jeton de lecture, lu UNIQUEMENT côté serveur (les fetchers tournent en RSC,
 * voir lib/articles.ts) — il n'est jamais exposé au navigateur.
 * Requis seulement si le dataset Sanity est privé.
 */
const readToken = process.env.SANITY_API_READ_TOKEN;

/**
 * Client Sanity en lecture seule, utilisé côté serveur pour récupérer le
 * contenu. La fraîcheur est assurée par la revalidation Next (voir lib/articles).
 *
 * - Dataset PUBLIC (recommandé pour un site vitrine) : pas de jeton, CDN activé
 *   (rapide, mis en cache).
 * - Dataset PRIVÉ : jeton de lecture côté serveur (SANITY_API_READ_TOKEN),
 *   CDN désactivé.
 *
 * Les valeurs de repli ('placeholder' / 'production') évitent que la création
 * du client ne plante au build quand l'environnement n'est pas encore
 * renseigné ; aucune requête n'est alors émise (voir `hasSanityConfig`).
 */
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  apiVersion,
  perspective: 'published',
  ...(readToken ? { token: readToken, useCdn: false } : { useCdn: true }),
});
