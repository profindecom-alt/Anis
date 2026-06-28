# Handoff: "Notre approche" Section (Élan Patrimoine)

## Overview
A marketing/landing section for a wealth-management firm ("Notre approche" — *Our approach*). It presents the firm's three-step method as an editorial, asymmetric two-column layout: a sticky narrative column on the left (eyebrow + headline + supporting line + text CTA) and a numbered "ledger" of three steps on the right, each row separated by hairline rules with a hover treatment. Entrance animations reveal the content when the section scrolls into view.

This is the design the rest of the brand site is built around (navy + gold, Cormorant Garamond display serif). It is a sibling to the existing "En quelques chiffres" stats section and shares the same visual system and preview chrome.

## About the Design Files
The file in this bundle (`Section-Approche-Animee.html`) is a **design reference created in HTML** — a working prototype that demonstrates the intended look, layout, typography, and motion. **It is not production code to paste in.**

Your task is to **recreate this design in the target codebase's existing environment** (React, Vue, Svelte, Astro, plain templates, etc.), using that codebase's established component patterns, styling approach, and tokens. If no front-end environment exists yet, pick the most appropriate framework for the project and implement it there.

The HTML uses React + Babel loaded from a CDN purely so the prototype runs standalone in a browser — **do not** carry over the CDN React/Babel setup, the `useReplay`/IntersectionObserver scaffolding, or the Desktop/Mobile/Rejouer **preview toolbar** (`.picker`). Those are prototype harness only. Reproduce the *section* itself.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interactions are all specified below and should be reproduced precisely. Recreate the UI pixel-accurately using your codebase's libraries and patterns.

## Screens / Views

### Screen: "Notre approche" section
- **Name**: Notre approche (Our approach)
- **Purpose**: Communicate the firm's method as three sequential, trustworthy steps and drive the user to a "discover our approach" link.
- **Layout**:
  - Full-bleed `<section>` with a dark navy background (radial highlight from top-right over a diagonal navy gradient) and a faint dotted texture overlay masked toward the top-left.
  - Inner container: `max-width: 1320px`, centered, horizontal padding `56px`.
  - Inside the container: a **CSS grid, 2 columns** `grid-template-columns: 0.82fr 1.18fr`, `column-gap: 84px`, `align-items: center`.
  - **Left column (`.aside`)**: `max-width: 42ch`. Stacked: eyebrow, headline, sub-paragraph, text CTA.
  - **Right column (`.rows`)**: vertical flex stack of 3 rows. Each row is a grid `grid-template-columns: auto 1fr`, `column-gap: 34px`, `align-items: baseline`, vertical padding `30px`, with `1px` top hairline rule (and a bottom rule on the last row).
  - Section vertical padding: `104px` top / `112px` bottom.

- **Components**:

  **Eyebrow** ("Notre approche")
  - Flex row, `gap: 16px`, with a `42px × 1.5px` solid gold rule before the text.
  - Typography: Archivo, `12px`, weight `600`, `letter-spacing: .30em`, `text-transform: uppercase`, `white-space: nowrap`.
  - Color: gold `#c2a25c`. Bottom margin `24px`.

  **Headline** ("Une méthode rigoureuse en trois temps")
  - Cormorant Garamond, weight `500`, `font-size: 50px`, `line-height: 1.06`, `letter-spacing: .005em`, `text-wrap: balance`.
  - Color: off-white `#f3f1ea`. Margin `0`.

  **Sub-paragraph** ("De l'écoute à la mise en œuvre, un chemin clair et maîtrisé — un seul interlocuteur, à chaque étape.")
  - Spectral (serif), `18px`, `line-height: 1.55`, `text-wrap: pretty`.
  - Color: muted blue-grey `#b9c2d4`. Margin `22px 0 40px`.

  **Text CTA** ("Découvrir notre approche" + arrow)
  - Inline-flex, `gap: 13px`, Archivo `13px`/`600`, `letter-spacing: .1em`, uppercase, `white-space: nowrap`.
  - Color: `#f3f1ea`. `padding-bottom: 7px`; `border-bottom: 1.5px solid #c2a25c`.
  - Trailing arrow: inline SVG (20×11), 1.5px stroke, `currentColor`.
  - Hover: text color → `#d8bd84`; arrow translates `+5px` on X over `.28s cubic-bezier(.22,.61,.36,1)`.

  **Step row** (×3) — `auto 1fr` grid
  - **Numeral** (`01`, `02`, `03`): Cormorant Garamond, weight `500`, `font-size: 60px`, `line-height: .8`, old-style figures (`font-feature-settings: "onum" 1`). Rendered as an **outline**: `color: transparent; -webkit-text-stroke: 1px rgba(194,162,92,.55)`.
  - **Step title** (`Diagnostic` / `Stratégie` / `Mise en œuvre`): Cormorant Garamond, weight `600`, `27px`, `letter-spacing: .004em`, margin `0 0 7px`.
  - **Step body** (descriptions below): Archivo, `15px`, `line-height: 1.6`, color `#b9c2d4`, `max-width: 52ch`, margin `0`.
  - **Rule**: `border-top: 1px solid rgba(255,255,255,.10)` on every row; the last row also gets a matching `border-bottom`.
  - **Hover state**: a `2px` vertical gold gradient bar (`linear-gradient(180deg,#c2a25c,#d8bd84)`) on the row's left edge scales in from the top (`transform: scaleY(0)→1`, `.4s cubic-bezier(.22,.61,.36,1)`); the row content shifts right via `padding-left: 22px` (`.3s`); the outlined numeral fills solid gold (`color: #c2a25c; -webkit-text-stroke-color: transparent`, `.35s`).

  **Step content (exact copy):**
  | # | Title | Body |
  |---|-------|------|
  | 01 | Diagnostic | Un audit complet de votre situation patrimoniale, fiscale et familiale, à l'écoute de vos objectifs. |
  | 02 | Stratégie | L'élaboration d'une feuille de route sur mesure, chiffrée et hiérarchisée selon vos priorités. |
  | 03 | Mise en œuvre | Le déploiement des solutions retenues et un suivi régulier pour ajuster le cap dans la durée. |

## Interactions & Behavior

- **Scroll-reveal entrance** (the only "animation"): when the section enters the viewport (~35% visible), its children animate in with a staggered upward fade. Re-fires each time the section re-enters the viewport.
  - Keyframe `appear`: `from { opacity: 0; transform: translateY(20px) }` → `to { opacity: 1; transform: translateY(0) }`.
  - Eyebrow rule uses a separate `growLine` keyframe: `transform: scaleX(0)→1` from the left origin.
  - Per-element durations/delays (left column): eyebrow `appear .7s` (no delay); eyebrow rule `growLine .8s` @ `.15s`; headline `appear .8s` @ `.08s`; sub `.8s` @ `.16s`; CTA `.8s` @ `.24s`. All `cubic-bezier(.22,.61,.36,1)`.
  - Step rows: `appear .8s` each, staggered by **150ms** starting at a `120ms` base (i.e. `120 + index*150` ms).
  - Implementation note: the prototype gates these by adding a `play` class to the section (re-added on each viewport entry, via `IntersectionObserver` threshold `0.35`). In a real app use whatever your stack already has for scroll-reveal (e.g. an `IntersectionObserver` hook, Framer Motion `whileInView`, AOS, etc.).
- **CTA hover** and **row hover**: described above.
- **No click handlers** beyond the CTA link navigation (wire `href` to the real destination).

## Responsive Behavior
The prototype uses a CSS **container query** on a `container-type: inline-size` wrapper; in a normal app a standard media query / breakpoint is fine. Breakpoint at **≤ 860px**:
- Section padding shrinks to `58px 0 64px`; container padding to `26px`.
- Grid collapses to a **single column** (`grid-template-columns: 1fr`), `row-gap: 40px`, `align-items: start`. Left column drops its `max-width`.
- Eyebrow: `10.5px`, `letter-spacing: .24em`, rule `30px` wide.
- Headline: `32px`, `line-height: 1.08`.
- Sub: `16px`, margin `14px 0 26px`. CTA: `12px`.
- Rows: `column-gap: 22px`, padding `24px 4px 24px 0`; numeral `46px`; title `23px`; body `14px`/`line-height 1.55`.
- On mobile the numerals are shown **solid gold** (not outline): `color: #c2a25c; -webkit-text-stroke-color: transparent; opacity: .85`. The left gold hover bar and `padding-left` hover shift are disabled.

## State Management
Minimal. The only state in the prototype is harness state you should **not** port (`mobile` preview toggle, `play`/replay trigger). The production section is effectively **stateless** — render the static content and attach a scroll-reveal trigger. No data fetching.

## Accessibility / Fallbacks
- **Base (no-JS / pre-animation) state is fully visible** — the hidden state exists *only* while the `play`/reveal animation is active. Preserve this: content must render visible if JS/observers don't run.
- `prefers-reduced-motion: reduce`: all entrance animations are disabled (`animation: none`), content shows in its resting state. Honor this.
- Use a real heading element for the headline (`<h2>`) and step titles (`<h3>`), as in the prototype. The CTA should be an `<a>`.

## Design Tokens

**Colors**
| Token | Hex | Use |
|-------|-----|-----|
| navy | `#11254a` | gradient start |
| navy-deep | `#0d1d3b` | gradient end / page bg |
| navy-hi | `#17305c` | (hover accents elsewhere in system) |
| gold | `#c2a25c` | eyebrow, numerals, rules, CTA underline |
| gold-soft | `#d8bd84` | gradient/hover highlight |
| ink-100 | `#f3f1ea` | headline / primary text on navy |
| ink-300 | `#b9c2d4` | body / supporting text |
| ink-500 | `#8893a8` | (muted, used elsewhere in system) |
| line | `rgba(255,255,255,0.10)` | row hairlines |
| gold-line | `rgba(194,162,92,0.34)` | gold hairline variant |
| numeral stroke | `rgba(194,162,92,0.55)` | outlined numeral stroke |

**Backgrounds**
- Section: `radial-gradient(120% 120% at 100% 0%, #1c3868 0%, rgba(28,56,104,0) 46%)`, over `linear-gradient(150deg, #11254a 0%, #0d1d3b 100%)`.
- Dotted texture overlay: `radial-gradient(rgba(255,255,255,.05) 1px, transparent 1.4px)` at `background-size: 24px 24px`, `opacity: .5`, masked with `linear-gradient(120deg,#000 0%,transparent 62%)`.

**Typography**
- Display / headings: **Cormorant Garamond** (Google Fonts), weights 400/500/600.
- UI / labels / body: **Archivo**, weights 400/500/600.
- Editorial body lines (sub-paragraph): **Spectral**, weights 400/500/600.
- Numerals use old-style figures: `font-feature-settings: "onum" 1`.

**Spacing / radius / misc**
- Container `max-width: 1320px`, padding `56px` (desktop) / `26px` (mobile).
- Section padding `104px`/`112px` → `58px`/`64px` mobile.
- Grid column gap `84px`; row gap mobile `40px`.
- Row vertical padding `30px`; row hover shift `padding-left: 22px`.
- Hairlines `1px`; gold hover bar `2px`; eyebrow rule `42px × 1.5px`; CTA underline `1.5px`.
- Standard easing across the section: `cubic-bezier(.22,.61,.36,1)`; reveal stagger `150ms`.

## Assets
- **Fonts**: Cormorant Garamond, Spectral, Archivo — all from Google Fonts (swap to your project's font-loading strategy / self-host as appropriate).
- **Arrow icon**: inline SVG (no external asset). Path: `M1 5.5h17M13.5 1l4.5 4.5-4.5 4.5`, 1.5px stroke, round caps/joins, `viewBox="0 0 20 11"`.
- **Logos** (brand, not used directly in this section but part of the system): `assets/logo-gold.png`, `assets/logo-white.png` — included for reference.
- No raster images are used in this section.

## Files
- `Section-Approche-Animee.html` — the design reference for this handoff (the section to recreate).
- `Section-Chiffres-Animee.html` — sibling stats section, included so you can see the shared visual system and matching motion conventions.
- `assets/logo-gold.png`, `assets/logo-white.png` — brand logos for system context.
