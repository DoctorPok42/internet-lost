FROM node:alpine

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN npx pnpm install

COPY src/ ./src/
COPY public ./public/
COPY tsconfig.json .
COPY next.config.mjs .
COPY tailwind.config.js .

RUN npx pnpm build

EXPOSE 6550

CMD ["npx", "pnpm", "start"]