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
    path: "**",
    loadComponent: async () => {
      const { NotFoundPageComponent } = await import(
        "../pages/not-found-page/not-found-page.component"
      )
      return NotFoundPageComponent
    },
  },
]
