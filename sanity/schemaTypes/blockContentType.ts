import { defineArrayMember, defineType } from 'sanity';

/**
 * Contenu riche (Portable Text) réutilisable : corps des articles aujourd'hui,
 * et d'autres contenus éditoriaux demain. Les styles et marques correspondent
 * à ce que la feuille de styles `.prose-anis` sait mettre en forme.
 */
export const blockContentType = defineType({
  title: 'Contenu',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'block',
      styles: [
        { title: 'Paragraphe', value: 'normal' },
        { title: 'Titre', value: 'h2' },
        { title: 'Sous-titre', value: 'h3' },
        { title: 'Citation', value: 'blockquote' },
      ],
      lists: [
        { title: 'Liste à puces', value: 'bullet' },
        { title: 'Liste numérotée', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Gras', value: 'strong' },
          { title: 'Italique', value: 'em' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Lien',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
                description:
                  'Lien interne : saisir un chemin commençant par / (ex. /nos-expertises/plan-epargne-retraite). Lien externe : URL complète https://…',
                validation: (rule) =>
                  rule.required().uri({
                    scheme: ['http', 'https', 'mailto', 'tel'],
                    allowRelative: true,
                  }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texte alternatif',
          description: "Description de l'image (accessibilité, SEO).",
        },
      ],
    }),
  ],
});
