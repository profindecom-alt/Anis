import { CogIcon } from '@sanity/icons';
import { defineField, defineType } from 'sanity';

/**
 * Paramètres du site (singleton) : suivi d'audience / analytics et balises de
 * vérification de propriété, éditables sans toucher au code.
 *
 * Pourquoi des champs structurés plutôt qu'un bloc « HTML libre » ?
 *   - Le site applique une Content-Security-Policy stricte : un <script> collé
 *     depuis un domaine inconnu serait bloqué par le navigateur.
 *   - Un <script> injecté en HTML brut ne s'exécute de toute façon pas.
 * On saisit donc seulement l'identifiant de chaque outil ; le site charge le
 * script officiel correspondant (et autorise son domaine dans la CSP). Les
 * outils de mesure (GTM, GA, Hotjar, Clarity) ne se chargent qu'APRÈS le
 * consentement aux cookies (RGPD/CNIL).
 */
export const siteSettingsType = defineType({
  name: 'siteSettings',
  title: 'Paramètres du site',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'coordonnees', title: 'Coordonnées & mentions', default: true },
    { name: 'tracking', title: 'Suivi & analytics' },
    { name: 'verification', title: 'Vérification de propriété' },
  ],
  fields: [
    /* --- Coordonnées & mentions légales --------------------------- */
    defineField({
      name: 'legalName',
      title: 'Raison sociale',
      type: 'string',
      group: 'coordonnees',
      description: 'Ex. « Élan Patrimoine SAS ». Laisser vide = valeur par défaut.',
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contact',
      type: 'string',
      group: 'coordonnees',
      validation: (rule) =>
        rule.email().warning('Adresse e-mail invalide.'),
    }),
    defineField({
      name: 'phone',
      title: 'Téléphone (format international)',
      type: 'string',
      group: 'coordonnees',
      description: 'Pour les liens « appeler » : ex. « +33 6 68 12 32 66 ».',
    }),
    defineField({
      name: 'phoneDisplay',
      title: 'Téléphone (affiché)',
      type: 'string',
      group: 'coordonnees',
      description: 'Version lisible affichée sur le site : ex. « 06 68 12 32 66 ».',
    }),
    defineField({
      name: 'whatsapp',
      title: 'Numéro WhatsApp',
      type: 'string',
      group: 'coordonnees',
      description: 'Format international, sans « + » ni espaces : ex. « 33668123266 ».',
      validation: (rule) =>
        rule.regex(/^\d+$/, { name: 'numéro WhatsApp' }).warning(
          'Uniquement des chiffres (ex. 33668123266).'
        ),
    }),
    defineField({
      name: 'address',
      title: 'Adresse',
      type: 'object',
      group: 'coordonnees',
      options: { columns: 2 },
      fields: [
        defineField({ name: 'street', title: 'Rue', type: 'string' }),
        defineField({ name: 'zip', title: 'Code postal', type: 'string' }),
        defineField({ name: 'city', title: 'Ville', type: 'string' }),
        defineField({ name: 'country', title: 'Pays', type: 'string' }),
      ],
    }),
    defineField({
      name: 'linkedin',
      title: 'Page LinkedIn',
      type: 'url',
      group: 'coordonnees',
    }),
    defineField({
      name: 'instagram',
      title: 'Page Instagram',
      type: 'url',
      group: 'coordonnees',
    }),
    defineField({
      name: 'facebook',
      title: 'Page Facebook',
      type: 'url',
      group: 'coordonnees',
    }),
    defineField({
      name: 'orias',
      title: 'Numéro ORIAS',
      type: 'string',
      group: 'coordonnees',
    }),
    defineField({
      name: 'oriasUrl',
      title: 'Lien de vérification ORIAS',
      type: 'url',
      group: 'coordonnees',
      description: 'Par défaut : https://www.orias.fr',
    }),
    defineField({
      name: 'acpr',
      title: 'Adresse ACPR',
      type: 'string',
      group: 'coordonnees',
    }),
    defineField({
      name: 'rcs',
      title: 'RCS',
      type: 'string',
      group: 'coordonnees',
      description: 'Ex. « RCS Paris 901 234 567 ».',
    }),
    defineField({
      name: 'capital',
      title: 'Capital social',
      type: 'string',
      group: 'coordonnees',
      description: 'Ex. « 50 000 € ».',
    }),

    /* --- Suivi & analytics (chargés après consentement) ----------- */
    defineField({
      name: 'gtmId',
      title: 'Google Tag Manager — Identifiant',
      type: 'string',
      group: 'tracking',
      description: 'Format : GTM-XXXXXXX. Laisser vide pour ne pas charger GTM.',
      validation: (rule) =>
        rule
          .regex(/^GTM-[A-Z0-9]+$/i, { name: 'identifiant GTM' })
          .warning('L’identifiant doit ressembler à « GTM-XXXXXXX ».'),
    }),
    defineField({
      name: 'ga4Id',
      title: 'Google Analytics 4 — Identifiant de mesure',
      type: 'string',
      group: 'tracking',
      description:
        'Format : G-XXXXXXXXXX. Inutile si vous passez déjà par Google Tag Manager.',
      validation: (rule) =>
        rule
          .regex(/^G-[A-Z0-9]+$/i, { name: 'identifiant GA4' })
          .warning('L’identifiant doit ressembler à « G-XXXXXXXXXX ».'),
    }),
    defineField({
      name: 'hotjarId',
      title: 'Hotjar — Site ID',
      type: 'string',
      group: 'tracking',
      description: 'Identifiant numérique du site Hotjar (ex. 1234567).',
      validation: (rule) =>
        rule
          .regex(/^\d+$/, { name: 'Site ID Hotjar' })
          .warning('Le Site ID Hotjar est un nombre.'),
    }),
    defineField({
      name: 'clarityId',
      title: 'Microsoft Clarity — Project ID',
      type: 'string',
      group: 'tracking',
      description: 'Identifiant de projet Clarity (ex. abcde12345).',
    }),

    /* --- Vérification de propriété (balises <meta>, toujours présentes) */
    defineField({
      name: 'googleSiteVerification',
      title: 'Google Search Console — Code de vérification',
      type: 'string',
      group: 'verification',
      description:
        'Le contenu de la balise meta « google-site-verification » (méthode « balise HTML »). Saisir uniquement le code, pas la balise entière.',
    }),
    defineField({
      name: 'verificationTags',
      title: 'Autres balises de vérification',
      type: 'array',
      group: 'verification',
      description:
        'Pour Bing, Pinterest, etc. Chaque entrée ajoute une balise <meta name="…" content="…"> dans l’en-tête.',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'name',
              title: 'Nom (attribut name)',
              type: 'string',
              description: 'Ex. « msvalidate.01 », « p:domain_verify ».',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'content',
              title: 'Valeur (attribut content)',
              type: 'string',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: { title: 'name', subtitle: 'content' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: 'Paramètres du site' }),
  },
});
