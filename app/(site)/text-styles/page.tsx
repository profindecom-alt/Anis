/**
 * PAGE TEMPORAIRE — Exploration des polices de caractères
 * Supprimer après validation. Accessible à /text-styles en dev.
 */

import {
  Playfair_Display,
  EB_Garamond,
  Fraunces,
  Bodoni_Moda,
  DM_Serif_Display,
  Spectral,
  Cinzel,
  DM_Sans,
  Plus_Jakarta_Sans,
  Outfit,
  Source_Sans_3,
  Figtree,
  Raleway,
} from 'next/font/google';

export const metadata = { title: '[DEV] Polices — Élan Patrimoine' };

/* ── Sérifs (titres) ───────────────────────────────────────────── */
const playfair  = Playfair_Display ({ subsets: ['latin'], weight: ['400','500','600','700'] });
const ebGaramond= EB_Garamond      ({ subsets: ['latin'], weight: ['400','500','600'] });
const fraunces  = Fraunces         ({ subsets: ['latin'], weight: ['300','400','500','600'], style: ['normal','italic'] });
const bodoni    = Bodoni_Moda      ({ subsets: ['latin'], weight: ['400','500','600','700'] });
const dmSerif   = DM_Serif_Display ({ subsets: ['latin'], weight: ['400'] });
const spectral  = Spectral         ({ subsets: ['latin'], weight: ['300','400','500','600'] });
const cinzel    = Cinzel           ({ subsets: ['latin'], weight: ['400','500','600'] });

/* ── Sans-sérifs (corps) ────────────────────────────────────────── */
const dmSans    = DM_Sans          ({ subsets: ['latin'], weight: ['300','400','500','600'] });
const jakarta   = Plus_Jakarta_Sans({ subsets: ['latin'], weight: ['300','400','500','600'] });
const outfit    = Outfit           ({ subsets: ['latin'], weight: ['300','400','500','600'] });
const sourceSans= Source_Sans_3    ({ subsets: ['latin'], weight: ['300','400','500','600'] });
const figtree   = Figtree          ({ subsets: ['latin'], weight: ['300','400','500','600'] });
const raleway   = Raleway          ({ subsets: ['latin'], weight: ['300','400','500','600'] });

/* ── Textes de démonstration ────────────────────────────────────── */
const H  = 'Votre patrimoine mérite une stratégie, pas un produit.';
const P  = `Cabinet indépendant, nous concevons et pilotons des stratégies patrimoniales sur mesure au seul service de vos intérêts. Nous ne vendons pas de produits : nous bâtissons des stratégies durables.`;
const Q  = `« La vraie richesse n'est pas dans l'accumulation, mais dans la cohérence des décisions. »`;
const EY = 'Le Cabinet';

/* ── Données des paires ─────────────────────────────────────────── */
const PAIRS = [
  {
    id: 'A',
    serifName : 'Cormorant Garamond',
    sansName  : 'Inter',
    note      : 'Polices actuelles en production — référence.',
    serifClass: 'font-serif',   // chargé dans le layout global
    sansClass : 'font-sans',
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'B',
    serifName : 'Playfair Display',
    sansName  : 'DM Sans',
    note      : 'Très lisible, tons journalistiques, parfait pour les articles.',
    serifClass: playfair.className,
    sansClass : dmSans.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'C',
    serifName : 'EB Garamond',
    sansName  : 'Plus Jakarta Sans',
    note      : 'Proche des Garamond authentiques — plus académique, plus humaniste.',
    serifClass: ebGaramond.className,
    sansClass : jakarta.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'D',
    serifName : 'Fraunces',
    sansName  : 'Outfit',
    note      : 'Serif variable optique — très contemporain, haut de gamme différenciant.',
    serifClass: fraunces.className,
    sansClass : outfit.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'E',
    serifName : 'Bodoni Moda',
    sansName  : 'Source Sans 3',
    note      : 'Contraste de traits fort — style mode, luxe parisien, très élégant.',
    serifClass: bodoni.className,
    sansClass : sourceSans.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'F',
    serifName : 'DM Serif Display',
    sansName  : 'Figtree',
    note      : 'Titrage percutant, sans-sérif rond et chaleureux — duo très moderne.',
    serifClass: dmSerif.className,
    sansClass : figtree.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'G',
    serifName : 'Spectral',
    sansName  : 'Raleway',
    note      : `Spectral conçu pour l'écran — lisibilité max. Raleway géométrique élégant.`,
    serifClass: spectral.className,
    sansClass : raleway.className,
    serifStyle: {},
    sansStyle : {},
    bg        : '#F5F0E8',
    headColor : '#0f2d52',
    bodyColor : '#1C1B18',
    goldColor : '#FFB81C',
  },
  {
    id: 'H',
    serifName : 'Cinzel',
    sansName  : 'Raleway',
    note      : 'Capitales romaines — architectural, monumental, intemporel. Corps très lisible.',
    serifClass: cinzel.className,
    sansClass : raleway.className,
    serifStyle: { letterSpacing: '0.06em', textTransform: 'uppercase' as const, fontWeight: 500 },
    sansStyle : {},
    bg        : '#0f2d52',
    headColor : '#F5F0E8',
    bodyColor : '#b9c2d4',
    goldColor : '#FFB81C',
  },
] as const;

/* ── Page ───────────────────────────────────────────────────────── */
export default function TextStylesPage() {
  return (
    <div className="bg-[#EDEAE3] min-h-screen">
      {/* Bannière */}
      <div className="bg-ink px-8 py-4">
        <p className="text-center text-[10px] font-semibold uppercase tracking-[0.32em] text-gold">
          Page temporaire — Exploration des polices de caractères
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 py-14 space-y-8">
        <div className="text-center mb-10">
          <h1 className="font-sans text-2xl font-semibold text-forest">
            Paires typographiques
          </h1>
          <p className="mt-2 text-sm text-ink/50 font-sans">
            Même texte · même palette · police différente — clique sur celle que tu préfères
          </p>
        </div>

        {PAIRS.map((p) => (
          <section
            key={p.id}
            className="rounded-2xl overflow-hidden shadow-sm border border-black/8"
          >
            {/* Étiquette */}
            <div className="flex items-baseline gap-3 px-7 py-4 bg-white border-b border-black/6">
              <span className="font-serif text-2xl font-semibold text-gold/60">{p.id}</span>
              <div className="flex-1">
                <span className="font-sans font-semibold text-forest text-[15px]">
                  {p.serifName}
                </span>
                <span className="mx-2 text-ink/25">+</span>
                <span className="font-sans font-semibold text-forest text-[15px]">
                  {p.sansName}
                </span>
              </div>
              <span className="text-[11px] text-ink/40 font-sans italic max-w-[42ch] text-right">
                {p.note}
              </span>
            </div>

            {/* Aperçu */}
            <div
              className="p-10 md:p-14"
              style={{ backgroundColor: p.bg }}
            >
              {/* Eyebrow */}
              <p
                className={`${p.sansClass} text-[10px] font-semibold uppercase flex items-center gap-3 mb-5`}
                style={{ letterSpacing: '0.3em', color: p.goldColor }}
              >
                <span
                  className="block h-px w-8 flex-none"
                  style={{ backgroundColor: p.goldColor }}
                />
                {EY}
              </p>

              {/* Titre principal */}
              <h2
                className={`${p.serifClass} text-4xl md:text-[2.75rem] leading-[1.06] mb-5`}
                style={{ color: p.headColor, ...p.serifStyle }}
              >
                {H}
              </h2>

              {/* Corps de texte */}
              <p
                className={`${p.sansClass} text-[1rem] leading-[1.72] max-w-[60ch] mb-7`}
                style={{ color: p.bodyColor + 'aa' }}
              >
                {P}
              </p>

              {/* Citation */}
              <blockquote
                className={`${p.serifClass} text-[1.25rem] leading-[1.55] border-l-2 pl-5`}
                style={{
                  color: p.headColor + 'cc',
                  borderColor: p.goldColor,
                  ...p.serifStyle,
                  fontSize: '1.25rem',
                  textTransform: 'none',
                  letterSpacing: 'normal',
                }}
              >
                {Q}
              </blockquote>
            </div>
          </section>
        ))}

        <p className="text-center text-[10px] uppercase tracking-[0.3em] text-ink/25 font-sans pb-6">
          Page temporaire — à supprimer avant mise en production
        </p>
      </div>
    </div>
  );
}
