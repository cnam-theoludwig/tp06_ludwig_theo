import type { FastifyPluginAsync } from "fastify"
import type { Category } from "@repo/shared/Category"
import { database } from "../../database/database.ts"

export const getCategories: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/categories",
    handler: async () => {
      const categories: Category[] = await database
        .selectFrom("Category")
        .select(["id", "title"])
        .orderBy("id", "asc")
        .execute()
      return categories
    },
  })
}
