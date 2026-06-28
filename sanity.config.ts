/**
 * Configuration du Sanity Studio embarqué, monté sur la route /studio.
 * (voir app/studio/[[...tool]]/page.tsx)
 */
import { visionTool } from '@sanity/vision';
import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';

import { apiVersion, dataset, projectId } from './sanity/env';
import { schema } from './sanity/schemaTypes';
import { structure } from './sanity/structure';
import { elanTheme } from './sanity/theme';
import { viewOnSiteAction, withUploaderStamp } from './sanity/actions';
import StudioLogo from './sanity/components/StudioLogo';

/** Types « singleton » : un seul document, non duplicable ni supprimable. */
const SINGLETON_TYPES = new Set([
  'heroSettings',
  'homeVideo',
  'homeExpertisesVideo',
  'homeApprocheVideo',
  'clientLogos',
  'siteSettings',
]);

export default defineConfig({
  name: 'default',
  title: 'Élan Patrimoine',
  basePath: '/studio',
  // Repli pour ne pas planter le build si l'environnement n'est pas renseigné ;
  // le Studio affichera alors une erreur de configuration tant que les vraies
  // valeurs ne sont pas ajoutées dans .env.local.
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema,
  // Habillage aux couleurs Élan Patrimoine.
  theme: elanTheme,
  studio: {
    components: { logo: StudioLogo },
  },
  document: {
    // Bouton « Voir sur le site » (article) ; estampille de l'éditeur et
    // verrouillage singleton (héro d'accueil).
    actions: (prev, context) => {
      if (context.schemaType === 'article') {
        return [...prev, viewOnSiteAction];
      }
      if (SINGLETON_TYPES.has(context.schemaType)) {
        // Un singleton ne se supprime ni ne se duplique.
        const actions = prev.filter(
          ({ action }) => action !== 'delete' && action !== 'duplicate'
        );
        // Le héro estampille en plus qui a mis le média à jour (à la publication).
        if (context.schemaType === 'heroSettings') {
          return actions.map((action) =>
            action.action === 'publish' ? withUploaderStamp(action) : action
          );
        }
        return actions;
      }
      return prev;
    },
    // Les singletons ne s'ajoutent pas via le bouton « + Créer » global.
    newDocumentOptions: (prev) =>
      prev.filter((item) => !SINGLETON_TYPES.has(item.templateId)),
  },
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});
