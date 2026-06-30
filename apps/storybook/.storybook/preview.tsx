import type { Preview } from '@storybook/react-vite';

import './styles.css';

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ['Foundations', 'Components', 'Fields'],
        method: 'alphabetical-by-kind',
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    // Playwright runs axe in CI (`playwright/storybook.spec.ts`). Keep the addon panel
    // for manual checks without auto-running scans on every story render.
    a11y: {
      test: 'off',
    },
  },
};

export default preview;
