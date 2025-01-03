import type { OnInit } from "@angular/core"
import { Component } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Router, RouterLink } from "@angular/router"
import type { CustomerSignIn } from "@repo/shared/Customer"
import { CustomerZod } from "@repo/shared/Customer"
import type { Status } from "@repo/shared/utils"
import { SpinnerComponent } from "../../components/spinner/spinner.component"
import { ButtonDirective } from "../../directives/button/button.directive"
import { InputDirective } from "../../directives/input/input.directive"
import { LabelDirective } from "../../directives/label/label.directive"
import { CustomerService } from "../../services/customer.service"
import { zodValidator } from "../../utils/forms"
import type { FormGroupFromType } from "../../utils/forms"

@Component({
  selector: "app-customer-sign-in-page",
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    LabelDirective,
    ReactiveFormsModule,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: "./customer-sign-in-page.component.html",
  styleUrl: "./customer-sign-in-page.component.css",
})
export class CustomerSignInPageComponent implements OnInit {
  public constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {
    this.customerForm = new FormGroup({
      email: new FormControl("", zodValidator(CustomerZod.email)),
      password: new FormControl("", zodValidator(CustomerZod.password)),
    })
  }

  public customerForm: FormGroup<FormGroupFromType<CustomerSignIn>>

  public status: Status = "idle"

  public ngOnInit(): void {
    this.customerForm.valueChanges.subscribe({
      next: () => {
        if (!this.customerForm.valid) {
          this.status = "idle"
        }
      },
    })
  }

  public onSubmit(): void {
    if (!this.customerForm.valid) {
      return
    }
    this.status = "pending"
    const customer = this.customerForm.value as CustomerSignIn
    this.customerService.signIn(customer).subscribe({
      next: async () => {
        this.customerForm.reset()
        await this.router.navigate(["/"])
        this.status = "success"
      },
      error: () => {
        this.status = "error"
      },
    })
  }
}
