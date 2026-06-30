import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import type { StorybookConfig } from '@storybook/react-vite';
import tailwindcss from '@tailwindcss/vite';

const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, '../../..');

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-a11y', '@storybook/addon-docs', '@storybook/addon-mcp', '@storybook/addon-vitest'],
  framework: '@storybook/react-vite',
  async viteFinal(config, { configType }) {
    config.plugins ??= [];
    config.plugins.push(tailwindcss());

    const designTokensAlias = path.resolve(monorepoRoot, 'packages/design-tokens/src/tokens.web.css');
    const designTokensGeneratedAlias = path.resolve(monorepoRoot, 'packages/design-tokens/src/tokens.generated.css');
    const designTokensThemeAlias = path.resolve(monorepoRoot, 'packages/design-tokens/src/tokens.theme.css');
    const uiTailwindAlias = path.resolve(monorepoRoot, 'packages/ui/src/tailwind.css');
    const uiAlias = path.resolve(monorepoRoot, 'packages/ui/src/components');
    const existingAlias = config.resolve?.alias;

    const aliasEntries = [
      { find: '@ds-12/design-tokens/tokens.css', replacement: designTokensAlias },
      {
        find: '@ds-12/design-tokens/tokens.generated.css',
        replacement: designTokensGeneratedAlias,
      },
      { find: '@ds-12/design-tokens/theme.css', replacement: designTokensThemeAlias },
      { find: '@ds-12/ui/tailwind.css', replacement: uiTailwindAlias },
      { find: '@ds-12/ui', replacement: uiAlias },
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

    // Rolldown bug: when @base-ui/utils/store/createSelectorMemoized is caught inside a
    // circular-dependency lazy-init wrapper, its imports from reselect (createSelectorCreator,
    // lruMemoize) are silently dropped from the output chunk, leaving the names undefined at
    // runtime. Fix: post-process each chunk that references those names without defining them
    // by prepending reselect's self-contained bundle code directly. This runs after Rolldown
    // finishes bundling so it is unaffected by tree-shaking or module-resolution quirks.
    const req = createRequire(import.meta.url);
    const reselectPkg = req.resolve('reselect/package.json');
    const reselectMjs = path.join(path.dirname(reselectPkg), 'dist', 'reselect.mjs');
    let reselectInlineCode = readFileSync(reselectMjs, 'utf-8');
    // Strip the final `export { … }` so the names live in chunk scope, not re-exported.
    reselectInlineCode = reselectInlineCode.replace(/\nexport\{[^}]*\};?\s*(?:\/\/[^\n]*)?\s*$/, '');

    const patchReselectPlugin = {
      name: 'patch-reselect-circular-dep',
      enforce: 'post',
      renderChunk(code: string) {
        const needsCreate = code.includes('createSelectorCreator');
        const needsLru = code.includes('lruMemoize');
        if (!needsCreate && !needsLru) return null;

        const alreadyDefined =
          /function createSelectorCreator\b/.test(code) || /\bcreateSelectorCreator\s*=/.test(code);
        if (alreadyDefined) return null;

        return { code: reselectInlineCode + '\n' + code };
      },
    };
    config.plugins.push(patchReselectPlugin);

    if (configType === 'PRODUCTION' && process.env.STORYBOOK_BASE_PATH) {
      config.base = process.env.STORYBOOK_BASE_PATH;
    }

    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      tsconfigPath: path.resolve(dirname, '../tsconfig.docgen.json'),
      // Only run prop docgen on story fixtures and UI components — not foundation MDX helpers.
      include: [
        path.resolve(dirname, '../src/stories/**/*.tsx'),
        path.resolve(dirname, '../src/components/**/*.tsx'),
        path.resolve(dirname, '../src/fields/**/*.tsx'),
        path.resolve(monorepoRoot, 'packages/ui/src/**/*.tsx'),
      ],
      exclude: ['**/*.stories.tsx'],
    },
  },
};
export default config;
