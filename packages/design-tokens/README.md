# @ds-12/design-tokens

CSS design tokens for the DS-12 design system. Tokens are authored in Tokens Studio format, compiled to CSS custom properties with [Style Dictionary](https://styledictionary.com/), and exposed as importable CSS files.

## Install

In this monorepo, `@ds-12/design-tokens` is a workspace package. Consumers in other repos can install it from GitHub:

```json
{
  "dependencies": {
    "@ds-12/design-tokens": "github:vhnam/ds-12-vite#path:packages/design-tokens"
  }
}
```

`@ds-12/ui` imports these files at build time and inlines them into `dist/styles.css`, so apps using only `@ds-12/ui` do not need a separate design-tokens dependency.

## Usage

Import token CSS in your global stylesheet:

```css
@import "@ds-12/design-tokens/tokens.css";
@import "@ds-12/design-tokens/theme.css"; /* Tailwind v4 @theme bridge */
```

Use tokens in component CSS:

```css
.my-element {
  color: var(--color-semantic-text-neutral-bold);
  border-radius: var(--radius-xsmall);
}
```

With Tailwind v4, `theme.css` maps token names to Tailwind theme keys (for example `--color-brand-500` → `bg-brand-500`, `--font-size-14` → `text-14`).

## CSS exports

| Import                                      | File                       | Description                                      |
| ------------------------------------------- | -------------------------- | ------------------------------------------------ |
| `@ds-12/design-tokens/tokens.css`           | `src/tokens.web.css`       | Generated primitives + web/component aliases     |
| `@ds-12/design-tokens/tokens.generated.css` | `src/tokens.generated.css` | Style Dictionary output only (primitives)        |
| `@ds-12/design-tokens/theme.css`            | `src/tokens.theme.css`     | Generated `@theme inline` bridge for Tailwind v4 |

## Source files

| File                       | Editable | Role                                                                |
| -------------------------- | -------- | ------------------------------------------------------------------- |
| `src/assets/tokens.json`   | Yes      | Tokens Studio source (colors, spacing, typography, elevation, etc.) |
| `src/tokens.generated.css` | No       | Auto-generated CSS variables from Style Dictionary                  |
| `src/tokens.web.css`       | Yes      | Web platform extensions and component token aliases                 |
| `src/tokens.theme.css`     | No       | Auto-generated Tailwind v4 theme bridge                             |

### Editing tokens

1. Update `src/assets/tokens.json` (or export from Figma/Tokens Studio).
2. Regenerate CSS:

```bash
vp run @ds-12/design-tokens#build:tokens
```

3. Add web-specific or component-scoped aliases in `src/tokens.web.css` when values are not in the generated output. Prefer aliasing existing tokens:

```css
--badge-radius: var(--radius-xsmall);
```

4. Regenerate the Tailwind theme bridge:

```bash
vp run @ds-12/design-tokens#generate:theme
```

5. If `@ds-12/ui` is a consumer, rebuild it so `dist/styles.css` picks up the token changes:

```bash
vp run @ds-12/ui#build
```

## Build pipeline

Style Dictionary reads `src/assets/tokens.json` via `src/index.ts` (`build:tokens` script) and writes `src/tokens.generated.css`. Custom transforms handle shadows, typography flattening, and line-height units. `scripts/generate-theme.mjs` scans generated and web token files to produce `src/tokens.theme.css`.

Set `SD_STRICT_REFERENCES=true` to fail the build on broken token references instead of logging warnings.

## Development

From the monorepo root:

```bash
# Install dependencies
vp install

# Watch and rebuild (theme + JS bundle)
vp run @ds-12/design-tokens#dev

# Full build (generate theme + pack)
vp run @ds-12/design-tokens#build

# Regenerate tokens.generated.css from tokens.json
vp run @ds-12/design-tokens#build:tokens

# Regenerate tokens.theme.css only
vp run @ds-12/design-tokens#generate:theme

# Format, lint, and typecheck
vp check

# Run tests
vp test
```

## Architecture

- **Tokens Studio** JSON as the single source of truth
- **Style Dictionary** + `@tokens-studio/sd-transforms` for CSS variable output
- **Custom transforms** in `src/transforms/` for shadows, typography, and line-height
- **Web layer** (`tokens.web.css`) for platform-specific values and component token aliases without polluting the generated primitives
- **Theme bridge** (`tokens.theme.css`) for Tailwind v4 utility class generation

See the [monorepo README](../../README.md) for workspace-wide commands and how tokens flow into `@ds-12/ui`.
