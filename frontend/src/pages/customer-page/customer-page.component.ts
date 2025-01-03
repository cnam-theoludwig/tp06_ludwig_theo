import { Component, effect } from "@angular/core"
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms"
import { Router } from "@angular/router"
import type { CustomerUpdate } from "@repo/shared/Customer"
import { CustomerZod } from "@repo/shared/Customer"
import type { Status } from "@repo/shared/utils"
import { SpinnerComponent } from "../../components/spinner/spinner.component"
import { ButtonDirective } from "../../directives/button/button.directive"
import { InputDirective } from "../../directives/input/input.directive"
import { LabelDirective } from "../../directives/label/label.directive"
import { SelectDirective } from "../../directives/select/select.directive"
import { CustomerService } from "../../services/customer.service"
import type { FormGroupFromType } from "../../utils/forms"
import { zodValidator } from "../../utils/forms"

@Component({
  selector: "app-customer-page",
  standalone: true,
  imports: [
    ButtonDirective,
    InputDirective,
    LabelDirective,
    SelectDirective,
    ReactiveFormsModule,
    SpinnerComponent,
  ],
  templateUrl: "./customer-page.component.html",
  styleUrl: "./customer-page.component.css",
})
export class CustomerPageComponent {
  public constructor(
    private readonly customerService: CustomerService,
    private readonly router: Router,
  ) {
    this.initalizeForm(this.customer)

    effect(() => {
      this.initalizeForm(this.customer)
    })
  }

  private initalizeForm(customer: CustomerUpdate | null): void {
    this.customerForm = new FormGroup({
      firstName: new FormControl(
        customer?.firstName ?? "",
        zodValidator(CustomerZod.firstName),
      ),
      lastName: new FormControl(
        customer?.lastName ?? "",
        zodValidator(CustomerZod.lastName),
      ),
      address: new FormControl(
        customer?.address ?? "",
        zodValidator(CustomerZod.address),
      ),
      zipCode: new FormControl(
        customer?.zipCode ?? "",
        zodValidator(CustomerZod.zipCode),
      ),
      city: new FormControl(
        customer?.city ?? "",
        zodValidator(CustomerZod.city),
      ),
      phone: new FormControl(
        customer?.phone ?? "",
        zodValidator(CustomerZod.phone),
      ),
      gender: new FormControl(
        customer?.gender ?? "man",
        zodValidator(CustomerZod.gender),
      ),
    })
  }

  public customerForm!: FormGroup<FormGroupFromType<CustomerUpdate>>

  public get customer(): CustomerService["customer"] {
    return this.customerService.customer
  }

  public get isLoadingAuthCurrent(): CustomerService["isLoadingAuthCurrent"] {
    return this.customerService.isLoadingAuthCurrent
  }

  public status: Status = "idle"

  public onSubmit(): void {
    if (!this.customerForm.valid) {
      return
    }
    this.status = "pending"
    const customer = this.customerForm.value as CustomerUpdate
    this.customerService.update(customer).subscribe({
      next: () => {
        this.customerForm.reset(customer)
        this.initalizeForm(customer)
        this.status = "success"
      },
      error: () => {
        this.status = "error"
      },
    })
  }

  public async handleSignOut(): Promise<void> {
    this.customerService.signOut()
    await this.router.navigate(["/"])
  }
}
