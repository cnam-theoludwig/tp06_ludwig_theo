import type { AuthJWT, AuthState } from "@repo/shared/Customer"
import {
  AUTH_ACCESS_TOKEN_MAX_AGE_SECONDS,
  CustomerSignInZodObject,
} from "@repo/shared/Customer"
import type { FastifyPluginAsync } from "fastify"
import jwt from "jsonwebtoken"
import { AUTH_JWT_SECRET } from "../../../configuration.ts"
import { database } from "../../../database/database.ts"
import bcrypt from "bcryptjs"

export const postCustomerSignIn: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/customer/sign-in",
    handler: async (request) => {
      const input = await CustomerSignInZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
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
          "password",
        ])
        .where("email", "=", input.data.email)
        .executeTakeFirst()
      if (customer == null) {
        throw fastify.httpErrors.createError(
          401,
          "Invalid `email` or `password`.",
        )
      }
      const isCorrectPassword = await bcrypt.compare(
        input.data.password,
        customer.password,
      )
      if (!isCorrectPassword) {
        throw fastify.httpErrors.createError(
          401,
          "Invalid `email` or `password`.",
        )
      }

      const authJWT: AuthJWT = {
        customerId: customer.id,
      }
      const accessToken = jwt.sign(authJWT, AUTH_JWT_SECRET, {
        expiresIn: AUTH_ACCESS_TOKEN_MAX_AGE_SECONDS,
      })
      const authState: AuthState = {
        authJWT,
        accessToken,
        customer,
      }
      return authState
    },
  })
}
