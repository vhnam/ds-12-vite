import type { Preview } from "@storybook/react-vite";

import "./styles.css";

const preview: Preview = {
  parameters: {
    options: {
      storySort: {
        order: ["Foundations", "Components", "Fields"],
        method: "alphabetical-by-kind",
      },
    },

    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "error",
    },
  },
};

export default preview;
