FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json* ./
COPY scripts ./scripts
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/src/db ./src/db
COPY --from=builder /app/scripts ./scripts
COPY --from=builder /app/package-lock.json ./package-lock.json

RUN npm ci --omit=dev
RUN npm install -g tsx

EXPOSE 3000
CMD ["sh", "-c", "tsx src/db/migrate.ts && node server.js"]
