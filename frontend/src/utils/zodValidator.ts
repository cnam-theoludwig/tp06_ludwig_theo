import type { ZodType } from "zod"
import type { ValidatorFn } from "@angular/forms"

export const zodValidator = (schema: ZodType): ValidatorFn => {
  return (control) => {
    return schema.safeParse(control.value).success ? null : { invalid: true }
  }
}
