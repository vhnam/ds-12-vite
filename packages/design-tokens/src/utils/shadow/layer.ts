import { getTokenValue, getShadowColor } from './color';
import type { ShadowLayer, ShadowValuePart } from './types';
import { toPx } from './units';

const hasValueObject = (value: unknown): value is ShadowValuePart =>
  typeof value === 'object' &&
  value !== null &&
  ('value' in (value as Record<string, unknown>) || '$value' in (value as Record<string, unknown>));

export const isShadowLayer = (value: unknown): value is ShadowLayer => {
  if (typeof value !== 'object' || value === null) return false;
  const record = value as Record<string, unknown>;

  return (
    hasValueObject(record.x) &&
    hasValueObject(record.y) &&
    hasValueObject(record.blur) &&
    hasValueObject(record.spread) &&
    hasValueObject(record.color)
  );
};

export const formatShadowLayer = (layer: ShadowLayer) => {
  const inset = getTokenValue(layer.type ?? {}) === 'innerShadow' ? 'inset ' : '';
  return `${inset}${toPx(getTokenValue(layer.x))} ${toPx(getTokenValue(layer.y))} ${toPx(getTokenValue(layer.blur))} ${toPx(getTokenValue(layer.spread))} ${getShadowColor(layer.color)}`;
};
