import type { ApplicationConfig } from "@angular/core"
import { importProvidersFrom, provideZoneChangeDetection } from "@angular/core"
import { provideRouter } from "@angular/router"

import { provideHttpClient } from "@angular/common/http"
import { routes } from "./app.routes"
import { NgxsModule } from "@ngxs/store"
import { CartState } from "../states/CartState"

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    importProvidersFrom(NgxsModule.forRoot([CartState])),
    provideHttpClient(),
  ],
}
