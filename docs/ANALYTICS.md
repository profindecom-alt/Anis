# Google Tag Manager & Google Analytics 4 — mise en place

Ce document décrit l'installation côté Google (comptes, conteneur, balises) et
côté site (identifiants à saisir). Le code nécessaire est **déjà en place** :
il n'y a rien à développer pour activer la mesure, seulement à configurer.

- Consentement : aucun script Google n'est chargé avant un « Accepter » explicite.
- Consent Mode v2 (obligatoire pour l'EEE depuis mars 2024) : déjà implémenté.
- Vues de page des navigations internes : déjà émises (`virtual_page_view`).
- Événements de conversion du site : déjà poussés dans le `dataLayer`.

---

## 1. Créer les comptes Google

1. **Google Analytics 4** — <https://analytics.google.com>
   - Créer un compte « Élan Patrimoine », puis une **propriété** (fuseau
     `France`, devise `EUR`).
   - Créer un **flux de données Web** sur `https://elanpatrimoines.fr`.
   - Relever l'**identifiant de mesure** : `G-XXXXXXXXXX`.
   - Dans _Administration ▸ Paramètres des données ▸ Conservation des données_,
     passer la conservation à **14 mois** (maximum, recommandé).
2. **Google Tag Manager** — <https://tagmanager.google.com>
   - Créer un compte « Élan Patrimoine » et un **conteneur Web** sur le domaine
     `elanpatrimoines.fr`.
   - Relever l'**identifiant du conteneur** : `GTM-XXXXXXX`.

> **Ne pas** coller les extraits de code fournis par Google dans le site : la
> Content-Security-Policy bloquerait un script inconnu, et le site charge déjà
> les scripts officiels à partir des seuls identifiants.

## 2. Renseigner les identifiants dans le site

Deux méthodes, la première est prioritaire :

| Méthode                        | Où                                                                | Quand l'utiliser                                     |
| ------------------------------ | ----------------------------------------------------------------- | ---------------------------------------------------- |
| **Sanity** (recommandé)        | `/studio` ▸ _Paramètres du site_ ▸ onglet **Suivi & analytics**    | Modifiable par le client, sans redéploiement          |
| Variables d'environnement      | `NEXT_PUBLIC_GTM_ID`, `NEXT_PUBLIC_GA4_ID` chez l'hébergeur        | Si le CMS n'est pas utilisé, ou pour figer la valeur  |

**Ne renseigner que GTM** (`GTM-XXXXXXX`) : la balise GA4 se configure ensuite
_dans_ le conteneur (étape 3). Si les deux identifiants sont renseignés,
l'identifiant `G-…` est volontairement ignoré — le charger en plus de GTM
compterait chaque page deux fois.

Un site **sans** GTM peut à l'inverse ne renseigner que `G-XXXXXXXXXX` :
`gtag.js` est alors chargé en direct.

## 3. Configurer le conteneur GTM

### 3.1 Variables

Activer dans _Variables ▸ Variables intégrées_ : `Page URL`, `Page Path`,
`Page Title`, `Referrer`, `Click Element`, `Click URL`.

Créer les **variables définies par l'utilisateur** de type _Variable de couche
de données_ correspondant aux paramètres poussés par le site :

| Nom de la variable    | Nom de la variable de couche de données |
| --------------------- | --------------------------------------- |
| `dlv - location`      | `location`                              |
| `dlv - subject`       | `subject`                               |
| `dlv - page_path`     | `page_path`                             |
| `dlv - page_title`    | `page_title`                            |
| `dlv - consent_state` | `consent_state`                         |

### 3.2 Balise de configuration GA4

- _Balises ▸ Nouvelle ▸ Google Tag_ (anciennement « Configuration GA4 »).
- **Identifiant de balise** : `G-XXXXXXXXXX`.
- Déclencheur : **Initialization - All Pages**.

### 3.3 Vues de page des navigations internes

Le site est une application Next.js : après la première page, la navigation ne
recharge pas le document. Le site pousse donc un événement `virtual_page_view`
à chaque changement d'URL.

- _Déclencheurs ▸ Nouveau ▸ Événement personnalisé_
  - Nom de l'événement : `virtual_page_view`
  - Nom du déclencheur : `CE - virtual_page_view`
- _Balises ▸ Nouvelle ▸ Google Analytics : événement GA4_
  - Nom de l'événement : `page_view`
  - Paramètres : `page_path` = `{{dlv - page_path}}`, `page_title` = `{{dlv - page_title}}`
  - Déclencheur : `CE - virtual_page_view`

> ⚠️ Ne **pas** utiliser le déclencheur « Historique modifié » en plus : il
> ferait double emploi avec `virtual_page_view`.

### 3.4 Événements de conversion déjà émis par le site

Chacun est un événement personnalisé du `dataLayer`. Créer un déclencheur
_Événement personnalisé_ du même nom, puis une balise _Événement GA4_ portant
le même nom d'événement.

| Événement               | Émis quand                                    | Paramètres                              |
| ----------------------- | --------------------------------------------- | --------------------------------------- |
| `contact_form_submit`   | Formulaire de contact envoyé avec succès      | `subject`                               |
| `newsletter_subscribe`  | Inscription newsletter (pied de page)         | `location`                              |
| `reclamation_submit`    | Formulaire de réclamation envoyé              | —                                       |
| `cta_contact_click`     | Clic sur un bouton « Prendre rendez-vous »    | `location`                              |
| `cta_popup_view`        | Affichage de la fenêtre d'incitation          | —                                       |
| `cta_popup_appointment` | Clic « rendez-vous » dans cette fenêtre       | `location`                              |
| `phone_click`           | Clic sur un numéro de téléphone               | `location`                              |
| `email_click`           | Clic sur une adresse e-mail                   | `location`                              |
| `whatsapp_click`        | Clic sur le bouton WhatsApp flottant          | `location`                              |
| `chatbot_open`          | Ouverture du chatbot                          | `location`                              |
| `virtual_page_view`     | Navigation interne                            | `page_path`, `page_title`, `page_location` |
| `consent_update`        | Choix ou retrait du consentement cookies      | `consent_state`                         |

Côté GA4, marquer comme **événements clés** (ex-conversions) au minimum :
`contact_form_submit`, `cta_contact_click`, `phone_click`, `whatsapp_click`.
_Administration ▸ Événements ▸ Marquer comme événement clé._

**Ajouter un nouvel événement sans développement** : poser l'attribut
`data-analytics-event` sur n'importe quel élément cliquable ; les attributs
`data-analytics-*` deviennent des paramètres.

```html
<a href="/contact" data-analytics-event="cta_contact_click" data-analytics-location="hero">
```

### 3.5 Consentement (Consent Mode v2)

Le site déclare l'état de consentement à Google **avant** le chargement de GTM
(`lib/consent.ts`, injecté dans `app/layout.tsx`) :

- au départ, tous les usages de stockage sont `denied` ;
- après « Accepter », un `consent update` passe tout en `granted` ;
- après un retrait, l'état repasse en `denied` et les cookies `_ga*`, `_gid`,
  `_gcl_*` sont supprimés.

Dans GTM : _Administration ▸ Paramètres du conteneur_ ▸ cocher **Activer la
prise en charge du consentement**. Les balises Google héritent alors
automatiquement de cet état. Pour une balise tierce, renseigner ses
« vérifications de consentement supplémentaires » (`analytics_storage` pour la
mesure, `ad_storage` pour la publicité).

> Rappel : le site ne charge de toute façon aucune balise avant l'acceptation.
> Consent Mode est une seconde barrière, exigée par Google.

## 4. Vérifier

1. **Mode Aperçu GTM** : bouton _Aperçu_ dans GTM, saisir
   `https://elanpatrimoines.fr` (ou `http://localhost:3000`). La CSP autorise
   déjà `tagassistant.google.com`.
   - Tant que le bandeau cookies n'est pas accepté : aucune balise ne se déclenche.
   - Après « Accepter » : `consent_update` puis les balises GA4 apparaissent.
   - Naviguer entre deux pages : `virtual_page_view` doit apparaître.
2. **GA4 en temps réel** : _Rapports ▸ Temps réel_, la visite doit apparaître
   sous une minute.
3. **Console du navigateur** : aucune erreur `Content Security Policy`. Si une
   balise tierce ajoutée dans GTM est bloquée, ajouter son domaine dans la
   constante `analytics` de `next.config.mjs` (script/connect/img/frame).
4. **Publier le conteneur** GTM (_Envoyer_) : tant qu'il n'est pas publié, seul
   le mode Aperçu voit les balises.

## 5. Points de vigilance

- **`SITE_INDEXABLE`** : tant que cette variable n'est pas à `true`, tout le
  site est en `noindex`. Sans effet sur GA4/GTM, mais Search Console ne
  remontera rien d'utile avant.
- **Search Console** : lier la propriété GA4 (_Administration ▸ Liens vers les
  produits ▸ Search Console_) pour croiser requêtes et audience. La vérification
  de propriété est assurée par `public/googlebe87d22670b8c1ed.html`.
- **Politique de confidentialité** : la page `/politique-de-confidentialite`
  doit mentionner Google Analytics, la finalité, la durée de conservation
  (14 mois) et le moyen de retirer son consentement (« Gérer les cookies », en
  pied de page).
- **Balise `<noscript>` de GTM** : volontairement absente. Le consentement étant
  recueilli en JavaScript, un visiteur sans JavaScript ne peut pas consentir —
  charger l'iframe GTM dans ce cas serait un dépôt sans consentement.
- **Ajout d'un outil tiers** : ne jamais coller de `<script>` dans le CMS. Créer
  un champ d'identifiant dédié (schéma `siteSettings`), charger le script
  officiel dans `components/TrackingScripts.tsx`, puis autoriser son domaine
  dans la CSP.

## 6. Où vit quoi dans le code

| Fichier                                  | Rôle                                                        |
| ---------------------------------------- | ----------------------------------------------------------- |
| `lib/consent.ts`                         | Consent Mode v2, stockage du choix, purge des cookies Google |
| `app/layout.tsx`                         | Injection du Consent Mode avant toute balise                 |
| `components/ConsentManager.tsx`          | Bandeau cookies, chargement conditionnel                     |
| `components/TrackingScripts.tsx`         | Scripts GTM / GA4 / Hotjar / Clarity / pixels                |
| `components/AnalyticsEvents.tsx`         | Clics `data-analytics-event` + vues de page                  |
| `lib/analytics.ts`                       | `trackEvent()` / `trackPageView()`                           |
| `lib/settings.ts`                        | `resolveTracking()` : Sanity puis variables d'environnement  |
| `sanity/schemaTypes/siteSettingsType.ts` | Champs saisis dans le Studio                                 |
| `next.config.mjs`                        | Domaines autorisés par la CSP                                |
