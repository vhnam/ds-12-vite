import { readFileSync, writeFileSync } from 'node:fs';

const ELEVATION_LAYER_VAR_REGEX = /^\s*--elevation-\d+-\d+-(x|y|blur|spread|color|type):/;
const ELEVATION_COMPOSITE_VAR_REGEX = /^\s*--elevation-\d+:/;
const NEEDS_PX_NAME_REGEX =
  /(min-width|max-width|line-height|(?<!line-)height|width|padding|padding-(top|right|bottom|left)|margin|margin-(top|right|bottom|left)|spacing|border-(top|right|bottom|left)|border-radius|border-top-left-radius|border-top-right-radius|border-bottom-left-radius|border-bottom-right-radius)$/;

const normalizeZeroPx = (cssText: string) => cssText.replace(/\b0px\b/g, '0');
const normalizeElevationAliasRefs = (cssText: string) =>
  cssText.replace(/\{elevation\.(\d+)\}/g, 'var(--elevation-$1)');

const normalizeMissingPxUnits = (cssText: string) =>
  cssText.replace(/^(\s*--([a-z0-9-]+):\s*)(-?\d+(?:\.\d+)?)(;)\s*$/gm, (full, prefix, varName, value, suffix) => {
    if (!NEEDS_PX_NAME_REGEX.test(varName)) return full;
    if (Number(value) === 0) return `${prefix}0${suffix}`;
    return `${prefix}${value}px${suffix}`;
  });

const finalizeVariablesCss = (cssText: string) =>
  normalizeElevationAliasRefs(normalizeZeroPx(normalizeMissingPxUnits(cssText)));

export const postProcessVariablesCss = (cssFilePath: string, elevationVars: string[]) => {
  const cssOutput = readFileSync(cssFilePath, 'utf8');
  const withoutElevationLayerVars = cssOutput
    .split('\n')
    .filter((line) => !ELEVATION_LAYER_VAR_REGEX.test(line) && !ELEVATION_COMPOSITE_VAR_REGEX.test(line))
    .join('\n');

  if (elevationVars.length === 0) {
    writeFileSync(cssFilePath, `${finalizeVariablesCss(withoutElevationLayerVars)}\n`, 'utf8');
    return;
  }

  const withElevationAtEnd = withoutElevationLayerVars.replace(/\n}\s*$/, `\n${elevationVars.join('\n')}\n}\n`);
  writeFileSync(cssFilePath, finalizeVariablesCss(withElevationAtEnd), 'utf8');
};
