import packageJSON from "../package.json" with { type: "json" }

export const NODE_ENV = process.env["NODE_ENV"] ?? "development"
export const VERSION = packageJSON.version

export const PORT = Number.parseInt(process.env["PORT"] ?? "4500", 10)
export const HOST = process.env["HOST"] ?? "0.0.0.0"
export const API_URL = process.env["API_URL"] ?? `http://${HOST}:${PORT}`

export const AUTH_JWT_SECRET = process.env["AUTH_JWT_SECRET"] ?? "secret"
