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
      "Gestion de patrimoine sur mesure : allocation d'actifs, arbitrages et architecture ouverte. Élan Patrimoine construit et pilote votre stratégie d'investissement.",
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
      'Défiscalisation personnelle et professionnelle : réduction d\'impôt, optimisation des revenus et du patrimoine, dans le strict respect de la réglementation.',
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
      'Assurance et protection : prévoyance, couverture des risques et transmission. Sécurisez vos revenus, votre famille et votre patrimoine avec Élan Patrimoine.',
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

  'reseau-expert': {
    slug: 'reseau-expert',
    pillar: '04',
    title: "Réseau d'Experts",
    tagline: 'Une expertise pluridisciplinaire coordonnée',
    metaDescription:
      "Réseau d'experts : notaires, experts-comptables et juristes coordonnés autour de votre stratégie patrimoniale. Un accompagnement global avec Élan Patrimoine.",
    imageId: img.reseau,
    intro: [
      "Une stratégie patrimoniale aboutie mobilise plusieurs disciplines : droit, fiscalité, comptabilité, notariat. Plutôt que de vous laisser coordonner ces interlocuteurs, nous le faisons pour vous.",
      "Élan Patrimoine s'entoure d'un réseau d'experts sélectionnés et travaille en synergie avec vos conseils habituels, pour une mise en œuvre fluide et sécurisée.",
    ],
    services: [
      {
        title: 'Notaires',
        description:
          'Pour sécuriser donations, démembrements, régimes matrimoniaux et transmission.',
      },
      {
        title: 'Experts-comptables',
        description:
          "Pour l'optimisation de la rémunération et la fiscalité de l'entreprise.",
      },
      {
        title: 'Avocats fiscalistes',
        description:
          'Pour les montages complexes et la sécurisation juridique des opérations.',
      },
      {
        title: 'Conseillers en investissement',
        description:
          'Pour la sélection et le suivi des supports financiers les plus pertinents.',
      },
      {
        title: 'Spécialistes immobiliers',
        description:
          "Pour l'acquisition, l'arbitrage et la valorisation de votre patrimoine immobilier.",
      },
      {
        title: 'Coordination globale',
        description:
          "Un chef d'orchestre unique qui fait dialoguer tous les intervenants autour de votre projet.",
      },
    ],
    forWhom: [
      'Patrimoines complexes et pluriels',
      'Dirigeants et chefs d\'entreprise',
      'Familles aux enjeux de transmission',
    ],
    highlights: [
      { value: 'Pluridisciplinaire', label: 'droit, fisc, compta' },
      { value: 'Coordonné', label: 'par un interlocuteur unique' },
      { value: 'Synergie', label: 'avec vos conseils' },
    ],
    faq: [
      {
        q: 'Dois-je quitter mes conseils actuels ?',
        a: "Non. Nous travaillons volontiers avec vos interlocuteurs habituels (notaire, expert-comptable, avocat) pour assurer la cohérence de l'ensemble.",
      },
      {
        q: 'Comment se coordonne le réseau ?',
        a: 'Vous gardez un interlocuteur unique chez Élan Patrimoine, qui pilote et fait dialoguer les différents experts au service de votre stratégie.',
      },
      {
        q: 'Le recours au réseau a-t-il un coût ?',
        a: "Chaque expert facture ses prestations selon ses propres modalités, en toute transparence. Nous vous présentons les éléments avant tout engagement.",
      },
      {
        q: 'Comment sont sélectionnés les experts ?',
        a: "Sur la base de leur compétence, de leur déontologie et de la qualité de la relation. Nous ne recommandons que des partenaires dont nous connaissons et garantissons le sérieux.",
      },
      {
        q: 'Le réseau intervient-il partout en France ?',
        a: "Oui. Notre réseau et nos outils nous permettent de vous accompagner où que vous soyez, en présentiel comme à distance, avec le même niveau d'exigence.",
      },
    ],
  },
};
