/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from '@vitest/browser-playwright';
const dirname = typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));
const monorepoRoot = path.resolve(dirname, '../..');

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@ds-12/design-tokens/tokens.css': path.resolve(
        monorepoRoot,
        'packages/design-tokens/src/tokens.web.css',
      ),
      '@ds-12/ui/button': path.resolve(monorepoRoot, 'packages/ui/src/components/button/index.tsx'),
      '@ds-12/ui/divider': path.resolve(monorepoRoot, 'packages/ui/src/components/divider/index.tsx'),
      '@ds-12/ui/input': path.resolve(monorepoRoot, 'packages/ui/src/components/input/index.tsx'),
      '@ds-12/ui/fields/input-field': path.resolve(
        monorepoRoot,
        'packages/ui/src/components/fields/input-field/index.tsx',
      ),
      '@ds-12/ui/textarea': path.resolve(monorepoRoot, 'packages/ui/src/components/textarea/index.tsx'),
      '@ds-12/ui/fields/textarea-field': path.resolve(
        monorepoRoot,
        'packages/ui/src/components/fields/textarea-field/index.tsx',
      ),
      '@ds-12/ui/badge': path.resolve(monorepoRoot, 'packages/ui/src/components/badge/index.tsx'),
      '@ds-12/ui/chip': path.resolve(monorepoRoot, 'packages/ui/src/components/chip/index.tsx'),
      '@ds-12/ui/avatar': path.resolve(monorepoRoot, 'packages/ui/src/components/avatar/index.tsx'),
      '@ds-12/ui/skeleton': path.resolve(monorepoRoot, 'packages/ui/src/components/skeleton/index.tsx'),
      '@ds-12/ui/pagination': path.resolve(monorepoRoot, 'packages/ui/src/components/pagination/index.tsx'),
      '@ds-12/ui/icon': path.resolve(monorepoRoot, 'packages/ui/src/components/icon/index.tsx'),
      '@ds-12/ui/typography': path.resolve(monorepoRoot, 'packages/ui/src/components/typography/index.tsx'),
    },
  },
  test: {
    projects: [{
      extends: true,
      plugins: [
      // The plugin will run tests for the stories defined in your Storybook config
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({
        configDir: path.join(dirname, '.storybook')
      })],
      test: {
        name: 'storybook',
        browser: {
          enabled: true,
          headless: true,
          provider: playwright({}),
          instances: [{
            browser: 'chromium'
          }]
        }
      }
    }]
  }
});