import configConventions from "eslint-config-conventions"
import typescriptESLint from "typescript-eslint"

export default typescriptESLint.config(
  {
    ignores: ["**/eslint.config.js"],
  },
  ...configConventions,
)
