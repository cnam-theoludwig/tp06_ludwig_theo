import type { FastifyPluginAsync } from "fastify"
import { authPlugin } from "../../plugins/auth.ts"

export const getAuthenticatedCustomer: FastifyPluginAsync = async (fastify) => {
  await fastify.register(authPlugin)

  fastify.route({
    method: "GET",
    url: "/customer",
    handler: async (request) => {
      return request.auth
    },
  })
}
