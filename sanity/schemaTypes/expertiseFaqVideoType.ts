import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Vidéo de fond des sections « Questions fréquentes » des pages expertise
 * (singleton : un seul document, partagé par toutes les pages expertise).
 *
 * Lorsqu'elle est activée et qu'une vidéo est importée, celle-ci est jouée en
 * boucle, muette, derrière le voile bleu de la section (le voile est conservé
 * pour la lisibilité). Sans vidéo (ou si la section est désactivée), le fond
 * bleu dégradé d'origine reste affiché.
 */
export const expertiseFaqVideoType = defineType({
  name: 'expertiseFaqVideo',
  title: 'Expertises — Vidéo « Questions fréquentes »',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Activer la vidéo de fond',
      type: 'boolean',
      description:
        'Si désactivée (ou sans vidéo), les sections FAQ des pages expertise conservent leur fond bleu dégradé d’origine.',
      initialValue: false,
    }),
    defineField({
      name: 'video',
      title: 'Fichier vidéo',
      type: 'file',
      description:
        'Format conseillé : MP4 (H.264), compressé pour le web. La vidéo est muette et jouée en boucle, derrière le voile bleu.',
      options: { accept: 'video/mp4,video/webm' },
      validation: (rule) =>
        rule.custom((video, context) => {
          const enabled = (context.parent as { enabled?: boolean })?.enabled;
          if (enabled && !(video as { asset?: unknown })?.asset) {
            return 'Importez un fichier vidéo (ou désactivez la vidéo de fond).';
          }
          return true;
        }),
    }),
    defineField({
      name: 'poster',
      title: 'Image d’attente (poster)',
      type: 'image',
      description:
        'Affichée avant le chargement de la vidéo, et en repli si l’animation est désactivée (mouvement réduit).',
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { enabled: 'enabled', poster: 'poster' },
    prepare({ enabled, poster }) {
      return {
        title: 'Expertises — Vidéo « Questions fréquentes »',
        subtitle: enabled ? 'Activée' : 'Désactivée',
        media: poster,
      };
    },
  },
});
