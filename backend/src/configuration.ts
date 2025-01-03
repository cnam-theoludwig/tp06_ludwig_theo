import packageJSON from "../package.json" with { type: "json" }
import path from "node:path"

export const NODE_ENV = process.env["NODE_ENV"] ?? "development"
export const IS_PRODUCTION = NODE_ENV === "production"

if (!IS_PRODUCTION) {
  const envRootPath = path.join(process.cwd(), ".env")
  console.log(`Loading env file from ${envRootPath}`)
  console.log()
  process.loadEnvFile(envRootPath)
}

export const VERSION = packageJSON.version

export const PORT = Number.parseInt(process.env["PORT"] ?? "4500", 10)
export const HOST = process.env["HOST"] ?? "0.0.0.0"
export const API_URL = process.env["API_URL"] ?? `http://${HOST}:${PORT}`

export const AUTH_JWT_SECRET = process.env["AUTH_JWT_SECRET"] ?? "secret"

export const DATABASE_USER = process.env["DATABASE_USER"] ?? "web_user"
export const DATABASE_PASSWORD = process.env["DATABASE_PASSWORD"] ?? "password"
export const DATABASE_NAME = process.env["DATABASE_NAME"] ?? "web"
export const DATABASE_HOST = process.env["DATABASE_HOST"] ?? "0.0.0.0"
export const DATABASE_PORT = Number.parseInt(
  process.env["DATABASE_PORT"] ?? "5432",
  10,
)
export const DATABASE_DEBUG = process.env["DATABASE_DEBUG"] === "true"
export const DATABASE_URL =
  process.env["DATABASE_URL"] ??
  `postgresql://${DATABASE_USER}:${DATABASE_PASSWORD}@${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`
