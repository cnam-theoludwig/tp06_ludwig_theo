import type { FastifyPluginAsync } from "fastify"
import { GetProductsInputZodObject } from "@repo/shared/Product"
import type { Product } from "@repo/shared/Product"
import { database } from "../../database/database.ts"
import { searchStringExpression } from "../../database/utils.ts"

export const getProducts: FastifyPluginAsync = async (fastify) => {
  fastify.route({
    method: "GET",
    url: "/products",
    handler: async (request) => {
      const input = await GetProductsInputZodObject.safeParseAsync(
        request.query,
      )
      if (input.error != null) {
        throw fastify.httpErrors.createError(400, input.error)
      }

      let productsQuery = database
        .selectFrom("Product")
        .select([
          "id",
          "title",
          "description",
          "priceCents",
          "imageURL",
          "categoryId",
        ])
        .orderBy("id", "asc")

      if (input.data.search != null) {
        productsQuery = productsQuery.where(
          searchStringExpression<"Product">({
            query: input.data.search,
            column: "title",
          }),
        )
      }

      if (input.data.categoryId != null) {
        productsQuery = productsQuery.where(
          "categoryId",
          "=",
          input.data.categoryId,
        )
      }

      const products: Product[] = await productsQuery.execute()
      return products
    },
  })
}
