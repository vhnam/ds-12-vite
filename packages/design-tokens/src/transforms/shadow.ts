import StyleDictionary from 'style-dictionary';

import { resolveShadowAlias, serializeShadowLayers } from '../utils/shadow';
import type { TokenTree } from '../utils/types';

const SHADOW_ALIAS_PATTERN = /^\{[^}]+\}$/;

export const inlineShadowAliasReferences = (value: unknown, sourceTokens: TokenTree): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => inlineShadowAliasReferences(item, sourceTokens));
  }

  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const node = Object.fromEntries(
    Object.entries(value as TokenTree).map(([key, child]) => [key, inlineShadowAliasReferences(child, sourceTokens)]),
  ) as TokenTree;
  const tokenType = node.$type ?? node.type;
  const tokenValue = node.$value ?? node.value;

  if (tokenType === 'boxShadow' && typeof tokenValue === 'string' && SHADOW_ALIAS_PATTERN.test(tokenValue.trim())) {
    return {
      ...node,
      $value: resolveShadowAlias(tokenValue, sourceTokens),
    };
  }

  return node;
};

export const registerShadowTransform = (sourceTokens: TokenTree) => {
  StyleDictionary.registerTransform({
    name: 'value/shadow-alias-to-css',
    type: 'value',
    transitive: true,
    filter: (token) => (token.$type ?? token.type) === 'boxShadow',
    transform: (token) => {
      const rawValue = token.$value ?? token.value;
      if (typeof rawValue === 'string' && /^\{[^}]+\}$/.test(rawValue.trim())) {
        return resolveShadowAlias(rawValue, sourceTokens);
      }
      return serializeShadowLayers(rawValue);
    },
  });
};
