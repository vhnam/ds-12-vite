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

- Avatar, Badge, Button, Calendar, Chip, Checkbox, Divider, Icon
- Input, Select, Menu, Combobox, Textarea, Radio, Switch, Skeleton, Table, Pagination, Typography
- Field wrappers: InputField, SelectField, ComboboxField, TextareaField, CheckboxField, RadioField, SwitchField

Import from the package root (barrel) or a subpath for tree-shaking:

```ts
import { Button, Badge } from "@ds-12/ui";
// or
import { Button } from "@ds-12/ui/button";
```

### Styles (recommended)

`@ds-12/ui` ships a pre-built CSS bundle with design tokens, Nunito Sans (400–700), and all component styles. No Tailwind setup required.

```ts
import "@ds-12/ui/styles.css";
import "@ds-12/ui/material-symbols.css"; // when using Icon
```

If you use `Icon`, the Material Symbols font is a separate import (not bundled in `styles.css`).

### Tailwind v4 setup (advanced)

Use this when you want Tailwind utilities in your app and control over the build pipeline.

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

**3. Import the DS-12 Tailwind entry** in your global CSS:

```css
@import "@ds-12/ui/tailwind.css";
@import "@material-symbols/font-400/outlined.css";
```

`@ds-12/ui/tailwind.css` includes Tailwind v4, vendored design tokens, Nunito Sans, and all component `@utility` styles.

### Where `@ds-12/ui` is used today

| Location         | Setup                                                                                  |
| ---------------- | -------------------------------------------------------------------------------------- |
| `apps/storybook` | `@tailwindcss/vite` in `.storybook/main.ts`; `@import "@ds-12/ui/tailwind.css"` in CSS |

## Using in another repo

Install `@ds-12/ui` from GitHub. The package is self-contained — no `@ds-12/design-tokens` dependency, no workspace protocol.

**Direct dependency** (`package.json`):

```json
{
  "dependencies": {
    "@ds-12/ui": "github:vhnam/ds-12-vite#path:packages/ui"
  }
}
```

**Shorter with pnpm catalog** — define the URL once in `pnpm-workspace.yaml`:

```yaml
catalog:
  "@ds-12/ui": "github:vhnam/ds-12-vite#path:packages/ui"
```

Then in `package.json`:

```json
{
  "dependencies": {
    "@ds-12/ui": "catalog:"
  }
}
```

**App setup:**

```ts
import { Button } from "@ds-12/ui";
import "@ds-12/ui/styles.css";
```

Peer dependencies: `react` and `react-dom` (^19.2.6). `tailwindcss` is optional (only needed for the advanced `tailwind.css` entry).

**Git installs use pre-built artifacts** in `packages/ui/dist/` (JS bundles, `styles.css`, and font files). After changing `@ds-12/ui` in this repo, run `vp run @ds-12/ui#build` and commit `packages/ui/dist/` before consumers pull the update.

## Prerequisites

- Node.js `>=24.18.0`
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

Build `@ds-12/ui` (JS + pre-built `styles.css`):

```bash
vp run @ds-12/ui#build
```

After changing design tokens or fonts, rebuild and commit `packages/ui/dist/` and `packages/ui/src/vendor/` so git-based consumers get the update.

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
    dist/                    # Pre-built JS + styles.css (committed for git installs)
    scripts/                 # vendor-tokens, vendor-fonts, build-styles
    src/
      components/            # DS components (lowercase folder names)
      vendor/                  # Vendored tokens + fonts (copied at build)
      lib/                     # Shared helpers (e.g. cn())
  utils/             @ds-12/utils
apps/
  storybook/         Component stories, Playwright tests, and visual snapshots
    playwright/      A11y + screenshot test suite
    __snapshots__/   Committed Playwright screenshot baselines
```

## Architecture

- **React 19** with **Base UI** primitives for interactive behavior
- **CVA** (`class-variance-authority`) for variant class names
- **Tailwind v4 `@utility`** blocks for component styles, registered in `packages/ui/src/tailwind.css`
- **Design tokens** as the single source of visual values (`var(--token)`), vendored into `@ds-12/ui` at build time
- **Pre-built `styles.css`** for drop-in consumption (tokens, fonts, component styles) without Tailwind in the host app
- **Storybook 10** with Playwright for visual regression and axe a11y checks in CI; interaction `play` functions run in the Storybook UI

## Tooling

This repo uses Vite+ for package management, formatting (Oxfmt), linting (Oxlint), type checking, building (tsdown), and task orchestration. See [Vite+ docs](https://viteplus.dev/guide/) or `node_modules/vite-plus/docs` for details.

If setup looks wrong, run:

```bash
vp env doctor
```
