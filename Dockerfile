FROM node:22-slim AS builder

ENV CI=true

WORKDIR /app

COPY . /app

RUN corepack enable
RUN pnpm config get registry && pnpm -v
RUN pnpm install --frozen-lockfile --ignore-scripts --reporter=ndjson
RUN pnpm build

FROM scratch

COPY --from=builder /app/dist /