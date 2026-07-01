# @ds-12/ui

React component library for the DS-12 design system. Components are built on [Base UI](https://base-ui.com/) primitives, styled with Tailwind v4 `@utility` blocks, and driven by vendored design tokens.

## Install

In this monorepo, `@ds-12/ui` is a workspace package. In another repo, install from GitHub:

```json
{
  "dependencies": {
    "@ds-12/ui": "github:vhnam/ds-12-vite#path:packages/ui"
  }
}
```

Peer dependencies: `react` and `react-dom` (^19.2.6). `tailwindcss` is optional and only needed for the advanced `tailwind.css` entry.

## Usage

Import components from the package root or a subpath for tree-shaking:

```ts
import { Button, Badge } from "@ds-12/ui";
// or
import { Button } from "@ds-12/ui/button";
```

### Styles (recommended)

Import the pre-built CSS bundle — design tokens, Nunito Sans (400–700), and all component styles. No Tailwind setup required.

```ts
import "@ds-12/ui/styles.css";
import "@ds-12/ui/material-symbols.css"; // when using Icon
```

### Tailwind v4 setup (advanced)

Use this when you want Tailwind utilities in your app and control over the build pipeline.

1. Install Tailwind v4 and enable `@tailwindcss/vite` in your app config.
2. Import the DS-12 Tailwind entry in global CSS:

```css
@import "@ds-12/ui/tailwind.css";
@import "@material-symbols/font-400/outlined.css";
```

`@ds-12/ui/tailwind.css` includes Tailwind, vendored tokens, fonts, and all component `@utility` styles.

## Components

| Category | Exports                                                                                       |
| -------- | --------------------------------------------------------------------------------------------- |
| Display  | Avatar, Badge, Chip, Divider, Icon, Skeleton, Typography                                      |
| Actions  | Button                                                                                        |
| Forms    | Input, Select, Combobox, Textarea, Checkbox, Radio, Switch                                    |
| Fields   | InputField, SelectField, ComboboxField, TextareaField, CheckboxField, RadioField, SwitchField |
| Data     | Table, Pagination, Calendar                                                                   |
| Overlays | Menu                                                                                          |

Subpath imports follow the export map in `package.json` (for example `@ds-12/ui/avatar`, `@ds-12/ui/fields/input-field`).

## CSS exports

| Import                           | Description                                           |
| -------------------------------- | ----------------------------------------------------- |
| `@ds-12/ui/styles.css`           | Pre-built bundle (tokens, fonts, component styles)    |
| `@ds-12/ui/tailwind.css`         | Tailwind v4 entry for apps that compile their own CSS |
| `@ds-12/ui/tokens.css`           | Design token CSS variables only                       |
| `@ds-12/ui/theme.css`            | `@theme` bridge for Tailwind                          |
| `@ds-12/ui/material-symbols.css` | Material Symbols font (for `Icon`)                    |

## Development

From the monorepo root:

```bash
# Install dependencies
vp install

# Watch and rebuild
vp run @ds-12/ui#dev

# Build JS bundles + styles.css
vp run @ds-12/ui#build

# Format, lint, and typecheck
vp check

# Run tests
vp test
```

The build copies design tokens and fonts into `src/vendor/`, bundles components with `vp pack`, then compiles `dist/styles.css` from `src/tailwind.css`.

**Git installs use pre-built artifacts** in `dist/`. After changing components, tokens, or fonts, run `vp run @ds-12/ui#build` and commit `dist/` and `src/vendor/` before consumers pull the update.

## Architecture

- **React 19** + **Base UI** for accessible interactive primitives
- **CVA** for variant class names
- **Tailwind v4 `@utility`** blocks registered in `src/tailwind.css`
- **Design tokens** vendored from `@ds-12/design-tokens` at build time (no runtime dependency)

See the [monorepo README](../../README.md) for Storybook, CI, and workspace-wide commands.
