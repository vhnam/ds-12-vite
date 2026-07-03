export type TokenWithType = {
  $value?: unknown;
  $type?: string;
  value?: unknown;
  type?: string;
};

export const isPrimitiveToken = (token: TokenWithType) => {
  const tokenType = token.$type ?? token.type;
  const rawValue = token.$value ?? token.value;
  const isTypographyOrComposition = tokenType === 'typography' || tokenType === 'composition';
  const isBoxShadow = tokenType === 'boxShadow';
  const hasObjectValue = typeof rawValue === 'object' && rawValue !== null;
  const hasUnresolvedAlias = typeof rawValue === 'string' && /^\{[^}]+\}$/.test(rawValue.trim());

  return !isTypographyOrComposition && (!hasObjectValue || isBoxShadow) && (!hasUnresolvedAlias || isBoxShadow);
};
