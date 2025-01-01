import ProductMockJSON from "../../public/mocks/products.json"
import type { Product } from "@repo/shared/models"

export interface ProductWithQuantity extends Product {
  quantity: number
}

export const PRODUCTS_MOCK = ProductMockJSON as Product[]
export const PRODUCT_MOCK = PRODUCTS_MOCK[0] as Product
