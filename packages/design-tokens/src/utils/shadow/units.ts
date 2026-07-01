const HAS_UNIT_REGEX = /[a-z%]$/i;

export const toPx = (raw: unknown) => {
  const value = String(raw).trim();

  return HAS_UNIT_REGEX.test(value) ? value : `${value}px`;
};
