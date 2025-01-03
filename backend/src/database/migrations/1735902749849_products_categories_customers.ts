import type { Kysely } from "kysely"
import { sql } from "kysely"

export const up = async (database: Kysely<any>): Promise<void> => {
  await sql`CREATE EXTENSION IF NOT EXISTS "unaccent"`.execute(database)

  await database.schema
    .createType("CustomerGender")
    .asEnum(["man", "woman", "other"])
    .execute()

  await database.schema
    .createTable("Customer")
    .addColumn("id", "serial", (column) => {
      return column.primaryKey().notNull()
    })
    .addColumn("firstName", "varchar(50)", (column) => {
      return column.notNull()
    })
    .addColumn("lastName", "varchar(50)", (column) => {
      return column.notNull()
    })
    .addColumn("gender", sql`"CustomerGender"`, (column) => {
      return column.notNull()
    })
    .addColumn("email", "varchar(255)", (column) => {
      return column.notNull().unique()
    })
    .addColumn("address", "varchar(255)", (column) => {
      return column.notNull()
    })
    .addColumn("city", "varchar(255)", (column) => {
      return column.notNull()
    })
    .addColumn("zipCode", "varchar(25)", (column) => {
      return column.notNull()
    })
    .addColumn("phone", "varchar(25)", (column) => {
      return column.notNull()
    })
    .addColumn("password", "varchar", (column) => {
      return column.notNull()
    })
    .execute()

  await database.schema
    .createTable("Category")
    .addColumn("id", "serial", (column) => {
      return column.primaryKey().notNull()
    })
    .addColumn("title", "varchar", (column) => {
      return column.notNull()
    })
    .execute()

  await database.schema
    .createTable("Product")
    .addColumn("id", "serial", (column) => {
      return column.primaryKey().notNull()
    })
    .addColumn("title", "varchar", (column) => {
      return column.notNull()
    })
    .addColumn("description", "varchar", (column) => {
      return column.notNull()
    })
    .addColumn("priceCents", "integer", (column) => {
      return column.notNull()
    })
    .addColumn("imageURL", "varchar", (column) => {
      return column.notNull()
    })
    .addColumn("categoryId", "integer", (column) => {
      return column.references("Category.id").notNull()
    })
    .execute()
}

export const down = async (database: Kysely<any>): Promise<void> => {
  await database.schema.dropType("CustomerGender").ifExists().execute()
  await database.schema.dropTable("Customer").ifExists().execute()
  await database.schema.dropTable("Category").ifExists().execute()
  await database.schema.dropTable("Product").ifExists().execute()
}
