import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

/**
 * 404 racine : utilisé pour les URL ne correspondant à aucune route (hors
 * habillage du site). Le 404 « interne » (avec en-tête/pied de page) vit dans
 * app/(site)/not-found.tsx.
 */
export const metadata: Metadata = {
  title: 'Page introuvable',
  // Pas de balise robots ici : Next.js ajoute lui-même « noindex » aux
  // réponses 404. En déclarer une seconde produirait deux directives.
};

export default function NotFound() {
  return <NotFoundView />;
}
