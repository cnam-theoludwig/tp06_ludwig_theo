import { CustomerSignUpZodObject } from "@repo/shared/Customer"
import type { FastifyPluginAsync } from "fastify"

export const postCustomerSignUp: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/customer/sign-up",
    handler: async (request, response) => {
      const input = await CustomerSignUpZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
      }
      response.statusCode = 201
      return { isSuccess: true }
    },
  })
}
