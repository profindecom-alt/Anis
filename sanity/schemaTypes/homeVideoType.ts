import { PlayIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Bandeau vidéo de la page d'accueil (singleton : un seul document).
 *
 * Section « ambiance » placée après « Nos expertises » : une vidéo en lecture
 * automatique, muette et en boucle, avec un surtitre, un titre et un bouton
 * superposés. Tant que la section n'est pas activée (ou qu'aucune vidéo n'est
 * importée), elle ne s'affiche pas sur le site.
 */
export const homeVideoType = defineType({
  name: 'homeVideo',
  title: 'Accueil — Vidéo de présentation',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Activer la section',
      type: 'boolean',
      description:
        'Si désactivée (ou sans vidéo), la section n’apparaît pas sur la page d’accueil.',
      initialValue: false,
    }),
    defineField({
      name: 'video',
      title: 'Fichier vidéo',
      type: 'file',
      description:
        'Format conseillé : MP4 (H.264), compressé pour le web. La vidéo est muette et jouée en boucle.',
      options: { accept: 'video/mp4,video/webm' },
      validation: (rule) =>
        rule.custom((video, context) => {
          const enabled = (context.parent as { enabled?: boolean })?.enabled;
          if (enabled && !(video as { asset?: unknown })?.asset) {
            return 'Importez un fichier vidéo (ou désactivez la section).';
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

    /* --- Texte superposé ----------------------------------------- */
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      initialValue: 'Le cabinet en mouvement',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Donner de l’élan à votre patrimoine.',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Libellé du bouton',
      type: 'string',
      initialValue: 'Prendre rendez-vous',
    }),
    defineField({
      name: 'ctaHref',
      title: 'Lien du bouton',
      type: 'string',
      description: 'Chemin interne (ex. /contact#assistant) ou URL complète.',
      initialValue: '/contact#assistant',
    }),
  ],
  preview: {
    select: { enabled: 'enabled', title: 'title', poster: 'poster' },
    prepare({ enabled, title, poster }) {
      return {
        title: 'Accueil — Vidéo de présentation',
        subtitle: `${enabled ? 'Activée' : 'Désactivée'}${title ? ` · ${title}` : ''}`,
        media: poster,
      };
    },
  },
});
