import PageHero from './PageHero';
import CTASection from './CTASection';
import { img } from '@/lib/images';

/**
 * Gabarit commun aux pages légales : en-tête sobre + contenu en prose.
 */
export default function LegalLayout({
  title,
  intro,
  breadcrumbLabel,
  updated,
  children,
  showCta = true,
  ctaBgClassName,
  imageId = img.patrimoine,
  contentPbClassName = 'pb-20 md:pb-28',
}: {
  title: string;
  intro?: string;
  breadcrumbLabel: string;
  updated?: string;
  children: React.ReactNode;
  showCta?: boolean;
  /** Fond de la bande CTA. Si absent, CTASection utilise son défaut. */
  ctaBgClassName?: string;
  /** Image de fond du hero, comme les autres pages intérieures. */
  imageId?: string;
  /** Rembourrage bas de la section de contenu (défaut : pb-20 md:pb-28). */
  contentPbClassName?: string;
}) {
  return (
    <>
      <PageHero
        eyebrow="Informations légales"
        title={title}
        intro={intro}
        breadcrumbs={[{ label: breadcrumbLabel }]}
        imageId={imageId}
      />
      <section className={`bg-cream pt-20 md:pt-28 ${contentPbClassName}`}>
        <div className="container-content">
          <div className="mx-auto max-w-prose">
            {updated && (
              <p className="mb-10 text-sm text-ink/45">
                Dernière mise à jour : {updated}
              </p>
            )}
            <div className="prose-anis">{children}</div>
          </div>
        </div>
      </section>
      {showCta && <CTASection bgClassName={ctaBgClassName} />}
    </>
  );
}
