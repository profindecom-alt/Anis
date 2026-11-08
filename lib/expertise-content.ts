import type { ExpertiseSlug } from './site';
import type { Category } from './categories';
import { img } from './images';

export interface ExpertiseContent {
  slug: ExpertiseSlug;
  pillar: string;
  /** Nom court (navigation, fil d'Ariane, cartes). */
  title: string;
  /** Balise <title> (le suffixe « | Élan Patrimoine » est ajouté). */
  seoTitle: string;
  /** Titre H1 de la page : intention de recherche explicite. */
  h1: string;
  tagline: string;
  metaDescription: string;
  imageId: string;
  /** Description fidèle de la photo d'illustration. */
  imageAlt: string;
  /** Titres de section propres à l'expertise (évite les H2 génériques). */
  servicesTitle: string;
  forWhomTitle: string;
  faqTitle: string;
  /** Titre du bandeau d'appel à l'action final. */
  ctaTitle: string;
  /** Articles à proposer : mots-clés (titre/accroche) puis catégories. */
  articleKeywords: RegExp;
  articleCategories: Category[];
  intro: string[];
  services: { title: string; description: string }[];
  forWhom: string[];
  /** Bénéfices clés mis en avant */
  highlights: { value: string; label: string }[];
  faq: { q: string; a: string }[];
}

export const expertiseContent: Record<ExpertiseSlug, ExpertiseContent> = {
  'gestion-de-patrimoine': {
    slug: 'gestion-de-patrimoine',
    pillar: '01',
    title: 'Gestion de Patrimoine',
    seoTitle: 'Conseiller en gestion de patrimoine à Paris',
    h1: 'Conseiller en gestion de patrimoine à Paris',
    tagline: 'Faire fructifier et structurer votre patrimoine',
    metaDescription:
      "Gestion de patrimoine à Paris, sur mesure : allocation d'actifs, arbitrages et architecture ouverte. Élan Patrimoine pilote votre stratégie d'investissement.",
    imageId: img.patrimoine,
    imageAlt: 'Documents fiscaux, calculatrice et stylo posés sur une table',
    servicesTitle: 'Nos services de gestion de patrimoine',
    forWhomTitle: 'À qui s’adresse notre accompagnement patrimonial',
    faqTitle: 'Questions fréquentes sur la gestion de patrimoine',
    ctaTitle: 'Un projet de gestion de patrimoine ?',
    articleKeywords: /patrimoine|allocation|scpi|private equity|architecture|assurance-vie|crédit/i,
    articleCategories: ['Investissement', 'Marchés', 'Réglementation'],
    intro: [
      "La gestion de patrimoine est le cœur de notre métier. Elle consiste à organiser l'ensemble de vos actifs (financiers, immobiliers et professionnels) au sein d'une stratégie cohérente, alignée sur vos objectifs de vie.",
      "Notre approche en architecture ouverte permet de comparer différentes solutions du marché, sans produit maison imposé, puis de piloter l'allocation selon votre situation et les risques identifiés.",
      "Basé à Paris (1er arrondissement), le cabinet accompagne ses clients partout en France, y compris en visioconférence.",
    ],
    services: [
      {
        title: "Allocation d'actifs",
        description:
          "Une répartition réfléchie entre classes d'actifs, adaptée à votre horizon et à votre tolérance au risque.",
      },
      {
        title: 'Arbitrages & pilotage',
        description:
          'Un suivi actif de votre allocation et des arbitrages opportuns en fonction des marchés.',
      },
      {
        title: 'Architecture ouverte',
        description:
          "La comparaison de solutions issues de plusieurs sociétés de gestion, selon des critères explicités.",
      },
      {
        title: 'Enveloppes optimisées',
        description:
          'Assurance-vie, PER, compte-titres, PEA : le bon support pour chaque objectif.',
      },
      {
        title: 'Immobilier & actifs réels',
        description:
          'SCPI, immobilier direct, private equity : diversifier au-delà des marchés cotés.',
      },
      {
        title: 'Reporting consolidé',
        description:
          "Une vision claire et régulière de l'ensemble de votre patrimoine, en un seul endroit.",
      },
    ],
    forWhom: [
      'Particuliers souhaitant valoriser leur épargne',
      "Dirigeants disposant d'une trésorerie à placer",
      'Familles préparant la transmission de leur patrimoine',
    ],
    highlights: [
      { value: 'Architecture', label: 'ouverte sans produit maison' },
      { value: 'Sur mesure', label: 'pour chaque situation' },
      { value: 'Suivi continu', label: 'dans la durée' },
    ],
    faq: [
      {
        q: "Qu'est-ce que l'architecture ouverte ?",
        a: "C'est la possibilité de comparer des supports provenant de plusieurs producteurs, sans être limité aux produits d'un seul promoteur. La recommandation tient ensuite compte de vos objectifs, des risques, des frais et de votre horizon.",
      },
      {
        q: 'À partir de quel montant intervenez-vous ?',
        a: 'Nous accompagnons une clientèle variée. Le premier rendez-vous, gratuit et sans engagement, permet de déterminer la pertinence d\'un accompagnement.',
      },
      {
        q: 'Comment suivez-vous mon allocation ?',
        a: "Vous bénéficiez d'un reporting régulier et de points d'étape pour ajuster la stratégie en fonction de vos objectifs et de la conjoncture.",
      },
      {
        q: 'Êtes-vous indépendant des banques et assureurs ?',
        a: "Le cabinet n'appartient pas à un groupe bancaire ou assureur et ne dispose pas de produit maison. Les solutions envisagées, leurs frais et notre mode de rémunération sont présentés avant toute décision.",
      },
      {
        q: 'Puis-je conserver mes contrats actuels ?',
        a: "Bien sûr. Nous commençons par auditer l'existant, puis nous conservons ce qui est pertinent et n'arbitrons que lorsque cela sert réellement votre stratégie.",
      },
    ],
  },

  defiscalisation: {
    slug: 'defiscalisation',
    pillar: '02',
    title: 'Défiscalisation',
    seoTitle: 'Défiscalisation : réduire ses impôts',
    h1: 'Défiscalisation : réduire vos impôts dans le cadre légal',
    tagline: 'Optimiser votre fiscalité dans le respect du cadre légal',
    metaDescription:
      "Défiscalisation personnelle et professionnelle : réduction d'impôt, défiscalisation immobilière et optimisation du patrimoine, dans le respect de la loi.",
    imageId: img.defiscalisation,
    imageAlt: 'Main tenant un stylo au-dessus d’un document',
    servicesTitle: 'Nos solutions de défiscalisation',
    forWhomTitle: 'À qui s’adresse notre conseil en défiscalisation',
    faqTitle: 'Questions fréquentes sur la défiscalisation',
    ctaTitle: 'Un projet de défiscalisation ?',
    articleKeywords: /impôt|fiscal|ifi|loi de finances|démembrement|défiscalisation/i,
    articleCategories: ['Fiscalité'],
    intro: [
      "La défiscalisation ne se résume pas à réduire l'impôt : elle s'inscrit dans une stratégie patrimoniale globale. Un dispositif n'a de valeur que si l'investissement sous-jacent est solide et cohérent avec vos objectifs.",
      'Nous identifions, parmi les dispositifs légaux, ceux qui servent réellement votre situation, et écartons les montages inutilement risqués.',
      'Depuis Paris (1er arrondissement), nous accompagnons particuliers, dirigeants et professions libérales partout en France, y compris en visioconférence.',
    ],
    services: [
      {
        title: "Optimisation de l'impôt sur le revenu",
        description:
          'Mobilisation des dispositifs adaptés à votre profil pour réduire votre imposition.',
      },
      {
        title: 'Épargne retraite (PER)',
        description:
          'Déduction des versements et préparation de la retraite avec un effet de levier fiscal.',
      },
      {
        title: 'Investissement immobilier',
        description:
          'Dispositifs locatifs et démembrement pour conjuguer revenus et avantage fiscal.',
      },
      {
        title: 'Impôt sur la fortune immobilière',
        description:
          "Stratégies légales de réduction de l'assiette de l'IFI.",
      },
      {
        title: 'Fiscalité du dirigeant',
        description:
          "Optimisation de la rémunération, des dividendes et de la trésorerie d'entreprise.",
      },
      {
        title: 'Investissement dans l\'économie réelle',
        description:
          'Soutien aux PME et aux secteurs éligibles, avec réduction d\'impôt à la clé.',
      },
    ],
    forWhom: [
      'Contribuables fortement imposés',
      'Dirigeants et professions libérales',
      "Détenteurs d'un patrimoine immobilier important",
    ],
    highlights: [
      { value: 'Cadre légal', label: 'strictement respecté' },
      { value: 'Sur mesure', label: 'selon votre fiscalité' },
      { value: 'Simulation', label: 'chiffrée avant décision' },
    ],
    faq: [
      {
        q: 'La défiscalisation est-elle sans risque ?',
        a: "Aucun investissement n'est sans risque. Nous privilégions toujours la solidité de l'actif sous-jacent à la seule réduction d'impôt, et vous présentons les risques en toute transparence.",
      },
      {
        q: 'Réduire mon impôt est-il toujours pertinent ?',
        a: "Pas systématiquement. Un avantage fiscal ne doit jamais conduire à un mauvais investissement. Nous évaluons chaque opportunité au regard de votre stratégie globale.",
      },
      {
        q: 'Vos conseils sont-ils conformes à la loi ?',
        a: "Nous présentons les dispositifs dans le cadre applicable à la date de l'analyse et vérifions leur adéquation avec votre situation. Les règles pouvant évoluer, les sources officielles et les professionnels concernés sont consultés lorsque nécessaire.",
      },
      {
        q: 'Quand faut-il anticiper sa défiscalisation ?',
        a: "Le plus tôt possible dans l'année. Agir avant le mois de décembre laisse le temps de choisir un dispositif solide plutôt que de souscrire dans l'urgence pour la seule échéance fiscale.",
      },
      {
        q: 'Existe-t-il un plafond aux avantages fiscaux ?',
        a: "Oui, de nombreuses réductions d'impôt relèvent d'un plafonnement global, avec des règles et exceptions propres à chaque dispositif. Nous en tenons compte dans la simulation, sans préjuger de l'analyse de l'administration fiscale.",
      },
    ],
  },

  'assurance-protection': {
    slug: 'assurance-protection',
    pillar: '03',
    title: 'Assurance & Protection',
    seoTitle: 'Prévoyance et assurance-vie',
    h1: 'Prévoyance et assurance-vie : protéger vos proches',
    tagline: 'Protéger vos proches et sécuriser vos actifs',
    metaDescription:
      "Assurance et protection : prévoyance, assurance-vie et transmission (succession). Sécurisez vos revenus, votre famille et votre patrimoine avec Élan Patrimoine.",
    imageId: img.assurance,
    imageAlt: 'Poignée de main entre deux personnes',
    servicesTitle: 'Nos solutions de prévoyance et de protection',
    forWhomTitle: 'À qui s’adresse notre conseil en prévoyance',
    faqTitle: 'Questions fréquentes sur la prévoyance et l’assurance-vie',
    ctaTitle: 'Un projet de prévoyance ou d’assurance-vie ?',
    articleKeywords: /prévoyance|assurance|transmission|donation|succession|dirigeant/i,
    articleCategories: ['Prévoyance', 'Transmission'],
    intro: [
      "Construire un patrimoine n'a de sens que si l'on protège ce que l'on a bâti. La prévoyance et la protection couvrent les aléas de la vie : incapacité, invalidité, décès, dépendance.",
      'Nous auditons vos couvertures existantes, identifions sans excès les zones de fragilité et calibrons les garanties au plus juste.',
      'Basé à Paris (1er arrondissement), le cabinet accompagne familles, dirigeants et indépendants partout en France, y compris en visioconférence.',
    ],
    services: [
      {
        title: 'Prévoyance',
        description:
          "Maintien de revenu en cas d'incapacité ou d'invalidité, pour vous et votre famille.",
      },
      {
        title: 'Garantie décès',
        description:
          'Capital et rentes pour protéger durablement vos proches et préserver leur niveau de vie.',
      },
      {
        title: 'Protection du dirigeant',
        description:
          "Sécurisation des revenus et continuité de l'activité en cas de coup dur.",
      },
      {
        title: 'Dépendance',
        description:
          "Anticipation de la perte d'autonomie pour préserver votre patrimoine et soulager vos proches.",
      },
      {
        title: 'Assurance-vie & transmission',
        description:
          "Un cadre privilégié pour transmettre dans des conditions fiscales avantageuses.",
      },
      {
        title: 'Santé & complémentaire',
        description:
          'Sélection des contrats les mieux adaptés à votre situation et à vos besoins réels.',
      },
    ],
    forWhom: [
      'Familles souhaitant protéger leurs proches',
      "Dirigeants et indépendants peu couverts",
      'Personnes anticipant transmission et dépendance',
    ],
    highlights: [
      { value: 'Audit', label: 'de vos couvertures' },
      { value: 'Juste mesure', label: 'sans sur-assurance' },
      { value: 'Transmission', label: 'optimisée' },
    ],
    faq: [
      {
        q: 'Pourquoi auditer mes contrats existants ?',
        a: "Beaucoup de garanties sont mal calibrées : sous-couverture sur certains risques, doublons sur d'autres. L'audit permet d'optimiser protection et budget.",
      },
      {
        q: "L'assurance-vie sert-elle à la transmission ?",
        a: "Elle peut servir un objectif de transmission. La clause bénéficiaire se rédige dans les limites du droit applicable et le régime fiscal dépend notamment des dates, des versements et de la situation des parties.",
      },
      {
        q: 'Le dirigeant est-il bien protégé par défaut ?',
        a: "Le niveau de couverture dépend du statut, du revenu et des garanties déjà en place. Un audit permet d'identifier les éventuels écarts avant d'envisager une couverture complémentaire.",
      },
      {
        q: 'À partir de quel âge souscrire une prévoyance ?',
        a: "Il n'existe pas d'âge unique : le besoin dépend de votre situation familiale, professionnelle et financière. L'âge et l'état de santé peuvent toutefois influencer les conditions d'adhésion et le tarif.",
      },
      {
        q: 'Que couvre exactement la dépendance ?',
        a: "Selon le contrat, elle peut prévoir une rente ou un capital lorsque les critères contractuels de perte d'autonomie sont remplis. Cette prestation peut contribuer à financer une partie de l'aide nécessaire, sous réserve des exclusions et limites prévues.",
      },
    ],
  },

  'plan-epargne-retraite': {
    slug: 'plan-epargne-retraite',
    pillar: '04',
    title: 'Plan Épargne Retraite (PER)',
    seoTitle: 'Plan Épargne Retraite (PER) : simulation',
    h1: 'Plan Épargne Retraite (PER) : préparer votre retraite',
    tagline: 'Préparer sa retraite et étudier l’option fiscale',
    metaDescription:
      "Plan Épargne Retraite (PER) : préparez votre retraite et étudiez la déduction éventuelle des versements volontaires selon votre plafond et votre situation.",
    imageId: img.reseau,
    imageAlt: 'Réunion d’équipe dans un bureau',
    servicesTitle: 'Notre accompagnement autour du PER',
    forWhomTitle: 'À qui s’adresse le Plan Épargne Retraite',
    faqTitle: 'Questions fréquentes sur le PER',
    ctaTitle: 'Un projet autour du PER ?',
    articleKeywords: /\bPER\b|retraite/i,
    articleCategories: ['Fiscalité'],
    intro: [
      "Le Plan Épargne Retraite (PER) est une enveloppe de long terme destinée à préparer la retraite. Ses règles de disponibilité, de sortie et de fiscalité dépendent notamment de l'origine des sommes versées.",
      "Les versements volontaires peuvent, sur option et dans la limite du plafond disponible, être déduits du revenu imposable. La pertinence de cette option et la fiscalité à la sortie doivent être appréciées selon votre situation.",
      'Basé à Paris (1er arrondissement), le cabinet étudie votre PER avec vous, en rendez-vous ou en visioconférence partout en France.',
    ],
    services: [
      {
        title: 'Déduction fiscale',
        description:
          "Les versements volontaires peuvent être déduits sur option, dans la limite du plafond disponible. L'effet réel dépend du barème et de l'ensemble de votre foyer fiscal.",
      },
      {
        title: 'Allocation pilotée',
        description:
          'Une allocation adaptée à votre horizon, pouvant évoluer progressivement à l’approche de la retraite selon le mode de gestion et les supports retenus.',
      },
      {
        title: 'Architecture ouverte',
        description:
          "Une comparaison de supports disponibles (fonds euros, unités de compte), sans produit maison imposé.",
      },
      {
        title: 'Sortie sur mesure',
        description:
          "Les possibilités de sortie en capital, en rente ou en combinaison dépendent du compartiment, de l'origine des versements et des règles applicables.",
      },
      {
        title: 'Cas de déblocage anticipé',
        description:
          "Achat de la résidence principale, accident de la vie : votre épargne reste accessible dans les cas prévus par la loi.",
      },
      {
        title: 'Optimisation des plafonds',
        description:
          "Lecture du plafond personnel et des reliquats éventuellement disponibles afin d'évaluer le montant déductible avant tout versement.",
      },
    ],
    forWhom: [
      'Actifs fortement imposés',
      'Dirigeants et professions libérales',
      'Toute personne préparant sa retraite',
    ],
    highlights: [
      { value: 'Sur option', label: 'déduction sous plafond' },
      { value: 'Long terme', label: 'capital ou rente à la retraite' },
      { value: 'Piloté', label: 'selon votre horizon' },
    ],
    faq: [
      {
        q: 'Quel est l\'avantage fiscal du PER ?',
        a: "Les versements volontaires peuvent être déduits sur option, dans la limite du plafond disponible. L'effet fiscal se calcule avec le barème progressif et dépend de l'ensemble de votre foyer ; il ne correspond pas toujours au versement multiplié par la tranche marginale.",
      },
      {
        q: 'Mon épargne est-elle bloquée jusqu\'à la retraite ?',
        a: "En principe, l'épargne est disponible à la retraite. La loi prévoit toutefois des cas de déblocage anticipé, notamment l'achat de la résidence principale et les accidents de la vie.",
      },
      {
        q: 'Comment récupérer mon épargne à la retraite ?',
        a: "Les modalités dépendent de l'origine des sommes et du compartiment concerné. Une sortie en capital, en rente ou une combinaison peut être possible selon le cas, avec une fiscalité propre à chaque modalité.",
      },
      {
        q: 'Combien puis-je verser sur mon PER ?',
        a: "Le montant déductible dépend de vos revenus et de vos plafonds d'épargne retraite, avec la possibilité de reporter les plafonds non utilisés des années précédentes. Nous les calculons avec vous avant tout versement.",
      },
      {
        q: 'Le PER est-il adapté à ma situation ?',
        a: "Il l'est d'autant plus que vous êtes imposé et que votre horizon de retraite est éloigné. Nous validons ensemble sa pertinence au regard de votre fiscalité et de vos objectifs.",
      },
    ],
  },
};
