import js from "@eslint/js";
import globals from "globals";

export default [
  {
    files: ["public/**/*.js"],
    ...js.configs.recommended,
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script",
      globals: globals.browser
    }
  },
  {
    // The bundled MD5 library also supports CommonJS and AMD loaders.
    files: ["public/js/md5.js"],
    languageOptions: {
      globals: {
        module: "readonly"
      }
    }
  }
];
