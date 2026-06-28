import Link from 'next/link';
import Image from 'next/image';
import { imageUrl } from '@/lib/images';
import { breadcrumbJsonLd } from '@/lib/seo';

interface Crumb {
  label: string;
  href?: string;
}

/**
 * En-tête standard des pages intérieures : fil d'Ariane, surtitre, titre, intro.
 * Fond vert forêt avec image optionnelle en filigrane.
 */
export default function PageHero({
  eyebrow,
  title,
  intro,
  breadcrumbs = [],
  imageId,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  breadcrumbs?: Crumb[];
  imageId?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-forest pt-20">
      {breadcrumbs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
          }}
        />
      )}
      {imageId && (
        <>
          <Image
            src={imageUrl(imageId, 1920, 70)}
            alt=""
            fill
            sizes="100vw"
            priority
            className="object-cover opacity-45"
          />
          {/* Voile dégradé : sombre à gauche (lisibilité du titre), plus clair
              à droite pour laisser apparaître l'image. */}
          <div className="absolute inset-0 bg-gradient-to-r from-forest via-forest/80 to-forest/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
        </>
      )}
      <div className="container-content relative py-10 sm:py-16 md:py-24">
        {/* Fil d'Ariane */}
        <nav aria-label="Fil d'Ariane" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-xs text-cream/55">
            <li>
              <Link href="/" className="transition-colors hover:text-gold">
                Accueil
              </Link>
            </li>
            {breadcrumbs.map((c, i) => (
              <li key={i} className="flex items-center gap-2">
                <span aria-hidden="true" className="text-cream/30">/</span>
                {c.href ? (
                  <Link href={c.href} className="transition-colors hover:text-gold">
                    {c.label}
                  </Link>
                ) : (
                  <span className="text-cream/80">{c.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>

        {eyebrow && (
          <span className="eyebrow eyebrow-light mb-5 animate-fade-up">{eyebrow}</span>
        )}
        <h1 className="max-w-4xl text-balance text-3xl font-semibold leading-[1.05] text-cream animate-fade-up sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-cream/75 animate-fade-up sm:mt-6 sm:text-lg md:text-xl">
            {intro}
          </p>
        )}
      </div>
    </section>
  );
}
