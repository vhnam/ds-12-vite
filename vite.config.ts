import { defineConfig, UserConfig } from 'vite-plus';

import oxfmtConfig from './.oxfmtrc.json' with { type: 'json' };

const fmt = oxfmtConfig as NonNullable<UserConfig['fmt']>;

export default defineConfig({
  staged: {
    'apps/storybook/.storybook/*.{ts,tsx}': 'vp check --fix apps/storybook/.storybook',
    // Exclude .storybook — those files need directory-scoped check so types.d.ts is loaded.
    '!(apps/storybook/.storybook)/**/*': 'vp check --fix',
  },
  fmt,
  lint: {
    ignorePatterns: ['**/dist/**', '**/src/vendor/**'],
    jsPlugins: [{ name: 'vite-plus', specifier: 'vite-plus/oxlint-plugin' }],
    rules: { 'vite-plus/prefer-vite-plus-imports': 'error' },
    options: { typeAware: true, typeCheck: true },
  },
  run: {
    cache: true,
  },
});
