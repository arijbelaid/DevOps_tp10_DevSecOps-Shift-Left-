# ⚠️ TP10 : Dockerfile partiellement corrigé (secret retiré pour la Partie 1).
FROM node:14
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
