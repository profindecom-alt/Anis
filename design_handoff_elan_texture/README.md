# Handoff: « Nos expertises » section — ELAN PATRIMOINE

## Overview
A full website section for a wealth-management firm (cabinet de gestion de patrimoine). It is a dark
navy band titled **"Trois piliers, une vision d'ensemble"** containing an intro header and three
"Pilier" cards (Gestion de Patrimoine, Défiscalisation, Assurance & Protection). Each card has a small
gold line-icon in its top-right corner. The section background uses the brand **"Élan" texture**: navy
base + a soft gold halo top-right + four thin gold curves rising left→right that echo the ascending
arrow of the ELAN PATRIMOINE shield logo.

## About the Design Files
The files in this bundle are **design references created in HTML/CSS** — they show the intended look and
behavior, not a component to ship verbatim. **Recreate this section in the target codebase** using its
existing conventions (React/Vue/Svelte components, Tailwind/SCSS/CSS-modules, etc.). The markup is plain
semantic HTML and the styles are dependency-free, so porting is mechanical.

## Fidelity
**High-fidelity.** Colors, typography, spacing, the SVG texture, and icon geometry are final. Reproduce exactly.

## Which file to build from
- **`section-expertises.production.html`** — the clean, production-shaped version. **Build from this.**
  No toolbar, no demo chrome, BEM-ish class names, the "Élan" texture baked in, responsive via a CSS
  container query. This is the source of truth for the final design.
- `reference_full-section_all-textures.html` — the original exploration prototype. It contains a floating
  toolbar to switch between **15 background textures** and a Desktop/Mobile preview toggle. Use it only to
  preview the alternative textures; **do not ship its toolbar/JS.**

## Layout & structure (`section-expertises.production.html`)
```
section.expertises                     ← navy + "Élan" texture, container-type: inline-size
  .expertises__wrap (max-width 1320, padding 0 56px)
    .expertises__head (flex, space-between, align-end)
      ├─ div  → eyebrow "NOS EXPERTISES" · h2 title · lede paragraph
      └─ a.expertises__cta "Toutes nos expertises" (pill, outlined)
    .expertises__grid (3 columns, 28px gap)
      └─ article.pillar  ×3
           ├─ span.pillar__icon  (absolute, top-right, gold ring + line icon)
           ├─ p.pillar__label    "Pilier 0X"  (small gold serif label)
           ├─ h3.pillar__title
           ├─ p.pillar__text
           └─ a.pillar__more     "En savoir plus →"
```

### Components — exact specs
**Section wrapper `.expertises`**
- Padding: `104px 0 120px` (desktop), `62px 0 70px` (≤720px).
- Background (layered): `url(elan-texture.svg)` over `radial-gradient(120% 95% at 50% 0%, rgba(21,41,81,.31) 0%, #11254a 70%)`, both `background-size: cover`. Base color `#11254a`.
- `container-type: inline-size` + `overflow: hidden`.

**Header**
- Eyebrow: 12px / 600 / `letter-spacing:.30em` / uppercase / `#c2a25c`, preceded by a 42×1.5px gold rule (flex gap 16px).
- Title (`h2`): **Cormorant Garamond** 500, 50px (desktop) / 33px (mobile), line-height 1.04, `#f3f1ea`.
- Lede: Archivo 16.5px (15px mobile), line-height 1.55, `#b9c2d4`, max-width 46ch.
- CTA: pill, `padding:15px 30px`, `border:1px solid rgba(255,255,255,.10)`, `border-radius:999px`, text `#f3f1ea` 14px/500. Hover → border `rgba(194,162,92,.6)`, bg `rgba(194,162,92,.08)`. Full-width on mobile.

**Card `.pillar`**
- `padding:44px 40px 38px` (desktop) / `32px 26px 30px` (mobile); `border-radius:6px`; `border:1px solid rgba(255,255,255,.10)`.
- Background: `linear-gradient(160deg, rgba(255,255,255,.055) 0%, rgba(255,255,255,.012) 42%, transparent 100%)`, `backdrop-filter:blur(2px)`.
- Hover: `translateY(-4px)`, border `rgba(194,162,92,.42)`, slightly brighter gradient. `transition:.3s`.

**Icon badge `.pillar__icon`** — anchored top-right
- Position: `absolute; top:30px; right:30px`. Size **34×34px** desktop, **46×46px** mobile. `border-radius:50%`.
- `border:1px solid rgba(194,162,92,.32)`, `background:rgba(194,162,92,.06)`, icon color `#c2a25c`.
- Inner SVG: 17×17px desktop / 22×22px mobile, `stroke:currentColor`, `stroke-width:1.6`, round caps/joins, `fill:none`.
- Hover (card): border `rgba(194,162,92,.62)`, bg `rgba(194,162,92,.12)`.
- The three icons (see SVG paths in the production file):
  - Pilier 01 — rising trend line with arrowhead (growth).
  - Pilier 02 — balance scale (cadre légal / équilibre).
  - Pilier 03 — shield with check mark (protection).

**Label `.pillar__label`** ("Pilier 0X")
- Small **gold serif label**: Cormorant Garamond 500, **15px**, `letter-spacing:.06em`, `#c2a25c`, oldstyle figures (`font-feature-settings:"onum" 1`), margin-bottom 22px.

**Card title `.pillar__title`** — Spectral 500, 23px (21px mobile), `#f3f1ea`.
**Card text `.pillar__text`** — Archivo 15px, line-height 1.62, `#b9c2d4`.
**"En savoir plus" link `.pillar__more`** — Archivo 13.5px/600, gold, with an arrow SVG that nudges +5px on card hover.

## Interactions & behavior
- Card hover: lift 4px, brighten border + background, icon ring brightens, arrow shifts right. `transition:.3s` (.25s for the arrow).
- CTA hover: gold border + faint gold fill.
- No JS required for the production section.

## Responsive behavior
- Uses a **container query** (`@container (max-width:720px)`) on `.expertises` (which sets
  `container-type: inline-size`). On real viewports the section is full-width, so the query fires at
  narrow screen widths and the layout becomes: stacked header, full-width CTA, single-column cards,
  smaller title, larger icon badges (46px). If your framework prefers media queries, swapping
  `@container` → `@media` works identically here (the section spans the viewport).

## Design Tokens
| Token | Value |
|---|---|
| Navy (section bg) | `#11254a` |
| Navy (page / deep) | `#0d1d3b` |
| Gold | `#c2a25c` |
| Ink (headings) | `#f3f1ea` |
| Ink (body) | `#b9c2d4` |
| Hairline border | `rgba(255,255,255,0.10)` |
| Texture halo | `#dcc488` (0.22→0 alpha) |
| Texture wave gradient | `#c2a25c` (transparent) → `#e6cf97` @ 0.6 |
| Radii | card 6px · CTA/badge 999px/50% |
| Card hover lift | `translateY(-4px)` |

### Typography
- **Cormorant Garamond** (serif): section title, "Pilier 0X" label.
- **Spectral** (serif): card titles.
- **Archivo** (sans): eyebrow, lede, body, CTA, "En savoir plus".
- Loaded from Google Fonts (see `<link>` in the production file). Use these or the project's equivalents.

## Assets
- **`elan-texture.svg`** — the section background texture (halo + rising curves; transparent elsewhere,
  overlays on the navy base). **Required by the production section.**
- `assets/logo-gold.png`, `assets/logo-white.png` (in the main project) — the ELAN PATRIMOINE mark on
  transparent background, used by the alternative "logo watermark" textures in the reference file. Not
  needed for the chosen "Élan" texture.

## Texture: chosen + alternatives
The selected background is **"Élan"** (baked into `section-expertises.production.html`). `elan-texture.css`
documents it standalone in two forms: **Option A** (external `elan-texture.svg`) and **Option B** (same
SVG inlined as a `data:` URI, zero extra requests). The reference prototype additionally offers 14 other
textures (Courbes de niveau, Rayure tailleur, Quadrillage, Onyx, Logo · filigrane/motif/géant, …) if the
client wants to reconsider — each is a small CSS/SVG snippet visible in that file's `TEX`/`LOGO` objects.

## Files in this bundle
- `section-expertises.production.html` — **build from this** (clean section, Élan texture, responsive).
- `elan-texture.svg` — required texture asset.
- `elan-texture.css` — texture as standalone CSS (Option A external SVG / Option B inline data-URI).
- `elan-texture-demo.html` — minimal page showing only the texture on a section.
- `reference_full-section_all-textures.html` — original prototype with the 15-texture switcher + Desktop/Mobile preview (reference only).
