import { defineConfig } from "vite-plus";

const componentEntries = {
  avatar: "src/components/avatar/index.tsx",
  badge: "src/components/badge/index.tsx",
  button: "src/components/button/index.tsx",
  chip: "src/components/chip/index.tsx",
  divider: "src/components/divider/index.tsx",
  icon: "src/components/icon/index.tsx",
  input: "src/components/input/index.tsx",
  pagination: "src/components/pagination/index.tsx",
  skeleton: "src/components/skeleton/index.tsx",
  textarea: "src/components/textarea/index.tsx",
  typography: "src/components/typography/index.tsx",
  "fields/input-field": "src/components/fields/input-field/index.tsx",
  "fields/textarea-field": "src/components/fields/textarea-field/index.tsx",
} as const;

export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      style: "src/style-entry.ts",
      ...componentEntries,
    },
    dts: {
      tsgo: true,
    },
    minify: true,
    css: {
      splitting: true,
      inject: true,
      minify: true,
    },
    deps: {
      skipNodeModulesBundle: true,
    },
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {},
});
