/**
 * Configuration de la CLI Sanity (`npx sanity ...`), utile pour des commandes
 * ponctuelles (déploiement du Studio hébergé, gestion du dataset...).
 * Le Studio embarqué dans Next n'en dépend pas.
 */
import { defineCliConfig } from 'sanity/cli';

import { dataset, projectId } from './sanity/env';

export default defineCliConfig({
  api: { projectId, dataset },
  autoUpdates: true,
});
