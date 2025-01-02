import type { AuthJWT, AuthState } from "@repo/shared/Customer"
import {
  AUTH_ACCESS_TOKEN_MAX_AGE_SECONDS,
  CustomerSignInZodObject,
} from "@repo/shared/Customer"
import type { FastifyPluginAsync } from "fastify"
import jwt from "jsonwebtoken"
import { AUTH_JWT_SECRET } from "../../../configuration.ts"

export const postCustomerSignIn: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "POST",
    url: "/customer/sign-in",
    handler: async (request) => {
      const input = await CustomerSignInZodObject.safeParseAsync(request.body)
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error.errors)
      }
      const authJWT: AuthJWT = {
        customerId: 1,
      }
      const token = jwt.sign(authJWT, AUTH_JWT_SECRET, {
        expiresIn: AUTH_ACCESS_TOKEN_MAX_AGE_SECONDS,
      })
      const authState: AuthState = {
        authJWT,
        accessToken: token,
        // TODO: Implement the logic to get the session from the database
        customer: {
          id: 1,
          firstName: "John",
          lastName: "Doe",
          address: "5 Rue d'Angular",
          zipCode: "12345",
          city: "Strasbourg",
          phone: "0712345678",
          gender: "man",
          email: "john@doe.com",
          password: "password",
        },
      }
      return authState
    },
  })
}
