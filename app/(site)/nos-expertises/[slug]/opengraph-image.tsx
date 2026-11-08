import { renderOgImage, ogSize, ogContentType } from '@/lib/og-image';
import { expertises, type ExpertiseSlug } from '@/lib/site';
import { expertiseContent } from '@/lib/expertise-content';

/**
 * Carte de partage propre à chaque expertise (1200 × 630, PNG léger), à la
 * place de la photo d'illustration : bonnes dimensions déclarées et aperçu
 * fiable sur les messageries (WhatsApp, LinkedIn…).
 */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Élan Patrimoine, cabinet de gestion de patrimoine à Paris';

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

export default async function ExpertiseOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const content = expertiseContent[slug as ExpertiseSlug];
  return renderOgImage(
    content?.title ?? 'Nos expertises',
    content ? `Pilier ${content.pillar} · Nos expertises` : undefined
  );
}
