import {
  DocumentTextIcon,
  StarIcon,
  EditIcon,
  TagIcon,
  ImagesIcon,
  PlayIcon,
  UsersIcon,
  CogIcon,
} from '@sanity/icons';
import type { StructureResolver } from 'sanity/structure';

import { categories } from '../lib/categories';

const dateDesc = [{ field: 'date', direction: 'desc' as const }];

/** Types « singleton » gérés via une entrée dédiée (voir sanity.config.ts). */
const SINGLETON_IDS = [
  'heroSettings',
  'homeVideo',
  'homeExpertisesVideo',
  'homeApprocheVideo',
  'clientLogos',
  'expertiseFaqVideo',
  'siteSettings',
];

/**
 * Organisation de la barre latérale du Studio :
 *   Page d'accueil ▸ Héro
 *   Articles ▸ Tous · À la une · Brouillons · Par catégorie
 * Tout nouveau type de document apparaîtra automatiquement à la racine.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Contenu')
    .items([
      S.listItem()
        .title('Accueil — Héro')
        .icon(ImagesIcon)
        .child(
          S.document()
            .schemaType('heroSettings')
            .documentId('heroSettings')
            .title('Accueil — Héro')
        ),
      S.listItem()
        .title('Accueil — Vidéo de présentation')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('homeVideo')
            .documentId('homeVideo')
            .title('Accueil — Vidéo de présentation')
        ),
      S.listItem()
        .title('Accueil — Vidéo « Nos expertises »')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('homeExpertisesVideo')
            .documentId('homeExpertisesVideo')
            .title('Accueil — Vidéo « Nos expertises »')
        ),
      S.listItem()
        .title('Accueil — Vidéo « Notre approche »')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('homeApprocheVideo')
            .documentId('homeApprocheVideo')
            .title('Accueil — Vidéo « Notre approche »')
        ),
      S.listItem()
        .title('Expertises — Vidéo « Questions fréquentes »')
        .icon(PlayIcon)
        .child(
          S.document()
            .schemaType('expertiseFaqVideo')
            .documentId('expertiseFaqVideo')
            .title('Expertises — Vidéo « Questions fréquentes »')
        ),
      S.listItem()
        .title('Accueil — Logos clients')
        .icon(UsersIcon)
        .child(
          S.document()
            .schemaType('clientLogos')
            .documentId('clientLogos')
            .title('Accueil — Logos clients')
        ),
      S.divider(),
      S.listItem()
        .title('Articles')
        .icon(DocumentTextIcon)
        .child(
          S.list()
            .title('Articles')
            .items([
              S.listItem()
                .title('Tous les articles')
                .icon(DocumentTextIcon)
                .child(
                  S.documentTypeList('article')
                    .title('Tous les articles')
                    .defaultOrdering(dateDesc)
                ),
              S.listItem()
                .title('À la une')
                .icon(StarIcon)
                .child(
                  S.documentList()
                    .title('À la une')
                    .schemaType('article')
                    .filter('_type == "article" && featured == true')
                    .defaultOrdering(dateDesc)
                ),
              S.listItem()
                .title('Brouillons')
                .icon(EditIcon)
                .child(
                  S.documentList()
                    .title('Brouillons')
                    .schemaType('article')
                    .filter('_type == "article" && _id in path("drafts.**")')
                    .defaultOrdering(dateDesc)
                ),
              S.divider(),
              S.listItem()
                .title('Par catégorie')
                .icon(TagIcon)
                .child(
                  S.list()
                    .title('Par catégorie')
                    .items(
                      categories.map((cat, i) =>
                        S.listItem()
                          .id(`category-${i}`)
                          .title(cat)
                          .icon(TagIcon)
                          .child(
                            S.documentList()
                              .title(cat)
                              .schemaType('article')
                              .filter('_type == "article" && category == $cat')
                              .params({ cat })
                              .defaultOrdering(dateDesc)
                          )
                      )
                    )
                ),
            ])
        ),
      S.divider(),
      S.listItem()
        .title('Paramètres du site')
        .icon(CogIcon)
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Paramètres du site')
        ),
      S.divider(),
      // Types de documents futurs (hors article et singletons), repris
      // automatiquement à la racine.
      ...S.documentTypeListItems().filter((item) => {
        const id = item.getId();
        return id !== 'article' && !SINGLETON_IDS.includes(id ?? '');
      }),
    ]);
