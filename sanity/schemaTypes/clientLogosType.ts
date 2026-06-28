import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Bandeau « Nos partenaires » (accueil) : mur de logos partenaires défilant en
 * niveaux de gris, colorés au survol (assureurs, sociétés de gestion,
 * plateformes…). Singleton. Tant que la section n'est pas activée (ou sans
 * logo), elle ne s'affiche pas sur le site.
 *
 * Les agréments / labels réglementaires (ORIAS, AMF…) ne sont pas gérés ici :
 * ils sont codés en dur dans le composant (rangée fixe, en couleur).
 */
export const clientLogosType = defineType({
  name: 'clientLogos',
  title: 'Accueil — Partenaires',
  type: 'document',
  icon: UsersIcon,
  fields: [
    defineField({
      name: 'enabled',
      title: 'Activer la section',
      type: 'boolean',
      description:
        'Si désactivée (ou sans logo), la section n’apparaît pas sur la page d’accueil.',
      initialValue: false,
    }),
    defineField({
      name: 'eyebrow',
      title: 'Surtitre',
      type: 'string',
      initialValue: 'Architecture ouverte',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Nos partenaires, choisis en toute indépendance',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      description: 'Optionnel. Une phrase d’introduction sous le titre.',
      initialValue:
        'Indépendants, nous sélectionnons librement les meilleures solutions du marché pour ne servir que vos intérêts.',
    }),
    defineField({
      name: 'logos',
      title: 'Logos',
      type: 'array',
      description:
        'Logos partenaires affichés en niveaux de gris, colorés au survol. PNG transparent ou SVG recommandé.',
      of: [
        {
          type: 'object',
          name: 'clientLogo',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom du partenaire',
              type: 'string',
              description: 'Sert de texte alternatif (accessibilité).',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'logo',
              title: 'Logo',
              type: 'image',
              options: { accept: 'image/png,image/jpeg,image/svg+xml' },
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'url',
              title: 'Lien (optionnel)',
              type: 'url',
            }),
          ],
          preview: { select: { title: 'name', media: 'logo' } },
        },
      ],
      validation: (rule) =>
        rule.custom((logos, context) => {
          const enabled = (context.parent as { enabled?: boolean })?.enabled;
          if (enabled && (!logos || logos.length === 0)) {
            return 'Ajoutez au moins un logo (ou désactivez la section).';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: { enabled: 'enabled', title: 'title', first: 'logos.0.logo' },
    prepare({ enabled, title, first }) {
      return {
        title: 'Accueil — Partenaires',
        subtitle: `${enabled ? 'Activée' : 'Désactivée'}${title ? ` · ${title}` : ''}`,
        media: first,
      };
    },
  },
});
