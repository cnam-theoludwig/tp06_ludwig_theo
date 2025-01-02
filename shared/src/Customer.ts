import { z } from "zod"
import { capitalize } from "@repo/shared/utils"
import { createUnionZod, EntityZod } from "@repo/shared/Entity"

export const CUSTOMER_GENDERS = ["man", "woman", "other"] as const
export type CustomerGender = (typeof CUSTOMER_GENDERS)[number]

// export interface Customer {
//   firstName: string
//   lastName: string
//   address: string
//   zipCode: string
//   city: string
//   phone: string
//   gender: CustomerGender
//   email: string
//   password: string
//   passwordConfirmation: string
// }

export const CustomerZod = {
  id: EntityZod.id,
  firstName: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .transform((value) => {
      return capitalize(value)
    }),
  lastName: z.string().trim().min(2).max(50).toUpperCase(),
  gender: createUnionZod(CUSTOMER_GENDERS),
  email: z.string().trim().min(3).max(255).email(),
  address: z.string().trim().min(2).max(255),
  city: z.string().trim().min(2).max(255),
  zipCode: z.string().trim().min(2),
  phone: z.string().regex(/0[1-9]\d{8}/),
  password: z.string().min(4),
  // passwordConfirmation: z.string().min(4),
}

export const CustomerZodObject = z.object(CustomerZod)
export type Customer = z.infer<typeof CustomerZodObject>

export const CustomerSignInZodObject = z.object({
  email: CustomerZod.email,
  password: CustomerZod.password,
})
export type CustomerSignIn = z.infer<typeof CustomerSignInZodObject>

export const CustomerSignUpZodObject = CustomerZodObject.omit({ id: true })
export type CustomerSignUp = z.infer<typeof CustomerSignUpZodObject>

export const CustomerUpdateZodObject = CustomerZodObject.omit({
  id: true,
  email: true,
})
export type CustomerUpdate = z.infer<typeof CustomerUpdateZodObject>

export const AUTH_TOKEN_HEADER = "Authorization"
export const AUTH_TOKEN_TYPE = "Bearer"
export const AUTH_TOKEN_NAME = "accessTokenJWT"

/**
 * The maximum age of the authentication access token in seconds.
 *
 * This is set to 2 hours.
 */
export const AUTH_ACCESS_TOKEN_MAX_AGE_SECONDS = 60 * 60 * 2

export interface AuthJWT {
  customerId: Customer["id"]
}

export interface AuthState {
  accessToken: string
  authJWT: AuthJWT
  customer: Customer
}
