import { Component, Input } from "@angular/core"
import type { Product } from "@repo/shared/Product"
import { ProductCardComponent } from "../product-card/product-card.component"
import { CommonModule } from "@angular/common"

@Component({
  selector: "app-product-list",
  standalone: true,
  imports: [ProductCardComponent, CommonModule],
  templateUrl: "./product-list.component.html",
  styleUrl: "./product-list.component.css",
})
export class ProductListComponent {
  @Input()
  public products!: Product[]
}
