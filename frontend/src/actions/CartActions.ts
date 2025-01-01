import type { Product } from "@repo/shared/models"

export class CartAddProduct {
  public static readonly type = "[Cart] Add Product"

  public constructor(public product: Product) {}
}

export class CartRemoveProduct {
  public static readonly type = "[Cart] Remove Product"

  public constructor(public product: Pick<Product, "id">) {}
}

export class CartEditProductQuantity {
  public static readonly type = "[Cart] Edit Product Quantity"

  public constructor(
    public product: Pick<Product, "id">,
    public quantity: number,
  ) {}
}
