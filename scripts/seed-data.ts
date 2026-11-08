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
  imageAlt: string;
  featured?: boolean;
  content: string;
}

export const seedArticles: SeedArticle[] = [
  {
    slug: 'loi-de-finances-2026-ce-qui-change',
    title: 'Loi de finances 2026 : ce qui change pour votre patrimoine',
    excerpt:
      "Barème de l'impôt et points de contrôle : une méthode pour vérifier les règles 2026 avant toute décision patrimoniale.",
    category: 'Fiscalité',
    date: '2026-05-28',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 7,
    imageId: '1554224155-6726b3ff858f',
    imageAlt: 'Documents fiscaux, calculatrice et téléphone posés sur un bureau',
    featured: true,
    content: `
      <p>La loi de finances pour 2026 a notamment indexé de 0,9 % les limites des tranches du barème applicable aux revenus 2025. Toute autre mesure doit être vérifiée dans le texte en vigueur et selon sa date d'effet avant d'être intégrée à une stratégie.</p>
      <h2>Un barème revalorisé</h2>
      <p>Le barème demeure progressif : seule la fraction du revenu comprise dans une tranche est imposée au taux correspondant. Le quotient familial, son plafonnement et les mécanismes de décote peuvent modifier le calcul final.</p>
      <h2>Points à vérifier</h2>
      <p>Plutôt que de déduire une règle générale d'une annonce, il convient de contrôler le texte applicable, la date d'effet et les conditions propres au foyer ou au produit concerné.</p>
      <ul>
        <li>Le barème et les seuils applicables à l'année de revenus concernée</li>
        <li>Le plafond personnel disponible avant un versement d'épargne retraite</li>
        <li>Le régime fiscal précis d'une plus-value ou d'une location selon sa nature</li>
      </ul>
      <p>Source primaire : <a href="https://bofip.impots.gouv.fr/bofip/14954-PGP.html/ACTU-2026-00022">BOFiP, actualité du 7 avril 2026 sur l'indexation du barème</a>.</p>
      <h2>Notre lecture</h2>
      <p>Chaque réforme fiscale appelle un réexamen de la stratégie. Nous recommandons un point d'étape annuel afin de vérifier que votre allocation reste cohérente avec le cadre légal et avec vos objectifs. <strong>L'optimisation fiscale n'est jamais une fin en soi : elle doit servir un projet patrimonial.</strong></p>
    `,
  },
  {
    slug: 'assurance-vie-architecture-ouverte',
    title: "Assurance-vie : pourquoi l'architecture ouverte change tout",
    excerpt:
      "Frais, choix des supports et périmètre de sélection : les points à vérifier dans un contrat d'assurance-vie en architecture ouverte.",
    category: 'Investissement',
    date: '2026-05-14',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 6,
    imageId: '1460925895917-afdab827c52f',
    imageAlt: 'Tableau de données et graphiques affichés sur un ordinateur portable',
    featured: false,
    content: `
      <p>Les contrats d'assurance-vie diffèrent notamment par leurs frais, leurs garanties et l'univers de supports accessibles. Une architecture dite ouverte peut donner accès à plusieurs sociétés de gestion, sans pour autant couvrir l'ensemble du marché.</p>
      <h2>La liberté de sélection</h2>
      <p>L'analyse peut comparer des supports de plusieurs sociétés de gestion. Le périmètre réellement accessible, les critères retenus, les risques et les modes de rémunération doivent être clairement présentés.</p>
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
      "Donation, démembrement, pacte Dutreil : des leviers à étudier pour préparer une transmission sur les plans fiscal et humain.",
    category: 'Transmission',
    date: '2026-04-30',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 8,
    imageId: '1604594849809-dfedbc827105',
    imageAlt: 'Figurine assise sur une pile de pièces en euros',
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
      "Comment examiner les conséquences d'un arrêt de travail, d'une invalidité ou d'un décès sur les revenus, la famille et l'activité.",
    category: 'Prévoyance',
    date: '2026-04-18',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 5,
    imageId: '1521791136064-7986c2920216',
    imageAlt: 'Deux personnes se serrant la main dans un cadre professionnel',
    featured: false,
    content: `
      <p>Pour certains dirigeants, un arrêt de travail, une invalidité ou un décès peut affecter à la fois les revenus du foyer et l'activité. Un bilan des prestations obligatoires, des contrats existants et des besoins peut mettre en évidence d'éventuels écarts.</p>
      <h2>Couvrir l'incapacité et l'invalidité</h2>
      <p>Un arrêt prolongé peut compromettre les revenus du foyer et la trésorerie de l'entreprise. Les contrats de prévoyance permettent de maintenir un niveau de revenu et de financer la continuité de l'activité.</p>
      <h2>Protéger les proches</h2>
      <p>Un capital décès ou une rente éducation peut contribuer au maintien des ressources des proches, sous réserve des conditions, exclusions et limites du contrat. Le montant s'apprécie au regard des besoins, des prestations existantes et des engagements en cours.</p>
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
      'Volatilité, horizon et diversification : des repères pour examiner une allocation sans minimiser le risque de perte.',
    category: 'Marchés',
    date: '2026-04-02',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 6,
    imageId: '1559526324-4b87b5e36e44',
    imageAlt: 'Personne consultant un ordinateur portable à son bureau',
    featured: false,
    content: `
      <p>L'environnement de marché reste marqué par l'incertitude. Dans ce contexte, la discipline d'allocation prime sur la recherche de paris spéculatifs.</p>
      <h2>Diversifier les moteurs de performance</h2>
      <p>La diversification peut répartir les risques entre plusieurs classes d'actifs, mais les corrélations évoluent et peuvent augmenter en période de crise. Elle ne garantit ni rendement positif ni absence de perte.</p>
      <h2>Garder le cap</h2>
      <p>Les décisions d'entrée et de sortie à court terme exposent à un risque d'erreur de calendrier. Des versements réguliers peuvent lisser les points d'entrée sans protéger contre une baisse ni convenir à toutes les situations.</p>
      <p><strong>Notre lecture :</strong> l'allocation doit rester cohérente avec l'horizon, la capacité de perte et les objectifs, puis être revue lorsque la situation évolue.</p>
    `,
  },
  {
    slug: 'per-epargne-retraite-leviers',
    title: "PER : les leviers méconnus de l'épargne retraite",
    excerpt:
      "Déduction éventuelle, modalités de sortie et transmission : les règles à vérifier avant d'utiliser un Plan d'Épargne Retraite.",
    category: 'Fiscalité',
    date: '2026-03-20',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 7,
    imageId: '1450101499163-c8848c66ca85',
    imageAlt: 'Main signant un document avec un stylo',
    featured: false,
    content: `
      <p>Le Plan d'Épargne Retraite est une enveloppe de long terme destinée à préparer la retraite. La disponibilité de l'épargne, la fiscalité et les possibilités de sortie varient selon l'origine des sommes et la situation du titulaire.</p>
      <h2>La déductibilité à l'entrée</h2>
      <p>Les versements volontaires peuvent être déduits du revenu imposable dans la limite du plafond disponible ; il est également possible de renoncer à cette déduction. L'effet fiscal réel se calcule avec le barème progressif et ne correspond pas toujours au versement multiplié par la tranche marginale.</p>
      <h2>Choisir sa sortie</h2>
      <p>À la retraite, une sortie en capital, en rente ou une combinaison peut être possible selon le compartiment et l'origine des versements. Chaque modalité entraîne des conséquences fiscales propres.</p>
      <h2>Un outil de transmission</h2>
      <p>En cas de décès, les règles diffèrent selon qu'il s'agit d'un PER assurantiel ou d'un PER d'investissement, l'âge au décès et la qualité du bénéficiaire. La clause et le régime applicables doivent être examinés au cas par cas.</p>
      <p>Le montant d'un versement s'apprécie à partir du plafond personnel, de l'horizon, des besoins de liquidité, des frais et de la fiscalité attendue à la sortie.</p>
    `,
  },
  {
    slug: 'immobilier-scpi-selectivite',
    title: 'Immobilier et SCPI : la sélectivité avant tout',
    excerpt:
      'Toutes les SCPI ne se valent pas. Critères de qualité, diversification sectorielle et géographique : comment choisir.',
    category: 'Investissement',
    date: '2026-03-08',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 6,
    imageId: '1486406146926-c627a92ad1ab',
    imageAlt: 'Immeubles de bureaux vus en contre-plongée',
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
      <p>Notre approche consiste à comparer les solutions accessibles selon des critères documentés : qualité des actifs, gestion, frais, liquidité et adéquation avec votre situation.</p>
    `,
  },
  {
    slug: 'directive-conseil-financier-2026',
    title: 'Réglementation : ce qu’impose le devoir de conseil',
    excerpt:
      "Transparence des frais, adéquation des recommandations, traçabilité : le cadre réglementaire protège l'épargnant. Décryptage.",
    category: 'Réglementation',
    date: '2026-02-24',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 5,
    imageId: '1556761175-5973dc0f32e7',
    imageAlt: 'Présentation devant une équipe réunie dans un espace de travail',
    featured: false,
    content: `
      <p>Le conseil en investissement est strictement encadré. Ce cadre vise à protéger l'épargnant en imposant notamment transparence, adéquation et traçabilité.</p>
      <h2>Le devoir d'adéquation</h2>
      <p>Toute recommandation doit être adaptée à votre situation, à vos connaissances et à votre tolérance au risque. C'est le sens du recueil d'informations préalable.</p>
      <h2>La transparence des frais</h2>
      <p>L'ensemble des frais doit vous être communiqué de manière claire et complète. Un conseil de qualité ne craint pas la transparence : il la revendique.</p>
      <p>Le cabinet est inscrit à l'ORIAS. Les catégories et leur validité doivent être vérifiées sur la fiche officielle ; le cadre applicable dépend de la prestation concernée.</p>
    `,
  },
  {
    slug: 'private-equity-diversification',
    title: 'Private equity : diversifier au-delà des marchés cotés',
    excerpt:
      "Longtemps réservé aux institutionnels, le non-coté s'ouvre aux particuliers avertis. Opportunités, risques et conditions d'accès.",
    category: 'Investissement',
    date: '2026-02-10',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 7,
    imageId: '1454165804606-c3d57bc86b40',
    imageAlt: 'Professionnels analysant des documents autour d’ordinateurs portables',
    featured: false,
    content: `
      <p>Le private equity permet d'investir dans des entreprises non cotées, à différents stades de leur développement. Ses valorisations, moins fréquentes que celles des actifs cotés, peuvent donner une apparence de moindre corrélation sans supprimer le risque économique ni le risque de perte en capital.</p>
      <h2>Comprendre l'illiquidité</h2>
      <p>L'investissement non coté s'inscrit généralement dans la durée : les capitaux peuvent être immobilisés plusieurs années et les possibilités de sortie sont limitées. Aucune prime de performance n'est garantie en contrepartie de cette illiquidité.</p>
      <h2>Une place mesurée dans l'allocation</h2>
      <p>Le private equity doit représenter une part calibrée du patrimoine, en cohérence avec votre horizon et votre tolérance au risque. La sélection des fonds est déterminante.</p>
      <p>L'analyse doit documenter la stratégie, l'équipe de gestion, les frais, la valorisation, l'horizon, les scénarios de perte et l'adéquation avec la situation de l'investisseur.</p>
    `,
  },
  {
    slug: 'demembrement-usufruit-nue-propriete',
    title: 'Démembrement : dissocier usufruit et nue-propriété',
    excerpt:
      'Un mécanisme juridique élégant pour optimiser revenus, fiscalité et transmission. Mode d’emploi.',
    category: 'Transmission',
    date: '2026-01-28',
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 6,
    imageId: '1505664194779-8beaceb93744',
    imageAlt: 'Bibliothèque ancienne avec livres, bustes et échelle',
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
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 5,
    imageId: '1517245386807-bb43f82c33c4',
    imageAlt: 'Discussion professionnelle devant un ordinateur portable',
    featured: false,
    content: `
      <p>Contrairement à une idée reçue, le crédit n'est pas l'ennemi du patrimoine. Bien employé, il constitue un levier puissant de constitution d'actifs.</p>
      <h2>L'effet de levier immobilier</h2>
      <p>Emprunter pour investir dans l'immobilier locatif peut financer une partie de l'acquisition par les loyers, sans garantir qu'ils couvrent les mensualités, les charges, la vacance ou les travaux.</p>
      <h2>La déductibilité des intérêts</h2>
      <p>Dans certains régimes et sous conditions, les intérêts d'emprunt peuvent être déduits des revenus fonciers. L'effet dépend du régime fiscal et ne garantit pas la rentabilité de l'opération.</p>
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
    author: 'Équipe éditoriale Élan Patrimoine',
    readingTime: 6,
    imageId: '1554224154-26032ffc0d07',
    imageAlt: 'Documents fiscaux, calculatrice et tasse de café vus du dessus',
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
      <p>Une simulation doit documenter l'assiette, les dettes éventuellement déductibles, les exonérations invoquées et les hypothèses avant toute décision.</p>
    `,
  },
];
