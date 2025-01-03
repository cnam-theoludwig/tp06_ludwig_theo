import type { Routes } from "@angular/router"
import { HomePageComponent } from "../pages/home-page/home-page.component"

export const routes: Routes = [
  {
    path: "",
    component: HomePageComponent,
  },
  {
    path: "cart",
    loadComponent: async () => {
      const { CartPageComponent } = await import(
        "../pages/cart-page/cart-page.component"
      )
      return CartPageComponent
    },
  },
  {
    path: "sign-up",
    loadComponent: async () => {
      const { CustomerSignUpPageComponent } = await import(
        "../pages/customer-sign-up-page/customer-sign-up-page.component"
      )
      return CustomerSignUpPageComponent
    },
  },
  {
    path: "sign-in",
    loadComponent: async () => {
      const { CustomerSignInPageComponent } = await import(
        "../pages/customer-sign-in-page/customer-sign-in-page.component"
      )
      return CustomerSignInPageComponent
    },
  },
  {
    path: "customer",
    loadComponent: async () => {
      const { CustomerPageComponent } = await import(
        "../pages/customer-page/customer-page.component"
      )
      return CustomerPageComponent
    },
  },
  {
    path: "**",
    loadComponent: async () => {
      const { NotFoundPageComponent } = await import(
        "../pages/not-found-page/not-found-page.component"
      )
      return NotFoundPageComponent
    },
  },
]
