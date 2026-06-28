import Link from 'next/link';
import Image from 'next/image';
import { imageUrl, img } from '@/lib/images';

/**
 * PAGE TEMPORAIRE — exploration des styles de héro (accueil).
 * Présente plusieurs variations de typographie / alignement / échelle pour
 * le titre du hero. Quand une variation est retenue, on la reporte dans
 * app/(site)/page.tsx puis on supprime cette page.
 *
 * URL : /hero-variations  (non indexée)
 */
export const metadata = {
  title: 'Hero — variations de style',
  robots: { index: false, follow: false },
};

const ACCROCHE =
  'Cabinet indépendant, nous concevons et pilotons des stratégies patrimoniales sur mesure (gestion, fiscalité, protection et transmission) au seul service de vos intérêts.';

/* ------------------------------------------------------------------ */
/* Briques partagées                                                   */
/* ------------------------------------------------------------------ */

/** Fond image + voiles de lecture, communs à toutes les variations. */
function HeroBackground() {
  return (
    <>
      <Image
        src={imageUrl(img.heroHome)}
        alt=""
        fill
        priority={false}
        sizes="100vw"
        className="object-cover"
      />
      <div className="pointer-events-none absolute inset-0 bg-forest-dark/25" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest-dark/90 via-forest-dark/35 to-forest-dark/5" />
    </>
  );
}

/** Mot mis en valeur en dégradé doré, repris de la home. */
function GoldWord({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-gradient-to-r from-gold via-gold-light to-gold bg-clip-text text-transparent">
      {children}
    </span>
  );
}

function CtaPair({ align = 'start' }: { align?: 'start' | 'center' }) {
  return (
    <div
      className={`mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-10 ${
        align === 'center' ? 'sm:justify-center' : ''
      }`}
    >
      <Link
        href="/contact#assistant"
        className="group inline-flex items-center justify-center gap-2 rounded-[3px] bg-cream px-7 py-4 text-sm font-medium text-forest-dark transition-colors duration-300 hover:bg-white"
      >
        Prendre rendez-vous
        <Arrow />
      </Link>
      <Link
        href="/nos-expertises"
        className="group inline-flex items-center justify-center gap-2 px-2 py-4 text-sm font-medium text-cream/90 transition-colors duration-300 hover:text-cream"
      >
        Nos expertises
        <Arrow />
      </Link>
    </div>
  );
}

function Arrow({ size = 15 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
    >
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  );
}

/** Étiquette d'identification de variation, en haut de chaque section. */
function VariantLabel({ n, title }: { n: number; title: string }) {
  return (
    <div className="absolute left-0 right-0 top-0 z-30">
      <div className="container-content flex items-center gap-3 pt-6">
        <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full bg-gold px-2 text-xs font-semibold text-forest-dark">
          {n}
        </span>
        <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-cream/70">
          {title}
        </span>
      </div>
    </div>
  );
}

type VariantProps = { n: number; title: string };

/* ------------------------------------------------------------------ */
/* Variation 1 — Éditorial (actuel) : grand, ancré en bas à gauche     */
/* ------------------------------------------------------------------ */

function V1Editorial({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-end">
        <div className="container-content pb-16 pt-32 md:pb-20">
          <div className="max-w-3xl">
            <h1 className="text-balance font-serif text-[2.25rem] font-medium leading-[1.05] text-cream sm:text-5xl md:text-[3.25rem] lg:text-6xl">
              Votre patrimoine mérite une <GoldWord>stratégie</GoldWord>, pas un
              produit.
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-relaxed text-cream/75 md:mt-7 md:text-base">
              {ACCROCHE}
            </p>
            <CtaPair />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 2 — Monumental : très grand titre, ancré en bas à gauche  */
/* ------------------------------------------------------------------ */

function V2Monumental({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-end">
        <div className="container-content pb-16 pt-32 md:pb-20">
          <div className="max-w-5xl">
            <h1 className="font-serif text-[2.75rem] font-semibold leading-[0.98] text-cream sm:text-6xl md:text-7xl lg:text-[5.5rem]">
              Votre patrimoine mérite une <GoldWord>stratégie</GoldWord>.
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-cream/75 md:text-lg">
              {ACCROCHE}
            </p>
            <CtaPair />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 3 — Centré classique : titre moyen centré, plein écran    */
/* ------------------------------------------------------------------ */

function V3Centered({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-content py-32 text-center">
          <div className="mx-auto max-w-3xl">
            <span className="mb-6 inline-block text-[11px] font-semibold uppercase tracking-[0.28em] text-gold">
              Gestion de patrimoine
            </span>
            <h1 className="text-balance font-serif text-4xl font-medium leading-[1.08] text-cream sm:text-5xl md:text-[3.5rem]">
              Votre patrimoine mérite une <GoldWord>stratégie</GoldWord>, pas un
              produit.
            </h1>
            <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-cream/75 md:text-base">
              {ACCROCHE}
            </p>
            <CtaPair align="center" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 4 — Minimal sobre : petit titre centré, beaucoup d'air    */
/* ------------------------------------------------------------------ */

function V4Minimal({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-content py-32 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="font-serif text-2xl font-normal leading-snug text-cream sm:text-3xl md:text-[2.25rem]">
              Votre patrimoine mérite une <GoldWord>stratégie</GoldWord>, pas un
              produit.
            </h1>
            <span className="mx-auto mt-6 block h-px w-16 bg-gold/70" />
            <p className="mx-auto mt-6 max-w-md text-xs leading-relaxed text-cream/70 md:text-sm">
              {ACCROCHE}
            </p>
            <CtaPair align="center" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 5 — Centré monumental : titre XXL centré, impact maximal  */
/* ------------------------------------------------------------------ */

function V5CenteredBig({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-center">
        <div className="container-content py-32 text-center">
          <div className="mx-auto max-w-4xl">
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] text-cream sm:text-6xl md:text-7xl lg:text-[5rem]">
              Une <GoldWord>stratégie</GoldWord>,
              <br />
              pas un produit.
            </h1>
            <p className="mx-auto mt-8 max-w-lg text-sm leading-relaxed text-cream/75 md:text-base">
              {ACCROCHE}
            </p>
            <CtaPair align="center" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 6 — Asymétrique : titre à gauche, accroche à droite       */
/* ------------------------------------------------------------------ */

function V6Split({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-end">
        <div className="container-content grid items-end gap-8 pb-16 pt-32 md:pb-20 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <h1 className="font-serif text-[2.5rem] font-medium leading-[1.02] text-cream sm:text-5xl md:text-6xl">
              Votre patrimoine mérite une <GoldWord>stratégie</GoldWord>, pas un
              produit.
            </h1>
          </div>
          <div className="lg:col-span-5 lg:pb-2">
            <p className="max-w-md text-sm leading-relaxed text-cream/75 md:text-base">
              {ACCROCHE}
            </p>
            <CtaPair />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 7 — Actuel agrandi : même design, titre/accroche/boutons  */
/*               simplement plus grands                                 */
/* ------------------------------------------------------------------ */

function V7LargerSameDesign({ n, title }: VariantProps) {
  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-hidden">
      <HeroBackground />
      <VariantLabel n={n} title={title} />
      <div className="relative z-10 flex flex-1 items-end">
        <div className="container-content pb-16 pt-32 md:pb-20">
          <div className="max-w-4xl">
            <h1 className="text-balance font-serif text-[2.75rem] font-medium leading-[1.05] text-cream sm:text-6xl md:text-7xl lg:text-[4.5rem]">
              Votre patrimoine mérite une{' '}
              <span className="relative inline-block">
                <GoldWord>stratégie</GoldWord>
                <svg
                  className="absolute -bottom-2 left-0 w-full text-gold"
                  viewBox="0 0 200 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 8C40 3 80 3 120 6C150 8 175 7 198 4"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              , pas un produit.
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 md:mt-8 md:text-lg lg:text-xl">
              {ACCROCHE}
            </p>
            {/* Boutons agrandis : on garde le même design, on augmente
                padding et taille de texte. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 md:mt-11">
              <Link
                href="/contact#assistant"
                className="group inline-flex items-center justify-center gap-2.5 rounded-[3px] bg-cream px-9 py-5 text-base font-medium text-forest-dark transition-colors duration-300 hover:bg-white"
              >
                Prendre rendez-vous
                <Arrow size={18} />
              </Link>
              <Link
                href="/nos-expertises"
                className="group inline-flex items-center justify-center gap-2.5 px-3 py-5 text-base font-medium text-cream/90 transition-colors duration-300 hover:text-cream"
              >
                Nos expertises
                <Arrow size={18} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function HeroVariationsPage() {
  return (
    <main className="bg-forest-dark">
      <V1Editorial n={1} title="Éditorial — grand, bas-gauche (actuel)" />
      <V2Monumental n={2} title="Monumental — titre XXL bas-gauche" />
      <V3Centered n={3} title="Centré classique — titre moyen" />
      <V4Minimal n={4} title="Minimal sobre — petit titre centré" />
      <V5CenteredBig n={5} title="Centré monumental — titre XXL" />
      <V6Split n={6} title="Asymétrique — titre / accroche" />
      <V7LargerSameDesign n={7} title="Actuel agrandi — même design, en plus grand" />
    </main>
  );
}
