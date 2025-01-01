import { Component } from "@angular/core"
import { RouterLink } from "@angular/router"

@Component({
  selector: "app-cart-empty",
  standalone: true,
  imports: [RouterLink],
  templateUrl: "./cart-empty.component.html",
  styleUrl: "./cart-empty.component.css",
})
export class CartEmptyComponent {}
