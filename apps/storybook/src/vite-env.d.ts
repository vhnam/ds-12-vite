/// <reference types="vite/client" />

// Ambient types for Storybook app source under `src/`.
// `.storybook/*` uses `.storybook/types.d.ts` (referenced from preview.tsx).

declare module '*.css' {}

declare module '*?raw' {
  const content: string;
  export default content;
}
