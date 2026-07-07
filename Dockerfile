# ── Build stage ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies (scripts must run — esbuild needs its postinstall)
COPY package*.json ./
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build

# ── Runtime stage ─────────────────────────────────────────────────────────────
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy only the built output and runtime deps
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/*.json ./
RUN npm ci --omit=dev

EXPOSE 3000

# TanStack Start builds to dist/server/server.js (Nitro/h3 server)
CMD ["node", "dist/server/server.js"]
