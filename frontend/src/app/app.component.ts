import { Component } from "@angular/core"
import { FooterComponent } from "../components/footer/footer.component"
import { HeaderComponent } from "../components/header/header.component"
import { RouterOutlet } from "@angular/router"
import { CustomerService } from "../services/customer.service"

@Component({
  selector: "app-root",
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: "./app.component.html",
  styleUrl: "./app.component.css",
})
export class AppComponent {
  public constructor(private readonly customerService: CustomerService) {
    this.customerService.getAuthCurrent()
  }
}
