# Handoff : Section Témoignages — Variante B (« Trois cartes »)

## Overview
Section « Témoignages » pour le site **Élan Patrimoine** (conseil en gestion de patrimoine, FR). Variante B : un en-tête centré suivi d'une rangée de **trois cartes de témoignage** sur fond crème/papier. Objectif : rassurer le prospect via la preuve sociale, dans un ton sobre et premium.

## About the Design Files
Le fichier `Section-Temoignages-B.html` de ce dossier est une **référence de design réalisée en HTML/CSS** — un prototype qui montre l'apparence et le comportement attendus, **pas du code de production à copier tel quel**. La tâche est de **recréer ce design dans l'environnement existant du codebase cible** (React, Vue, etc.) en suivant ses conventions et sa librairie de composants. Si aucun environnement n'existe encore, choisir le framework le plus adapté et y implémenter le design.

## Fidelity
**Haute fidélité (hifi).** Couleurs, typographies, espacements et états sont définitifs. Reproduire l'UI au pixel près en réutilisant les composants/tokens du codebase.

## Screens / Views

### Section « Témoignages » (B · Trois cartes)
- **Purpose** : afficher 3 verbatims clients comme preuve sociale.
- **Canvas de référence** : 1320 × 640 px (la section est responsive ; cette taille sert de cadre desktop).
- **Layout** :
  - Conteneur `padding: 78px 84px`, `display:flex; flex-direction:column`.
  - Fond : `radial-gradient(120% 130% at 50% -10%, #f4efe3 0%, #ece6d8 58%, #e3dccb 100%)`.
  - Overlay texture (pseudo-élément) : points `radial-gradient(rgba(17,37,74,.06) 1px, transparent 1.4px)`, `background-size:26px 26px`, `opacity:.5`, masqué par `radial-gradient(120% 90% at 50% 0%, #000 0%, transparent 72%)`.
  - **En-tête** centré, `max-width:720px`, `margin:0 auto 52px`.
  - **Grille de cartes** : `display:grid; grid-template-columns:repeat(3,1fr); column-gap:28px; align-content:center; flex:1`.
  - **Responsive** : sous ~900px, passer la grille en 1 colonne (`grid-template-columns:1fr; row-gap:20px`) ; réduire les paddings et la taille du titre.

- **Components** :

  **Eyebrow** (« Témoignages ») — variante `both` (filet de part et d'autre)
  - Texte : `Témoignages`
  - `font-family: Archivo; font-size:12px; font-weight:600; letter-spacing:.32em; text-transform:uppercase; color:#a8884a`
  - `display:inline-flex; align-items:center; gap:16px`
  - Filets avant **et** après : `width:38px; height:1.5px; background:#a8884a; opacity:.85`
  - Marge basse : `22px`

  **Titre**
  - Texte : `La confiance, sur la durée`
  - `font-family: 'Cormorant Garamond'; font-weight:500; font-size:50px; line-height:1.05; letter-spacing:.004em; color:#11254a; text-wrap:balance`

  **Sous-titre**
  - Texte : `Des relations qui se mesurent en années, pas en transactions.`
  - `font-family: Spectral; font-size:18px; line-height:1.5; color:#4f5666; max-width:46ch; margin:18px auto 0; text-wrap:balance`

  **Carte de témoignage** (× 3)
  - `padding:38px 34px; background:#f4efe3; border:1px solid rgba(168,136,74,.30)`
  - `box-shadow:0 10px 30px rgba(17,37,74,.06)`
  - `display:flex; flex-direction:column`
  - **Hover** : `transform:translateY(-4px); box-shadow:0 18px 40px rgba(17,37,74,.12)` ; transition `transform .3s, box-shadow .3s`
  - **Guillemet décoratif** (`.mark`) : caractère `"` — `font-family:'Cormorant Garamond'; font-style:italic; font-size:80px; line-height:.6; color:#a8884a; opacity:.8; height:34px; margin:0 0 6px -3px`
  - **Citation** (`blockquote`) : `font-family:'Cormorant Garamond'; font-weight:500; font-size:23px; line-height:1.34; letter-spacing:.004em; color:#11254a; flex:1; text-wrap:balance`. Mots clés mis en valeur via `<em>` : `font-style:italic; color:#a8884a; font-weight:500`.
  - **Pied (personne)** : `margin-top:30px; padding-top:24px; border-top:1px solid rgba(168,136,74,.30); display:flex; align-items:center; gap:14px`
    - **Avatar / monogramme** : cercle `46×46px; border-radius:50%; background:#ece6d8; border:1px solid rgba(168,136,74,.30); color:#a8884a; font-family:'Cormorant Garamond'; font-weight:600; font-size:18px`, centré. Initiales du client (placeholder — remplaçable par une photo ronde).
    - **Nom** : `font-family:Archivo; font-size:14px; font-weight:600; color:#11254a`
    - **Rôle** : `font-family:Archivo; font-size:11.5px; font-weight:500; letter-spacing:.03em; color:#7a8093; margin-top:3px`

## Contenu (copy exacte — placeholders à remplacer par de vrais avis)
1. **Claire Fontaine** — *Profession libérale* — initiales `CF`
   « Un interlocuteur unique qui connaît notre dossier dans le détail. La transmission à nos enfants a été *préparée sereinement*. »
2. **Philippe Renaud** — *Cadre dirigeant* — initiales `PR`
   « Des conseils clairs, sans jargon ni produit maison. On sent une vraie indépendance. »
3. **Antoine Mercier** — *Entrepreneur* — initiales `AM`
   « À la cession de ma société, ils ont structuré la fiscalité bien en amont. Un gain de temps et de tranquillité *considérable*. »

(Les mots en italique correspondent aux `<em>` dorés.)

## Interactions & Behavior
- **Hover carte** uniquement : translation verticale -4px + ombre renforcée, 300 ms.
- Aucune navigation, aucun état de chargement/erreur, pas de formulaire.
- Section purement présentationnelle (statique). Si les avis viennent d'une API, mapper sur un tableau `{ initials, name, role, quote }`.

## State Management
Aucun état requis pour la version statique. Si dynamique : un tableau de témoignages en props/data, rendu en boucle. Les `<em>` peuvent être portés par un champ riche ou un marquage léger côté contenu.

## Design Tokens
**Couleurs**
- Navy (texte titres) : `#11254a`
- Or profond (accents/eyebrow/em) : `#a8884a`
- Crème : `#ece6d8` · Crème clair (cartes) : `#f4efe3` · Crème foncé (fond bas) : `#e3dccb`
- Texte courant : `#4f5666` · Texte secondaire : `#7a8093`
- Ligne or (bordures) : `rgba(168,136,74,0.30)`

**Typographies** (Google Fonts)
- `Cormorant Garamond` (500/600, + italique) — titres, citations, monogrammes
- `Archivo` (400/500/600) — eyebrow, noms, rôles
- `Spectral` (400/500) — sous-titre / textes courants longs

**Espacements clés** : padding section `78px 84px` · gap cartes `28px` · padding carte `38px 34px` · marge en-tête `52px`.

**Rayons** : cartes à angles **droits** (pas de border-radius), seuls les avatars sont des cercles (`border-radius:50%`).

**Ombres** : carte repos `0 10px 30px rgba(17,37,74,.06)` · carte hover `0 18px 40px rgba(17,37,74,.12)`.

## Assets
- Aucune image bitmap requise. Les avatars sont des **monogrammes** (initiales). Prévoir l'option photo ronde (objet-fit cover).
- Logos de marque disponibles dans le projet : `assets/logo-gold.png`, `assets/logo-white.png` (non utilisés dans cette section).
- Le guillemet et les italiques dorés sont purement typographiques (police Cormorant Garamond).

## Files
- `Section-Temoignages-B.html` — la variante B en HTML/CSS autonome (ce dossier).
- Source multi-variantes (pour contexte) : `Section-Temoignages.html` à la racine du projet — contient A, B, C, E, F + mobile.
