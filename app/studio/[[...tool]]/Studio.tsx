'use client';

/**
 * Frontière client du Studio : c'est ici (et pas dans page.tsx, un composant
 * serveur) qu'on importe la configuration Sanity. Sans cela, le paquet `sanity`
 * serait évalué dans le graphe React Server Components, où `createContext`
 * n'existe pas — d'où l'erreur « createContext is not a function » au build.
 */
import { NextStudio } from 'next-sanity/studio';

import config from '../../../sanity.config';

export default function Studio() {
  return <NextStudio config={config} />;
}
