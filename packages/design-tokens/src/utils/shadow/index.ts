import type { TokenTree } from '../types';
import { formatShadowLayer, isShadowLayer } from './layer';
import { getByPath, sortNumericKeys } from './path';

export const serializeShadowLayers = (shadowValue: unknown) => {
  if (typeof shadowValue !== 'object' || shadowValue === null) return shadowValue;
  const layers = Object.keys(shadowValue as TokenTree)
    .sort(sortNumericKeys)
    .map((key) => (shadowValue as TokenTree)[key])
    .filter(isShadowLayer)
    .map(formatShadowLayer);

  return layers.length > 0 ? layers.join(', ') : shadowValue;
};

export const resolveShadowAlias = (aliasValue: string, sourceTokens: TokenTree) => {
  const aliasPath = aliasValue
    .trim()
    .replace(/^\{|\}$/g, '')
    .split('.');
  const aliasTarget = getByPath(sourceTokens, aliasPath);

  if (typeof aliasTarget !== 'object' || aliasTarget === null) return aliasValue;
  const serialized = serializeShadowLayers(aliasTarget);
  return typeof serialized === 'string' ? serialized : aliasValue;
};

export const buildElevationCustomProperties = (sourceTokens: TokenTree) => {
  const elevationTokens = getByPath(sourceTokens, ['elevation']);
  if (typeof elevationTokens !== 'object' || elevationTokens === null) return [];

  return Object.keys(elevationTokens as TokenTree)
    .sort(sortNumericKeys)
    .map((levelKey) => {
      const layersValue = serializeShadowLayers((elevationTokens as TokenTree)[levelKey]);
      if (typeof layersValue !== 'string') return '';
      return `  --elevation-${levelKey}: ${layersValue};`;
    })
    .filter(Boolean);
};
