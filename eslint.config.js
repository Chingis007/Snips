// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const unusedImports = require("eslint-plugin-unused-imports");

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ["dist/*", "node_modules/*", ".expo/*", "android/*", "ios/*"],
  },
  {
    plugins: {
      "unused-imports": unusedImports,
    },
    rules: {
      // TypeScript Strict Rules
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-unnecessary-condition": "off", // Can be too strict

      // Import Organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin", // Node.js built-ins
            "external", // npm packages
            "internal", // Your own code (paths configured in tsconfig)
            "parent", // ../
            "sibling", // ./
            "index", // ./index
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
      "import/no-duplicates": ["error", { "prefer-inline": true }],
      "import/newline-after-import": "error",

      // React/React Native
      "react/prop-types": "off", // Using TypeScript
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-boolean-value": ["error", "never"],
      "react/self-closing-comp": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/jsx-no-useless-fragment": "error",

      // Code Quality
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "always"],
      curly: ["error", "all"],
      "no-else-return": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-nested-ternary": "warn",
      "no-unneeded-ternary": "error",

      // Best Practices
      "no-duplicate-imports": "off", // Handled by import/no-duplicates
      "no-useless-return": "error",
      "prefer-arrow-callback": "error",
      "no-shadow": "off", // Use TypeScript version
      "@typescript-eslint/no-shadow": "error",
    },
  },
]);
