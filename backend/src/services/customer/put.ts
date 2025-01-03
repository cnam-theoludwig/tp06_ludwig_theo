import type { FastifyPluginAsync } from "fastify"
import { authPlugin } from "../../plugins/auth.ts"
import { CustomerUpdateZodObject } from "@repo/shared/Customer"
import { database } from "../../database/database.ts"

export const putCustomerUpdate: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authPlugin)

  fastify.route({
    method: "PUT",
    url: "/customer",
    handler: async (request) => {
      if (request.auth == null) {
        throw fastify.httpErrors.unauthorized()
      }
      const input = await CustomerUpdateZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
      }
      await database
        .updateTable("Customer")
        .set(input.data)
        .where("id", "=", request.auth.authJWT.customerId)
        .executeTakeFirstOrThrow()
      return { isSuccess: true }
    },
  })
}
