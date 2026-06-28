import { ImagesIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Réglages du « héro » de la page d'accueil (singleton : un seul document).
 *
 * L'admin choisit le type de média affiché en fond du héro :
 *   - « Diaporama d'images » : plusieurs visuels enchaînés en fondu ;
 *   - « Vidéo » : une vidéo en lecture automatique (muette, en boucle).
 *
 * Les champs propres à chaque mode s'affichent/masquent selon le choix.
 * `uploadedBy` / `uploadedAt` sont renseignés automatiquement à la publication
 * (voir sanity/actions.ts) : ils indiquent qui a mis le média à jour, et quand.
 */
export const heroSettingsType = defineType({
  name: 'heroSettings',
  title: 'Accueil — Héro',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Type de média',
      type: 'string',
      description: 'Choisissez ce qui s’affiche en fond du héro d’accueil.',
      options: {
        list: [
          { title: 'Diaporama d’images', value: 'slider' },
          { title: 'Vidéo', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'slider',
      validation: (rule) => rule.required(),
    }),

    /* --- Mode diaporama -------------------------------------------- */
    defineField({
      name: 'images',
      title: 'Images du diaporama',
      type: 'array',
      description:
        'Affichées en fondu enchaîné. Glissez-déposez pour réordonner ; la première sert au chargement initial.',
      hidden: ({ parent }) => parent?.mediaType !== 'slider',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({
              name: 'alt',
              title: 'Texte alternatif',
              type: 'string',
              description: 'Description de l’image (accessibilité, SEO).',
            }),
          ],
        },
      ],
      validation: (rule) =>
        rule.custom((images, context) => {
          const type = (context.parent as { mediaType?: string })?.mediaType;
          if (type === 'slider' && (!images || images.length === 0)) {
            return 'Ajoutez au moins une image au diaporama.';
          }
          return true;
        }),
    }),

    /* --- Mode vidéo ------------------------------------------------ */
    defineField({
      name: 'video',
      title: 'Fichier vidéo',
      type: 'file',
      description:
        'Format conseillé : MP4 (H.264), compressé pour le web. La vidéo est muette et jouée en boucle.',
      options: { accept: 'video/mp4,video/webm' },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
      validation: (rule) =>
        rule.custom((video, context) => {
          const type = (context.parent as { mediaType?: string })?.mediaType;
          if (type === 'video' && !(video as { asset?: unknown })?.asset) {
            return 'Importez un fichier vidéo.';
          }
          return true;
        }),
    }),
    defineField({
      name: 'videoPoster',
      title: 'Image d’attente (poster)',
      type: 'image',
      description:
        'Affichée avant le chargement de la vidéo (et en repli si l’animation est désactivée).',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'video',
    }),

    /* --- Suivi (automatique) -------------------------------------- */
    defineField({
      name: 'uploadedBy',
      title: 'Mis à jour par',
      type: 'string',
      description: 'Renseigné automatiquement à la publication.',
      readOnly: true,
    }),
    defineField({
      name: 'uploadedAt',
      title: 'Mis à jour le',
      type: 'datetime',
      description: 'Renseigné automatiquement à la publication.',
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      mediaType: 'mediaType',
      uploadedBy: 'uploadedBy',
      firstImage: 'images.0',
      poster: 'videoPoster',
    },
    prepare({ mediaType, uploadedBy, firstImage, poster }) {
      const label = mediaType === 'video' ? 'Vidéo' : 'Diaporama d’images';
      return {
        title: 'Héro d’accueil',
        subtitle: uploadedBy ? `${label} · ${uploadedBy}` : label,
        media: mediaType === 'video' ? poster : firstImage,
      };
    },
  },
});
