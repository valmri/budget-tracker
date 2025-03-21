import { defineConfig } from "@aureldvx/eslint";

export default defineConfig({
  coreRules: {
    stylistic: false,
  },
  plugins: {
    typescript: true,
    vitest: true,
  },
  ignore: ["eslint.config.js", "prettier.config.js", "vite.config.ts"],
});
