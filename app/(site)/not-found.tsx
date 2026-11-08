import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

export const metadata: Metadata = {
  title: 'Page introuvable',
  // Pas de balise robots ici : Next.js ajoute lui-même « noindex » aux
  // réponses 404. En déclarer une seconde produirait deux directives.
};

export default function NotFound() {
  return <NotFoundView />;
}
