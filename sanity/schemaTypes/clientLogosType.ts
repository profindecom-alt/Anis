import { UsersIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Bandeau « Nos partenaires » (accueil) : mur de logos partenaires défilant en
 * niveaux de gris, colorés au survol (assureurs, sociétés de gestion,
 * plateformes…). Singleton. Tant que la section n'est pas activée (ou sans
 * logo), elle ne s'affiche pas sur le site.
 *
 * Les identifiants officiels (SIREN, SIRET, ORIAS) ne sont pas gérés ici :
 * ils proviennent de l'identité légale vérifiée dans le code.
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
      initialValue: 'Partenaires référencés',
    }),
    defineField({
      name: 'title',
      title: 'Titre',
      type: 'string',
      initialValue: 'Des relations clairement identifiées',
    }),
    defineField({
      name: 'subtitle',
      title: 'Sous-titre',
      type: 'text',
      rows: 2,
      description: 'Optionnel. Une phrase d’introduction sous le titre.',
      initialValue:
        'Seuls les partenaires dont la relation avec le cabinet a été vérifiée doivent apparaître dans cette section.',
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
            defineField({
              name: 'verified',
              title: 'Relation vérifiée et usage du logo autorisé',
              type: 'boolean',
              description:
                "À cocher uniquement si un accord écrit existe avec ce partenaire ET que l'utilisation de son logo est autorisée. Un logo non coché n'est jamais affiché sur le site.",
              initialValue: false,
            }),
          ],
          preview: {
            select: { title: 'name', media: 'logo', verified: 'verified' },
            prepare({ title, media, verified }) {
              return {
                title,
                subtitle: verified ? 'Vérifié · affiché' : 'Non vérifié · masqué',
                media,
              };
            },
          },
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
