import Image from 'next/image';
import Reveal from './Reveal';

/**
 * Section « signature » de marque, dans l'esprit vintage d'Élan Patrimoine :
 * cartouche au double filet doré, studs en losange aux angles et au centre des
 * filets, sceau monogramme en médaillon, séparateurs ornés, credo éditorial en
 * Cormorant avec emphase dorée. Fond parchemin (dégradé radial) avec monogramme
 * doré en filigrane. Proportions ajustées mobile d'abord. Tokens de marque du
 * projet (forest / gold / cream).
 */

/** Filet orné à losange central, façon typographie ancienne. */
function FlourishRule() {
  return (
    <svg
      width="180"
      height="14"
      viewBox="0 0 180 14"
      fill="none"
      aria-hidden="true"
      className="mx-auto h-3 w-28 text-gold sm:w-36 md:w-44"
    >
      <line x1="6" y1="7" x2="70" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="7" x2="174" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="76" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="104" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
      <path d="M90 1.5 96 7 90 12.5 84 7Z" fill="currentColor" />
    </svg>
  );
}

/** Stud doré en losange (angle ou milieu de filet). */
function Stud({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`absolute h-2 w-2 rotate-45 bg-gold shadow-[0_0_0_2px_rgba(245,240,232,1)] md:h-2.5 md:w-2.5 ${className}`}
    />
  );
}

export default function SignatureSection({
  variant = 'default',
}: {
  /** `approche` : variante réservée à la page Notre approche. Le cartouche
   *  n'est plus une citation isolée mais est accompagné d'une colonne de
   *  repères (la maison Élan + ses trois principes développés), pour ne pas
   *  redoubler la citation de la section Conviction. */
  variant?: 'default' | 'approche';
} = {}) {
  const approche = variant === 'approche';

  // Cartouche extrait pour être réutilisé dans les deux mises en page
  // (isolée par défaut, ou en regard de la colonne de repères en `approche`).
  const cartouche = (
    /* Cartouche : filet extérieur + filet intérieur */
    <div className="relative border-[1.5px] border-gold/55 px-5 py-10 text-center sm:px-12 sm:py-12 md:px-16 md:py-16">
            {/* Filet intérieur (double encadrement régulier) */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-[6px] border border-gold/30 md:inset-[9px]"
            />

            {/* Studs d'angle */}
            <Stud className="-left-[4px] -top-[4px] md:-left-[5px] md:-top-[5px]" />
            <Stud className="-right-[4px] -top-[4px] md:-right-[5px] md:-top-[5px]" />
            <Stud className="-bottom-[4px] -left-[4px] md:-bottom-[5px] md:-left-[5px]" />
            <Stud className="-bottom-[4px] -right-[4px] md:-bottom-[5px] md:-right-[5px]" />
            {/* Studs au milieu des filets haut / bas (interruption ornementale) */}
            <Stud className="-top-[4px] left-1/2 -translate-x-1/2 md:-top-[5px]" />
            <Stud className="-bottom-[4px] left-1/2 -translate-x-1/2 md:-bottom-[5px]" />

            {/* Sceau monogramme */}
            <span className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/45 bg-cream-50 shadow-[0_2px_12px_-4px_rgba(165,130,63,0.55)] md:mb-7 md:h-20 md:w-20">
              <Image
                src="/logos/logo-gold.png"
                alt="Monogramme Élan Patrimoine"
                width={967}
                height={1160}
                className="h-8 w-auto md:h-11"
              />
            </span>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#7a5e22] sm:tracking-[0.26em] md:text-xs md:tracking-[0.3em]">
              L&apos;esprit Élan · Depuis 2018
            </p>

            <div className="mb-6 mt-5 text-gold md:mb-9 md:mt-7">
              <FlourishRule />
            </div>

            <blockquote className="m-0 text-balance font-serif text-[22px] font-medium leading-[1.32] text-forest sm:text-[26px] md:text-[40px] md:leading-[1.22]">
              Le temps est le meilleur allié d&apos;un patrimoine bien conseillé.
              Nous en avons fait notre signature&nbsp;: ni précipitation ni effet
              de mode,{' '}
              <em className="font-medium italic text-gold">
                seulement des décisions qui traversent les années
              </em>
              .
            </blockquote>

            <div className="mb-6 mt-7 text-gold md:mb-8 md:mt-10">
              <FlourishRule />
            </div>

            {/* Principes, séparés par des losanges dorés (masqués en approche) */}
            {!approche && (
              <ul className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-forest/80 sm:text-[11px] sm:tracking-[0.22em] md:gap-x-6 md:text-xs">
                {['Patience', 'Indépendance', 'Transmission'].map((p, i) => (
                  <li key={p} className="flex items-center gap-3 md:gap-6">
                    {i > 0 && (
                      <span
                        aria-hidden="true"
                        className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70"
                      />
                    )}
                    {p}
                  </li>
                ))}
              </ul>
            )}

            {/* Signature : manuscrite (variante approche), sinon en italique. */}
            {approche ? (
              <div className="mt-8 flex flex-col items-center md:mt-10">
                <Image
                  src="/images/imagevlt2.png"
                  alt="Signature Élan Patrimoine"
                  width={1200}
                  height={400}
                  className="h-16 w-auto opacity-80 lg:h-[3.4rem]"
                />
              </div>
            ) : (
              <div className="mt-8 flex items-center justify-center gap-3 md:mt-10">
                <span aria-hidden="true" className="h-px w-6 bg-gold/55 md:w-8" />
                <span className="font-serif text-base italic text-forest/90 md:text-xl">
                  Élan Patrimoine
                </span>
                <span aria-hidden="true" className="h-px w-6 bg-gold/55 md:w-8" />
              </div>
            )}
    </div>
  );

  // Média de la maison (variante approche) : photo réelle du cabinet, encadrée
  // d'un double filet doré qui fait écho au cartouche, et brève légende.
  const mediaAside = (
    <figure className="m-0">
      <div className="relative border-[1.5px] border-gold/55 p-2 sm:p-2.5">
        {/* Filet intérieur (double encadrement, comme le cartouche) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-[6px] z-10 border border-gold/30"
        />
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/imagevlt1.jpg"
            alt="Les bureaux du cabinet Élan Patrimoine"
            fill
            sizes="(max-width: 1024px) 92vw, 38vw"
            className="object-cover"
          />
        </div>
      </div>
      <figcaption className="mt-7 text-center">
        <span className="eyebrow justify-center">La maison Élan</span>
        <p className="mx-auto mt-4 max-w-xs text-balance font-serif text-xl leading-snug text-forest md:text-2xl">
          Un cabinet indépendant, fondé en 2018.
        </p>
      </figcaption>
    </figure>
  );

  return (
    <section
      className="relative overflow-hidden py-16 md:py-32"
      style={{
        background:
          'radial-gradient(130% 120% at 50% 0%, #FBF9F5 0%, #F5F0E8 55%, #EBE3D4 100%)',
      }}
    >
      {/* Monogramme doré en filigrane (mise en page par défaut, centré sur la
          section). En approche, il est centré derrière le cartouche — voir
          plus bas dans la colonne de gauche. */}
      {!approche && (
        <Image
          src="/logos/logo-gold.png"
          alt=""
          width={967}
          height={1160}
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.13] sm:w-[340px] md:w-[560px]"
        />
      )}

      <div className="container-content relative">
        {approche ? (
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="relative lg:col-span-7">
              {/* Monogramme centré derrière le cartouche (placé avant lui
                  dans le DOM pour passer en arrière-plan). */}
              <Image
                src="/logos/logo-gold.png"
                alt=""
                width={967}
                height={1160}
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 w-[320px] -translate-x-1/2 -translate-y-1/2 opacity-[0.07] sm:w-[380px] md:w-[460px]"
              />
              {cartouche}
            </Reveal>
            <Reveal delay={120} className="lg:col-span-5">
              {mediaAside}
            </Reveal>
          </div>
        ) : (
          <Reveal className="mx-auto max-w-3xl">{cartouche}</Reveal>
        )}
      </div>
    </section>
  );
}
