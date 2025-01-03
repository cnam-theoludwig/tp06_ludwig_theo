import { Component } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import { CustomerZod } from "@repo/shared/Customer"
import type { CustomerSignIn } from "@repo/shared/Customer"
import { ButtonDirective } from "../../directives/button/button.directive"
import { InputDirective } from "../../directives/input/input.directive"
import { LabelDirective } from "../../directives/label/label.directive"
import { CustomerService } from "../../services/customer.service"
import { zodValidator } from "../../utils/zodValidator"

@Component({
  selector: "app-customer-sign-in-page",
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    LabelDirective,
    ReactiveFormsModule,
    RouterLink,
  ],
  templateUrl: "./customer-sign-in-page.component.html",
  styleUrl: "./customer-sign-in-page.component.css",
})
export class CustomerSignInPageComponent {
  public constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {}

  public customerForm = new FormGroup({
    email: new FormControl("", zodValidator(CustomerZod.email)),
    password: new FormControl("", zodValidator(CustomerZod.password)),
  })

  public onSubmit(): void {
    if (!this.customerForm.valid) {
      return
    }
    const customer = this.customerForm.value as CustomerSignIn
    this.customerService.signIn(customer).subscribe(async () => {
      this.customerForm.reset()
      await this.router.navigate(["/"])
    })
  }
}
