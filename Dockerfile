# syntax=docker/dockerfile:1.7
#
# Image de production Élan Patrimoine (Next.js en mode « standalone »).
#
# Pensée pour un petit VPS qui construit lui-même l'image (Coolify) :
#  - pas de Nix : Nixpacks téléchargeait et décompressait ~600 Mo à chaque
#    déploiement ;
#  - mémoire de build plafonnée (BUILD_MAX_OLD_SPACE_MB) : un manque de RAM
#    fait échouer le build proprement au lieu de geler le serveur et le site ;
#  - image finale minimale, lancée par `node server.js`, avec un healthcheck
#    pour que Coolify ne bascule que vers un conteneur qui répond.
#
# Dans Coolify : Configuration > General > Build Pack = « Dockerfile »,
# Ports Exposes = 3000.

FROM node:22-bookworm-slim AS base
ENV NEXT_TELEMETRY_DISABLED=1
WORKDIR /app

# --- Dépendances --------------------------------------------------------
FROM base AS deps
COPY package.json package-lock.json .npmrc ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --no-fund

# --- Build --------------------------------------------------------------
FROM base AS builder
# Variables lues AU BUILD (pages statiques, variables NEXT_PUBLIC_*).
# Coolify les transmet en --build-arg lorsqu'elles sont cochées
# « Build Variable ». Elles ne restent que dans cette étape : l'image finale
# ne contient aucun de ces secrets.
ARG SITE_INDEXABLE
ARG SANITY_API_READ_TOKEN
ARG NEXT_PUBLIC_SANITY_PROJECT_ID
ARG NEXT_PUBLIC_SANITY_DATASET
ARG NEXT_PUBLIC_SANITY_API_VERSION
ARG NEXT_PUBLIC_GTM_ID
ARG NEXT_PUBLIC_GA4_ID
ARG NEXT_PUBLIC_PLAUSIBLE_DOMAIN
ARG NEXT_PUBLIC_PLAUSIBLE_SRC
# Plafond mémoire du build (Mo). À ajuster selon la RAM du serveur.
ARG BUILD_MAX_OLD_SPACE_MB=2048
ENV SITE_INDEXABLE=$SITE_INDEXABLE \
    SANITY_API_READ_TOKEN=$SANITY_API_READ_TOKEN \
    NEXT_PUBLIC_SANITY_PROJECT_ID=$NEXT_PUBLIC_SANITY_PROJECT_ID \
    NEXT_PUBLIC_SANITY_DATASET=$NEXT_PUBLIC_SANITY_DATASET \
    NEXT_PUBLIC_SANITY_API_VERSION=$NEXT_PUBLIC_SANITY_API_VERSION \
    NEXT_PUBLIC_GTM_ID=$NEXT_PUBLIC_GTM_ID \
    NEXT_PUBLIC_GA4_ID=$NEXT_PUBLIC_GA4_ID \
    NEXT_PUBLIC_PLAUSIBLE_DOMAIN=$NEXT_PUBLIC_PLAUSIBLE_DOMAIN \
    NEXT_PUBLIC_PLAUSIBLE_SRC=$NEXT_PUBLIC_PLAUSIBLE_SRC \
    NEXT_OUTPUT=standalone
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN --mount=type=cache,target=/app/.next/cache \
    NODE_OPTIONS="--max-old-space-size=${BUILD_MAX_OLD_SPACE_MB}" npm run build

# --- Exécution ----------------------------------------------------------
FROM base AS runner
ENV NODE_ENV=production \
    PORT=3000 \
    HOSTNAME=0.0.0.0
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
USER node
EXPOSE 3000
HEALTHCHECK --interval=15s --timeout=5s --start-period=30s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/robots.txt').then(r=>process.exit(r.ok?0:1)).catch(()=>process.exit(1))"
CMD ["node", "server.js"]
