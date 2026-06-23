# DS-12 Design System

A React design system monorepo built with [Vite+](https://viteplus.dev/guide/). It ships design tokens, UI components, and a Storybook app for documentation and visual testing.

## Packages

| Package                | Description                                                                     |
| ---------------------- | ------------------------------------------------------------------------------- |
| `@ds-12/design-tokens` | CSS design tokens (`tokens.generated.css` + web extensions in `tokens.web.css`) |
| `@ds-12/ui`            | React components styled with scoped CSS and design tokens                       |
| `@ds-12/utils`         | Shared utilities                                                                |

## Apps

| App              | Description                                                             |
| ---------------- | ----------------------------------------------------------------------- |
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

## CI

GitHub Actions workflows live in `.github/workflows/`. Run them locally with [act](https://github.com/nektos/act) before pushing to catch CI failures early.

**Prerequisites:** [Docker](https://docs.docker.com/get-docker/) and [act](https://github.com/nektos/act#installation) (`brew install act` on macOS).

The repo includes a `.actrc` that maps `ubuntu-latest` to the medium `catthehacker/ubuntu:act-latest` image. On Apple Silicon Macs, use native arm64 containers (the default).

Run the Storybook workflow locally:

```bash
act pull_request -W .github/workflows/storybook.yml -j storybook --env CI=true
```

The Chromatic step needs a project token and full GitHub event metadata, so it may not complete under `act`. Use GitHub Actions for full Chromatic runs.

### GitHub Pages

On every push to `main`, the Storybook workflow deploys `apps/storybook/storybook-static` to GitHub Pages after Chromatic passes.

**One-time setup:** In the repo on GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.

The site is published at `https://<user>.github.io/<repo>/` (for this repo: `https://vhnam.github.io/ds-12-vite/`). Production builds set `STORYBOOK_BASE_PATH` so assets resolve under that subpath.

### Chromatic visual tests

CI uses the official [`chromaui/action`](https://www.chromatic.com/docs/github-actions/) with TurboSnap (`onlyChanged: true`) from `apps/storybook`. Changes under `packages/**` still trigger a full run via `externals` in `apps/storybook/chromatic.config.json`.

**One-time setup:**

1. [Sign in to Chromatic](https://www.chromatic.com/start) with GitHub and add this repository.
2. Copy the project token from **Manage → Configure** and add `CHROMATIC_PROJECT_TOKEN` under **GitHub → Settings → Secrets and variables → Actions**.
3. Copy the **Project ID** from the same page into `apps/storybook/chromatic.config.json` as `projectId` (e.g. `"Project:64cbcde96f99841e8b007d75"`). The Visual Tests addon reads this file from the Storybook package directory — without `projectId`, the addon cannot link your project and the “Verify your account → Go to Chromatic” step fails.
4. Restart Storybook (`pnpm storybook` in `apps/storybook`), open the **Visual Tests** panel, sign in to Chromatic, and run your first build. See [Storybook visual testing](https://storybook.js.org/docs/writing-tests/visual-testing).

Run Chromatic from the CLI after copying `.env.example` to `.env` and setting your token:

```bash
vp run storybook#chromatic
```

CI uses the `CHROMATIC_PROJECT_TOKEN` repository secret. On `main`, `autoAcceptChanges` keeps the Chromatic baseline in sync after merges.

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
- **Storybook 10** with Chromatic for visual regression; interaction `play` functions run in the Storybook UI

## Tooling

This repo uses Vite+ for package management, formatting (Oxfmt), linting (Oxlint), type checking, building (tsdown), and task orchestration. See [Vite+ docs](https://viteplus.dev/guide/) or `node_modules/vite-plus/docs` for details.

If setup looks wrong, run:

```bash
vp env doctor
```
