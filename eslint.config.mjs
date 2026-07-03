import js from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "@eslint-react/eslint-plugin";
import prettierConfig from "eslint-config-prettier";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "storybook-static/**",
      "node_modules/**",
      "*.config.*",
      "**/*.config.*",
      "**/*.stories.*",
      ".storybook/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  eslintReact.configs["recommended-type-checked"],
  prettierConfig,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-empty-object-type": "off",
      // forwardRef is still required for React 18 compatibility (peer dep supports ^18 || ^19)
      "@eslint-react/no-forward-ref": "off",
    },
  }
);
