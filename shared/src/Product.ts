import type { Category } from "./Category"
import type { Entity } from "./Entity"

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
