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
      name: 'seoTitle',
      title: 'Titre SEO',
      type: 'string',
      group: 'meta',
      description:
        'Titre facultatif pour Google (sans le nom de la marque). Laisser vide pour utiliser le titre de l\'article.',
      validation: (rule) =>
        rule.max(60).warning('Visez 60 caractères maximum pour limiter la troncature.'),
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
      name: 'metaDescription',
      title: 'Méta-description SEO',
      type: 'text',
      rows: 3,
      group: 'meta',
      description:
        'Description facultative pour les moteurs de recherche. Laisser vide pour utiliser l\'accroche.',
      validation: (rule) =>
        rule.max(160).warning('Visez 150 à 160 caractères maximum.'),
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
          validation: (rule) => [
            rule.required(),
            rule.max(180).warning('Décrivez brièvement le contenu utile de l’image.'),
          ],
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
      description:
        'Date réelle de première publication. Un article daté dans le futur reste masqué sur le site jusqu’à cette date.',
      options: { dateFormat: 'DD/MM/YYYY' },
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => [
        rule.required(),
        rule
          .custom((value) =>
            typeof value === 'string' && value > new Date().toISOString().slice(0, 10)
              ? 'Date future : l’article restera invisible jusqu’à cette date.'
              : true
          )
          .warning(),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Auteur',
      type: 'string',
      group: 'meta',
      initialValue: 'Équipe éditoriale Élan Patrimoine',
      validation: (rule) =>
        rule.required().custom((value) =>
          value === 'Antoine Gérard' || value === 'Sophie Laurent'
            ? 'Ces noms provenaient des données de démonstration. Indiquez un auteur vérifiable ou la signature éditoriale.'
            : true
        ),
    }),
    defineField({
      name: 'authorRole',
      title: 'Fonction de l\'auteur',
      type: 'string',
      group: 'meta',
      description: 'Ex. « Conseiller en gestion de patrimoine ».',
    }),
    defineField({
      name: 'authorUrl',
      title: 'Profil public de l\'auteur',
      type: 'url',
      group: 'meta',
      description:
        'Page auteur ou profil professionnel vérifiable. Ne pas renseigner un profil générique.',
    }),
    // Ancien champ saisi à la main : le temps de lecture est désormais calculé
    // à partir du nombre de mots du contenu. Conservé (masqué) pour ne pas
    // signaler de champ inconnu sur les documents existants.
    defineField({
      name: 'readingTime',
      title: 'Temps de lecture (minutes)',
      type: 'number',
      group: 'meta',
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: 'noIndex',
      title: 'Masquer des moteurs de recherche',
      type: 'boolean',
      group: 'meta',
      description:
        "L'article reste lisible sur le site mais sort de l'index Google et du sitemap (noindex). Les articles de moins de 300 mots sont de toute façon masqués automatiquement jusqu'à leur réécriture.",
      initialValue: false,
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
