/**
 * Configuration globale du site Élan Patrimoine.
 * Centralise les informations réutilisées partout (SEO, footer, contact…).
 */

export const site = {
  name: 'Élan Patrimoine',
  shortName: 'Élan Patrimoine',
  // Identité légale issue du Registre national des entreprises (RNE).
  // Ces champs sont volontairement maintenus dans le code et ne doivent pas
  // être remplacés par des valeurs CMS non vérifiées.
  legalName: 'ÉLAN PATRIMOINE',
  legalForm: 'Société à responsabilité limitée (SARL)',
  siren: '106 362 254',
  siret: '106 362 254 00018',
  registration: 'Registre national des entreprises (RNE)',
  foundedOn: '2026-06-05',
  foundedDisplay: '5 juin 2026',
  activity: "Activités des agents et courtiers d'assurances",
  ape: '66.22Z',
  baseline: 'Cabinet de gestion de patrimoine à Paris',
  description:
    "Cabinet indépendant de gestion de patrimoine à Paris. Stratégie sur mesure, défiscalisation, assurance-vie et transmission, au service de votre patrimoine.",
  // URL canonique absolue utilisée pour le SEO
  url: 'https://elanpatrimoines.fr',
  locale: 'fr_FR',
  email: 'contact@elanpatrimoines.fr',
  phone: '+33 6 68 12 32 66',
  phoneDisplay: '+33 6 68 12 32 66',
  // Numéro WhatsApp au format international, sans "+" ni espaces.
  whatsapp: '33668123266',
  address: {
    street: '231 rue Saint-Honoré',
    zip: '75001',
    city: 'Paris',
    country: 'France',
  },
  // Coordonnées du siège (données structurées). Source : Base Adresse
  // Nationale (api-adresse.data.gouv.fr) pour le 231 rue Saint-Honoré.
  geo: { lat: 48.866214, lng: 2.329198 },
  // Numéro ORIAS conservé en dur : la fiche publique ORIAS fait foi pour les
  // catégories d'immatriculation et leur validité à la date de consultation.
  orias: '26010056',
  oriasUrl: 'https://www.orias.fr',
  acpr: '4 place de Budapest, 75009 Paris',
  // Alias historique conservé pour compatibilité avec les consommateurs
  // existants. Ne pas le présenter comme un numéro RCS non vérifié.
  rcs: 'SIREN 106 362 254',
  capital: '1 000 €',
  social: {
    linkedin: 'https://www.linkedin.com/in/elan-patrimoine-0039ab418/',
    instagram: 'https://www.instagram.com/elan.patrimoine/',
    facebook: 'https://www.facebook.com/profile.php?id=61591103707355',
  },
} as const;

/**
 * Repères publics vérifiables. Les catégories réglementées ne sont pas
 * reproduites ici : la fiche officielle ORIAS, consultée au moment utile,
 * demeure la source de vérité.
 */
export const agrements: {
  /** Sigle / nom court mis en avant. */
  label: string;
  /** Précision sous le sigle. */
  detail: string;
  /** Lien officiel facultatif. */
  href?: string;
}[] = [
  { label: 'SIREN', detail: site.siren },
  { label: 'SIRET', detail: site.siret },
  { label: 'ORIAS', detail: `N° ${site.orias}`, href: site.oriasUrl },
];

export type ExpertiseSlug =
  | 'gestion-de-patrimoine'
  | 'defiscalisation'
  | 'assurance-protection'
  | 'plan-epargne-retraite';

export const expertises: {
  slug: ExpertiseSlug;
  pillar: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  /** Variante condensée affichée sur mobile (repli sur excerpt si absente). */
  excerptMobile?: string;
}[] = [
  {
    slug: 'gestion-de-patrimoine',
    pillar: '01',
    title: 'Gestion de Patrimoine',
    shortTitle: 'Gestion de Patrimoine',
    excerpt:
      "Allocation d'actifs, arbitrages et architecture ouverte pour faire fructifier et structurer votre patrimoine.",
    excerptMobile:
      "Allocation, arbitrages et architecture ouverte pour structurer votre patrimoine.",
  },
  {
    slug: 'defiscalisation',
    pillar: '02',
    title: 'Défiscalisation',
    shortTitle: 'Défiscalisation',
    excerpt:
      'Optimisation fiscale personnelle et professionnelle, dans le strict respect du cadre légal.',
  },
  {
    slug: 'assurance-protection',
    pillar: '03',
    title: 'Assurance & Protection',
    shortTitle: 'Assurance & Protection',
    excerpt:
      'Prévoyance, couverture des risques et transmission pour protéger vos proches et vos actifs.',
    excerptMobile:
      'Prévoyance, couverture des risques et transmission pour protéger vos proches.',
  },
  {
    slug: 'plan-epargne-retraite',
    pillar: '04',
    title: 'Plan Épargne Retraite (PER)',
    shortTitle: 'Plan Épargne Retraite (PER)',
    excerpt:
      'Préparer sa retraite en réduisant les impôts.',
  },
];

export const mainNav = [
  { label: 'Le Cabinet', href: '/le-cabinet' },
  {
    label: 'Nos Expertises',
    href: '/nos-expertises',
    children: expertises.map((e) => ({
      label: e.title,
      href: `/nos-expertises/${e.slug}`,
    })),
  },
  { label: 'Notre Approche', href: '/notre-approche' },
  // « Réclamation » reste accessible depuis le pied de page de chaque page.
  { label: 'Actualités', href: '/actualites' },
];

/**
 * Chiffres-clés de confiance (section « En quelques chiffres »).
 * `value` est la cible animée (compteur 0 → value) ; `unit` reste statique
 * à côté du nombre (vide quand il n'y en a pas).
 */
export const stats: {
  value: number;
  prefix?: string;
  unit: string;
  label: string;
}[] = [];

export const values = [
  {
    title: 'Indépendance',
    description:
      "Aucune appartenance à un groupe bancaire et aucun produit maison imposé. Les solutions et leur rémunération sont expliquées avant toute décision.",
  },
  {
    title: 'Expertise',
    description:
      'Une veille continue sur la fiscalité, les marchés et le cadre patrimonial pour éclairer chaque recommandation.',
  },
  {
    title: 'Discrétion',
    description:
      'Vos informations sont traitées de manière confidentielle et protégées conformément à nos obligations.',
  },
  {
    title: 'Durabilité',
    description:
      "Des stratégies pensées sur le long terme, pour vous et les générations qui suivent.",
  },
];

export const approachSteps = [
  {
    number: '01',
    title: 'Diagnostic',
    description:
      "Un audit complet de votre situation patrimoniale, fiscale et familiale, à l'écoute de vos objectifs.",
  },
  {
    number: '02',
    title: 'Stratégie',
    description:
      "L'élaboration d'une feuille de route sur mesure, chiffrée et hiérarchisée selon vos priorités.",
  },
  {
    number: '03',
    title: 'Mise en œuvre',
    description:
      'Le déploiement des solutions retenues et un suivi régulier pour ajuster le cap dans la durée.',
  },
];

/**
 * Aucun avis n'est publié sans source et consentement vérifiables. Ajouter
 * uniquement de vrais témoignages, avec preuve d'origine et droit de diffusion.
 */
export const testimonials: {
  quote: string;
  emphasis?: string;
  name: string;
  role: string;
  initials?: string;
}[] = [];
