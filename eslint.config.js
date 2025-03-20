import { defineConfig } from "@aureldvx/eslint";

export default defineConfig({
  plugins: {
    typescript: true,
    vitest: true,
  },
  ignore: ["eslint.config.js", "prettier.config.js", "vite.config.ts"],
});
