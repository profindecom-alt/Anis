# Élan Patrimoine — Site web

Site vitrine du cabinet de gestion de patrimoine **Élan Patrimoine**, construit
d'après le cahier des charges `STRUCTURE_SITEWEB_ANIS.md`.

## Stack technique

- **Next.js 15** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS 3**
- Polices Google `Cormorant Garamond` (serif) + `Inter` (sans-serif)
- Images servies en WebP/AVIF via `next/image`

## Démarrage

```bash
npm install      # installe les dépendances
npm run dev      # serveur de développement → http://localhost:3000
npm run build    # build de production
npm run start    # sert le build de production
```

## Architecture des pages (14 pages)

| Route | Page |
|---|---|
| `/` | Accueil (8 sections) |
| `/le-cabinet` | Le Cabinet — histoire, valeurs, agréments ORIAS/ACPR |
| `/nos-expertises` | Hub des 4 expertises |
| `/nos-expertises/gestion-de-patrimoine` | Gestion de patrimoine |
| `/nos-expertises/defiscalisation` | Défiscalisation |
| `/nos-expertises/assurance-protection` | Assurance & protection |
| `/nos-expertises/reseau-expert` | Réseau d'experts |
| `/notre-approche` | Méthode 3 étapes, engagements, comparatif |
| `/actualites` | Blog paginé, filtres catégorie + année |
| `/actualites/[slug]` | Article individuel |
| `/contact` | Formulaire + prise de rendez-vous |
| `/mentions-legales` | Mentions légales |
| `/politique-de-confidentialite` | RGPD |
| `/reclamation` | Procédure de réclamation |

## Design tokens

| Couleur | Code | Usage |
|---|---|---|
| Ivoire crème | `#F5F0E8` | Fonds |
| Bleu nuit | `#0f2d52` | Titres, sections sombres (couleur primaire) |
| Or / beige | `#c7a15a` | Accents, CTA (couleur secondaire) |

> Les tokens Tailwind conservent les noms `forest` (bleu nuit) et `gold` afin
> de centraliser le branding dans `tailwind.config.ts`.

## Structure du projet

```
app/                 # routes (App Router) + API routes
  api/contact/       # endpoint du formulaire de contact
  api/newsletter/    # endpoint d'inscription newsletter
  opengraph-image    # carte de partage de marque (générée)
components/           # composants UI réutilisables
lib/                 # données & config (site, articles, expertises, SEO, mailer…)
public/images/       # photos auto-hébergées (optimisées par next/image)
```

## Fonctionnalités

- **Formulaire de contact opérationnel** : `POST /api/contact` avec validation
  serveur partagée, pot de miel anti-spam, limitation de débit, et transmission
  des données vers un **webhook n8n** (configurable par variables d'environnement).
- **Newsletter** : capture de prospect dans le footer (`POST /api/newsletter`),
  également transmise au webhook n8n.
- **Chatbot n8n (avec prise de rendez-vous)** : assistant conversationnel sur
  les pages Contact et Nos Expertises (`POST /api/chat`). Chaque message est
  relayé à un webhook n8n dédié qui répond de façon synchrone. Le flux peut
  renvoyer des **créneaux cliquables** (`options`/`slots`) et confirmer un
  rendez-vous (`booked: true`) ; côté agenda, n8n réalise la réservation
  (Google Calendar, Cal.com…).
- **Blog piloté par l'URL** : filtres catégorie + année et pagination via
  `?categorie=`, `?annee=`, `?page=` — partageables, indexables, sans JS requis.
- **Images auto-hébergées** dans `public/images`, servies en WebP/AVIF par
  `next/image` (plus aucune dépendance à un service externe au runtime).
- **Consentement RGPD** : bandeau cookies + analytics Plausible chargée
  uniquement après accord et si un domaine est configuré.
- **Accessibilité** : respect de `prefers-reduced-motion`, contraste renforcé
  des libellés, états de focus visibles.

## Variables d'environnement

Voir [`.env.example`](.env.example). Toutes optionnelles : sans elles, le site
tourne en mode développement (soumissions journalisées, analytics désactivée).

| Variable | Rôle |
|---|---|
| `N8N_WEBHOOK_URL` | Webhook n8n recevant contact + newsletter |
| `N8N_WEBHOOK_TOKEN` | Secret d'authentification du webhook (optionnel) |
| `N8N_WEBHOOK_HEADER` | En-tête d'auth (défaut : `Authorization` en `Bearer`) |
| `N8N_CHAT_WEBHOOK_URL` | Webhook n8n du chatbot (réponse synchrone requise) |
| `N8N_CHAT_WEBHOOK_TOKEN` / `_HEADER` | Auth du chatbot (reprend celle ci-dessus si absente) |
| `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | Active l'analytics (sinon désactivée) |

### Charge utile envoyée à n8n

```jsonc
// POST <N8N_WEBHOOK_URL>   — formulaires
{ "type": "contact",    // ou "newsletter"
  "prenom": "Jean", "nom": "Dupont",
  "email": "jean.dupont@email.fr", "telephone": "06 12 34 56 78",
  "sujet": "Gestion de Patrimoine", "message": "…",
  "source": "https://www.elan-patrimoines.fr",
  "submittedAt": "2026-06-12T10:00:00.000Z" }

// POST <N8N_CHAT_WEBHOOK_URL>   — chatbot (le flux doit RÉPONDRE)
{ "type": "chat",
  "sessionId": "uuid",
  "message": "Comment réduire mes impôts ?",
  "history": [ { "role": "user", "content": "…" },
               { "role": "assistant", "content": "…" } ],
  "context": "services",      // ou "contact"
  "capabilities": ["answer", "booking"],
  "source": "https://www.elan-patrimoines.fr",
  "submittedAt": "2026-06-12T10:00:00.000Z" }

// Réponse n8n (synchrone). Texte brut, ou JSON :
{ "reply": "Voici mes prochains créneaux :",
  "options": ["Demain 10h00", "Jeudi 14h30"],   // créneaux cliquables (RDV)
  "booked": false }                              // true = rendez-vous confirmé
```

> Pour la prise de rendez-vous : dans n8n, l'agent propose des créneaux via
> `options`, l'utilisateur clique, puis un nœud agenda (Google Calendar /
> Cal.com) crée l'événement et le flux répond avec `booked: true`.

## SEO

Chaque page expose : `canonical`, `meta description`, Open Graph, Twitter Card
(`summary_large_image`), `robots: index, follow` et `viewport`. Le site fournit
`sitemap.xml`, `robots.txt`, un `manifest.webmanifest`, une carte de partage de
marque générée (`opengraph-image` / `twitter-image`) et des données structurées
JSON-LD (`FinancialService`, `Article`, `BreadcrumbList`).
