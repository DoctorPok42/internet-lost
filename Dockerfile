FROM node:alpine

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY package*.json ./

RUN npm install

COPY src/ ./src/
COPY public ./public/
COPY tsconfig.json .
COPY next.config.mjs .
COPY tailwind.config.ts .
COPY postcss.config.mjs .

RUN npm run build

EXPOSE 6550

CMD ["npm", "run", "start"]
