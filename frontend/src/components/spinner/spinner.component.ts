import { Component, Input } from "@angular/core"

@Component({
  selector: "app-spinner",
  standalone: true,
  templateUrl: "./spinner.component.html",
  styleUrls: ["./spinner.component.css"],
})
export class SpinnerComponent {
  @Input()
  public size: number = 50

  @Input()
  public className: string = ""

  public get classNames(): string {
    return `spinner ${this.className}`
  }
}
