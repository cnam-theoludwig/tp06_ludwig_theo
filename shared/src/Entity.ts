import { z } from "zod"
import type { Primitive } from "./utils"

export const EntityZod = {
  id: z.number().int().positive(),
}

export const SearchQueryZod = z
  .union([
    z.literal("").transform(() => {
      return null
    }),
    z.string().min(1),
  ])
  .nullish()

export const EntityZodObject = z.object(EntityZod)

export type Entity = z.infer<typeof EntityZodObject>

export const createUnionZod = <T extends Primitive>(
  literals: readonly T[],
): z.ZodUnion<
  readonly [z.ZodLiteral<T>, z.ZodLiteral<T>, ...Array<z.ZodLiteral<T>>]
> => {
  return z.union(
    literals.map((literal) => {
      return z.literal(literal)
    }) as unknown as readonly [z.ZodTypeAny, z.ZodTypeAny, ...z.ZodTypeAny[]],
  ) as z.ZodUnion<
    readonly [z.ZodLiteral<T>, z.ZodLiteral<T>, ...Array<z.ZodLiteral<T>>]
  >
}
