import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import { playwright } from 'vite-plus/test/browser-playwright';
import { defineConfig } from 'vite-plus/test/config';

export default defineConfig(async () => ({
  plugins: await storybookTest({ configDir: '.storybook' }),
  test: {
    name: 'storybook',
    browser: {
      enabled: true,
      headless: true,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
}));
