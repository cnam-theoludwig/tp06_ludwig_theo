FROM node:22.12.0-slim AS node-base
ENV TURBO_TELEMETRY_DISABLED=1
ENV DO_NOT_TRACK=1
WORKDIR /usr/src/app

FROM node-base AS builder
COPY ./ ./
RUN npm install --global turbo@2.3.3
RUN turbo prune @repo/backend --docker

FROM node-base AS installer
COPY .gitignore .gitignore
COPY --from=builder /usr/src/app/out/json/ ./
COPY --from=builder /usr/src/app/out/package-lock.json ./package-lock.json
RUN npm clean-install
COPY --from=builder /usr/src/app/out/full/ ./
COPY turbo.json turbo.json

FROM node-base AS runner
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 applicationrunner
USER applicationrunner
COPY --from=installer --chown=applicationrunner:nodejs /usr/src/app ./
WORKDIR /usr/src/app/backend
CMD ["node", "--import=tsx", "./src/server.ts"]
