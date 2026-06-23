import type { StorybookConfig } from "@storybook/react-vite";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname =
  typeof __dirname !== "undefined" ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, "../../..");
const stylesPath = path.join(dirname, "styles.css");

function storybookGlobalStyles() {
  return {
    name: "storybook-global-styles",
    enforce: "pre" as const,
    transform(code: string, id: string) {
      const normalizedId = id.replace(/\\/g, "/");
      if (!normalizedId.endsWith("/.storybook/preview.tsx")) {
        return;
      }

      return `import ${JSON.stringify(stylesPath)};\n${code}`;
    },
  };
}

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@chromatic-com/storybook",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-mcp",
  ],
  framework: "@storybook/react-vite",
  async viteFinal(config, { configType }) {
    config.plugins ??= [];
    config.plugins.push(storybookGlobalStyles());

    const designTokensAlias = path.resolve(
      monorepoRoot,
      "packages/design-tokens/src/tokens.web.css",
    );
    const uiAlias = path.resolve(monorepoRoot, "packages/ui/src/components");
    const existingAlias = config.resolve?.alias;

    const aliasEntries = [
      { find: "@ds-12/design-tokens/tokens.css", replacement: designTokensAlias },
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
};
export default config;
