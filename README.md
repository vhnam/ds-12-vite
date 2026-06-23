# DS-12 Design System

A React design system monorepo built with [Vite+](https://viteplus.dev/guide/). It ships design tokens, UI components, and a Storybook app for documentation and visual testing.

## Packages

| Package | Description |
| --- | --- |
| `@ds-12/design-tokens` | CSS design tokens (`tokens.generated.css` + web extensions in `tokens.web.css`) |
| `@ds-12/ui` | React components styled with scoped CSS and design tokens |
| `@ds-12/utils` | Shared utilities |

## Apps

| App | Description |
| --- | --- |
| `apps/storybook` | Storybook for browsing components, docs, a11y checks, and browser tests |

## Components

`@ds-12/ui` currently includes:

- Avatar
- Badge
- Button
- Chip
- Divider
- Icon
- Input / InputField
- Pagination
- Skeleton
- Textarea / TextareaField
- Typography

Import components via subpath exports:

```ts
import { Button } from "@ds-12/ui/button";
import "@ds-12/design-tokens/tokens.css";
import "@ds-12/ui/style.css";
```

## Prerequisites

- Node.js `>=22.18.0`
- [Vite+](https://viteplus.dev/guide/) (`vp` CLI) — installed as a dev dependency; pnpm is managed automatically

## Getting started

Install dependencies:

```bash
vp install
```

Validate the workspace (format, lint, typecheck, test, and build):

```bash
vp run ready
```

## Development

Run Storybook:

```bash
vp run storybook#storybook
```

Watch and rebuild a package:

```bash
vp run @ds-12/ui#dev
vp run @ds-12/design-tokens#dev
```

Common workspace commands:

```bash
# Format, lint, and typecheck
vp check

# Run tests
vp test
vp run -r test

# Build all packages
vp run -r build
```

Run Storybook tests (browser-based Vitest):

```bash
cd apps/storybook && npm run test:storybook
```

## Project structure

```
packages/
  design-tokens/     @ds-12/design-tokens
    src/
      tokens.generated.css   # Style Dictionary output (do not edit)
      tokens.web.css         # Web platform + component token aliases
  ui/                @ds-12/ui
    src/
      components/            # DS components (lowercase folder names)
      lib/                   # Shared helpers (e.g. cn())
  utils/             @ds-12/utils
apps/
  storybook/         Component stories and visual tests
```

## Architecture

- **React 19** with **Base UI** primitives for interactive behavior
- **CVA** (`class-variance-authority`) for variant class names
- **Scoped CSS** (`ds-[component]` classes) backed by CSS custom properties — not Tailwind utilities in components
- **Design tokens** as the single source of visual values (`var(--token)`)
- **Storybook 10** with Vitest browser testing via Playwright

## Tooling

This repo uses Vite+ for package management, formatting (Oxfmt), linting (Oxlint), type checking, building (tsdown), and task orchestration. See [Vite+ docs](https://viteplus.dev/guide/) or `node_modules/vite-plus/docs` for details.

If setup looks wrong, run:

```bash
vp env doctor
```
