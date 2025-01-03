import { expressionBuilder } from "kysely"
import type { Database, DatabaseTable } from "./types.ts"
import type { ExpressionWrapper, SqlBool, ReferenceExpression } from "kysely"

interface SearchStringExpressionInput<Table extends DatabaseTable> {
  column: ReferenceExpression<Database, Table>
  query: string
}

/**
 * Create an expression that matches a column against a search query. This
 * expression uses the `ilike` operator and the `unaccent` function to perform
 * a case-insensitive search that ignores accents.
 *
 * @see https://www.postgresql.org/docs/current/unaccent.html
 * @param input
 * @returns
 */
export const searchStringExpression = <Table extends DatabaseTable>(
  input: SearchStringExpressionInput<Table>,
): ExpressionWrapper<Database, Table, SqlBool> => {
  const { column, query } = input
  const expression = expressionBuilder<Database, Table>()
  return expression(
    expression.fn("unaccent", [column]),
    "ilike",
    expression.fn("unaccent", [expression.val(`%${query}%`)]),
  )
}
