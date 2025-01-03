/**
 * Matches any [primitive value](https://developer.mozilla.org/en-US/docs/Glossary/Primitive).
 */
export type Primitive =
  | null
  | undefined
  | string
  | number
  | boolean
  | symbol
  | bigint

export type OmitStrict<T, K extends keyof T> = Omit<T, K>
export type PickStrict<T, K extends keyof T> = Pick<T, K>

export type Status = "error" | "idle" | "pending" | "success"

/**
 * Capitalize the first letter of a string.
 * @param string
 * @returns
 * @example capitalize("hello, world!") // "Hello, world!"
 */
export const capitalize = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
