import { type SchemaTypeDefinition } from 'sanity';

import { articleType } from './articleType';
import { blockContentType } from './blockContentType';
import { clientLogosType } from './clientLogosType';
import { expertiseFaqVideoType } from './expertiseFaqVideoType';
import { heroSettingsType } from './heroSettingsType';
import { homeApprocheVideoType } from './homeApprocheVideoType';
import { homeExpertisesVideoType } from './homeExpertisesVideoType';
import { homeVideoType } from './homeVideoType';
import { siteSettingsType } from './siteSettingsType';

/**
 * Registre des types de contenu éditables dans le Studio.
 * Pour rendre d'autres contenus éditables (expertises, témoignages,
 * paramètres du site...), ajouter ici le type document correspondant.
 */
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    articleType,
    blockContentType,
    clientLogosType,
    expertiseFaqVideoType,
    heroSettingsType,
    homeApprocheVideoType,
    homeExpertisesVideoType,
    homeVideoType,
    siteSettingsType,
  ],
};
