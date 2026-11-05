# Étape 1 : Build
FROM node:24-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

# Étape 2 : Image finale
FROM node:24-alpine
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/src ./src
USER node
EXPOSE 3000
CMD ["npm", "start"]
