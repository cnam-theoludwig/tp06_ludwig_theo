import type { FormControl, ValidatorFn } from "@angular/forms"
import type { ZodType } from "zod"

export const zodValidator = (schema: ZodType): ValidatorFn => {
  return (control) => {
    return schema.safeParse(control.value).success ? null : { invalid: true }
  }
}

export type FormGroupFromType<T> = {
  [K in keyof T]: FormControl<T[K] | null>
}
