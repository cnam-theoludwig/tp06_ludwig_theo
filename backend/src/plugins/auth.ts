import jwt from "jsonwebtoken"
import fastifyPlugin from "fastify-plugin"
import { AUTH_TOKEN_HEADER, AUTH_TOKEN_TYPE } from "@repo/shared/Customer"
import type { AuthJWT, AuthState } from "@repo/shared/Customer"
import { AUTH_JWT_SECRET } from "../configuration.ts"
import { httpErrors } from "@fastify/sensible"

declare module "fastify" {
  export interface FastifyRequest {
    auth?: AuthState
  }
}

export const authPlugin = fastifyPlugin(async (fastify) => {
  fastify.decorateRequest("auth", undefined)
  fastify.addHook("onRequest", async (request) => {
    const authorization = request.headers[AUTH_TOKEN_HEADER]
    if (typeof authorization !== "string") {
      throw httpErrors.unauthorized()
    }

    const [type, token] = authorization.split(" ")
    if (type !== AUTH_TOKEN_TYPE || token == null) {
      throw httpErrors.unauthorized()
    }

    try {
      const authJWT = jwt.verify(token, AUTH_JWT_SECRET) as unknown as AuthJWT
      request.auth = {
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
    } catch {
      throw httpErrors.unauthorized()
    }
  })
})
