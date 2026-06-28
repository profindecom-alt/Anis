import Image from 'next/image';
import SignatureSection from '@/components/SignatureSection';

/**
 * PAGE TEMPORAIRE — choix de la section « signature » de marque.
 * Présente plusieurs variations vintage haut de gamme pour la page Notre
 * Approche. Quand une variation est retenue, on la promeut en composant
 * définitif (SignatureSection) et on supprime cette page.
 */
export const metadata = {
  title: 'Signature — variations',
  robots: { index: false, follow: false },
};

const CREDO_EM = 'seulement des décisions qui traversent les années';
const PRINCIPES = ['Patience', 'Indépendance', 'Transmission'] as const;

/* ------------------------------------------------------------------ */
/* Ornements partagés                                                  */
/* ------------------------------------------------------------------ */

function FlourishRule({ className = '' }: { className?: string }) {
  return (
    <svg
      width="180"
      height="14"
      viewBox="0 0 180 14"
      fill="none"
      aria-hidden="true"
      className={`mx-auto h-3 w-36 md:w-44 ${className}`}
    >
      <line x1="6" y1="7" x2="70" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <line x1="110" y1="7" x2="174" y2="7" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="76" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
      <circle cx="104" cy="7" r="1.5" fill="currentColor" opacity="0.7" />
      <path d="M90 1.5 96 7 90 12.5 84 7Z" fill="currentColor" />
    </svg>
  );
}

function Principes({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <ul
      className={`flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-[11px] font-semibold uppercase tracking-[0.22em] md:gap-x-6 md:text-xs ${
        tone === 'light' ? 'text-cream/80' : 'text-forest/80'
      }`}
    >
      {PRINCIPES.map((p, i) => (
        <li key={p} className="flex items-center gap-4 md:gap-6">
          {i > 0 && <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rotate-45 bg-gold/70" />}
          {p}
        </li>
      ))}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 1 — Médaillon Navy (sceau de cire, vintage sombre)        */
/* ------------------------------------------------------------------ */

function VariationMedaillon() {
  return (
    <section className="relative overflow-hidden bg-forest py-20 text-cream md:py-32">
      {/* Halo doré diffus */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <Image
        src="/logos/logo-gold.png"
        alt=""
        width={967}
        height={1160}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 w-[300px] -translate-x-1/2 -translate-y-1/2 opacity-[0.06] md:w-[460px]"
      />
      <div className="container-content relative">
        <div className="mx-auto max-w-3xl text-center">
          {/* Sceau monogramme */}
          <span className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-forest-dark/60 shadow-[0_0_0_6px_rgba(199,161,90,0.08)] md:h-24 md:w-24">
            <Image src="/logos/logo-gold.png" alt="Monogramme Élan Patrimoine" width={967} height={1160} className="h-10 w-auto md:h-12" />
          </span>
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.32em] text-gold md:text-xs">
            L&apos;esprit Élan · Depuis 2018
          </p>
          <div className="my-7 text-gold md:my-9">
            <FlourishRule />
          </div>
          <blockquote className="m-0 text-balance font-serif text-[27px] font-medium leading-[1.3] text-cream md:text-[42px] md:leading-[1.22]">
            Le temps est le meilleur allié d&apos;un patrimoine bien conseillé. Nous
            en avons fait notre signature&nbsp;: ni précipitation ni effet de mode,{' '}
            <em className="font-medium italic text-gold">{CREDO_EM}</em>.
          </blockquote>
          <div className="my-8 text-gold md:my-10">
            <FlourishRule />
          </div>
          <Principes tone="light" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 3 — Éditorial + tampon circulaire « Est. 2018 »           */
/* ------------------------------------------------------------------ */

function CircularStamp({ className = '' }: { className?: string }) {
  const text = 'ÉLAN PATRIMOINE · GESTION DE PATRIMOINE · ';
  return (
    <svg viewBox="0 0 220 220" fill="none" aria-hidden="true" className={className}>
      <defs>
        <path id="stamp-circle" d="M110,110 m-82,0 a82,82 0 1,1 164,0 a82,82 0 1,1 -164,0" />
      </defs>
      <circle cx="110" cy="110" r="98" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="110" cy="110" r="90" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="110" cy="110" r="58" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <text fill="currentColor" className="font-sans" fontSize="10" fontWeight="600" letterSpacing="2.4">
        <textPath href="#stamp-circle" startOffset="0">{text}{text}</textPath>
      </text>
      {/* Étoiles séparatrices */}
      <path d="M110 16 112 22 118 22 113 26 115 32 110 28 105 32 107 26 102 22 108 22Z" fill="currentColor" />
      <text x="110" y="98" textAnchor="middle" fill="currentColor" className="font-serif" fontSize="13" letterSpacing="3">EST.</text>
      <text x="110" y="132" textAnchor="middle" fill="currentColor" className="font-serif" fontSize="30" fontWeight="600">2018</text>
    </svg>
  );
}

function VariationEditorial() {
  return (
    <section
      className="relative overflow-hidden py-20 md:py-32"
      style={{ background: 'radial-gradient(120% 130% at 100% 0%, #FBF9F5 0%, #F5F0E8 60%, #EBE3D4 100%)' }}
    >
      <div className="container-content relative">
        <div className="grid items-center gap-12 md:grid-cols-12 md:gap-16">
          {/* Texte */}
          <div className="relative md:col-span-7">
            <span aria-hidden="true" className="absolute -left-5 top-1 hidden h-full w-px bg-gradient-to-b from-gold via-gold/50 to-transparent md:block" />
            <p className="mb-5 text-[10.5px] font-semibold uppercase tracking-[0.3em] text-[#7a5e22] md:text-xs">
              L&apos;esprit Élan
            </p>
            <span aria-hidden="true" className="mb-5 block h-[30px] font-serif text-[80px] italic leading-[0.6] text-gold md:text-[110px]">&ldquo;</span>
            <blockquote className="m-0 max-w-xl text-balance font-serif text-[28px] font-medium leading-[1.26] text-forest md:text-[44px] md:leading-[1.18]">
              Le temps est le meilleur allié d&apos;un patrimoine bien conseillé,{' '}
              <em className="font-medium italic text-gold">{CREDO_EM}</em>.
            </blockquote>
            <div className="mt-9 flex items-center gap-4">
              <span aria-hidden="true" className="h-px w-12 bg-gold/55" />
              <span className="font-serif text-lg italic text-forest/90 md:text-xl">Élan Patrimoine</span>
            </div>
            <div className="mt-7">
              <Principes />
            </div>
          </div>
          {/* Tampon */}
          <div className="flex justify-center md:col-span-5">
            <div className="relative">
              <CircularStamp className="h-56 w-56 text-gold md:h-72 md:w-72" />
              <Image
                src="/logos/logo-gold.png"
                alt="Monogramme Élan Patrimoine"
                width={967}
                height={1160}
                className="absolute left-1/2 top-[40%] h-10 w-auto -translate-x-1/2 -translate-y-1/2 opacity-90 md:h-12"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Variation 4 — Art Déco (éventails dorés, fond navy)                 */
/* ------------------------------------------------------------------ */

function DecoFan({ className = '' }: { className?: string }) {
  return (
    <svg width="120" height="40" viewBox="0 0 120 40" fill="none" aria-hidden="true" className={className}>
      {Array.from({ length: 9 }, (_, i) => {
        const angle = (-80 + (i * 160) / 8) * (Math.PI / 180);
        const x = 60 + Math.sin(angle) * 56;
        const y = 38 - Math.cos(angle) * 34;
        return <line key={i} x1="60" y1="38" x2={x} y2={y} stroke="currentColor" strokeWidth="1" opacity={0.4 + (i % 2) * 0.4} />;
      })}
      <circle cx="60" cy="38" r="2.5" fill="currentColor" />
    </svg>
  );
}

function VariationDeco() {
  return (
    <section className="relative overflow-hidden bg-forest-dark py-20 text-cream md:py-32">
      <div className="container-content relative">
        <div className="relative mx-auto max-w-3xl px-6 py-14 text-center md:px-12 md:py-16">
          {/* Cadre Art Déco en escalier */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 border border-gold/35" />
          <div aria-hidden="true" className="pointer-events-none absolute inset-3 border-x border-gold/20" />
          {/* Coins en équerre */}
          {(['left-3 top-3', 'right-3 top-3', 'left-3 bottom-3', 'right-3 bottom-3'] as const).map((pos) => (
            <span key={pos} aria-hidden="true" className={`absolute ${pos} h-4 w-4 border border-gold/60`} />
          ))}

          <DecoFan className="mx-auto mb-6 h-9 w-28 text-gold md:mb-8" />
          <p className="text-[10.5px] font-semibold uppercase tracking-[0.34em] text-gold md:text-xs">
            Depuis 2018
          </p>
          <blockquote className="m-0 mt-7 text-balance font-serif text-[26px] font-medium leading-[1.3] text-cream md:text-[40px] md:leading-[1.22]">
            Le temps est le meilleur allié d&apos;un patrimoine bien conseillé. Nous
            en avons fait notre signature&nbsp;: ni précipitation ni effet de mode,{' '}
            <em className="font-medium italic text-gold">{CREDO_EM}</em>.
          </blockquote>
          <DecoFan className="mx-auto mb-7 mt-8 h-9 w-28 rotate-180 text-gold md:mt-10" />
          <Principes tone="light" />
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Page — toutes les variations étiquetées                             */
/* ------------------------------------------------------------------ */

const VARIATIONS = [
  { id: 1, name: 'Médaillon Navy', note: 'Sceau de cire sur fond bleu nuit, halo doré. Luxe sombre.', node: <VariationMedaillon /> },
  { id: 2, name: 'Cartouche Parchemin (retenue, améliorée)', note: 'Double filet net, studs d’angle dorés, filigrane renforcé.', node: <SignatureSection /> },
  { id: 3, name: 'Éditorial + Tampon', note: 'Citation asymétrique et tampon circulaire « Est. 2018 ».', node: <VariationEditorial /> },
  { id: 4, name: 'Art Déco', note: 'Éventails dorés et cadre géométrique sur navy profond.', node: <VariationDeco /> },
];

export default function SignatureVariationsPage() {
  return (
    <main className="bg-cream pt-24">
      <div className="container-content py-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Page temporaire</p>
        <h1 className="mt-2 font-serif text-3xl font-semibold text-forest md:text-4xl">
          Section « signature » — 4 variations
        </h1>
        <p className="mt-3 max-w-2xl text-ink/65">
          Comparez les propositions ci-dessous puis indiquez le numéro retenu : je
          la promeus en composant définitif sur la page Notre Approche et je
          supprime cette page.
        </p>
      </div>

      {VARIATIONS.map((v) => (
        <div key={v.id}>
          <div className="container-content">
            <div className="flex flex-wrap items-baseline gap-3 border-t border-ink/10 pt-10">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-forest font-serif text-sm font-semibold text-gold">
                {v.id}
              </span>
              <h2 className="font-serif text-2xl font-semibold text-forest">{v.name}</h2>
              <span className="text-sm text-ink/55">{v.note}</span>
            </div>
          </div>
          {v.node}
        </div>
      ))}

      <div className="container-content py-16 text-center">
        <p className="text-ink/60">
          Dites-moi simplement&nbsp;: «&nbsp;variation 2&nbsp;» (ou un mélange,
          par ex. «&nbsp;le tampon de la 3 sur le fond de la 1&nbsp;»).
        </p>
      </div>
    </main>
  );
}
