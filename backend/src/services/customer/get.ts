import type { FastifyPluginAsync } from "fastify"
import { authPlugin } from "../../plugins/auth.ts"
import { database } from "../../database/database.ts"
import type { AuthState } from "@repo/shared/Customer"

export const getAuthenticatedCustomer: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authPlugin)

  fastify.route({
    method: "GET",
    url: "/customer",
    handler: async (request) => {
      if (request.auth == null) {
        throw fastify.httpErrors.unauthorized()
      }
      const customer = await database
        .selectFrom("Customer")
        .select([
          "id",
          "firstName",
          "lastName",
          "gender",
          "email",
          "address",
          "zipCode",
          "city",
          "phone",
        ])
        .where("id", "=", request.auth.authJWT.customerId)
        .executeTakeFirst()
      if (customer == null) {
        throw fastify.httpErrors.notFound()
      }
      const authState: AuthState = {
        ...request.auth,
        customer,
      }
      return authState
    },
  })
}
