import { HttpClient } from "@angular/common/http"
import { Injectable, signal } from "@angular/core"
import type {
  AuthState,
  CustomerSignIn,
  CustomerSignUp,
  CustomerUpdate,
} from "@repo/shared/Customer"
import { AUTH_TOKEN_NAME } from "@repo/shared/Customer"
import type { Observable } from "rxjs"
import { environment } from "../environments/environment"

@Injectable({
  providedIn: "root",
})
export class CustomerService {
  public constructor(private readonly http: HttpClient) {}

  private _accessTokenJWT: string | null = null
  private readonly _customer = signal<AuthState["customer"] | null>(null)
  private readonly _isLoadingAuthCurrent = signal<boolean>(true)

  /**
   * The current authenticated customer.
   *
   * If the customer is not authenticated, this will be `null`.
   */
  public get customer(): AuthState["customer"] | null {
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
    const subscription = observable.subscribe({
      next: (authState) => {
        this._accessTokenJWT = authState.accessToken
        localStorage.setItem(AUTH_TOKEN_NAME, this._accessTokenJWT)
        this._customer.set(authState.customer)
      },
      complete: () => {
        subscription.unsubscribe()
      },
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

  public update(input: CustomerUpdate): Observable<AuthState["customer"]> {
    const observable = this.http.put<AuthState["customer"]>(
      `${environment.apiBaseURL}/customer`,
      input,
    )
    const subscription = observable.subscribe({
      next: (customer) => {
        this._customer.set(customer)
      },
      complete: () => {
        subscription.unsubscribe()
      },
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
      .subscribe({
        next: (authState) => {
          this._accessTokenJWT = authState.accessToken
          this._customer.set(authState.customer)
          this._isLoadingAuthCurrent.set(false)
        },
        complete: () => {
          subscription.unsubscribe()
        },
      })
  }

  public signOut(): void {
    this._accessTokenJWT = null
    localStorage.removeItem(AUTH_TOKEN_NAME)
    this._customer.set(null)
    this._isLoadingAuthCurrent.set(false)
  }
}
