'use client';

/**
 * PAGE TEMPORAIRE — Alternatives pour le bandeau après le héro.
 * Accès : /bandeau-alternatives
 * À supprimer après validation du design final.
 */

const ITEMS = [
  'Indépendance',
  'Architecture ouverte',
  'Stratégie sur mesure',
  'Transparence des frais',
  'ORIAS immatriculé',
  'Discrétion',
  'Vision long terme',
];

const ITEMS_WITH_ICONS = [
  {
    label: 'Indépendance',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
  {
    label: 'Architecture ouverte',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
  },
  {
    label: 'Stratégie sur mesure',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <line x1="12" y1="2" x2="12" y2="5" />
        <line x1="12" y1="19" x2="12" y2="22" />
        <line x1="2" y1="12" x2="5" y2="12" />
        <line x1="19" y1="12" x2="22" y2="12" />
      </svg>
    ),
  },
  {
    label: 'Transparence des frais',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: 'ORIAS immatriculé',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M8 8l-4 10h16L16 8" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
  },
  {
    label: 'Discrétion',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    label: 'Vision long terme',
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
        <polyline points="17 6 23 6 23 12" />
      </svg>
    ),
  },
];

const LOOP = [...ITEMS, ...ITEMS];

export default function BandeauAlternativesPage() {
  return (
    <>
      <style>{`
        /* ── Base marquee ── */
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position:  200% center; }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 0.4; transform: scale(1); }
          50%       { opacity: 1;   transform: scale(1.4); }
        }

        .track-left  { display:inline-flex; width:max-content; animation: scroll-left  36s linear infinite; }
        .track-right { display:inline-flex; width:max-content; animation: scroll-right 36s linear infinite; }
        .mask-fade   {
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
          mask-image:         linear-gradient(90deg, transparent, #000 6%, #000 94%, transparent);
        }
        .shimmer-text {
          background: linear-gradient(90deg, #FFB81C 0%, #f5f0e8 40%, #FFB81C 60%, #D99400 100%);
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      {/* ── En-tête de page ── */}
      <div className="bg-forest-dark px-6 pt-20 pb-10 text-center text-cream">
        <p className="text-xs uppercase tracking-[0.3em] text-gold mb-3">Page temporaire</p>
        <h1 className="font-serif text-3xl font-semibold mb-2">Alternatives — Bandeau après le héro</h1>
        <p className="text-cream/50 text-sm max-w-lg mx-auto">
          6 directions visuelles différentes. Le contexte : fond sombre du héro au-dessus, section crème en dessous.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════════
          ACTUEL — référence
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel label="Actuel — référence" desc="Fond sombre · losange doré · défilement simple" />

      <section className="border-y border-cream/10 bg-forest-dark py-5 text-cream/75 overflow-hidden mask-fade">
        <div className="track-left">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-8 text-sm font-medium uppercase tracking-[0.2em]">{item}</span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/70 shrink-0" />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 1 — Ruban doré (fond or, texte forêt)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 1 — Ruban doré"
        desc="Fond or · texte forêt-foncé · séparateurs cercle · plus affirmé, très luxe"
      />

      <section className="overflow-hidden bg-gold py-4 mask-fade">
        <div className="track-left">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-7 text-sm font-semibold uppercase tracking-[0.22em] text-forest-dark">
                {item}
              </span>
              <span className="h-2 w-2 rounded-full bg-forest-dark/40 shrink-0" />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 2 — Fantôme / Contour (fond crème, sans couleur de fond)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 2 — Transition fantôme"
        desc="Fond crème · texte forêt · bordure fine dorée · intégration douce entre hero et section"
      />

      <section className="overflow-hidden border-y border-gold/30 bg-cream py-5 mask-fade">
        <div className="track-left">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-8 text-xs font-medium uppercase tracking-[0.25em] text-forest/60">
                {item}
              </span>
              <span className="h-px w-4 bg-gold/50 shrink-0" />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 3 — Ticker financier (style Bloomberg)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 3 — Ticker institutionnel"
        desc="Label fixe à gauche · contenu défilant à droite · style presse financière"
      />

      <section className="bg-forest-dark border-y border-gold/20 flex items-stretch overflow-hidden">
        {/* Label fixe */}
        <div className="shrink-0 flex items-center gap-2.5 px-5 border-r border-gold/20 bg-gold/10 z-10">
          <span className="h-1.5 w-1.5 rounded-full bg-gold animate-pulse shrink-0" style={{ animationDuration: '2s' }} />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold whitespace-nowrap py-4">
            Élan Patrimoine
          </span>
        </div>
        {/* Piste défilante */}
        <div className="flex-1 overflow-hidden mask-fade">
          <div className="track-left py-4">
            {LOOP.map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-6 text-[11px] font-medium uppercase tracking-[0.18em] text-cream/80">
                  {item}
                </span>
                <span className="h-3 w-px bg-cream/20 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 4 — Double sens (deux rangées inversées)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 4 — Double sens"
        desc="Deux rangées · défilement opposé · dynamique et moderne, effet cinématique"
      />

      <section className="bg-forest-dark border-y border-cream/10 py-3 overflow-hidden">
        {/* Rangée 1 → gauche */}
        <div className="mask-fade overflow-hidden mb-2">
          <div className="track-left">
            {LOOP.map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-8 text-xs font-medium uppercase tracking-[0.22em] text-cream/60">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-gold/50 shrink-0" />
              </span>
            ))}
          </div>
        </div>
        {/* Rangée 2 → droite */}
        <div className="mask-fade overflow-hidden">
          <div className="track-right">
            {LOOP.map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap">
                <span className="px-8 text-xs font-medium uppercase tracking-[0.22em] text-gold/70">
                  {item}
                </span>
                <span className="h-1.5 w-1.5 rotate-45 bg-cream/20 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 5 — Pills / Badges défilants
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 5 — Badges défilants"
        desc="Chaque mot dans une pill bordée · plus tactile et moderne, style fintech"
      />

      <section className="bg-[#091d38] border-y border-cream/10 py-4 overflow-hidden mask-fade">
        <div className="track-left items-center">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap mx-2">
              <span className="rounded-full border border-gold/40 px-5 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-cream/75 hover:border-gold hover:text-cream transition-colors">
                {item}
              </span>
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 6 — Piliers statiques avec icônes (pas de défilement)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 6 — Piliers statiques"
        desc="Pas d'animation · 5 piliers en grille avec icône · plus institutionnel et lisible"
      />

      <section className="bg-forest-dark border-y border-cream/10 py-6">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 gap-y-5 gap-x-6 sm:grid-cols-3 lg:grid-cols-5">
            {[
              { icon: '⟡', label: 'Indépendance' },
              { icon: '◈', label: 'Architecture ouverte' },
              { icon: '◇', label: 'Sur mesure' },
              { icon: '▽', label: 'Transparence' },
              { icon: '○', label: 'Vision long terme' },
            ].map((p) => (
              <div key={p.label} className="flex items-center gap-3 group">
                <span className="text-gold/60 text-lg leading-none group-hover:text-gold transition-colors">
                  {p.icon}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-cream/65 group-hover:text-cream/90 transition-colors">
                  {p.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT BONUS — Shimmer / Texte nacré animé
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Bonus — Shimmer nacré"
        desc="Fond très sombre · texte avec dégradé doré animé (shimmer) · très premium"
      />

      <section className="bg-[#060f1e] border-y border-gold/10 py-5 overflow-hidden mask-fade">
        <div className="track-left">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap">
              <span className="px-8 text-sm font-semibold uppercase tracking-[0.22em] shimmer-text">
                {item}
              </span>
              <span className="h-px w-6 bg-gradient-to-r from-transparent via-gold/50 to-transparent shrink-0" />
            </span>
          ))}
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          ALT 7 — Défilant avec icônes (fond sombre)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 7 — Défilant avec icônes · fond sombre"
        desc="Icône SVG + texte dans chaque item · même rythme que l'actuel mais plus expressif"
      />

      <section className="border-y border-cream/10 bg-forest-dark py-5 overflow-hidden mask-fade">
        <div className="track-left">
          {[...ITEMS_WITH_ICONS, ...ITEMS_WITH_ICONS].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= ITEMS_WITH_ICONS.length ? 'true' : undefined}>
              <span className="flex items-center gap-2.5 px-7 text-cream/75">
                <span className="text-gold/70 shrink-0">{item.icon}</span>
                <span className="text-[11px] font-medium uppercase tracking-[0.22em]">{item.label}</span>
              </span>
              <span className="h-1.5 w-1.5 rotate-45 bg-gold/40 shrink-0" />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 8 — Défilant avec icônes (fond doré)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 8 — Défilant avec icônes · fond doré"
        desc="Même principe mais sur ruban or · icône forêt-foncé · contrasté et chaleureux"
      />

      <section className="bg-gold py-5 overflow-hidden mask-fade">
        <div className="track-left">
          {[...ITEMS_WITH_ICONS, ...ITEMS_WITH_ICONS].map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= ITEMS_WITH_ICONS.length ? 'true' : undefined}>
              <span className="flex items-center gap-2.5 px-7 text-forest-dark">
                <span className="shrink-0 opacity-70">{item.icon}</span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em]">{item.label}</span>
              </span>
              <span className="h-3 w-px bg-forest-dark/25 shrink-0 mx-1" />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 9 — Grille statique icône + texte (style "trust seals")
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 9 — Trust seals avec icônes (statique)"
        desc="Icône grande + label sous · 5 piliers alignés · style certifications premium, très lisible"
      />

      <section className="bg-forest-dark border-y border-cream/10 py-8">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-6 lg:gap-x-16">
            {ITEMS_WITH_ICONS.slice(0, 5).map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2 group">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 text-gold/60 group-hover:border-gold group-hover:text-gold transition-all duration-300">
                  {/* scale up icon to fit the circle */}
                  <span className="scale-[1.4]">{item.icon}</span>
                </span>
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/55 group-hover:text-cream/90 transition-colors text-center max-w-[80px] leading-tight">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 10 — Horizontal cards avec icône (fond crème)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 10 — Cards horizontales · fond crème"
        desc="Icône + texte côte-à-côte · séparateurs ligne fine · transition naturelle vers sections claires"
      />

      <section className="bg-cream border-y border-forest/10 py-7">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap items-center justify-center gap-0 divide-x divide-forest/10">
            {ITEMS_WITH_ICONS.slice(0, 5).map((item) => (
              <div key={item.label} className="flex items-center gap-2.5 px-6 py-1 group">
                <span className="text-gold shrink-0 group-hover:scale-110 transition-transform duration-200">
                  {item.icon}
                </span>
                <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-forest/50 group-hover:text-forest/80 transition-colors whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════════════
          ALT 11 — Logo comme séparateur · fond sombre
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 11 — Logo séparateur · fond sombre"
        desc="Le logo Élan (version crème) remplace le losange entre chaque mot · très identitaire"
      />

      <section className="border-y border-cream/10 bg-forest-dark py-3 overflow-hidden mask-fade">
        <div className="track-left items-center">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= ITEMS.length ? 'true' : undefined}>
              <span className="px-6 text-sm font-medium uppercase tracking-[0.22em] text-cream/75">
                {item}
              </span>
              <LogoMark fillA="rgba(245,240,232,0.55)" fillB="rgba(199,161,90,0.5)" size={48} />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 12 — Logo séparateur · fond doré
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 12 — Logo séparateur · fond doré"
        desc="Même principe sur ruban doré · logo version forêt · très luxe et distinctif"
      />

      <section className="bg-gold py-3 overflow-hidden mask-fade">
        <div className="track-left items-center">
          {LOOP.map((item, i) => (
            <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= ITEMS.length ? 'true' : undefined}>
              <span className="px-6 text-sm font-semibold uppercase tracking-[0.22em] text-forest-dark">
                {item}
              </span>
              <LogoMark fillA="rgba(9,29,56,0.6)" fillB="rgba(9,29,56,0.35)" size={48} />
            </span>
          ))}
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 13 — Logo fixe à gauche + texte défilant (ticker premium)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 13 — Logo fixe · ticker premium"
        desc="Le logo mark fixe à gauche (version bicolore) · texte défilant à droite · très élégant"
      />

      <section className="bg-forest-dark border-y border-gold/20 flex items-stretch overflow-hidden">
        {/* Logo fixe */}
        <div className="shrink-0 flex items-center px-7 py-4 border-r border-gold/20 z-10" style={{ background: 'rgba(199,161,90,0.07)' }}>
          <LogoMark fillA="#FFB81C" fillB="#FFB81C" size={52} />
        </div>
        {/* Piste défilante */}
        <div className="flex-1 overflow-hidden mask-fade">
          <div className="track-left py-5">
            {LOOP.map((item, i) => (
              <span key={i} className="flex items-center whitespace-nowrap" aria-hidden={i >= ITEMS.length ? 'true' : undefined}>
                <span className="px-8 text-sm font-medium uppercase tracking-[0.22em] text-cream/75">
                  {item}
                </span>
                <span className="h-4 w-px bg-gold/25 shrink-0" />
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ════════════════════════════════════════════════════════════════
          ALT 14 — Logo centré + mots rayonnants (statique)
      ════════════════════════════════════════════════════════════════ */}
      <SectionLabel
        label="Alternative 14 — Logo centré · statique signature"
        desc="Logo bicolore grand format centré · mots de chaque côté séparés par une ligne · très signature"
      />

      <section className="bg-forest-dark border-y border-cream/10 py-10">
        <div className="container mx-auto px-8">
          {/* Desktop : mots — logo — mots */}
          <div className="hidden lg:flex items-center justify-center gap-0">
            <div className="flex items-center gap-0 flex-1 justify-end">
              {['Indépendance', 'Discrétion', 'Sur mesure'].map((w, i) => (
                <span key={w} className="flex items-center">
                  {i > 0 && <span className="h-px w-8 bg-gold/20 shrink-0" />}
                  <span className="px-5 text-xs font-medium uppercase tracking-[0.22em] text-cream/55 whitespace-nowrap">{w}</span>
                </span>
              ))}
              <span className="h-px w-12 bg-gold/35 shrink-0" />
            </div>
            <div className="shrink-0 px-6">
              <LogoMark fillA="#FFB81C" fillB="#1d4577" size={86} />
            </div>
            <div className="flex items-center gap-0 flex-1 justify-start">
              <span className="h-px w-12 bg-gold/35 shrink-0" />
              {['Transparence', 'ORIAS', 'Vision long terme'].map((w, i, arr) => (
                <span key={w} className="flex items-center">
                  <span className="px-5 text-xs font-medium uppercase tracking-[0.22em] text-cream/55 whitespace-nowrap">{w}</span>
                  {i < arr.length - 1 && <span className="h-px w-8 bg-gold/20 shrink-0" />}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile : logo centré + mots en dessous */}
          <div className="lg:hidden flex flex-col items-center gap-4">
            <LogoMark fillA="#FFB81C" fillB="#1d4577" size={72} />
            <div className="flex flex-wrap justify-center gap-x-5 gap-y-1">
              {['Indépendance', 'Discrétion', 'Sur mesure', 'Transparence', 'ORIAS'].map((w) => (
                <span key={w} className="text-[10px] font-medium uppercase tracking-[0.2em] text-cream/50">{w}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pied de page temporaire */}
      <div className="bg-forest-dark px-6 py-12 text-center text-cream/40 text-xs">
        Page temporaire · /bandeau-alternatives · À supprimer après validation
      </div>
    </>
  );
}

/* ── Logo Élan Patrimoine (mark seul, 4 chemins) ── */
function LogoMark({
  fillA,
  fillB,
  size = 24,
}: {
  fillA: string;
  fillB: string;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 270 270"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      {/* Paths avec fillA (couleur principale, ex: or ou crème) */}
      <path fill={fillA} d="M176.41,125.16c-.31,6.02-.94,18.5-7.11,32.18-5.68,12.63-13.43,20.41-15.54,22.46-8.51,8.28-17.3,12.63-22.8,14.85-5.59-3.16-9.1-6.52-11.03-9.93-.63-1.1-1.09-2.21-1.4-3.33v-.03s-.02-.02-.02-.03c-.33-1.19-.49-2.39-.51-3.58-.15-12.23,15.27-23.99,22.71-28.99,10.94-7.32,19.24-15.79,19.24-15.79-4.95,11.03-16.37,17.31-27.79,30.27-11.42,12.94-1.19,22.62-1.19,22.62,6.38-2.97,12.14-6.95,17.19-11.84,2.56-2.51,9.07-9.45,13.81-20,5.53-12.29,6.13-23.75,6.41-29.27.03-.58.06-1.21.07-1.85,2.98-3.04,5.74-6.17,8.14-9.38.02.3.02.58.02.88,0,.44.03,6.42-.19,10.75Z"/>
      <path fill={fillA} d="M147.01,91.04c-.06.09-.1.19-.17.31-.03.05-.05.09-.06.13-.54,1.01-1.45,2.65-2.82,4.52-.19.25-.4.54-.61.8-.27.33-.54.66-.82,1-4.06-2.07-7.92-4.52-11.57-7.28-3.85,2.92-7.96,5.49-12.29,7.63-7.9,3.94-16.3,6.44-25.08,7.51-.12,2.92-.19,5.85-.22,8.77,0,1.67,0,6.77.18,10.3.1,2.22.27,5.41.79,9.23-2.86,3.39-4.98,7.11-5.98,11.29-2.25-8.65-2.63-15.94-2.85-20.12-.22-4.34-.19-10.32-.19-10.75.05-6.67.37-12.23.67-16.21,6.56-.19,17.39-1.42,29.09-7.23,6.9-3.44,12.15-7.5,15.88-10.91,3.73,3.41,8.98,7.47,15.88,10.91.06.03.1.06.16.08Z"/>
      {/* Path avec fillB (couleur secondaire, ex: forêt ou crème plus foncé) */}
      <path fill={fillB} d="M184.68,106.91l-5.29-6.4c-.6,1.22-2.25,4.17-2.99,5.38-2.15,3.53-4.82,7.01-7.84,10.38-16.73,18.7-44.12,34.77-52.2,45.51-2.77,3.68-3.97,7.28-4.22,10.54-.66,8.26,4.61,14.42,4.92,14.78-.37-.25-.73-.52-1.09-.78-8.47-6.29-12.27-12.51-12.93-18.5-.09-.85-.12-1.67-.09-2.49v-.07c.02-.42.05-.83.09-1.24.02-.21.05-.4.07-.61.05-.43.12-.86.22-1.3.05-.22.09-.45.15-.67.03-.15.07-.31.12-.46,2.99-9.97,35.37-35.23,35.37-35.23,5.72-4.42,13.64-11.27,22.02-21.32,2.84-3.55,4.28-5.79,5.07-7.2.18-.32,1.65-2.97,1.65-2.97h0l-9.08-.98,25.99-17.92.05,31.56Z"/>
      <path fill={fillA} d="M151.02,92.97c-.58,2.73-1.37,5.28-2.3,7.66-8.29,21.41-28.67,29.84-40.99,41.48-4.14,3.91-6.55,7.92-7.9,11.62-1.73,4.73-1.71,8.93-1.36,11.75.25,2.07.7,3.4.78,3.61-.24-.33-.46-.66-.67-.98-.09-.12-.18-.25-.25-.37-.39-.6-.78-1.21-1.16-1.83-.21-.33-.4-.66-.58-.97-5.87-10.23-5.43-18.16-1.18-24.9v-.02c5.25-8.31,16.22-14.82,28.18-21.64,12.27-6.98,19.27-13.78,23.13-18.59,3.01-3.76,4.1-6.31,4.29-6.82h.02Z"/>
    </svg>
  );
}

function SectionLabel({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="bg-forest-dark/95 border-y border-dashed border-cream/10 px-6 py-4">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
        <span className="font-serif text-base font-semibold text-gold shrink-0">{label}</span>
        <span className="hidden sm:block h-px flex-1 bg-cream/10" />
        <span className="text-xs text-cream/40">{desc}</span>
      </div>
    </div>
  );
}
