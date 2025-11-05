# -------------------------------------------------
# 1) Dependencies (todas) para o build
# -------------------------------------------------
FROM node:20-bookworm-slim AS deps
WORKDIR /app

ENV CI=true \
    npm_config_audit=false \
    npm_config_fund=false

# Copia só manifestos para cache eficiente
COPY package.json package-lock.json* ./

# Evita conflitos de peer deps; mantém logs limpos
RUN npm ci --legacy-peer-deps --loglevel=error


# -------------------------------------------------
# 1b) Dependencies (somente produção) para o runtime
# -------------------------------------------------
FROM node:20-bookworm-slim AS prod-deps
WORKDIR /app

ENV CI=true \
    npm_config_audit=false \
    npm_config_fund=false

COPY package.json package-lock.json* ./

# Instala SOMENTE deps de produção direto do lockfile
# Usa --legacy-peer-deps para ignorar conflito react 19 x react-helmet-async
# Se você precisar de postinstall (ex.: sharp), remova --ignore-scripts
RUN npm ci --omit=dev --legacy-peer-deps --loglevel=error --ignore-scripts


# -------------------------------------------------
# 2) Build
# -------------------------------------------------
FROM node:20-bookworm-slim AS builder
WORKDIR /app

ENV CI=true \
    NEXT_TELEMETRY_DISABLED=1

# node_modules completos para compilar
COPY --from=deps /app/node_modules ./node_modules
# código da aplicação (inclui schema.prisma, public, etc.)
COPY . .

# Binários do node_modules no PATH
ENV PATH="/app/node_modules/.bin:${PATH}"

# <<< CORREÇÃO PUBLIC FAILED NOT FOUND >>>
# Garante que o diretório 'public' exista para que o COPY na stage 'runner' não falhe.
RUN mkdir -p public

# <<< CORREÇÃO PRISMA/OPENSSL >>>
# Instala a libssl (libssl.so.1.1) necessária para o Query Engine do Prisma
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# <<< CORREÇÃO PRISMA/GENERATE >>>
# Gera o Prisma Client antes do build do Next.js
RUN npx prisma generate

RUN npm run build

# Junta configs do Next (se existirem) para copiar de forma opcional no runtime
RUN mkdir -p /opt/runtime && \
  for f in next.config.js next.config.mjs next.config.cjs next.config.ts; do \
    if [ -f "$f" ]; then cp "$f" /opt/runtime/; fi; \
  done


# -------------------------------------------------
# 3) Runtime (somente produção)
# -------------------------------------------------
FROM node:20-bookworm-slim AS runner
WORKDIR /app

ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

# <<< CORREÇÃO PRISMA/OPENSSL >>>
# Instala a libssl para o runtime do Query Engine
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*

# Artefatos do build
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Configs opcionais do Next (não quebra se estiver vazio)
COPY --from=builder /opt/runtime/ ./

# node_modules SOMENTE de produção (resolvidos com legacy-peer-deps)
COPY --from=prod-deps /app/node_modules ./node_modules

EXPOSE 3000

# Usa o bin do Next do node_modules
CMD ["node", "node_modules/next/dist/bin/next", "start", "-p", "3000"]