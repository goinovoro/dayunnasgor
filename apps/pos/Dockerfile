FROM node:20-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build -- --filter=pos

FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/apps/pos/.next/standalone ./
COPY --from=builder /app/apps/pos/.next/static ./apps/pos/.next/static
COPY --from=builder /app/apps/pos/public ./apps/pos/public
EXPOSE 3000
CMD ["node", "apps/pos/server.js"]
