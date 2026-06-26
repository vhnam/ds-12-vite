import type { StorybookConfig } from "@storybook/react-vite";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, "../../..");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
    "@storybook/addon-vitest",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config, { configType }) {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());

    const designTokensAlias = path.resolve(
      monorepoRoot,
      "packages/design-tokens/src/tokens.web.css",
    );
    const designTokensGeneratedAlias = path.resolve(
      monorepoRoot,
      "packages/design-tokens/src/tokens.generated.css",
    );
    const designTokensThemeAlias = path.resolve(
      monorepoRoot,
      "packages/design-tokens/src/tokens.theme.css",
    );
    const uiTailwindAlias = path.resolve(monorepoRoot, "packages/ui/src/tailwind.css");
    const uiAlias = path.resolve(monorepoRoot, "packages/ui/src/components");
    const existingAlias = config.resolve?.alias;

    const aliasEntries = [
      { find: "@ds-12/design-tokens/tokens.css", replacement: designTokensAlias },
      {
        find: "@ds-12/design-tokens/tokens.generated.css",
        replacement: designTokensGeneratedAlias,
      },
      { find: "@ds-12/design-tokens/theme.css", replacement: designTokensThemeAlias },
      { find: "@ds-12/ui/tailwind.css", replacement: uiTailwindAlias },
      { find: "@ds-12/ui", replacement: uiAlias },
    ];

    config.resolve ??= {};
    if (Array.isArray(existingAlias)) {
      config.resolve.alias = [...existingAlias, ...aliasEntries];
    } else if (existingAlias) {
      config.resolve.alias = [
        ...Object.entries(existingAlias).map(([find, replacement]) => ({ find, replacement })),
        ...aliasEntries,
      ];
    } else {
      config.resolve.alias = aliasEntries;
    }

    if (configType === "PRODUCTION" && process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }

    return config;
  },
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(dirname, "../tsconfig.docgen.json"),
      // Only run prop docgen on story fixtures and UI components — not foundation MDX helpers.
      include: [
        path.resolve(dirname, "../src/stories/**/*.tsx"),
        path.resolve(dirname, "../src/components/**/*.tsx"),
        path.resolve(dirname, "../src/fields/**/*.tsx"),
        path.resolve(monorepoRoot, "packages/ui/src/**/*.tsx"),
      ],
      exclude: ["**/*.stories.tsx"],
    },
  },
};
export default config;
