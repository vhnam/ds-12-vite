import { defineConfig } from "vite-plus";

const componentEntries = {
  avatar: "src/components/avatar/index.tsx",
  badge: "src/components/badge/index.tsx",
  button: "src/components/button/index.tsx",
  chip: "src/components/chip/index.tsx",
  checkbox: "src/components/checkbox/index.tsx",
  divider: "src/components/divider/index.tsx",
  icon: "src/components/icon/index.tsx",
  input: "src/components/input/index.tsx",
  select: "src/components/select/index.tsx",
  pagination: "src/components/pagination/index.tsx",
  radio: "src/components/radio/index.tsx",
  table: "src/components/table/index.tsx",
  skeleton: "src/components/skeleton/index.tsx",
  switch: "src/components/switch/index.tsx",
  textarea: "src/components/textarea/index.tsx",
  typography: "src/components/typography/index.tsx",
  "fields/input-field": "src/components/fields/input-field/index.tsx",
  "fields/select-field": "src/components/fields/select-field/index.tsx",
  "fields/textarea-field": "src/components/fields/textarea-field/index.tsx",
  "fields/checkbox-field": "src/components/fields/checkbox-field/index.tsx",
  "fields/radio-field": "src/components/fields/radio-field/index.tsx",
  "fields/switch-field": "src/components/fields/switch-field/index.tsx",
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
