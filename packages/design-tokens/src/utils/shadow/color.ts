import type { ShadowValuePart } from './types';

const normalizeAlpha = (alpha: number) => Number(alpha.toFixed(2)).toString();
const hexToByte = (hex: string) => parseInt(hex, 16);

const argbHexToRgba = (hex: string) => {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 8) return hex;

  const alpha = hexToByte(normalized.slice(0, 2)) / 255;
  const red = hexToByte(normalized.slice(2, 4));
  const green = hexToByte(normalized.slice(4, 6));
  const blue = hexToByte(normalized.slice(6, 8));
  return `rgba(${red}, ${green}, ${blue}, ${normalizeAlpha(alpha)})`;
};

const rgbaHexToRgba = (hex: string) => {
  const normalized = hex.replace('#', '');
  if (normalized.length !== 8) return hex;

  const red = hexToByte(normalized.slice(0, 2));
  const green = hexToByte(normalized.slice(2, 4));
  const blue = hexToByte(normalized.slice(4, 6));
  const alpha = hexToByte(normalized.slice(6, 8)) / 255;
  return `rgba(${red}, ${green}, ${blue}, ${normalizeAlpha(alpha)})`;
};

export const getTokenValue = (part: ShadowValuePart) => part.value ?? part.$value;

export const getShadowColor = (part: ShadowValuePart) => {
  const raw = getTokenValue(part);
  if (typeof raw !== 'string') return String(raw);

  if (/^#[0-9a-fA-F]{8}$/.test(raw)) {
    // care-v6 uses legacy `value` while care-v7 uses DTCG `$value`.
    const fromDtcgValue = '$value' in part && !('value' in part);
    return fromDtcgValue ? argbHexToRgba(raw) : rgbaHexToRgba(raw);
  }

  return raw;
};
