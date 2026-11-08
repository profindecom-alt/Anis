import { renderOgImage, ogSize, ogContentType } from '@/lib/og-image';
import { expertises, type ExpertiseSlug } from '@/lib/site';
import { expertiseContent } from '@/lib/expertise-content';

/** Même carte que ./opengraph-image.tsx, pour les balises Twitter/X. */
export const size = ogSize;
export const contentType = ogContentType;
export const alt = 'Élan Patrimoine, cabinet de gestion de patrimoine à Paris';

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

export default async function ExpertiseTwitterImage({
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
