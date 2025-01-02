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
  (await import("./services/categories/get.ts")).getCategories,
)

await application.register(
  (await import("./services/customer/sign-in/post.ts")).postCustomerSignIn,
)
await application.register(
  (await import("./services/customer/sign-up/post.ts")).postCustomerSignUp,
)
await application.register(
  (await import("./services/customer/get.ts")).getAuthenticatedCustomer,
)
await application.register(
  (await import("./services/customer/put.ts")).putCustomerUpdate,
)

await application.register(
  (await import("./services/products/get.ts")).getProducts,
)
