import Link from 'next/link';
import Image from 'next/image';
import { imageUrl, img } from '@/lib/images';
import Reveal from './Reveal';

/**
 * Bandeau « Prendre rendez-vous » présent en bas de chaque page.
 * Panneau arrondi qui « flotte » sur une bande crème : il se distingue
 * ainsi nettement du pied de page (navy) au lieu de s'y fondre.
 *
 * `variant` :
 *  - `navy` (défaut) : panneau bleu nuit, texte crème — version standard du site.
 *  - `gold` : panneau or crème, texte forêt — utilisé sur « Notre approche ».
 */
export default function CTASection({
  title = 'Donnons un cap à votre patrimoine.',
  text = "Échangeons sur vos objectifs lors d'un premier rendez-vous confidentiel et sans engagement.",
  bgClassName = 'bg-cream-200',
  variant = 'navy',
}: {
  title?: string;
  text?: string;
  bgClassName?: string;
  variant?: 'navy' | 'gold';
}) {
  const isGold = variant === 'gold';

  return (
    <section className={`${bgClassName} pt-6 pb-20 md:pt-8 md:pb-28`}>
      <div className="container-content">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[28px] shadow-elevated md:rounded-[40px]"
            style={{
              background: isGold
                ? 'radial-gradient(120% 140% at 85% -20%, #FFD98A 0%, rgba(255,217,138,0) 52%), linear-gradient(140deg, #F7EACB 0%, #EFDDB0 100%)'
                : 'radial-gradient(120% 140% at 85% -20%, #1c3868 0%, rgba(28,56,104,0) 50%), linear-gradient(140deg, #11254a 0%, #0d1d3b 100%)',
            }}
          >
            {/* Image ville en filigrane */}
            <Image
              src={imageUrl(img.ctaCity, 1920, 70)}
              alt=""
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className={isGold ? 'object-cover opacity-[0.08]' : 'object-cover opacity-[0.16]'}
            />
            {/* Voile dégradé pour la lisibilité du texte + halo doré */}
            <div
              className={
                isGold
                  ? 'absolute inset-0 bg-gradient-to-r from-cream via-cream/80 to-transparent'
                  : 'absolute inset-0 bg-gradient-to-r from-forest-dark via-forest-dark/85 to-transparent'
              }
            />
            <div
              aria-hidden="true"
              className={
                isGold
                  ? 'pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/20 blur-[130px]'
                  : 'pointer-events-none absolute -right-16 -top-24 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-[130px]'
              }
            />
            {/* Filet doré supérieur */}
            <span
              aria-hidden="true"
              className={
                isGold
                  ? 'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-dark/60 to-transparent'
                  : 'absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent'
              }
            />

            <div className="relative px-8 py-16 sm:px-12 md:px-16 md:py-20 lg:px-20">
              <span className={isGold ? 'eyebrow mb-5' : 'eyebrow eyebrow-light mb-5'}>
                Prendre rendez-vous
              </span>
              <h2
                className={
                  isGold
                    ? 'max-w-2xl text-balance text-3xl font-semibold leading-[1.1] text-forest-dark md:text-[2.8rem]'
                    : 'max-w-2xl text-balance text-3xl font-semibold leading-[1.1] text-cream md:text-[2.8rem]'
                }
              >
                {title}
              </h2>
              <p
                className={
                  isGold
                    ? 'mt-5 max-w-xl text-lg leading-relaxed text-forest/75'
                    : 'mt-5 max-w-xl text-lg leading-relaxed text-cream/70'
                }
              >
                {text}
              </p>
              <div className="mt-9 flex flex-col gap-4 sm:flex-row">
                <Link href="/contact#assistant" className={isGold ? 'btn-primary' : 'btn-gold'}>
                  Prendre rendez-vous
                </Link>
                <Link
                  href="/notre-approche"
                  className={isGold ? 'btn-outline' : 'btn-outline-light'}
                >
                  Découvrir notre approche
                </Link>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
