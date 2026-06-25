# DS-12 Design System

A React design system monorepo built with [Vite+](https://viteplus.dev/guide/). It ships design tokens, UI components, and a Storybook app for documentation and visual testing.

## Packages

| Package                | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `@ds-12/design-tokens` | CSS design tokens (`tokens.generated.css` + web extensions in `tokens.web.css`) |
| `@ds-12/ui`            | React components styled with scoped CSS and design tokens                       |
| `@ds-12/utils`         | Shared utilities                                                                |

## Apps

| App              | Description                                                                                       |
| ---------------- | ------------------------------------------------------------------------------------------------- |
| `apps/storybook` | Storybook for browsing components, docs, interaction tests, and Playwright a11y/visual regression |

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
import "@ds-12/ui/style.css";
```

### Tailwind v4 setup

Apps that use `@ds-12/ui` should configure **Tailwind CSS v4** and import the DS-12 theme entry so token-backed utilities resolve to the same CSS variables as the components.

**1. Install Tailwind v4** (Vite example):

```bash
pnpm add tailwindcss @tailwindcss/vite
```

**2. Enable the Vite plugin** in your app config:

```ts
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

**3. Import the DS-12 Tailwind entry** in your global CSS (before or alongside component styles):

```css
@import "@ds-12/ui/tailwind.css";
@import "@ds-12/ui/style.css";
```

`@ds-12/ui/tailwind.css` includes:

- `@import "tailwindcss"` — Tailwind v4 base
- `@ds-12/design-tokens/tokens.css` — all `:root` CSS variables
- `@ds-12/design-tokens/theme.css` — `@theme inline` bridge so utilities like `bg-blue-500`, `p-xxsmall`, and `rounded-xsmall` map to design tokens

**Granular imports** (when you manage Tailwind yourself):

```css
@import "tailwindcss";
@import "@ds-12/design-tokens/tokens.css";
@import "@ds-12/design-tokens/theme.css";
@import "@ds-12/ui/style.css";
```

**CSS variables only** (no Tailwind utilities):

```css
@import "@ds-12/design-tokens/tokens.css";
@import "@ds-12/ui/style.css";
```

### Where `@ds-12/ui` is used today

| Location         | Tailwind v4 setup                                                                                          |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| `apps/storybook` | `@tailwindcss/vite` in `.storybook/main.ts`; `@import "@ds-12/ui/tailwind.css"` in `.storybook/styles.css` |

Any new app or package that imports `@ds-12/ui` must follow the same pattern: install Tailwind v4, add the Vite (or PostCSS) plugin, and import `@ds-12/ui/tailwind.css` in global CSS.

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

Run Storybook tests (Playwright a11y + visual snapshots):

```bash
pnpm --filter storybook run test-storybook
```

Update visual baselines after intentional UI changes:

```bash
pnpm --filter storybook run test-storybook:update
```

Interaction `play` functions in story files run in the Storybook UI (Interactions panel). CI runs the Playwright suite in `apps/storybook/playwright/`, which discovers every story from `/index.json`, runs axe on `#storybook-root`, and compares screenshots against committed baselines in `apps/storybook/__snapshots__/`.

**First-time setup:** install Playwright browsers once:

```bash
pnpm --filter storybook exec playwright install chromium
```

## CI

GitHub Actions workflows live in `.github/workflows/`. Run them locally with [act](https://github.com/nektos/act) before pushing to catch CI failures early.

**Prerequisites:** [Docker](https://docs.docker.com/get-docker/) and [act](https://github.com/nektos/act#installation) (`brew install act` on macOS).

The repo includes a `.actrc` that maps `ubuntu-latest` to the medium `catthehacker/ubuntu:act-latest` image. On Apple Silicon Macs, use native arm64 containers (the default).

Run the Storybook workflow locally:

```bash
act pull_request -W .github/workflows/storybook.yml -j storybook --env CI=true
```

The Playwright step installs Chromium in the container; allow extra time on the first run.

### GitHub Pages

On every push to `main`, the Storybook workflow builds Storybook, runs Playwright tests, then deploys `apps/storybook/storybook-static` to GitHub Pages.

**One-time setup:** In the repo on GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.

The site is published at `https://<user>.github.io/<repo>/` (for this repo: `https://vhnam.github.io/ds-12-vite/`). Production builds set `STORYBOOK_BASE_PATH` so assets resolve under that subpath.

### Playwright visual and a11y tests

CI builds Storybook static output, serves it locally, and runs `pnpm --filter storybook run test-storybook`. The test suite in `apps/storybook/playwright/storybook.spec.ts`:

1. Fetches all stories from Storybook's `index.json`
2. Runs [axe](https://github.com/dequelabs/axe-core) accessibility checks on each story iframe
3. Compares full-page screenshots against baselines in `apps/storybook/__snapshots__/`

Commit updated snapshots when visual changes are intentional:

```bash
pnpm --filter storybook run test-storybook:update
git add apps/storybook/__snapshots__
```

Local runs start the Storybook dev server automatically (`playwright.config.ts`). In CI, tests run against the built `storybook-static` bundle.

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
  storybook/         Component stories, Playwright tests, and visual snapshots
    playwright/      A11y + screenshot test suite
    __snapshots__/   Committed Playwright screenshot baselines
```

## Architecture

- **React 19** with **Base UI** primitives for interactive behavior
- **CVA** (`class-variance-authority`) for variant class names
- **Scoped CSS** (`ds-[component]` classes) backed by CSS custom properties — component styling stays in scoped CSS, not Tailwind utilities
- **Tailwind v4** optional for app-level layout and stories; import `@ds-12/ui/tailwind.css` to bridge design tokens to Tailwind utilities via `@theme inline`
- **Design tokens** as the single source of visual values (`var(--token)`), exported as CSS variables from `@ds-12/design-tokens/tokens.css`
- **Storybook 10** with Playwright for visual regression and axe a11y checks in CI; interaction `play` functions run in the Storybook UI

## Tooling

This repo uses Vite+ for package management, formatting (Oxfmt), linting (Oxlint), type checking, building (tsdown), and task orchestration. See [Vite+ docs](https://viteplus.dev/guide/) or `node_modules/vite-plus/docs` for details.

If setup looks wrong, run:

```bash
vp env doctor
```
