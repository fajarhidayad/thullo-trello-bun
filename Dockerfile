FROM oven/bun:alpine

WORKDIR /usr/src/app
COPY package.json bun.lockb ./
RUN apk add gcc
RUN bun install

COPY . .

RUN bun db:migrate

EXPOSE 1234

CMD ["bun", "run", "./src/index.ts"]