import StyleDictionary from 'style-dictionary';

const LINE_HEIGHT_PX_TRANSFORM_NAME = 'ts/size/lineheight/px';

const splitMultiValues = (dim: string) => {
  if (typeof dim === 'string' && dim.includes(' ')) {
    return dim.split(' ');
  }
  return [dim];
};

const ensurePxSuffix = (dim: string) => {
  // Keep non-numeric / unit-bearing values as-is (e.g. "1.5rem", "150%").
  if (!isNaN(Number(dim)) && dim !== '' && parseFloat(dim) !== 0) {
    return `${dim}px`;
  }
  return `${dim}`;
};

const transformLineHeightValue = (value: unknown) => {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return value ?? '';
  }

  const str = String(value);
  return splitMultiValues(str)
    .map((part) => ensurePxSuffix(part))
    .join(' ');
};

export const registerLineHeightPxTransform = () => {
  StyleDictionary.registerTransform({
    name: LINE_HEIGHT_PX_TRANSFORM_NAME,
    type: 'value',
    transitive: true,
    filter: (token) => {
      const type = token.$type ?? token.type;
      return typeof type === 'string' && ['lineHeight', 'lineHeights', 'typography'].includes(type);
    },
    transform: (token) => {
      const type = token.$type ?? token.type;
      const rawValue = token.$value ?? token.value;
      if (rawValue === undefined) return undefined;

      if (type === 'typography') {
        if (rawValue && typeof rawValue === 'object' && 'lineHeight' in rawValue) {
          const lineHeight = (rawValue as Record<string, unknown>).lineHeight;
          if (lineHeight === undefined) return rawValue;
          return {
            ...(rawValue as Record<string, unknown>),
            lineHeight: transformLineHeightValue(lineHeight),
          };
        }
        return rawValue;
      }

      return transformLineHeightValue(rawValue);
    },
  });
};
