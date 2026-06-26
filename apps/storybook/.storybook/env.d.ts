// Ambient types for Storybook config files (.storybook/*).
//
// Config files import global CSS as side-effect imports. When pre-commit runs
// `vp check --fix` on staged files only, TypeScript may not load declarations
// from src/vite-env.d.ts. Keep this file referenced from any .storybook file
// that imports CSS (see main.ts).

declare module "*.css" {}
