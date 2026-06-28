# Handoff: Section « En quelques chiffres » (variation *Filets*)

## Overview
An animated key-figures band for the **Élan Patrimoine** wealth-management site. It presents four trust metrics (years of experience, independence, range of expertise, dedicated contact) beneath a short editorial heading. On scroll-into-view, the figures count up, fade/rise into place, and a short gold rule draws in beneath each. This is the **"Filets"** direction (vertical hairline dividers + short gold underline), chosen from five explored variations.

## About the Design Files
The file in this bundle — `Section-Chiffres-Filets.html` — is a **design reference created in HTML**. It is a prototype that demonstrates the intended look, layout, type, color, and motion. It is **not** production code to paste in directly.

Your task is to **recreate this section inside the target codebase**, using that project's established environment and conventions (React/Vue/Svelte component, design-system tokens, animation utilities, etc.). If the project has no front-end environment yet, pick the most appropriate framework and implement it there. Match the visual + motion spec below precisely; wire the copy/numbers to real data or CMS fields as appropriate.

## Fidelity
**High-fidelity.** Final colors, typography, spacing, and motion are specified exactly below. Recreate pixel-for-pixel using the codebase's primitives.

## Screens / Views

### View: "En quelques chiffres" section
- **Purpose**: Build trust by surfacing four concrete figures about the firm.
- **Layout** (desktop ≥ 721px):
  - Full-width `<section>`, dark navy gradient background with a faint dotted texture fading diagonally from the top-left.
  - Inner container (`.wrap`): `max-width: 1320px`, centered, horizontal padding `56px`.
  - Section vertical padding: `104px` top / `112px` bottom.
  - **Header block** (`margin-bottom: 64px`): eyebrow label, then a 2-line serif title.
  - **Stats**: CSS Grid, `grid-template-columns: repeat(4, 1fr)`, one figure per column.
- **Layout** (mobile ≤ 720px):
  - Grid becomes `repeat(2, 1fr)` with gap `34px 24px` (2×2).
  - Vertical dividers hidden; section padding `58px / 64px`; container padding `24px`.

#### Components

**1. Eyebrow** (`.eyebrow`)
- Text: `En quelques chiffres`
- Font: Archivo, 12px, weight 600, `letter-spacing: .30em`, uppercase, color `--gold` (#c2a25c).
- A `42px × 1.5px` solid gold rule precedes the text (flex, `gap: 16px`).
- `margin-bottom: 22px`.

**2. Title** (`.title`)
- Text: `La mesure de notre engagement` (renders on two lines naturally; `text-wrap: balance`).
- Font: Cormorant Garamond, weight 500, **48px**, `line-height: 1.05`, color `--ink-100` (#f3f1ea).
- Mobile: **31px**.

**3. Stat cell** (`.cell`) — repeated 4×
- `position: relative; padding: 6px 42px;` (first child no left padding, last child no right padding).
- **Divider**: each cell after the first draws a `1px` vertical hairline on its left edge — `linear-gradient(rgba(194,162,92,.30), rgba(194,162,92,.04))`, inset `10px` top & bottom. Hidden on mobile.
- **Index** (`.idx`): two-digit ordinal `01`–`04`. Archivo, 11px, weight 600, `letter-spacing: .22em`, color `--gold`, `opacity: .7`. `display: block; margin-bottom: 30px`.
- **Number** (`.num`): Cormorant Garamond, **98px** (mobile 60px), `line-height: .82`, color `--gold`, **oldstyle figures** via `font-feature-settings: "onum" 1; font-variant-numeric: tabular-nums`. `display: inline-flex; align-items: baseline`.
  - **Unit** (`.u`, e.g. `ans`, `%`): `font-size: .44em` of the number, color `--gold-soft` (#d8bd84), `margin-left: .12em`.
- **Rule** (`.rule`): gold underline bar, `width: 56px; height: 2px; border-radius: 2px; margin: 24px 0 18px;` `background: linear-gradient(90deg, var(--gold), var(--gold-soft))`.
- **Label** (`.stat-label`): Archivo, 13px (mobile 11px), weight 500, `letter-spacing: .13em`, uppercase, color `--ink-300` (#b9c2d4).

#### Content (exact copy)
| # | Number | Unit | Label |
|---|--------|------|-------|
| 01 | 8   | ans | d'expérience |
| 02 | 100 | %   | indépendant |
| 03 | 4   | —   | expertises |
| 04 | 1   | —   | interlocuteur dédié |

## Interactions & Behavior

**Trigger**: The section animates **once**, when it scrolls into view (IntersectionObserver, `threshold: 0.25`), with `window load` + a `600ms` timeout as fallbacks so it still fires if it's already on-screen at load.

**Entrance (per cell, staggered `150ms` apart, in index order):**
- **Fade + rise**: `opacity 0 → 1` and `translateY(18px) → 0`, duration **700ms**, easing `cubic-bezier(.22,.61,.36,1)`.
- **Count-up**: the number animates `0 → target` over **1200ms** using ease-out-cubic (`1 - (1-t)³`), starting at the cell's stagger delay. Integer steps; tabular figures keep width stable.
- **Rule draw**: underline `width 0 → 56px` over **1000ms**, easing `cubic-bezier(.22,.61,.36,1)`, starting **+220ms** after its cell.

**Implementation note**: the reference uses the **Web Animations API** (`element.animate(...)`) for the fade/rise and rule, and a `requestAnimationFrame` loop for the count-up. The **resting state is fully visible** in CSS, so the section degrades gracefully (no flash of empty content) if JS is unavailable — the animation only plays it *in* from a hidden start. In your framework, prefer the idiomatic equivalent (e.g. Framer Motion `whileInView` with `staggerChildren`, or a CSS `@keyframes` reveal gated by an in-view class) but keep the visible end-state as the default so SSR/no-JS renders the figures.

**Reduced motion**: when `prefers-reduced-motion: reduce`, skip all animation and render the final figures/rules immediately.

**Responsive**: single breakpoint at **720px** (4 columns → 2 columns). No hover/active states (non-interactive display section).

## State Management
- A single "has played" guard so the entrance runs only once.
- The displayed number is the only animated value (0 → target). No data fetching in the reference; wire the four figures to real data/CMS if desired (each `.num` carries its target in a `data-count` attribute).

## Design Tokens

**Colors**
| Token | Hex / value | Use |
|-------|-------------|-----|
| `--navy` | `#11254a` | gradient base |
| `--navy-deep` | `#0d1d3b` | gradient base / page bg |
| `--navy-hi` | `#17305c` | (lighter navy, available) |
| `--gold` | `#c2a25c` | numbers, eyebrow, index, rules |
| `--gold-soft` | `#d8bd84` | units, rule highlight |
| `--ink-100` | `#f3f1ea` | title / primary text |
| `--ink-300` | `#b9c2d4` | labels |
| `--line` | `rgba(255,255,255,.10)` | hairlines (generic) |
| `--track` | `rgba(255,255,255,.08)` | (track, available) |
| `--gold-line` | `rgba(194,162,92,.30)` | vertical dividers |

**Background** (section): 
`radial-gradient(110% 120% at 88% -10%, #1c3868 0%, rgba(28,56,104,0) 48%)` over `linear-gradient(120deg, #11254a 0%, #0d1d3b 100%)`.
**Dotted texture overlay**: `radial-gradient(rgba(255,255,255,.05) 1px, transparent 1.4px)` on a `24px` grid, `opacity: .5`, masked with `linear-gradient(100deg, #000 0%, transparent 60%)`.

**Typography**
| Role | Family | Size | Weight | Tracking | Notes |
|------|--------|------|--------|----------|-------|
| Title | Cormorant Garamond | 48 / 31px | 500 | .005em | line-height 1.05 |
| Number | Cormorant Garamond | 98 / 60px | 500 | — | line-height .82, oldstyle + tabular figures |
| Unit | Cormorant Garamond | .44em of number | 500 | — | color gold-soft |
| Eyebrow | Archivo | 12px | 600 | .30em | uppercase, gold |
| Label | Archivo | 13 / 11px | 500 | .13em | uppercase, ink-300 |
| Index | Archivo | 11px | 600 | .22em | gold @ .7 opacity |

**Spacing / sizing**
- Section padding: `104/112px` desktop, `58/64px` mobile.
- Container: `max-width 1320px`, side padding `56px` / `24px` mobile.
- Header `margin-bottom`: `64px` / `38px` mobile.
- Cell padding: `6px 42px` (edges flush); mobile padding `0`, grid gap `34px 24px`.
- Rule: `56 × 2px`, radius `2px`.
- Breakpoint: `720px`.

**Motion**
- Stagger: `150ms`/cell · Fade-rise: `700ms` · Count-up: `1200ms` (ease-out-cubic) · Rule draw: `1000ms` (+220ms offset) · Easing: `cubic-bezier(.22,.61,.36,1)`.

## Assets
- **No images or icons.** All visuals are CSS (gradients, hairlines, the gold rule).
- **Fonts** (Google Fonts): **Cormorant Garamond** (ital 400; 400/500/600) and **Archivo** (400/500/600). Swap for the codebase's licensed equivalents if self-hosting; the serif must support oldstyle figures (`onum`) for the intended look.

## Files
- `Section-Chiffres-Filets.html` — the self-contained design reference (HTML + CSS + vanilla JS). Open it in a browser to see the live animation and inspect exact values.

> Note: this section is one band of a larger navy/gold site. Sibling sections explored in the same system live in `Section-Conviction.html` and `Section-Expertises.html` in the parent project, and share these tokens.
