import { Component, EventEmitter, Input, Output } from "@angular/core"
import { FormsModule } from "@angular/forms"

@Component({
  selector: "app-input-search",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./input-search.component.html",
  styleUrl: "./input-search.component.css",
})
export class InputSearchComponent {
  @Input()
  public placeholder: string = "Search..."

  @Input()
  public search: string = ""

  @Output()
  public changeSearch = new EventEmitter<string>()

  @Output()
  public handleClear = new EventEmitter<void>()

  public handleInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement
    this.changeSearch.emit(inputElement.value)
  }

  public clearSearch(): void {
    this.handleClear.emit()
    this.changeSearch.emit("")
  }
}
