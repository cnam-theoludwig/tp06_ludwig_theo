import { AsyncPipe } from "@angular/common"
import { Component, EventEmitter, Input, Output } from "@angular/core"
import type { OnInit } from "@angular/core"
import { FormsModule } from "@angular/forms"
import { Observable } from "rxjs"
import type { Category } from "@repo/shared/Category"
import { ProductsCatalogService } from "../../services/products-catalog.service"
import { SelectDirective } from "../../directives/select/select.directive"

@Component({
  selector: "app-select-category",
  standalone: true,
  imports: [FormsModule, AsyncPipe, SelectDirective],
  templateUrl: "./select-category.component.html",
  styleUrl: "./select-category.component.css",
})
export class SelectCategoryComponent implements OnInit {
  public categories$!: Observable<Category[]>

  public constructor(private readonly apiService: ProductsCatalogService) {}

  public ngOnInit(): void {
    this.categories$ = this.apiService.getCategories()
  }

  @Input()
  public categoryId: string = "all"

  @Output()
  public selectCategory = new EventEmitter<string>()

  public handleCategoryChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement
    this.selectCategory.emit(selectElement.value)
  }
}
