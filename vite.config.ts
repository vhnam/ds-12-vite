import { defineConfig } from "vite-plus";

export default defineConfig({
  staged: {
    "apps/storybook/.storybook/*.{ts,tsx}": "vp check --fix apps/storybook/.storybook",
    // Exclude .storybook — those files need directory-scoped check so types.d.ts is loaded.
    "!(apps/storybook/.storybook)/**/*": "vp check --fix",
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
