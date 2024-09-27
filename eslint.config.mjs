import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  {
    ignores: [ 'dist/', 'coverage/', '*.json', '*.config.*' ],
  },
  {
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: globals.browser
    }
  },
  pluginJs.configs.recommended,
  {
    files: ["**/*.test.js"],
    languageOptions: {
      globals: globals.jest
    }
  },
  {
    files: ["**/*.js"],
    rules: {
      'no-unused-vars': 'off',
    },
  }
];