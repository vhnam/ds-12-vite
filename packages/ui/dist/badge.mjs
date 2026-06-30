import { cva as t } from "class-variance-authority";
import { createContext as n } from "react";
import { jsx as r, jsxs as i } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const a = { sm: 12, lg: 20 },
  o = n(void 0),
  s = t(`badge`, {
    variants: {
      size: { sm: ``, lg: `` },
      emphasis: { subtle: ``, bold: `` },
      variant: { neutral: ``, negative: ``, attention: ``, positive: ``, information: `` },
    },
    compoundVariants: [
      { size: `sm`, class: `badge-preset-size-sm` },
      { size: `lg`, class: `badge-preset-size-lg` },
      { emphasis: `subtle`, variant: `neutral`, class: `badge-neutral-subtle` },
      { emphasis: `subtle`, variant: `negative`, class: `badge-negative-subtle` },
      { emphasis: `subtle`, variant: `attention`, class: `badge-attention-subtle` },
      { emphasis: `subtle`, variant: `positive`, class: `badge-positive-subtle` },
      { emphasis: `subtle`, variant: `information`, class: `badge-information-subtle` },
      { emphasis: `bold`, variant: `neutral`, class: `badge-neutral-bold` },
      { emphasis: `bold`, variant: `negative`, class: `badge-negative-bold` },
      { emphasis: `bold`, variant: `attention`, class: `badge-attention-bold` },
      { emphasis: `bold`, variant: `positive`, class: `badge-positive-bold` },
      { emphasis: `bold`, variant: `information`, class: `badge-information-bold` },
    ],
    defaultVariants: { size: `lg`, emphasis: `subtle`, variant: `neutral` },
  }),
  c = t(`badge-icon`, {
    variants: { size: { sm: `badge-preset-icon-sm`, lg: `badge-preset-icon-lg` } },
    defaultVariants: { size: `lg` },
  });
function l({
  children: t,
  className: n,
  size: l = `lg`,
  emphasis: u = `subtle`,
  variant: d = `neutral`,
  icon: f,
  ...p
}) {
  let m = l ?? `lg`,
    h = d ?? `neutral`,
    g = a[m];
  return r(o.Provider, {
    value: g,
    children: i(`span`, {
      className: e(s({ size: l, emphasis: u, variant: d, className: n })),
      "data-slot": `badge`,
      "data-variant": h,
      ...p,
      children: [
        f ? r(`span`, { className: c({ size: m }), children: f }) : null,
        r(`span`, { className: `badge-label`, children: t }),
      ],
    }),
  });
}
export { l as Badge, o as BadgeIconSizeContext, s as badgeVariants };
