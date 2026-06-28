# Handoff: Section « Conviction » — Direction A (Éditorial asymétrique)

## Overview
A brand pull-quote / manifesto band for the **Élan Patrimoine** marketing site. It states the firm's
guiding conviction in a single editorial sentence and routes the visitor to the methodology page via a
quiet text CTA. It is a full-bleed horizontal section that sits between content blocks on a long page.

## About the Design Files
The files in this bundle are **design references created in HTML** — a prototype showing the intended
look and behavior, **not** production code to paste in directly. The task is to **recreate this design in
the target codebase** (React, Vue, Astro, WordPress/PHP, etc.) using its established components, tokens,
and conventions. If no front-end environment exists yet, pick the most appropriate framework for the
project and implement it there.

`Conviction-A.html` is a single, self-contained, **responsive** implementation (desktop + mobile via one
`@media` breakpoint) — the cleanest thing to read measurements off of. Open it and resize the window to
see the mobile reflow.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, and interaction states are specified below
and should be reproduced precisely.

## Screens / Views

### Conviction band (single section, two breakpoints)

**Purpose:** Communicate the firm's conviction; offer one onward link ("Notre méthode").

**Layout — Desktop (>640px)**
- Full-width `<section>`, `min-height: 500px`, vertically centered content (`display:flex; align-items:center`).
- Padding: `72px 96px`.
- A **vertical gold rule** is absolutely positioned at `left:96px`, vertically centered, `2px × 190px`,
  drawn as a top-down gradient (gold → transparent).
- Content column (`.inner`) is left-aligned, `max-width:880px`, with `padding-left:56px` so the text clears the rule.
- A faint brand **monogram** (gold logo PNG) bleeds off the bottom-right corner at `opacity:.05`, clipped by `overflow:hidden`.

**Layout — Mobile (≤640px)**
- Padding `52px 30px`, `min-height` removed (section hugs its content).
- The gold rule switches to a **full-height** left bar: `left:30px; top:52px; bottom:52px`.
- `.inner` padding-left `30px`.
- The footer (`.foot`) stacks vertically: the small gold line sits above the CTA, both left-aligned.
- Monogram shrinks to `230px`.

**Components (top → bottom, inside `.inner`)**

1. **Opening quote glyph** (`.mark`)
   - Character: a single left double-quote `"` (`&ldquo;`).
   - Cormorant Garamond, *italic*, `120px` desktop / `80px` mobile, color `--gold #bf9d54`.
   - `line-height:.6`, height clamped (`54px` / `36px`) and nudged `margin-left:-6px` so it optically aligns to the text edge.

2. **Eyebrow / attribution** (`.eyebrow`)
   - Text: `La conviction d'Élan Patrimoine`
   - Archivo 600, `12px` desktop / `10.5px` mobile, `text-transform:uppercase`,
     `letter-spacing:.34em` desktop / `.26em` mobile, color `--gold`.
   - `margin-bottom:22px` (desktop) / `18px` (mobile).

3. **Quote** (`<blockquote>`)
   - Text: `Conseiller, ce n'est pas suivre une mode : c'est protéger un projet de vie contre l'imprévu et le temps.`
     - Note the **narrow no-break space** before the colon (French typography): `mode&nbsp;:`.
     - The phrase **`protéger un projet de vie`** is wrapped in `<em>` → italic, color `--gold` (everything else is `--navy`).
   - Cormorant Garamond 500, `44px` desktop / `30px` mobile, `line-height:1.18` / `1.24`,
     `letter-spacing:.004em`, color `--navy #11254a`, `text-wrap:balance`.
   - **No** literal `«  »` guillemets — the opening glyph above stands in for them. (If brand prefers guillemets, add them and drop `.mark`.)

4. **Footer row** (`.foot`) — `display:flex; align-items:center; gap:24px; margin-top:34px`
   - **Accent line** (`.line`): `46px × 1px`, `--gold`, `opacity:.55` (desktop). On mobile the row is `flex-direction:column`.
   - **CTA** (`.cta`): text `Notre méthode` + right-arrow SVG.
     - Archivo 600, `13.5px`, `letter-spacing:.04em`, color `--navy`, `white-space:nowrap`.
     - Styled as a **text link with a gold underline**: `border-bottom:1.5px solid --gold; padding-bottom:5px`. Not a filled button.
     - Desktop: pushed to the right edge of the column via `margin-left:auto`. Mobile: `margin-left:0`.

## Interactions & Behavior
- **CTA hover:** text color transitions `--navy → --gold` over `.25s`; the arrow SVG translates `+5px` on X over `.25s`. `transition` on `color` and `transform` only.
- **CTA target:** links to the methodology page (placeholder `href="#"`).
- **Responsive:** single breakpoint at `max-width:640px` (see layouts above). No JS required.
- No loading/error/validation states — this is static content.

## State Management
None. Purely presentational, no client state or data fetching.

## Design Tokens
| Token | Value | Usage |
|---|---|---|
| `--navy` | `#11254a` | quote body text, CTA text |
| `--gold` | `#bf9d54` | quote glyph, eyebrow, em phrase, rule, underline, accent line |
| `--gold-soft` | `#cdb077` | top stop of the vertical rule gradient |
| `--cream` | `#e9e3d5` | section base background |
| `--cream-hi` | `#efeadd` | highlight of background radial gradient |
| background | `radial-gradient(140% 120% at 12% 0%, #efeadd 0%, #e9e3d5 58%, #e3dccd 100%)` | section bg |
| rule gradient | `linear-gradient(#cdb077, #bf9d54, rgba(191,157,84,0))` | vertical gold rule |

**Spacing (desktop / mobile):** section padding `72/96` → `52/30`; mark→eyebrow ~`6+`; eyebrow margin-bottom `22/18`; footer margin-top `34/30`; inner padding-left `56/30`.

**Type scale:** glyph `120/80`px · eyebrow `12/10.5`px · quote `44/30`px. **Fonts:** Cormorant Garamond (display serif, weights 400/500), Archivo (labels/CTA, weight 600). Both from Google Fonts.

**Radius / shadow:** none (intentionally flat, engraved feel).

## Assets
- `assets/logo-gold.png` — Élan Patrimoine monogram in gold, used as a low-opacity corner watermark.
  Source: project brand assets (`assets/logo-gold.png`). In the real codebase use the existing brand
  logo asset rather than this copy.

## Files
- `Conviction-A.html` — self-contained responsive reference for this section (read measurements here).
- `assets/logo-gold.png` — watermark asset.

## Brand note
Colors, fonts (Cormorant Garamond + Archivo), navy/gold palette, and the gold monogram are part of the
existing **Élan Patrimoine** design system. Wire this section to the codebase's existing brand tokens and
logo component instead of hard-coding the values above where equivalents already exist.
