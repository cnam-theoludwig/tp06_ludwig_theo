import type { FastifyPluginAsync } from "fastify"
import type { Category } from "@repo/shared/Category"

export const getCategories: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/categories",
    handler: async () => {
      const categories: Category[] = [
        { id: 1, title: "Cocktail" },
        { id: 2, title: "Smoothie" },
        { id: 3, title: "Thé" },
        { id: 4, title: "Café" },
      ]
      return categories
    },
  })
}
