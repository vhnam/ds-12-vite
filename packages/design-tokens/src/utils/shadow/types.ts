export type ShadowValuePart = { value?: unknown; $value?: unknown };

export type ShadowLayer = {
  x: ShadowValuePart;
  y: ShadowValuePart;
  blur: ShadowValuePart;
  spread: ShadowValuePart;
  color: ShadowValuePart;
  type?: ShadowValuePart;
};
