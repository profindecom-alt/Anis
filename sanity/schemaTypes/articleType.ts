import { DocumentTextIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

import { categories } from '../../lib/categories';

/**
 * Article du blog « Actualités ». C'est le type principal que l'admin gère :
 * création, édition, mise à la une et publication.
 *
 * Le formulaire est organisé en deux onglets (groups) : « Contenu » (ce que
 * lit le visiteur) et « Métadonnées » (classement, publication, référencement).
 */
export const articleType = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  icon: DocumentTextIcon,
  groups: [
    { name: 'contenu', title: 'Contenu', default: true },
    { name: 'meta', title: 'Métadonnées' },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      group: 'contenu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Accroche',
      type: 'text',
      rows: 3,
      group: 'contenu',
      description: 'Résumé court affiché sur les cartes et en méta-description.',
      validation: (rule) => rule.required().max(300),
    }),
    defineField({
      name: 'image',
      title: 'Image de couverture',
      type: 'image',
      group: 'contenu',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Texte alternatif',
          type: 'string',
          description: "Description de l'image (accessibilité, SEO).",
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Contenu',
      type: 'blockContent',
      group: 'contenu',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'meta',
      description: "Identifiant dans l'URL : /actualites/<slug>.",
      options: { source: 'title', maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Catégorie',
      type: 'string',
      group: 'meta',
      options: {
        list: categories.map((c) => ({ title: c, value: c })),
        layout: 'dropdown',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date de publication',
      type: 'date',
      group: 'meta',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      group: 'meta',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      group: 'meta',
      validation: (rule) => rule.required().integer().min(1).max(60),
    }),
    defineField({
      name: 'featured',
      title: 'À la une',
      type: 'boolean',
      group: 'meta',
      description:
        "Met l'article en avant sur l'accueil et la page Actualités. Le plus récent l'emporte si plusieurs sont cochés.",
      initialValue: false,
    }),
  ],
  orderings: [
    {
      title: 'Date (plus récent)',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'title', category: 'category', media: 'image', date: 'date' },
    prepare({ title, category, media, date }) {
      const subtitle = [category, date].filter(Boolean).join(' · ');
      return { title, subtitle, media };
    },
  },
});
