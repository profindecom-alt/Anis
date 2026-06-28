# Structure Site Web ANIS

> Architecture · Pages · Sections · Design · SEO

---

## 1 — Architecture & Navigation

**Page d'accueil** : `agcapitalvie.fr /`

### Navigation principale

- **Le Cabinet** → `/le-cabinet`
- **Nos Expertises** → `/nos-expertises`
  - Gestion de patrimoine
  - Défiscalisation
  - Assurance & Protection
  - Réseau d'Experts
- **Notre Approche** → `/notre-approche`
- **Actualités** → `/actualites`
  - Liste articles filtrée / paginée
  - Article → `/:slug`
- **Contact** → `/contact`

### Pages légales (footer)

- Mentions légales
- Politique de confidentialité
- Réclamation
- Contact (CTA)

---

## 2 — Pages du site (14 pages au total)

| Page | Titre | Description |
|---|---|---|
| **PRINCIPALE** | Page d'accueil | Hero · expertises · valeurs · actualités · CTA |
| **/le-cabinet** | Le Cabinet | Histoire · valeurs · agréments ORIAS/ACPR |
| **/nos-expertises** | Nos Expertises | Page hub des 4 sous-expertises |
| **/nos-expertises/gestion-de-patrimoine** | Gestion de Patrimoine | Allocation · arbitrages · architecture ouverte |
| **/nos-expertises/defiscalisation** | Défiscalisation | Optimisation fiscale personnelle et professionnelle |
| **/nos-expertises/assurance-protection** | Assurance & Protection | Prévoyance · couverture · transmission |
| **/nos-expertises/reseau-expert** | Réseau d'Experts | Notaires · experts-comptables · juristes |
| **/notre-approche** | Notre Approche | Méthode 3 étapes · engagements · comparatif |
| **/actualites** | Actualités | Blog · filtres catégorie + date · pagination |
| **/actualites/:slug** | Article individuel | Page détail d'un article |
| **/contact** | Contact | Formulaire · prise de rendez-vous |
| **/mentions-legales** | Mentions légales | Page légale obligatoire |
| **/politique-de-confidentialite** | Politique de confidentialité | RGPD et données personnelles |
| **/reclamation** | Réclamation | Procédure de réclamation réglementaire |

---

## 3 — Sections de la page d'accueil

*Ordre de défilement — chaque section enchaîne vers la suivante · CTA récurrent à chaque niveau*

| N° | Section | Contenu détaillé |
|---|---|---|
| 01 | **Hero** | Image plein écran · H1 accroche principale · 2 boutons CTA (Prendre RDV + Notre Approche) |
| 02 | **Intro cabinet** | Citation fondatrice · texte de présentation du cabinet · bouton CTA |
| 03 | **3 Expertises** | Cards numérotées : Pilier 01 Gestion · Pilier 02 Défiscalisation · Pilier 03 Assurance |
| 04 | **Citation** | Blockquote mise en avant · CTA secondaire |
| 05 | **Nos valeurs** | 4 cards : Indépendance · Expertise · Discrétion · Durabilité + image d'accompagnement |
| 06 | **Approche 3 temps** | Étapes numérotées : 01 Diagnostic · 02 Stratégie · 03 Mise en œuvre |
| 07 | **Actualités** | 1 article featured mis en avant + 3 articles secondaires en mini-cards |
| 08 | **CTA final** | Bandeau plein largeur · titre accroche · bouton Prendre rendez-vous |

---

## 4 — Composants globaux

### Header / Navbar

- Logo SVG horizontal
- Le Cabinet · Nos Expertises ▾ · Notre Approche · Actualités · Réclamation · **Nous contacter** (CTA)
- Dropdown « Nos Expertises » : Gestion de Patrimoine · Défiscalisation · Assurance & Protection · Réseau d'Experts

### Footer

| Nos Services | Le Cabinet | Contact | Légal |
|---|---|---|---|
| Gestion de Patrimoine | Notre Approche | email | Mentions légales |
| Défiscalisation | L'Équipe | téléphone | Confidentialité |
| Assurance & Protection | Actualités | | Réclamation |
| Réseau d'Experts | Contact | | |

---

## 5 — Identité visuelle & Design tokens

### Palette

| Couleur | Code |
|---|---|
| Ivoire crème | `#F5F0E8` |
| Vert forêt | `#1A4D35` |
| Or / beige | `#C9A84C` |

### Typographie

- **Serif élégant** — Titres H1/H2
- **Sans-serif épuré** — Corps de texte
- **Hiérarchie forte** — Numérotation 01-02-03

### Ton éditorial

- **Haut de gamme** — Formulations courtes
- **Sobre** — Sans excès décoratif
- **CTA récurrent** — Prise de RDV en bas de page

---

## 6 — SEO & Métadonnées

*Balises SEO présentes sur chaque page :*

| Balise | Détail |
|---|---|
| `canonical` | URL canonique absolue |
| `meta description` | Description unique par page |
| `og:title` + `og:description` | Open Graph réseaux sociaux |
| `og:type` + `og:url` | website · URL absolue |
| `twitter:card` | summary_large_image |
| `robots: index, follow` | Indexation activée |
| `viewport responsive` | width=device-width |

> Toutes les pages principales sont indexées · structured data recommandée

---

## 7 — Résumé de l'architecture

| Critère | Détail |
|---|---|
| **Nombre de pages** | 11 pages + 3 légales = 14 au total |
| **Navigation** | 5 entrées · 1 dropdown 4 sous-pages · 1 CTA header |
| **Structure URL** | 2 niveaux max : `/section/sous-page` |
| **Blog** | Paginé · filtres catégorie + date · 8 articles/page |
| **CTA récurrent** | Bloc « Prendre rendez-vous » présent en bas de chaque page |
| **Images** | Format `.webp` · résolution 2x · Hero + sections + blog |
| **Responsive** | Oui · viewport meta · mobile-first |
| **Réglementation** | Numéro ORIAS · page Réclamation · footer réglementaire |
