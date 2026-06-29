export type Testimonial = {
  quote: string;
  emphasis?: string;
  name: string;
  role: string;
  initials?: string;
};

/** Fondu haut/bas appliqué au mur de témoignages (compatible WebKit). */
const FADE_MASK =
  'linear-gradient(to bottom, transparent, black 18%, black 82%, transparent)';

/** Logo « G » Google en couleurs officielles, en guise d'avatar (avis Google). */
function GoogleLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 48 48"
      aria-label="Avis Google"
      role="img"
    >
      <path
        fill="#4285F4"
        d="M45.12 24.5c0-1.56-.14-3.06-.4-4.5H24v8.51h11.84c-.51 2.75-2.06 5.08-4.39 6.64v5.52h7.11c4.16-3.83 6.56-9.47 6.56-16.17z"
      />
      <path
        fill="#34A853"
        d="M24 46c5.94 0 10.92-1.97 14.56-5.33l-7.11-5.52c-1.97 1.32-4.49 2.1-7.45 2.1-5.73 0-10.58-3.87-12.31-9.07H4.34v5.7C7.96 41.07 15.4 46 24 46z"
      />
      <path
        fill="#FBBC05"
        d="M11.69 28.18C11.25 26.86 11 25.45 11 24s.25-2.86.69-4.18v-5.7H4.34A21.99 21.99 0 0 0 2 24c0 3.55.85 6.91 2.34 9.88l7.35-5.7z"
      />
      <path
        fill="#EA4335"
        d="M24 10.75c3.23 0 6.13 1.11 8.41 3.29l6.31-6.31C34.91 4.18 29.93 2 24 2 15.4 2 7.96 6.93 4.34 14.12l7.35 5.7c1.73-5.2 6.58-9.07 12.31-9.07z"
      />
    </svg>
  );
}

/** Rend une citation en mettant `emphasis` en or italique (le reste en navy). */
function Quote({ text, emphasis }: { text: string; emphasis?: string }) {
  if (!emphasis || !text.includes(emphasis)) return <>{text}</>;
  const [before, after] = text.split(emphasis);
  return (
    <>
      {before}
      <em className="font-medium italic text-gold-dark">{emphasis}</em>
      {after}
    </>
  );
}

function Card({ t }: { t: Testimonial }) {
  return (
    <figure className="flex flex-col border border-gold/30 bg-cream-50 p-8 shadow-card md:p-9">
      <span
        aria-hidden="true"
        className="block h-[30px] font-serif text-[72px] italic leading-[0.6] text-gold/80"
      >
        &ldquo;
      </span>

      <blockquote className="text-balance font-serif text-[21px] font-medium leading-[1.34] text-forest">
        <Quote text={t.quote} emphasis={t.emphasis} />
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-4 border-t border-gold/30 pt-6">
        <span className="flex h-[46px] w-[46px] flex-none items-center justify-center rounded-full border border-gold/30 bg-white shadow-sm">
          <GoogleLogo />
        </span>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-forest">{t.name}</span>
          <span className="mt-0.5 text-xs font-medium tracking-wide text-ink/50">
            {t.role}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}

/**
 * Une colonne de témoignages en défilement vertical continu. Le contenu est
 * dupliqué et chaque carte porte son propre espacement bas : la translation de
 * -50 % boucle ainsi sans rupture ni saut. `duration` règle la vitesse (en s).
 * Le défilement ne s'arrête jamais (ni au survol ni au clic) ; il est seulement
 * désactivé pour les utilisateurs qui préfèrent un mouvement réduit.
 */
function Column({
  testimonials,
  duration,
  className = '',
}: {
  testimonials: Testimonial[];
  duration: number;
  className?: string;
}) {
  if (testimonials.length === 0) return null;

  return (
    <div className={className}>
      <div
        className="flex animate-scroll-y flex-col will-change-transform motion-reduce:animate-none"
        style={{
          animationDuration: `${duration}s`,
        }}
      >
        {/* Deux copies identiques pour boucler ; la seconde est masquée aux
            lecteurs d'écran pour ne pas relire les témoignages en double. */}
        {[0, 1].map((copy) => (
          <div key={copy} className="flex flex-col" aria-hidden={copy === 1}>
            {testimonials.map((t, i) => (
              <div key={`${t.name}-${i}`} className="pb-7">
                <Card t={t} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Mur de témoignages en trois colonnes à défilement vertical, à vitesses
 * légèrement décalées, masqué en fondu haut/bas. Une colonne sur mobile,
 * deux à partir de `md`, trois à partir de `lg`. Registre crème/or, sobre
 * et premium.
 */
export default function TestimonialsColumns({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const size = Math.ceil(testimonials.length / 3);
  const firstColumn = testimonials.slice(0, size);
  const secondColumn = testimonials.slice(size, size * 2);
  const thirdColumn = testimonials.slice(size * 2);

  // Le défilement ne s'arrête jamais : aucune interaction (survol ou clic) ne
  // le met en pause, pour un mouvement continu façon « mur d'avis ».
  return (
    <div
      className="flex max-h-[740px] justify-center gap-7 overflow-hidden"
      style={{ maskImage: FADE_MASK, WebkitMaskImage: FADE_MASK }}
    >
      <Column
        testimonials={firstColumn}
        duration={15}
        className="max-w-[360px] flex-1"
      />
      <Column
        testimonials={secondColumn}
        duration={19}
        className="hidden max-w-[360px] flex-1 md:block"
      />
      <Column
        testimonials={thirdColumn}
        duration={17}
        className="hidden max-w-[360px] flex-1 lg:block"
      />
    </div>
  );
}
