// Ambient module declarations for `.storybook` type checks.
// Keep self-contained: staged `vp check` may typecheck only changed `.ts/.tsx`
// files and will not load `src/vite-env.d.ts` unless referenced from here.
declare module '*.css' {}

declare module '*?raw' {
  const content: string;
  export default content;
}
