/// <reference types="vite/client" />

// Ambient types for Storybook and app source. Referenced from `.storybook/types.d.ts`
// so `vp check` on `.storybook/*` resolves CSS side-effect imports.

declare module "*.css" {}

declare module "*?raw" {
  const content: string;
  export default content;
}
