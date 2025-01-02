import { AsyncPipe, CurrencyPipe } from "@angular/common"
import { Component, Input } from "@angular/core"
import type { OnInit } from "@angular/core"
import { Store } from "@ngxs/store"
import { Observable } from "rxjs"
import { CartAddProduct } from "../../actions/CartActions"
import { ButtonDirective } from "../../directives/button/button.directive"
import type { Product } from "@repo/shared/Product"
import { CartState } from "../../states/CartState"

@Component({
  selector: "app-product-card",
  standalone: true,
  imports: [CurrencyPipe, ButtonDirective, AsyncPipe],
  templateUrl: "./product-card.component.html",
  styleUrl: "./product-card.component.css",
})
export class ProductCardComponent implements OnInit {
  @Input()
  public product!: Product

  public productQuantity$!: Observable<number>

  public ngOnInit(): void {
    this.productQuantity$ = this.store.select(
      CartState.getProductQuantity({ id: this.product.id }),
    )
  }

  public constructor(private readonly store: Store) {}

  public addToCart(): void {
    this.store.dispatch(new CartAddProduct(this.product))
  }
}
