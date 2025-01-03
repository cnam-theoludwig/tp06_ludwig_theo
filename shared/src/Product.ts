import { z } from "zod"
import type { Category } from "./Category"
import type { Entity } from "./Entity"
import { SearchQueryZod } from "./Entity"

export interface Product {
  id: Entity["id"]
  title: string
  description: string
  priceCents: number
  imageURL: string
  categoryId: Category["id"]
}

export interface ProductWithQuantity extends Product {
  quantity: number
}

export const GetProductsInputZod = {
  search: SearchQueryZod,
  categoryId: z.coerce.number().int().positive().nullish(),
}
export const GetProductsInputZodObject = z.object(GetProductsInputZod)
export type GetProductsInput = z.infer<typeof GetProductsInputZodObject>
