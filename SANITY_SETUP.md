# Sanity (CMS) — administration du contenu

Le blog **Actualités** est désormais géré dans Sanity : l'admin crée, modifie et
publie les articles depuis une interface d'administration, sans toucher au code.

- **Interface d'admin** : `/studio` (ex. `http://localhost:3000/studio`)
- **Contenu géré** : les articles (titre, accroche, catégorie, date, auteur,
  temps de lecture, image de couverture, mise « à la une », corps de l'article).
- Le reste du site (expertises, témoignages, valeurs, coordonnées…) reste pour
  l'instant dans le code — voir « Ajouter d'autres contenus » plus bas.

## Mise en route (une seule fois)

1. **Récupérer le projet Sanity** sur <https://www.sanity.io/manage> :
   note le **Project ID** et le **Dataset** (en général `production`).

2. **Renseigner `.env.local`** (déjà préparé, valeurs à compléter) :
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxx
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-10-01
   SANITY_API_WRITE_TOKEN=   # voir étape 4
   ```

3. **Autoriser le Studio** (sinon la connexion échoue) :
   sanity.io/manage → ton projet → **API → CORS origins → Add origin**
   - `http://localhost:3000` (coche « Allow credentials »)
   - l'URL de production le moment venu (ex. `https://www.elan-patrimoines.fr`)

4. **Créer un jeton d'écriture** pour l'import initial :
   sanity.io/manage → **API → Tokens → Add token** → rôle **Editor**.
   Copie-le dans `SANITY_API_WRITE_TOKEN` (`.env.local`).

5. **Importer les 12 articles existants** (avec leurs images) :
   ```
   npm run seed
   ```
   Idempotent : on peut le relancer sans créer de doublons. Une fois fait, le
   jeton n'est plus nécessaire — tu peux le retirer de `.env.local`.

6. **Lancer le site et ouvrir le Studio** :
   ```
   npm run dev
   ```
   Puis <http://localhost:3000/studio> et connecte-toi avec ton compte Sanity.

Les modifications publiées apparaissent sur le site dans la minute
(revalidation à 60 s).

## Rendre les articles visibles sur le site (important)

Par défaut, un dataset Sanity est **privé** : le site public lit alors 0 article.
Deux options :

- **Recommandé — rendre le dataset public** (le contenu d'un site vitrine est
  public de toute façon) : sanity.io/manage → ton projet → **API → Datasets** →
  `production` → passer en **Public**. Aucun jeton côté site, lecture via CDN.
- **Garder le dataset privé** : créer un jeton **Viewer** (API → Tokens) et le
  mettre dans `SANITY_API_READ_TOKEN` (`.env.local`). Il est lu uniquement côté
  serveur, jamais exposé au navigateur.

Le code gère automatiquement les deux cas (voir `sanity/lib/client.ts`).

## Ajouter d'autres contenus plus tard

L'architecture est prévue pour s'étendre. Pour rendre un nouveau contenu
éditable (expertises, témoignages, paramètres du site…) :

1. Ajouter un type document dans `sanity/schemaTypes/` puis le référencer dans
   `sanity/schemaTypes/index.ts`.
2. Ajouter la/les requête(s) GROQ dans `sanity/lib/queries.ts`.
3. Remplacer la source de données de la page concernée par un `await` sur la
   nouvelle fonction de récupération (même schéma que `lib/articles.ts`).

## Notes techniques

- **Versions** : Sanity **v3** (et `next-sanity` v9) — c'est la version
  compatible avec Next.js 15 / React 19.0 du projet. Passer à Sanity v6
  imposerait Next.js 16 (migration non souhaitée ici).
- Le Studio est servi sous `/studio` sans en-tête ni pied de page : les pages du
  site vivent dans le groupe de routes `app/(site)/`, le Studio en dehors.
- Une CSP spécifique (plus permissive) s'applique uniquement à `/studio`
  (`next.config.mjs`) ; le reste du site garde sa CSP stricte.
- Les images d'articles sont hébergées par Sanity et optimisées via
  `next/image` (`cdn.sanity.io` autorisé dans `next.config.mjs`).
