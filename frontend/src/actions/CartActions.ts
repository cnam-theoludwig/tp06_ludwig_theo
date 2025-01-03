import type { Product } from "@repo/shared/Product"
import type { PickStrict } from "@repo/shared/utils"

export class CartAddProduct {
  public static readonly type = "[Cart] Add Product"

  public constructor(public product: Product) {}
}

export class CartRemoveProduct {
  public static readonly type = "[Cart] Remove Product"

  public constructor(public product: PickStrict<Product, "id">) {}
}

export class CartEditProductQuantity {
  public static readonly type = "[Cart] Edit Product Quantity"

  public constructor(
    public product: PickStrict<Product, "id">,
    public quantity: number,
  ) {}
}
