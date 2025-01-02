import type { ApplicationConfig } from "@angular/core"
import { importProvidersFrom, provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from "@angular/router"

import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from "@angular/common/http"
import { NgxsModule } from "@ngxs/store"
import { ApiHttpAuthInterceptor } from "../services/auth.interceptor"
import { CartState } from "../states/CartState"
import { routes } from "./app.routes"

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([CartState])),
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiHttpAuthInterceptor,
      multi: true,
    },
  ],
}
