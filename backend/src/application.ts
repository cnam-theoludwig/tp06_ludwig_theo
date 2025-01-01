import fastifyCors from "@fastify/cors"
import fastifyHelmet from "@fastify/helmet"
import fastifySensible from "@fastify/sensible"
import fastify from "fastify"

export const application = fastify()

await application.register(fastifyCors)
await application.register(fastifySensible)
await application.register(fastifyHelmet, {
  crossOriginResourcePolicy: {
    policy: "cross-origin",
  },
})

await application.register(
  (await import("./services/products/get.ts")).getProducts,
)
await application.register(
  (await import("./services/categories/get.ts")).getCategories,
)
