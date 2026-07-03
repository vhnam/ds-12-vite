import { defineConfig } from 'vite-plus';

export default defineConfig({
  run: {
    tasks: {
      'build:tokens': {
        command: 'tsx src/index.ts',
        input: ['src/assets/tokens.json', 'src/**/*.ts'],
        output: ['src/tokens.generated.css'],
      },
      'generate:theme': {
        command: 'node scripts/generate-theme.mjs',
        dependsOn: ['build:tokens'],
        input: ['scripts/generate-theme.mjs', 'src/tokens.generated.css', 'src/tokens.web.css'],
        output: ['src/tokens.theme.css'],
      },
    },
  },
  pack: {
    dts: {
      tsgo: true,
    },
    exports: true,
  },
  lint: {
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ['src/tokens.generated.css'],
  },
});
