import { AsyncPipe } from "@angular/common"
import { Component, inject } from "@angular/core"
import { RouterLink } from "@angular/router"
import { Store } from "@ngxs/store"
import {
  LucideAngularModule,
  ShoppingCart as ShoppingCartIcon,
  User as UserIcon,
} from "lucide-angular"
import { Observable } from "rxjs"
import { CustomerService } from "../../services/customer.service"
import { CartState } from "../../states/CartState"

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, AsyncPipe, LucideAngularModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  public UserIcon = UserIcon
  public ShoppingCartIcon = ShoppingCartIcon

  public constructor(private readonly customerService: CustomerService) {}

  public productsCount$: Observable<number> = inject(Store).select(
    CartState.getProductsCount,
  )

  public get customer(): CustomerService["customer"] | null {
    return this.customerService.customer
  }

  public get isLoadingAuthCurrent(): CustomerService["isLoadingAuthCurrent"] {
    return this.customerService.isLoadingAuthCurrent
  }
}
