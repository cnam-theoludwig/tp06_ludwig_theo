import type {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
} from "@angular/common/http"
import { HttpHeaders, HttpRequest } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { AUTH_TOKEN_HEADER, AUTH_TOKEN_TYPE } from "@repo/shared/Customer"
import { catchError, Observable } from "rxjs"
import { CustomerService } from "./customer.service"

@Injectable()
export class ApiHttpAuthInterceptor implements HttpInterceptor {
  public constructor(private readonly customerService: CustomerService) {}

  public intercept(
    request: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const token = this.customerService.accessTokenJWT
    if (token == null) {
      return next.handle(request)
    }
    const headers = new HttpHeaders({
      [AUTH_TOKEN_HEADER]: `${AUTH_TOKEN_TYPE} ${token}`,
    })
    const newRequest = request.clone({
      headers,
    })
    return next.handle(newRequest).pipe(
      catchError((error) => {
        if (error?.status === 401) {
          this.customerService.signOut()
        }
        throw error
      }),
    )
  }
}
