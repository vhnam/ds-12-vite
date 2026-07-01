import StyleDictionary from 'style-dictionary';

const TYPOGRAPHY_FIELD_TYPES: Record<string, string> = {
  fontFamily: 'fontFamilies',
  fontWeight: 'fontWeights',
  fontSize: 'fontSizes',
  lineHeight: 'lineHeights',
  letterSpacing: 'letterSpacing',
};

/**
 * Expands Tokens Studio composite `typography` aliases into per-field primitives so Style
 * Dictionary can emit separate CSS custom properties. When a typography alias shares an object
 * with siblings (e.g. explicit fontWeight, fill), merged siblings override the expanded fields.
 */
export const flattenTypographyReferenceTree = (value: unknown): unknown => {
  if (Array.isArray(value)) {
    return value.map((item) => flattenTypographyReferenceTree(item));
  }

  if (typeof value !== 'object' || value === null) {
    return value;
  }

  const node = value as Record<string, unknown>;
  const entries = Object.entries(node).map(([key, child]) => [key, flattenTypographyReferenceTree(child)] as const);
  const flattenedNode = Object.fromEntries(entries) as Record<string, unknown>;

  const typographyChild = flattenedNode.typography;
  if (typeof typographyChild === 'object' && typographyChild !== null && !Array.isArray(typographyChild)) {
    const token = typographyChild as Record<string, unknown>;
    const tokenValue = token.value ?? token.$value;
    const tokenType = token.type ?? token.$type;
    const isAlias =
      typeof tokenValue === 'string' && tokenValue.trim().startsWith('{') && tokenValue.trim().endsWith('}');
    if (tokenType === 'typography' && isAlias) {
      const aliasPath = tokenValue.trim().slice(1, -1);
      const expanded = Object.fromEntries(
        Object.entries(TYPOGRAPHY_FIELD_TYPES).map(([fieldName, fieldType]) => [
          fieldName,
          {
            value: `{${aliasPath}.${fieldName}}`,
            type: fieldType,
          },
        ]),
      );
      const { typography: _typography, ...rest } = flattenedNode;
      return { ...expanded, ...rest };
    }
  }

  return flattenedNode;
};

export const registerTypographyTransform = () => {
  StyleDictionary.registerTransform({
    name: 'care/typography/flatten',
    type: 'value',
    filter: (token) => token.type === 'typography',
    transform: (token) => token.value,
  });
};
