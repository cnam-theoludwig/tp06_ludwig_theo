import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { map, Observable } from "rxjs"
import { environment } from "../environments/environment"
import type { Product, Category } from "@repo/shared/models"

interface GetProductsInput {
  search?: string
  categoryId?: number
}

@Injectable({
  providedIn: "root",
})
export class ApiService {
  public constructor(private readonly http: HttpClient) {}

  public getProducts(input: GetProductsInput = {}): Observable<Product[]> {
    const { search = "", categoryId } = input
    return this.http.get<Product[]>(environment.apiURLProducts).pipe(
      map((products) => {
        return products.filter((product) => {
          const matchesSearch = product.title
            .toLowerCase()
            .includes(search.toLowerCase())
          const matchesCategory =
            categoryId == null || product.categoryId === categoryId
          return matchesSearch && matchesCategory
        })
      }),
    )
  }

  public getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.apiURLCategories)
  }
}
