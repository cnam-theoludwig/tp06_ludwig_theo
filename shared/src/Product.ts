export interface Product {
  id: number
  title: string
  description: string
  priceCents: number
  imageURL: string
  categoryId: number
}

export interface ProductWithQuantity extends Product {
  quantity: number
}
