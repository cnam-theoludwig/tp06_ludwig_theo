import { httpErrors } from "@fastify/sensible"
import type { AuthJWT, AuthState } from "@repo/shared/Customer"
import { AUTH_TOKEN_HEADER, AUTH_TOKEN_TYPE } from "@repo/shared/Customer"
import type { OmitStrict } from "@repo/shared/utils"
import fastifyPlugin from "fastify-plugin"
import jwt from "jsonwebtoken"
import { AUTH_JWT_SECRET } from "../configuration.ts"

declare module "fastify" {
  export interface FastifyRequest {
    auth?: OmitStrict<AuthState, "customer">
  }
}

export const authPlugin = fastifyPlugin(async (fastify) => {
  fastify.decorateRequest("auth", undefined)
  fastify.addHook("onRequest", async (request) => {
    const authorization = request.headers[AUTH_TOKEN_HEADER]
    if (typeof authorization !== "string") {
      throw httpErrors.unauthorized()
    }

    const [type, accessToken] = authorization.split(" ")
    if (type !== AUTH_TOKEN_TYPE || accessToken == null) {
      throw httpErrors.unauthorized()
    }

    try {
      const authJWT = jwt.verify(accessToken, AUTH_JWT_SECRET) as AuthJWT
      request.auth = {
        authJWT,
        accessToken,
      }
    } catch {
      throw httpErrors.unauthorized()
    }
  })
})
