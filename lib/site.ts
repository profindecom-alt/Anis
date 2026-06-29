/**
 * Configuration globale du site Élan Patrimoine.
 * Centralise les informations réutilisées partout (SEO, footer, contact…).
 */

export const site = {
  name: 'Élan Patrimoine',
  shortName: 'Élan Patrimoine',
  legalName: 'Élan Patrimoine SAS',
  baseline: 'Cabinet patrimonial indépendant',
  description:
    "Élan Patrimoine est un cabinet indépendant de gestion de patrimoine. Stratégie sur mesure, défiscalisation, assurance et protection, accompagnée d'un réseau d'experts.",
  // URL canonique absolue utilisée pour le SEO
  url: 'https://www.elan-patrimoines.fr',
  locale: 'fr_FR',
  email: 'contact@elan-patrimoines.fr',
  phone: '+33 6 68 12 32 66',
  phoneDisplay: '+33 6 68 12 32 66',
  // Numéro WhatsApp au format international, sans "+" ni espaces.
  whatsapp: '33668123266',
  address: {
    street: '12 avenue des Champs-Élysées',
    zip: '75008',
    city: 'Paris',
    country: 'France',
  },
  // Coordonnées du siège (pour la carte de la page contact)
  geo: { lat: 48.8698, lng: 2.3076 },
  // Mentions réglementaires
  orias: '21 004 567',
  oriasUrl: 'https://www.orias.fr',
  acpr: '4 place de Budapest, 75009 Paris',
  rcs: 'RCS Paris 901 234 567',
  capital: '50 000 €',
  social: {
    linkedin: 'https://www.linkedin.com/company/elanpatrimoine',
    instagram: 'https://www.instagram.com/elanpatrimoine',
    facebook: 'https://www.facebook.com/elanpatrimoine',
  },
} as const;

/**
 * Agréments & labels réglementaires affichés sur la page d'accueil (rangée
 * fixe, codée en dur — ce ne sont pas des logos partenaires gérés dans Sanity).
 *
 * À CONFIRMER avant mise en ligne : numéro ORIAS, statut AMF/CIF et nom de
 * l'association professionnelle dépendent de l'immatriculation réelle du
 * cabinet. Corriger ou retirer toute mention non vérifiée.
 */
export const agrements: {
  /** Sigle / nom court mis en avant. */
  label: string;
  /** Précision sous le sigle. */
  detail: string;
  /** Lien officiel facultatif. */
  href?: string;
}[] = [
  { label: 'ORIAS', detail: `Immatriculé n° ${site.orias}`, href: site.oriasUrl },
  { label: 'AMF', detail: 'Conseiller en investissements financiers' },
  { label: 'CNCGP', detail: "Membre de l'association professionnelle" },
  { label: 'RC Pro', detail: 'Responsabilité civile & garantie financière' },
];

export type ExpertiseSlug =
  | 'gestion-de-patrimoine'
  | 'defiscalisation'
  | 'assurance-protection'
  | 'reseau-expert';

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
    slug: 'reseau-expert',
    pillar: '04',
    title: "Réseau d'Experts",
    shortTitle: "Réseau d'Experts",
    excerpt:
      'Notaires, experts-comptables et juristes coordonnés autour de votre stratégie patrimoniale.',
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
  { label: 'Réclamation', href: '/reclamation' },
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
}[] = [
  { value: 8, unit: 'ans', label: "d'expérience" },
  { value: 100, unit: '%', label: 'indépendant' },
  { value: 99, unit: '%', label: 'satisfaction' },
  { value: 200, prefix: '+', unit: '', label: 'accompagnement' },
];

export const values = [
  {
    title: 'Indépendance',
    description:
      "Aucune appartenance à un groupe bancaire. Nos conseils servent un seul intérêt : le vôtre.",
  },
  {
    title: 'Expertise',
    description:
      'Une maîtrise fine de la fiscalité, des marchés et du droit patrimonial, sans cesse actualisée.',
  },
  {
    title: 'Discrétion',
    description:
      'La confidentialité absolue de votre situation est au cœur de notre déontologie.',
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
 * Témoignages clients (illustratifs : à remplacer par de vrais avis avant
 * mise en ligne). Le champ `emphasis` (optionnel) met en relief une portion
 * de la citation en or italique ; `initials` alimente la pastille-monogramme.
 */
export const testimonials = [
  {
    quote:
      "Un interlocuteur unique qui connaît notre dossier dans le détail. La transmission à nos enfants a été préparée sereinement.",
    emphasis: 'préparée sereinement',
    name: 'Claire Fontaine',
    role: 'Profession libérale',
    initials: 'CF',
  },
  {
    quote:
      "Des conseils clairs, sans jargon ni produit maison. On sent une vraie indépendance.",
    name: 'Philippe Renaud',
    role: 'Cadre dirigeant',
    initials: 'PR',
  },
  {
    quote:
      "À la cession de ma société, ils ont structuré la fiscalité bien en amont. Un gain de temps et de tranquillité considérable.",
    emphasis: 'considérable',
    name: 'Antoine Mercier',
    role: 'Entrepreneur',
    initials: 'AM',
  },
  {
    quote:
      "Un accompagnement patient et pédagogue. J'ai enfin une vision claire de mon patrimoine et des décisions à prendre.",
    emphasis: 'vision claire',
    name: 'Sophie Lemoine',
    role: 'Cadre supérieur',
    initials: 'SL',
  },
  {
    quote:
      "Disponibles et réactifs, ils répondent toujours avec précision. La relation de confiance s'est installée naturellement.",
    name: 'Marc Dubreuil',
    role: 'Profession médicale',
    initials: 'MD',
  },
  {
    quote:
      "Ils ont su coordonner notaire et expert-comptable pour notre projet familial. Un véritable chef d'orchestre patrimonial.",
    emphasis: "chef d'orchestre",
    name: 'Famille Aubry',
    role: 'Transmission patrimoniale',
    initials: 'FA',
  },
];
