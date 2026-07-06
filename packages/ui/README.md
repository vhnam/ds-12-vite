# @ds-12/ui

React **composition-layer** component library for the DS-12 design system. `@ds-12/ui` wraps [Base UI](https://base-ui.com/) primitives with DS styling — Tailwind v4 `@utility` blocks and design tokens from `@ds-12/design-tokens`. Consumer apps build **application-layer** UI on top of these exports.

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

`@ds-12/ui/tailwind.css` includes Tailwind, design tokens (imported from `@ds-12/design-tokens`), fonts, and all component `@utility` styles.

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
| `@ds-12/ui/material-symbols.css` | Material Symbols font (for `Icon`)                    |

Raw token CSS (variables only, `@theme` bridge) is exported by the source package: `@ds-12/design-tokens/tokens.css` and `@ds-12/design-tokens/theme.css`.

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

The build regenerates token CSS in `@ds-12/design-tokens`, copies fonts into `src/vendor/`, bundles components with `vp pack`, then compiles `dist/styles.css` from `src/tailwind.css` (which imports tokens directly from `@ds-12/design-tokens`).

**Git installs use pre-built artifacts** in `dist/`. After changing components, tokens, or fonts, run `vp run @ds-12/ui#build` and commit `dist/` and `src/vendor/` before consumers pull the update.

## Component layers

| Layer           | Package / location         | Responsibility                                                                                 |
| --------------- | -------------------------- | ---------------------------------------------------------------------------------------------- |
| **Primitive**   | `@base-ui/react`           | Headless behavior and accessibility (`Button`, `Field.Root`, `Avatar.Root`, …). No DS visuals. |
| **Composition** | `@ds-12/ui` (this package) | DS-styled components: wrap Base UI, CVA variants, token-backed CSS, `data-slot` attributes.    |
| **Application** | Your app                   | Pages, layouts, and domain widgets composed from `@ds-12/ui` exports.                          |

```
Your app  →  @ds-12/ui  →  @base-ui/react  →  @ds-12/design-tokens
(application)  (composition)   (primitive)        (tokens)
```

**Rules for this package (composition layer):**

- Wrap Base UI primitives — do not reimplement focus, keyboard, or ARIA behavior.
- Keep composition thin: styling, variants, and DS-specific structure only.
- Do not add app-specific or page-level components here; those belong in the application layer.

## Architecture

- **React 19** + **Base UI** at the primitive layer (dependency, not re-exported)
- **CVA** for variant class names
- **Tailwind v4 `@utility`** blocks registered in `src/tailwind.css`
- **Design tokens** imported from `@ds-12/design-tokens` (single source of truth; inlined into `dist/styles.css` at build time)

See the [monorepo README](../../README.md) for the full layer model, Storybook, CI, and workspace-wide commands.
