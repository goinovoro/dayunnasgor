FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --filter=kds

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/kds/.next/standalone ./
COPY --from=builder /app/apps/kds/.next/static ./apps/kds/.next/static
COPY --from=builder /app/apps/kds/public ./apps/kds/public
EXPOSE 3000
CMD ["node", "apps/kds/server.js"]
