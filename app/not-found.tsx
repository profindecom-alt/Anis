import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

/**
 * 404 racine : utilisé pour les URL ne correspondant à aucune route (hors
 * habillage du site). Le 404 « interne » (avec en-tête/pied de page) vit dans
 * app/(site)/not-found.tsx.
 */
export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundView />;
}
