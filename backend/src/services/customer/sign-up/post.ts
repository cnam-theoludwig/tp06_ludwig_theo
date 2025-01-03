import { CustomerSignUpZodObject } from "@repo/shared/Customer"
import type { FastifyPluginAsync } from "fastify"
import bcrypt from "bcryptjs"
import { database } from "../../../database/database.ts"

export const postCustomerSignUp: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/customer/sign-up",
    handler: async (request, response) => {
      const input = await CustomerSignUpZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
      }

      const emailValidation = await database
        .selectFrom("Customer")
        .select("email")
        .where("email", "=", input.data.email)
        .executeTakeFirst()
      if (emailValidation != null) {
        throw fastify.httpErrors.createError(400, "`email` already taken.")
      }

      const passwordHashed = await bcrypt.hash(input.data.password, 12)
      await database
        .insertInto("Customer")
        .values({
          ...input.data,
          password: passwordHashed,
        })
        .executeTakeFirstOrThrow()

      response.statusCode = 201
      return { isSuccess: true }
    },
  })
}
