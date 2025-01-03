import { Injectable, signal } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { AUTH_TOKEN_NAME } from "@repo/shared/Customer"
import type {
  AuthState,
  Customer,
  CustomerSignIn,
  CustomerSignUp,
  CustomerUpdate,
} from "@repo/shared/Customer"
import { environment } from "../environments/environment"
import type { Observable } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  public constructor(private readonly http: HttpClient) {}

  private _accessTokenJWT: string | null = null
  private readonly _customer = signal<Customer | null>(null)
  private readonly _isLoadingAuthCurrent = signal<boolean>(true)

  /**
   * The current authenticated customer.
   *
   * If the customer is not authenticated, this will be `null`.
   */
  public get customer(): Customer | null {
    return this._customer()
  }

  public get isLoadingAuthCurrent(): boolean {
    return this._isLoadingAuthCurrent()
  }

  public get accessTokenJWT(): string | null {
    return this._accessTokenJWT
  }

  public signIn(input: CustomerSignIn): Observable<AuthState> {
    const observable = this.http.post<AuthState>(
      `${environment.apiBaseURL}/customer/sign-in`,
      input,
    )
    const subscription = observable.subscribe((authState) => {
      this._accessTokenJWT = authState.accessToken
      localStorage.setItem(AUTH_TOKEN_NAME, this._accessTokenJWT)
      this._customer.set(authState.customer)
      subscription.unsubscribe()
    })
    return observable
  }

  public signUp(input: CustomerSignUp): Observable<{ isSuccess: boolean }> {
    const observable = this.http.post<{ isSuccess: boolean }>(
      `${environment.apiBaseURL}/customer/sign-up`,
      input,
    )
    return observable
  }

  public update(input: CustomerUpdate): Observable<Customer> {
    const observable = this.http.put<Customer>(
      `${environment.apiBaseURL}/customer`,
      input,
    )
    const subscription = observable.subscribe((customer) => {
      this._customer.set(customer)
      subscription.unsubscribe()
    })
    return observable
  }

  public getAuthCurrent(): void {
    this._isLoadingAuthCurrent.set(true)
    this._accessTokenJWT = localStorage.getItem(AUTH_TOKEN_NAME)
    if (this._accessTokenJWT == null) {
      this._isLoadingAuthCurrent.set(false)
      return
    }
    const subscription = this.http
      .get<AuthState>(`${environment.apiBaseURL}/customer`)
      .subscribe((authState) => {
        this._accessTokenJWT = authState.accessToken
        this._customer.set(authState.customer)
        this._isLoadingAuthCurrent.set(false)
        subscription.unsubscribe()
      })
  }

  public signOut(): void {
    this._accessTokenJWT = null
    localStorage.removeItem(AUTH_TOKEN_NAME)
    this._customer.set(null)
  }
}