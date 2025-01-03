import { Component } from "@angular/core"
import { CustomerService } from "../../services/customer.service"
import { ButtonDirective } from "../../directives/button/button.directive"
import { Router } from "@angular/router"

@Component({
  selector: "app-customer-page",
  standalone: true,
  imports: [ButtonDirective],
  templateUrl: "./customer-page.component.html",
  styleUrl: "./customer-page.component.css",
})
export class CustomerPageComponent {
  public constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {}

  public get customer(): CustomerService["customer"] {
    return this.customerService.customer
  }

  public async handleSignOut(): Promise<void> {
    this.customerService.signOut()
    await this.router.navigate(["/"])
  }
}
