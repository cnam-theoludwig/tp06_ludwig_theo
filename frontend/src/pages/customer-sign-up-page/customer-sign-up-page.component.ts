import type { OnInit } from "@angular/core"
import { Component, signal } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { RouterLink } from "@angular/router"
import type { CustomerSignUp } from "@repo/shared/Customer"
import { CustomerZod } from "@repo/shared/Customer"
import { ButtonDirective } from "../../directives/button/button.directive"
import { InputDirective } from "../../directives/input/input.directive"
import { LabelDirective } from "../../directives/label/label.directive"
import { SelectDirective } from "../../directives/select/select.directive"
import { CustomerService } from "../../services/customer.service"
import { zodValidator } from "../../utils/zodValidator"

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
  ],
  templateUrl: "./customer-sign-up-page.component.html",
  styleUrl: "./customer-sign-up-page.component.css",
})
export class CustomerSignUpPageComponent implements OnInit {
  public constructor(private readonly customerService: CustomerService) {}

  private readonly initialGender = "man"

  public customerForm = new FormGroup({
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

  private readonly _isSuccess = signal(true)
  public get isSuccess(): boolean {
    return this._isSuccess()
  }

  private readonly _isValidPasswordConfirm = signal(true)
  public get isValidPasswordConfirm(): boolean {
    return this._isValidPasswordConfirm()
  }

  public ngOnInit(): void {
    this.customerForm.valueChanges.subscribe(() => {
      const { password, passwordConfirmation } = this.customerForm.value
      this._isValidPasswordConfirm.set(password === passwordConfirmation)
      this._isSuccess.set(this.customerForm.valid)
    })
  }

  public onSubmit(): void {
    if (!this.customerForm.valid || !this.isValidPasswordConfirm) {
      return
    }

    const customer = this.customerForm.value as CustomerSignUp
    this.customerService.signUp(customer).subscribe(() => {
      this.customerForm.reset()
      this.customerForm.controls.gender.setValue(this.initialGender)
      this._isSuccess.set(true)
    })
  }
}
