/**
 * Données source des 12 articles d'origine, conservées pour l'import initial
 * dans Sanity (`npm run seed`). Après l'import, ces articles vivent dans le CMS
 * et ce fichier n'est plus utilisé au runtime.
 *
 * `imageId` référence un fichier de /public/images/<imageId>.jpg, téléversé vers
 * Sanity lors du seed. `content` est du HTML, converti en Portable Text.
 */
import type { Category } from '../lib/categories';

export interface SeedArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  date: string;
  author: string;
  readingTime: number;
  imageId: string;
  featured?: boolean;
  content: string;
}

export const seedArticles: SeedArticle[] = [
  {
    slug: 'loi-de-finances-2026-ce-qui-change',
    title: 'Loi de finances 2026 : ce qui change pour votre patrimoine',
    excerpt:
      "Tranches d'imposition, dispositifs d'investissement, fiscalité de l'épargne : décryptage des mesures qui impactent directement vos stratégies patrimoniales.",
    category: 'Fiscalité',
    date: '2026-05-28',
    author: 'Antoine Gérard',
    readingTime: 7,
    imageId: '1554224155-6726b3ff858f',
    featured: true,
    content: `
      <p>La loi de finances 2026 introduit plusieurs ajustements qui méritent l'attention de tout détenteur de patrimoine. Au-delà du barème de l'impôt sur le revenu, revalorisé pour tenir compte de l'inflation, c'est l'ensemble de l'écosystème de l'épargne et de l'investissement qui connaît des évolutions notables.</p>
      <h2>Un barème revalorisé</h2>
      <p>Les tranches du barème progressif sont relevées afin de neutraliser l'effet de l'inflation sur le pouvoir d'achat. Cette indexation, bien que technique, a un impact concret sur l'optimisation du quotient familial et sur l'arbitrage entre revenus du travail et revenus du capital.</p>
      <h2>Dispositifs d'investissement</h2>
      <p>Plusieurs dispositifs de réduction d'impôt voient leur cadre précisé. Il convient d'analyser chaque opportunité au regard de votre situation globale, et non isolément. Une réduction d'impôt n'a de sens que si l'investissement sous-jacent est solide.</p>
      <ul>
        <li>Réexamen des plafonds de versement sur les enveloppes d'épargne retraite</li>
        <li>Évolution de la fiscalité applicable aux plus-values mobilières</li>
        <li>Clarification du régime des locations meublées</li>
      </ul>
      <h2>Notre lecture</h2>
      <p>Chaque réforme fiscale appelle un réexamen de la stratégie. Nous recommandons un point d'étape annuel afin de vérifier que votre allocation reste cohérente avec le cadre légal et avec vos objectifs. <strong>L'optimisation fiscale n'est jamais une fin en soi : elle doit servir un projet patrimonial.</strong></p>
    `,
  },
  {
    slug: 'assurance-vie-architecture-ouverte',
    title: "Assurance-vie : pourquoi l'architecture ouverte change tout",
    excerpt:
      "Frais, choix des supports, indépendance des conseils : l'architecture ouverte redéfinit la performance attendue d'un contrat d'assurance-vie.",
    category: 'Investissement',
    date: '2026-05-14',
    author: 'Sophie Laurent',
    readingTime: 6,
    imageId: '1460925895917-afdab827c52f',
    featured: false,
    content: `
      <p>L'assurance-vie demeure le placement préféré des Français. Encore faut-il distinguer un contrat captif, qui ne propose que les fonds de son promoteur, d'un contrat en architecture ouverte, qui donne accès à l'ensemble du marché.</p>
      <h2>La liberté de sélection</h2>
      <p>En architecture ouverte, le conseiller sélectionne les supports les plus pertinents, indépendamment de leur société de gestion. Cette liberté est la condition d'un conseil réellement objectif.</p>
      <h2>Maîtriser les frais</h2>
      <p>Les frais de gestion, d'arbitrage et d'entrée pèsent lourd sur la performance à long terme. Un contrat bien négocié, adossé à une sélection rigoureuse, fait toute la différence sur dix ou vingt ans.</p>
      <ul>
        <li>Accès aux fonds de gestionnaires indépendants reconnus</li>
        <li>Diversification réelle : actions, obligations, immobilier, private equity</li>
        <li>Arbitrages pilotés en fonction des cycles de marché</li>
      </ul>
      <p>Notre rôle consiste à construire et à piloter cette allocation dans la durée, au service de vos objectifs.</p>
    `,
  },
  {
    slug: 'transmission-anticiper-donation',
    title: 'Transmission : anticiper vaut mieux que subir',
    excerpt:
      "Donation, démembrement, pacte Dutreil : les leviers pour transmettre dans les meilleures conditions fiscales et humaines.",
    category: 'Transmission',
    date: '2026-04-30',
    author: 'Antoine Gérard',
    readingTime: 8,
    imageId: '1604594849809-dfedbc827105',
    featured: false,
    content: `
      <p>La transmission est l'un des sujets les plus sensibles du conseil patrimonial. Elle mêle enjeux fiscaux, équilibres familiaux et convictions personnelles. L'anticipation est la clé d'une transmission sereine.</p>
      <h2>Les donations</h2>
      <p>Les abattements applicables aux donations se renouvellent par périodes. Échelonner les transmissions permet d'en optimiser la fiscalité, tout en accompagnant les générations suivantes au moment opportun.</p>
      <h2>Le démembrement de propriété</h2>
      <p>Donner la nue-propriété tout en conservant l'usufruit est un outil puissant : le donateur conserve les revenus et l'usage du bien, tandis que la valeur transmise est réduite.</p>
      <h2>Le pacte Dutreil</h2>
      <p>Pour les chefs d'entreprise, le pacte Dutreil permet une transmission d'entreprise dans un cadre fiscal avantageux, sous conditions d'engagement de conservation.</p>
      <p><strong>Chaque situation familiale est unique.</strong> Nous coordonnons notaires et experts-comptables pour bâtir la stratégie la plus adaptée à votre histoire.</p>
    `,
  },
  {
    slug: 'prevoyance-dirigeant-protection',
    title: 'Prévoyance du dirigeant : protéger ce qui compte vraiment',
    excerpt:
      "Le chef d'entreprise est souvent le moins bien protégé. Tour d'horizon des solutions pour sécuriser revenus, famille et activité.",
    category: 'Prévoyance',
    date: '2026-04-18',
    author: 'Sophie Laurent',
    readingTime: 5,
    imageId: '1521791136064-7986c2920216',
    featured: false,
    content: `
      <p>Le dirigeant concentre les risques : la pérennité de son entreprise et la sécurité de sa famille dépendent souvent de sa seule capacité de travail. Une couverture prévoyance adaptée est indispensable.</p>
      <h2>Couvrir l'incapacité et l'invalidité</h2>
      <p>Un arrêt prolongé peut compromettre les revenus du foyer et la trésorerie de l'entreprise. Les contrats de prévoyance permettent de maintenir un niveau de revenu et de financer la continuité de l'activité.</p>
      <h2>Protéger les proches</h2>
      <p>Le capital décès et la rente éducation garantissent l'avenir des proches. Ces garanties doivent être calibrées au regard du train de vie et des engagements en cours.</p>
      <ul>
        <li>Maintien de revenu en cas d'incapacité temporaire</li>
        <li>Rente en cas d'invalidité permanente</li>
        <li>Capital et rentes pour les ayants droit</li>
      </ul>
      <p>Nous auditons votre couverture existante pour identifier, sans excès, les zones de fragilité.</p>
    `,
  },
  {
    slug: 'marches-2026-allocation-prudente',
    title: 'Marchés 2026 : pourquoi privilégier une allocation prudente',
    excerpt:
      'Volatilité, taux, diversification : nos convictions pour traverser une année incertaine sans renoncer à la performance.',
    category: 'Marchés',
    date: '2026-04-02',
    author: 'Antoine Gérard',
    readingTime: 6,
    imageId: '1559526324-4b87b5e36e44',
    featured: false,
    content: `
      <p>L'environnement de marché reste marqué par l'incertitude. Dans ce contexte, la discipline d'allocation prime sur la recherche de paris spéculatifs.</p>
      <h2>Diversifier les moteurs de performance</h2>
      <p>Une allocation robuste combine des classes d'actifs faiblement corrélées : actions internationales, obligations de qualité, immobilier et actifs réels. La diversification reste le seul « repas gratuit » des marchés.</p>
      <h2>Garder le cap</h2>
      <p>Les tentations de « timer » le marché se soldent rarement par un gain. La régularité des versements et le maintien d'un horizon long sont les meilleurs alliés de l'épargnant.</p>
      <p><strong>Notre conviction :</strong> une allocation cohérente, revue périodiquement, sert mieux vos intérêts qu'une succession de décisions impulsives.</p>
    `,
  },
  {
    slug: 'per-epargne-retraite-leviers',
    title: "PER : les leviers méconnus de l'épargne retraite",
    excerpt:
      "Déductibilité des versements, sortie en capital, transmission : le Plan d'Épargne Retraite recèle des optimisations souvent négligées.",
    category: 'Fiscalité',
    date: '2026-03-20',
    author: 'Sophie Laurent',
    readingTime: 7,
    imageId: '1450101499163-c8848c66ca85',
    featured: false,
    content: `
      <p>Le Plan d'Épargne Retraite s'est imposé comme un outil central de préparation de la retraite. Sa souplesse en fait aussi un instrument d'optimisation fiscale puissant.</p>
      <h2>La déductibilité à l'entrée</h2>
      <p>Les versements volontaires sont déductibles du revenu imposable, dans la limite des plafonds. L'effet de levier est d'autant plus fort que la tranche marginale d'imposition est élevée.</p>
      <h2>Choisir sa sortie</h2>
      <p>À la retraite, le PER autorise une sortie en capital, en rente, ou une combinaison des deux. Cet arbitrage doit être anticipé plusieurs années à l'avance.</p>
      <h2>Un outil de transmission</h2>
      <p>En cas de décès, le PER assurantiel bénéficie d'un cadre de transmission proche de celui de l'assurance-vie. Un atout trop souvent ignoré.</p>
      <p>Nous calibrons vos versements en fonction de votre fiscalité réelle, année après année.</p>
    `,
  },
  {
    slug: 'immobilier-scpi-selectivite',
    title: 'Immobilier et SCPI : la sélectivité avant tout',
    excerpt:
      'Toutes les SCPI ne se valent pas. Critères de qualité, diversification sectorielle et géographique : comment choisir.',
    category: 'Investissement',
    date: '2026-03-08',
    author: 'Antoine Gérard',
    readingTime: 6,
    imageId: '1486406146926-c627a92ad1ab',
    featured: false,
    content: `
      <p>Les SCPI offrent un accès mutualisé à l'immobilier professionnel. Mais derrière une même catégorie se cachent des réalités très différentes en termes de qualité de patrimoine et de gestion.</p>
      <h2>Les critères de sélection</h2>
      <ul>
        <li>Qualité et diversification du patrimoine immobilier</li>
        <li>Taux d'occupation financier durable</li>
        <li>Politique de distribution et report à nouveau</li>
        <li>Solidité et historique de la société de gestion</li>
      </ul>
      <h2>Intégrer la SCPI dans une stratégie</h2>
      <p>Détenue en direct, à crédit, en démembrement ou au sein d'un contrat d'assurance-vie, la SCPI répond à des objectifs distincts. Le mode de détention compte autant que le choix du véhicule.</p>
      <p>Notre approche d'architecture ouverte nous permet de sélectionner les meilleures solutions du marché, sans biais commercial.</p>
    `,
  },
  {
    slug: 'directive-conseil-financier-2026',
    title: 'Réglementation : ce qu’impose le devoir de conseil',
    excerpt:
      "Transparence des frais, adéquation des recommandations, traçabilité : le cadre réglementaire protège l'épargnant. Décryptage.",
    category: 'Réglementation',
    date: '2026-02-24',
    author: 'Sophie Laurent',
    readingTime: 5,
    imageId: '1556761175-5973dc0f32e7',
    featured: false,
    content: `
      <p>Le conseil en investissement est strictement encadré. Loin d'être une contrainte, ce cadre est une garantie pour l'épargnant : il impose transparence, adéquation et traçabilité.</p>
      <h2>Le devoir d'adéquation</h2>
      <p>Toute recommandation doit être adaptée à votre situation, à vos connaissances et à votre tolérance au risque. C'est le sens du recueil d'informations préalable.</p>
      <h2>La transparence des frais</h2>
      <p>L'ensemble des frais doit vous être communiqué de manière claire et complète. Un conseil de qualité ne craint pas la transparence : il la revendique.</p>
      <p>En tant que cabinet indépendant immatriculé à l'ORIAS, nous appliquons ces principes avec la plus grande rigueur.</p>
    `,
  },
  {
    slug: 'private-equity-diversification',
    title: 'Private equity : diversifier au-delà des marchés cotés',
    excerpt:
      "Longtemps réservé aux institutionnels, le non-coté s'ouvre aux particuliers avertis. Opportunités, risques et conditions d'accès.",
    category: 'Investissement',
    date: '2026-02-10',
    author: 'Antoine Gérard',
    readingTime: 7,
    imageId: '1454165804606-c3d57bc86b40',
    featured: false,
    content: `
      <p>Le private equity permet d'investir dans des entreprises non cotées, à différents stades de leur développement. Cette classe d'actifs offre un potentiel de performance décorrélé des marchés boursiers.</p>
      <h2>Comprendre l'illiquidité</h2>
      <p>L'investissement non coté s'inscrit dans la durée : les capitaux sont immobilisés plusieurs années. Cette illiquidité est la contrepartie d'une prime de performance attendue.</p>
      <h2>Une place mesurée dans l'allocation</h2>
      <p>Le private equity doit représenter une part calibrée du patrimoine, en cohérence avec votre horizon et votre tolérance au risque. La sélection des fonds est déterminante.</p>
      <p>Nous sélectionnons des véhicules de qualité et dimensionnons leur poids avec prudence.</p>
    `,
  },
  {
    slug: 'demembrement-usufruit-nue-propriete',
    title: 'Démembrement : dissocier usufruit et nue-propriété',
    excerpt:
      'Un mécanisme juridique élégant pour optimiser revenus, fiscalité et transmission. Mode d’emploi.',
    category: 'Transmission',
    date: '2026-01-28',
    author: 'Sophie Laurent',
    readingTime: 6,
    imageId: '1505664194779-8beaceb93744',
    featured: false,
    content: `
      <p>Le démembrement consiste à séparer la propriété d'un bien en deux droits distincts : l'usufruit, qui donne droit aux revenus et à l'usage, et la nue-propriété, qui correspond à la propriété du bien sans en percevoir les fruits.</p>
      <h2>Des usages multiples</h2>
      <ul>
        <li>Transmettre la nue-propriété tout en conservant les revenus</li>
        <li>Acquérir la nue-propriété d'un bien à prix réduit pour préparer l'avenir</li>
        <li>Optimiser l'impôt sur la fortune immobilière</li>
      </ul>
      <h2>Un cadre à maîtriser</h2>
      <p>La valeur respective de l'usufruit et de la nue-propriété dépend de l'âge de l'usufruitier. Une projection rigoureuse est indispensable avant toute opération.</p>
      <p>Nous travaillons main dans la main avec votre notaire pour sécuriser chaque montage.</p>
    `,
  },
  {
    slug: 'taux-credit-effet-levier',
    title: "Crédit et effet de levier : emprunter pour investir",
    excerpt:
      "Dans un patrimoine bien construit, la dette peut être un atout. Comment utiliser le crédit comme levier de constitution.",
    category: 'Marchés',
    date: '2026-01-15',
    author: 'Antoine Gérard',
    readingTime: 5,
    imageId: '1517245386807-bb43f82c33c4',
    featured: false,
    content: `
      <p>Contrairement à une idée reçue, le crédit n'est pas l'ennemi du patrimoine. Bien employé, il constitue un levier puissant de constitution d'actifs.</p>
      <h2>L'effet de levier immobilier</h2>
      <p>Emprunter pour investir dans l'immobilier locatif permet de se constituer un patrimoine financé en partie par les revenus du bien et par l'économie d'impôt.</p>
      <h2>La déductibilité des intérêts</h2>
      <p>Dans certains régimes, les intérêts d'emprunt sont déductibles des revenus fonciers, améliorant le rendement net de l'opération.</p>
      <p><strong>L'essentiel reste la maîtrise du risque :</strong> l'endettement doit toujours rester soutenable au regard de vos revenus et de votre épargne de précaution.</p>
    `,
  },
  {
    slug: 'ifi-strategies-optimisation',
    title: 'IFI : les stratégies légales de réduction',
    excerpt:
      "Démembrement, dette déductible, investissements exonérés : panorama des leviers pour alléger l'impôt sur la fortune immobilière.",
    category: 'Fiscalité',
    date: '2025-12-18',
    author: 'Sophie Laurent',
    readingTime: 6,
    imageId: '1554224154-26032ffc0d07',
    featured: false,
    content: `
      <p>L'impôt sur la fortune immobilière concerne les patrimoines immobiliers nets supérieurs au seuil légal. Plusieurs leviers, parfaitement légaux, permettent d'en optimiser le montant.</p>
      <h2>Réduire l'assiette taxable</h2>
      <ul>
        <li>Démembrement de propriété : seul l'usufruitier est en principe redevable</li>
        <li>Prise en compte des dettes déductibles afférentes aux biens taxables</li>
        <li>Investissements bénéficiant d'une exonération sous conditions</li>
      </ul>
      <h2>Une approche d'ensemble</h2>
      <p>L'optimisation de l'IFI ne doit jamais se faire au détriment de la cohérence patrimoniale globale. Chaque levier s'apprécie au regard de vos objectifs de revenus et de transmission.</p>
      <p>Nous réalisons une simulation complète avant toute recommandation.</p>
    `,
  },
];
