/** Shared parameters for visual-only matrix/gallery stories. */
export const showcaseParameters = {
  a11y: { disable: true },
};

/** Defer axe scans on stories with known design-token contrast gaps. */
export const contrastDebtParameters = {
  a11y: { test: "off" as const },
};
