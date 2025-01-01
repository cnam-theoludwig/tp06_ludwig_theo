import { Component, inject } from "@angular/core"
import { RouterLink } from "@angular/router"
import { Store } from "@ngxs/store"
import { Observable } from "rxjs"
import { CartState } from "../../states/CartState"
import { AsyncPipe } from "@angular/common"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, AsyncPipe],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  public productsCount$: Observable<number> = inject(Store).select(
    CartState.getProductsCount,
  )
}
