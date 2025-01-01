export const CUSTOMER_GENDERS = ["man", "woman", "other"] as const
export type CustomerGender = (typeof CUSTOMER_GENDERS)[number]

export interface Customer {
  firstName: string
  lastName: string
  address: string
  zipCode: string
  city: string
  phone: string
  gender: CustomerGender
  email: string
  password: string
  passwordConfirmation: string
}
