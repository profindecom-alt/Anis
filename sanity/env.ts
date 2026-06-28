/**
 * Configuration Sanity lue depuis les variables d'environnement.
 * Renseigner `NEXT_PUBLIC_SANITY_PROJECT_ID` et `NEXT_PUBLIC_SANITY_DATASET`
 * dans `.env.local` (voir `.env.example`).
 *
 * Les valeurs ne sont volontairement PAS bloquantes : si elles sont absentes,
 * `hasSanityConfig` vaut `false` et le site continue de fonctionner (sans
 * articles) au lieu de planter au build.
 */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01';

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || '';

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '';

/** Vrai uniquement si projectId ET dataset sont renseignés. */
export const hasSanityConfig = Boolean(projectId && dataset);
