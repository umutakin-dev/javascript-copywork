// Phase 8 · 09 — ESLint flat config (the modern eslint.config.js)
// NOTE: this file is a REFERENCE to copy, not something to `bun` — its import of
// "@eslint/js" only resolves once eslint is present.
//
// Use it: copy to your PROJECT ROOT as `eslint.config.js`, then run WITHOUT
// installing anything into the repo:
//     npx eslint .
// (npx fetches eslint on demand — needs network the first time.)
//
// Flat config is just an array of config objects — no .eslintrc, no "extends".
//
// Prettier, briefly: run it ONCE to feel the diff (`npx prettier . --write`),
// then stop thinking about formatting. Keep ESLint for BUGS and Prettier for
// FORMAT — don't make ESLint do formatting.
//
// Ref: https://eslint.org/docs/latest/use/configure/configuration-files

import js from "@eslint/js";

export default [
  js.configs.recommended, // ESLint's baseline "catch real mistakes" rules
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "error",
      eqeqeq: ["error", "always"], // force === over == — your Phase 1 lesson, enforced
      "prefer-const": "warn",
    },
  },
];
