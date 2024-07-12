FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN npx pnpm install

COPY src/ ./src/
COPY public ./public/
COPY components ./components/
COPY tsconfig.json .
COPY next.config.mjs .

RUN npx pnpm build

EXPOSE 6550

CMD ["npx", "pnpm", "start"]