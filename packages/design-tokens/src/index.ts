import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';

import { register } from '@tokens-studio/sd-transforms';
import StyleDictionary from 'style-dictionary';
import { logBrokenReferenceLevels, logVerbosityLevels, logWarningLevels } from 'style-dictionary/enums';

import { registerLineHeightPxTransform } from './transforms/lineHeightPx';
import { inlineShadowAliasReferences, registerShadowTransform } from './transforms/shadow';
import { flattenTypographyReferenceTree, registerTypographyTransform } from './transforms/typography';
import { postProcessVariablesCss } from './utils/css';
import { buildElevationCustomProperties } from './utils/shadow';
import { getCssFilePath, getSourceFile, loadSourceTokensFromFile } from './utils/theme-files';
import { isPrimitiveToken } from './utils/token-filter';

await register(StyleDictionary);

const strictReferences = process.env['SD_STRICT_REFERENCES'] === 'true';

const sourceFile = getSourceFile();
const rawTokens = loadSourceTokensFromFile(sourceFile);

const { $themes: _themes, $metadata: _metadata, ...tokenSets } = rawTokens as Record<string, unknown>;
const tokenSetKeys = Object.keys(tokenSets);
if (tokenSetKeys.length > 1) {
  console.warn(`Multiple token sets found (${tokenSetKeys.join(', ')}); building only "${tokenSetKeys[0]}".`);
}
const firstSetKey = tokenSetKeys[0];
const sourceTokens = (firstSetKey ? tokenSets[firstSetKey] : rawTokens) as typeof rawTokens;
registerShadowTransform(sourceTokens);
registerLineHeightPxTransform();
registerTypographyTransform();

const normalizedTokens = inlineShadowAliasReferences(flattenTypographyReferenceTree(sourceTokens), sourceTokens);
const tempTokensDir = mkdtempSync(path.join(tmpdir(), 'theme-engine-'));
const tempTokensFile = path.join(tempTokensDir, 'tokens.json');
writeFileSync(tempTokensFile, JSON.stringify(normalizedTokens), 'utf8');

const sd = new StyleDictionary({
  source: [tempTokensFile],
  preprocessors: ['tokens-studio'],
  platforms: {
    css: {
      transformGroup: 'tokens-studio',
      transforms: [
        'name/kebab',
        'value/shadow-alias-to-css',
        'ts/resolveMath',
        'ts/size/lineheight/px',
        'ts/size/px',
        'ts/typography/fontWeight',
        'ts/color/css/hexrgba',
        'care/typography/flatten',
      ],
      buildPath: `./src/`,
      files: [
        {
          destination: 'tokens.generated.css',
          format: 'css/variables',
          filter: isPrimitiveToken,
          options: { outputReferences: true, sort: 'name' },
        },
      ],
    },
  },
  log: {
    warnings: logWarningLevels.warn,
    verbosity: logVerbosityLevels.default,
    errors: {
      brokenReferences: strictReferences ? logBrokenReferenceLevels.throw : logBrokenReferenceLevels.console,
    },
  },
});

const build = async () => {
  try {
    try {
      await sd.cleanAllPlatforms();
    } catch (error) {
      const isMissingBuildFile =
        error instanceof Error && 'code' in error && (error as { code?: string }).code === 'ENOENT';
      if (!isMissingBuildFile) throw error;
    }
    await sd.buildAllPlatforms();

    const cssFilePath = getCssFilePath();
    postProcessVariablesCss(cssFilePath, buildElevationCustomProperties(sourceTokens));
  } finally {
    rmSync(tempTokensDir, { recursive: true, force: true });
  }
};

build().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
