import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import type { Category } from "@repo/shared/Category"
import type { GetProductsInput, Product } from "@repo/shared/Product"
import { Observable } from "rxjs"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ProductsCatalogService {
  public constructor(private readonly http: HttpClient) {}

  public getProducts(input: GetProductsInput = {}): Observable<Product[]> {
    let { search, categoryId } = input
    if (search == null) {
      search = ""
    }
    return this.http.get<Product[]>(`${environment.apiBaseURL}/products`, {
      params: {
        ...(search.length > 0 ? { search } : {}),
        ...(categoryId != null ? { categoryId } : {}),
      },
    })
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${environment.apiBaseURL}/categories`)
  }
}
