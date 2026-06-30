import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const r = [`h1`, `h2`, `h3`, `h4`, `paragraph`, `label`],
  i = t(`skeleton`, {
    variants: {
      variant: { h1: ``, h2: ``, h3: ``, h4: ``, paragraph: ``, label: ``, circle: ``, square: ``, rectangle: `` },
      size: { 32: ``, 48: ``, 72: ``, 128: `` },
    },
    compoundVariants: [
      { variant: `h1`, class: `skeleton-text skeleton-h1` },
      { variant: `h2`, class: `skeleton-text skeleton-h2` },
      { variant: `h3`, class: `skeleton-text skeleton-h3` },
      { variant: `h4`, class: `skeleton-text skeleton-h4` },
      { variant: `paragraph`, class: `skeleton-text skeleton-paragraph` },
      { variant: `label`, class: `skeleton-text skeleton-label` },
      { variant: `circle`, size: `32`, class: `skeleton-thumbnail skeleton-preset-circle-32` },
      { variant: `circle`, size: `48`, class: `skeleton-thumbnail skeleton-preset-circle-48` },
      { variant: `circle`, size: `72`, class: `skeleton-thumbnail skeleton-preset-circle-72` },
      { variant: `circle`, size: `128`, class: `skeleton-thumbnail skeleton-preset-circle-128` },
      { variant: `square`, size: `32`, class: `skeleton-thumbnail skeleton-preset-square-32` },
      { variant: `square`, size: `48`, class: `skeleton-thumbnail skeleton-preset-square-48` },
      { variant: `square`, size: `72`, class: `skeleton-thumbnail skeleton-preset-square-72` },
      { variant: `square`, size: `128`, class: `skeleton-thumbnail skeleton-preset-square-128` },
      { variant: `rectangle`, size: `32`, class: `skeleton-thumbnail skeleton-preset-rectangle-32` },
      { variant: `rectangle`, size: `48`, class: `skeleton-thumbnail skeleton-preset-rectangle-48` },
      { variant: `rectangle`, size: `72`, class: `skeleton-thumbnail skeleton-preset-rectangle-72` },
      { variant: `rectangle`, size: `128`, class: `skeleton-thumbnail skeleton-preset-rectangle-128` },
    ],
    defaultVariants: { variant: `paragraph`, size: `48` },
  }),
  a = t(`skeleton-bar`, {
    variants: { variant: { h1: ``, h2: ``, h3: ``, h4: ``, paragraph: ``, label: `` } },
    compoundVariants: [
      { variant: `h1`, class: `skeleton-bar-h1` },
      { variant: `h2`, class: `skeleton-bar-h2` },
      { variant: `h3`, class: `skeleton-bar-h3` },
      { variant: `h4`, class: `skeleton-bar-h4` },
      { variant: `paragraph`, class: `skeleton-bar-paragraph` },
      { variant: `label`, class: `skeleton-bar-label` },
    ],
    defaultVariants: { variant: `paragraph` },
  });
function o(e) {
  return r.includes(e);
}
function s({
  className: t,
  variant: r = `paragraph`,
  size: s = `48`,
  width: c,
  "aria-label": l = `Loading`,
  style: u,
  ...d
}) {
  let f = r ?? `paragraph`,
    p = o(f),
    m = e(i({ variant: f, size: p ? void 0 : s, className: t })),
    h = c === void 0 ? u : { ...u, width: c };
  return p
    ? n(`div`, {
        className: m,
        "data-slot": `skeleton`,
        "data-variant": f,
        style: h,
        role: `status`,
        "aria-busy": `true`,
        "aria-label": l,
        ...d,
        children: n(`div`, { className: a({ variant: f }), "aria-hidden": `true` }),
      })
    : n(`div`, {
        className: m,
        "data-slot": `skeleton`,
        "data-variant": f,
        style: h,
        role: `status`,
        "aria-busy": `true`,
        "aria-label": l,
        ...d,
      });
}
export { s as Skeleton, a as skeletonBarVariants, i as skeletonVariants };
