import type { FastifyPluginAsync } from "fastify"
import { authPlugin } from "../../plugins/auth.ts"
import { CustomerUpdateZodObject } from "@repo/shared/Customer"

export const putCustomerUpdate: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authPlugin)

  fastify.route({
    method: "PUT",
    url: "/customer",
    handler: async (request) => {
      const input = await CustomerUpdateZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
      }
      return "OK"
    },
  })
}
