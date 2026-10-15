# syntax=docker/dockerfile:1
FROM node:22-alpine AS build

ARG APP_ENV=production
ENV NODE_ENV=${APP_ENV}
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .
RUN npm run build

FROM node:22-alpine
LABEL org.opencontainers.image.title="zevora-samples"
EXPOSE 3000
HEALTHCHECK CMD wget -qO- http://localhost:3000/health || exit 1
USER node
CMD ["node", "dist/server.js"]
