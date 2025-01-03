import type { OnInit } from "@angular/core"
import { Component } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"
import type { CustomerSignUp } from "@repo/shared/Customer"
import { CustomerZod } from "@repo/shared/Customer"
import type { Status } from "@repo/shared/utils"
import { SpinnerComponent } from "../../components/spinner/spinner.component"
import { ButtonDirective } from "../../directives/button/button.directive"
import { InputDirective } from "../../directives/input/input.directive"
import { LabelDirective } from "../../directives/label/label.directive"
import { SelectDirective } from "../../directives/select/select.directive"
import { CustomerService } from "../../services/customer.service"
import { zodValidator } from "../../utils/forms"
import type { FormGroupFromType } from "../../utils/forms"

@Component({
  selector: "app-customer-sign-up-page",
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    LabelDirective,
    SelectDirective,
    ReactiveFormsModule,
    RouterLink,
    SpinnerComponent,
  ],
  templateUrl: "./customer-sign-up-page.component.html",
  styleUrl: "./customer-sign-up-page.component.css",
})
export class CustomerSignUpPageComponent implements OnInit {
  public constructor(private readonly customerService: CustomerService) {
    this.customerForm = new FormGroup({
      firstName: new FormControl("", zodValidator(CustomerZod.firstName)),
      lastName: new FormControl("", zodValidator(CustomerZod.lastName)),
      address: new FormControl("", zodValidator(CustomerZod.address)),
      zipCode: new FormControl("", zodValidator(CustomerZod.zipCode)),
      city: new FormControl("", zodValidator(CustomerZod.city)),
      phone: new FormControl("", zodValidator(CustomerZod.phone)),
      gender: new FormControl(
        this.initialGender,
        zodValidator(CustomerZod.gender),
      ),
      email: new FormControl("", zodValidator(CustomerZod.email)),
      password: new FormControl("", zodValidator(CustomerZod.password)),
      passwordConfirmation: new FormControl(
        "",
        zodValidator(CustomerZod.password),
      ),
    })
  }

  private readonly initialGender: CustomerSignUp["gender"] = "man"

  public customerForm: FormGroup<
    FormGroupFromType<
      CustomerSignUp & {
        passwordConfirmation: CustomerSignUp["password"]
      }
    >
  >

  public status: Status = "idle"

  public isValidPasswordConfirm = true

  public ngOnInit(): void {
    this.customerForm.valueChanges.subscribe({
      next: () => {
        const { password, passwordConfirmation } = this.customerForm.value
        this.isValidPasswordConfirm = password === passwordConfirmation

        if (!this.customerForm.valid) {
          this.status = "idle"
        }
      },
    })
  }

  public onSubmit(): void {
    if (!this.customerForm.valid || !this.isValidPasswordConfirm) {
      return
    }
    this.status = "pending"
    const customer = this.customerForm.value as CustomerSignUp
    this.customerService.signUp(customer).subscribe({
      next: () => {
        this.customerForm.reset()
        this.customerForm.controls.gender.setValue(this.initialGender)
        this.status = "success"
      },
      error: () => {
        this.status = "error"
      },
    })
  }
}
