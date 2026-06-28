/**
 * Liste canonique des catégories d'articles.
 * Source unique partagée par le schéma Sanity (saisie) et le front
 * (filtres, typage). Modifier ici met à jour les deux.
 */
export const categories = [
  'Fiscalité',
  'Investissement',
  'Transmission',
  'Prévoyance',
  'Marchés',
  'Réglementation',
] as const;

export type Category = (typeof categories)[number];
