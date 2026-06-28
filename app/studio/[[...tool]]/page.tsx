/**
 * Espace d'administration (Sanity Studio) servi sous /studio.
 * La route attrape-tout délègue tout le routage interne au Studio.
 * https://www.sanity.io/docs/embedding-sanity-studio
 *
 * Ce composant serveur ne fait que rendre la frontière client <Studio/> :
 * la configuration Sanity n'est ainsi jamais évaluée côté RSC.
 */
import type { Metadata, Viewport } from 'next';
import Studio from './Studio';

export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: 'Studio',
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Le Studio gère sa propre mise à l'échelle ; on évite tout zoom indésirable.
  maximumScale: 1,
};

export default function StudioPage() {
  return <Studio />;
}
