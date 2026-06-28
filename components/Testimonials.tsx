import Link from 'next/link';
import { testimonials } from '@/lib/site';
import Reveal from './Reveal';
import TestimonialsColumns from './TestimonialsColumns';

/**
 * Section de preuve sociale — variante « Mur défilant ». En-tête centré à
 * filets dorés, fond crème texturé de points, et trois colonnes de cartes en
 * défilement vertical continu, masquées en fondu haut/bas (voir
 * {@link TestimonialsColumns}). Registre crème/or, sobre et premium.
 */
export default function Testimonials({
  bgClassName = 'bg-cream-gold',
}: {
  bgClassName?: string;
}) {
  return (
    <section
      className={`${bgClassName} relative overflow-hidden pt-24 pb-8 md:pt-32 md:pb-10`}
    >
      {/* Texture de points, estompée vers le bas */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          backgroundImage:
            'radial-gradient(rgba(15,45,82,0.06) 1px, transparent 1.4px)',
          backgroundSize: '26px 26px',
          maskImage:
            'radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 72%)',
        }}
      />

      <div className="container-content relative">
        {/* En-tête centré */}
        <Reveal className="mx-auto mb-14 flex max-w-[720px] flex-col items-center text-center md:mb-16">
          <span className="mb-5 inline-flex items-center gap-4 text-xs font-semibold uppercase tracking-widest text-gold-dark">
            <span aria-hidden="true" className="block h-px w-9 bg-gold/85" />
            Témoignages
            <span aria-hidden="true" className="block h-px w-9 bg-gold/85" />
          </span>
          <h2 className="text-balance font-serif text-4xl font-medium leading-[1.05] text-forest md:text-5xl">
            La confiance, sur la durée
          </h2>
          <p className="mt-4 max-w-[46ch] text-balance text-lg leading-relaxed text-ink/65">
            Des relations qui se mesurent en années, pas en transactions.
          </p>
        </Reveal>

        <Reveal delay={120}>
          <TestimonialsColumns testimonials={testimonials} />
        </Reveal>

        {/* Appel à l'action, juste après la preuve sociale : invite à
            rejoindre les clients accompagnés. */}
        <Reveal delay={200} className="mt-12 flex justify-center md:mt-14">
          <Link href="/contact#assistant" className="link-underline">
            Rejoignez nos clients
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
              <path d="M1 6h13M9 1l5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
