import type { ExpertiseSlug } from './site';
import { img } from './images';

export interface ExpertiseContent {
  slug: ExpertiseSlug;
  pillar: string;
  title: string;
  tagline: string;
  metaDescription: string;
  imageId: string;
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
    tagline: 'Faire fructifier et structurer votre patrimoine',
    metaDescription:
      "Gestion de patrimoine à Paris, sur mesure : allocation d'actifs, arbitrages et architecture ouverte. Élan Patrimoine pilote votre stratégie d'investissement.",
    imageId: img.patrimoine,
    intro: [
      "La gestion de patrimoine est le cœur de notre métier. Elle consiste à organiser l'ensemble de vos actifs (financiers, immobiliers et professionnels) au sein d'une stratégie cohérente, alignée sur vos objectifs de vie.",
      "Grâce à notre architecture ouverte, nous sélectionnons les meilleures solutions du marché, sans aucun produit imposé, et pilotons votre allocation au fil des cycles.",
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
          "L'accès à l'ensemble des sociétés de gestion, pour une sélection objective et indépendante.",
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
        a: "C'est la possibilité de sélectionner les supports d'investissement de l'ensemble du marché, sans être limité aux produits d'un seul promoteur. C'est la garantie d'un conseil objectif.",
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
        a: "Oui. Notre indépendance est totale : nous ne sommes liés à aucun groupe et sélectionnons les solutions du marché dans votre seul intérêt, sans produit maison à placer.",
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
    tagline: 'Optimiser votre fiscalité dans le respect du cadre légal',
    metaDescription:
      "Défiscalisation personnelle et professionnelle : réduction d'impôt, défiscalisation immobilière et optimisation du patrimoine, dans le respect de la loi.",
    imageId: img.defiscalisation,
    intro: [
      "La défiscalisation ne se résume pas à réduire l'impôt : elle s'inscrit dans une stratégie patrimoniale globale. Un dispositif n'a de valeur que si l'investissement sous-jacent est solide et cohérent avec vos objectifs.",
      'Nous identifions, parmi les dispositifs légaux, ceux qui servent réellement votre situation, et écartons les montages inutilement risqués.',
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
        a: "Absolument. Nous intervenons exclusivement dans le cadre des dispositifs légaux et tenons une veille réglementaire permanente.",
      },
      {
        q: 'Quand faut-il anticiper sa défiscalisation ?',
        a: "Le plus tôt possible dans l'année. Agir avant le mois de décembre laisse le temps de choisir un dispositif solide plutôt que de souscrire dans l'urgence pour la seule échéance fiscale.",
      },
      {
        q: 'Existe-t-il un plafond aux avantages fiscaux ?',
        a: "Oui, la plupart des réductions d'impôt sont encadrées par un plafonnement global des niches fiscales. Nous en tenons compte pour optimiser votre situation sans risque de remise en cause.",
      },
    ],
  },

  'assurance-protection': {
    slug: 'assurance-protection',
    pillar: '03',
    title: 'Assurance & Protection',
    tagline: 'Protéger vos proches et sécuriser vos actifs',
    metaDescription:
      "Assurance et protection : prévoyance, assurance-vie et transmission (succession). Sécurisez vos revenus, votre famille et votre patrimoine avec Élan Patrimoine.",
    imageId: img.assurance,
    intro: [
      "Construire un patrimoine n'a de sens que si l'on protège ce que l'on a bâti. La prévoyance et la protection couvrent les aléas de la vie : incapacité, invalidité, décès, dépendance.",
      'Nous auditons vos couvertures existantes, identifions sans excès les zones de fragilité et calibrons les garanties au plus juste.',
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
        a: "Oui, c'est l'un de ses atouts majeurs. Elle permet de transmettre un capital dans un cadre fiscal privilégié, en désignant librement vos bénéficiaires.",
      },
      {
        q: 'Le dirigeant est-il bien protégé par défaut ?',
        a: "Rarement. Les régimes obligatoires couvrent insuffisamment les indépendants et dirigeants. Une prévoyance complémentaire est souvent indispensable.",
      },
      {
        q: 'À partir de quel âge souscrire une prévoyance ?',
        a: "Le plus tôt est le mieux : les garanties sont moins coûteuses et plus largement accordées quand on est jeune et en bonne santé. Mais il n'est jamais trop tard pour combler une lacune.",
      },
      {
        q: 'Que couvre exactement la dépendance ?',
        a: "Elle prévoit le versement d'une rente ou d'un capital en cas de perte d'autonomie, afin de financer l'aide nécessaire sans entamer votre patrimoine ni peser sur vos proches.",
      },
    ],
  },

  'plan-epargne-retraite': {
    slug: 'plan-epargne-retraite',
    pillar: '04',
    title: 'Plan Épargne Retraite (PER)',
    tagline: 'Préparer sa retraite en réduisant les impôts',
    metaDescription:
      "Plan Épargne Retraite (PER) : constituez un capital pour votre retraite en déduisant vos versements de votre revenu imposable, avec Élan Patrimoine.",
    imageId: img.reseau,
    intro: [
      "Le Plan Épargne Retraite (PER) est l'outil de référence pour préparer votre retraite : vous vous constituez un capital ou une rente sur le long terme, tout en allégeant votre fiscalité chaque année.",
      "Les versements volontaires sont déductibles de votre revenu imposable, dans la limite de vos plafonds. Nous construisons une allocation adaptée à votre horizon et pilotons votre PER jusqu'à la sortie, en capital ou en rente.",
    ],
    services: [
      {
        title: 'Déduction fiscale',
        description:
          "Vos versements viennent réduire votre revenu imposable : l'économie d'impôt est d'autant plus forte que votre tranche marginale est élevée.",
      },
      {
        title: 'Allocation pilotée',
        description:
          'Une gestion adaptée à votre horizon de retraite, sécurisée progressivement à mesure que l\'échéance approche.',
      },
      {
        title: 'Architecture ouverte',
        description:
          "Une sélection objective des meilleurs supports du marché (fonds euros, unités de compte), sans produit imposé.",
      },
      {
        title: 'Sortie sur mesure',
        description:
          'À la retraite, récupérez votre épargne en capital, en rente, ou les deux, selon vos besoins de revenus.',
      },
      {
        title: 'Cas de déblocage anticipé',
        description:
          "Achat de la résidence principale, accident de la vie : votre épargne reste accessible dans les cas prévus par la loi.",
      },
      {
        title: 'Optimisation des plafonds',
        description:
          "Calcul et report de vos plafonds de déduction non utilisés, pour maximiser l'avantage fiscal chaque année.",
      },
    ],
    forWhom: [
      'Actifs fortement imposés',
      'Dirigeants et professions libérales',
      'Toute personne préparant sa retraite',
    ],
    highlights: [
      { value: 'Déductible', label: 'de votre revenu imposable' },
      { value: 'Long terme', label: 'capital ou rente à la retraite' },
      { value: 'Piloté', label: 'selon votre horizon' },
    ],
    faq: [
      {
        q: 'Quel est l\'avantage fiscal du PER ?',
        a: "Les versements volontaires sont déductibles de votre revenu imposable, dans la limite de vos plafonds. L'économie d'impôt correspond à votre tranche marginale : plus elle est élevée, plus le gain est important.",
      },
      {
        q: 'Mon épargne est-elle bloquée jusqu\'à la retraite ?',
        a: "En principe, l'épargne est disponible à la retraite. La loi prévoit toutefois des cas de déblocage anticipé, notamment l'achat de la résidence principale et les accidents de la vie.",
      },
      {
        q: 'Comment récupérer mon épargne à la retraite ?',
        a: "Au moment de la retraite, vous choisissez une sortie en capital, en rente viagère, ou une combinaison des deux, selon vos besoins de revenus.",
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
