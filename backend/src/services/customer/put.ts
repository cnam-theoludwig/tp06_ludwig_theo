import type { AuthState } from "@repo/shared/Customer"
import { CustomerUpdateZodObject } from "@repo/shared/Customer"
import type { FastifyPluginAsync } from "fastify"
import { database } from "../../database/database.ts"
import { authPlugin } from "../../plugins/auth.ts"

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

      const result: AuthState["customer"] = await database
        .updateTable("Customer")
        .set(input.data)
        .where("id", "=", request.auth.authJWT.customerId)
        .returning([
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
        .executeTakeFirstOrThrow()
      return result
    },
  })
}
