import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "apps/storybook/.storybook/*.{ts,tsx}": [
      "vp check --fix",
      "vp check --fix apps/storybook/.storybook/env.d.ts",
    ],
    "*": "vp check --fix",
  },
  fmt: {
    ignorePatterns: ["packages/design-tokens/src/tokens.generated.css"],
  },
  lint: {
    jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
    rules: { "vite-plus/prefer-vite-plus-imports": "error" },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
