import { Injectable } from "@angular/core"
import { Action, createSelector, Selector, State } from "@ngxs/store"
import type { StateContext } from "@ngxs/store"
import {
  CartAddProduct,
  CartEditProductQuantity,
  CartRemoveProduct,
} from "../actions/CartActions"
import type { Product, ProductWithQuantity } from "@repo/shared/Product"
import type { Cart } from "@repo/shared/Cart"
import type { PickStrict } from "@repo/shared/utils"

@State<Cart>({
  name: "cart",
  defaults: {
    products: [],
  },
})
@Injectable()
export class CartState {
  @Selector()
  public static getProductsCount(state: Cart): number {
    return state.products.reduce((total, product) => {
      return total + product.quantity
    }, 0)
  }

  @Selector()
  public static getTotalPriceCents(state: Cart): number {
    return state.products.reduce((total, product) => {
      return total + product.priceCents * product.quantity
    }, 0)
  }

  @Selector()
  public static getProducts(state: Cart): ProductWithQuantity[] {
    return state.products
  }

  @Selector()
  public static getProductQuantity(
    product: PickStrict<Product, "id">,
  ): ({ cart }: { cart: Cart }) => number {
    return createSelector([CartState], ({ cart }: { cart: Cart }) => {
      const productInCart = cart.products.find((current) => {
        return current.id === product.id
      })
      return productInCart?.quantity ?? 0
    })
  }

  @Action(CartAddProduct)
  public addProduct(
    { getState, patchState }: StateContext<Cart>,
    { product }: CartAddProduct,
  ): void {
    const state = getState()
    const newState = { products: [...state.products] }
    const productInCartIndex = newState.products.findIndex((current) => {
      return current.id === product.id
    })
    const productInCart = newState.products[productInCartIndex]
    if (productInCart != null) {
      productInCart.quantity += 1
    } else {
      newState.products.push({ ...product, quantity: 1 })
    }
    patchState(newState)
  }

  @Action(CartRemoveProduct)
  public removeProduct(
    { getState, patchState }: StateContext<Cart>,
    { product }: CartRemoveProduct,
  ): void {
    const state = getState()
    const newState = { products: [...state.products] }
    const productInCartIndex = newState.products.findIndex((current) => {
      return current.id === product.id
    })
    const productInCart = newState.products[productInCartIndex]
    if (productInCart == null) {
      return
    }
    if (productInCart.quantity > 1) {
      productInCart.quantity -= 1
    } else {
      newState.products.splice(productInCartIndex, 1)
    }
    patchState(newState)
  }

  @Action(CartEditProductQuantity)
  public editProductQuantity(
    { getState, patchState }: StateContext<Cart>,
    { product, quantity }: CartEditProductQuantity,
  ): void {
    const state = getState()
    const newState = { products: [...state.products] }
    const productInCartIndex = newState.products.findIndex((current) => {
      return current.id === product.id
    })
    const productInCart = newState.products[productInCartIndex]
    if (productInCart == null) {
      return
    }
    productInCart.quantity = quantity
    if (productInCart.quantity <= 0) {
      newState.products.splice(productInCartIndex, 1)
    }
    patchState(newState)
  }
}
