/**
 * Images auto-hébergées dans /public/images.
 * `next/image` se charge ensuite de générer les variantes WebP/AVIF
 * optimisées et redimensionnées à la volée à partir de ces sources locales.
 *
 * Le second paramètre (largeur) et le troisième (qualité) ne servent plus
 * qu'à conserver une API stable avec le code existant : la source est unique
 * et c'est `next/image` qui produit les tailles via l'attribut `sizes`.
 */
export function imageUrl(id: string, _w = 1600, _q = 80): string {
  return `/images/${id}.jpg`;
}

/** Bibliothèque d'images thématiques (patrimoine, finance, architecture). */
export const img = {
  heroHome: '1486406146926-c627a92ad1ab', // architecture moderne
  cabinet: '62b1d4717e403c84342d91b1_slide2', // réunion conseil
  cabinetTeam: '1600880292089-90a7e086ee0c', // poignée de main
  patrimoine: '1554224155-6726b3ff858f', // documents financiers
  defiscalisation: '1450101499163-c8848c66ca85', // bureau écriture
  assurance: '1521791136064-7986c2920216', // poignée de main protection
  reseau: '1556761175-5973dc0f32e7', // réunion d'experts
  approche: '1460925895917-afdab827c52f', // analyse données
  valeurs: 'bureau1', // bureau du cabinet
  ctaCity: '1559526324-4b87b5e36e44', // skyline financier
  contact: '1497366216548-37526070297c', // bureau lumineux
} as const;
