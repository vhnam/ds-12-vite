import { cva as n } from "class-variance-authority";
import { jsx as r, jsxs as i } from "react/jsx-runtime";

import { n as t } from "./icon-X93sOh_U.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const a = new Set([`negative`, `attention`]),
  o = { negative: `warning`, information: `info`, positive: `check_circle`, attention: `error`, neutral: `info` },
  s = n(`alert`, {
    variants: {
      layout: { default: ``, fullWidth: `` },
      variant: { negative: ``, information: ``, positive: ``, attention: ``, neutral: `` },
    },
    compoundVariants: [
      { layout: `default`, class: `alert-preset-layout-default` },
      { layout: `fullWidth`, class: `alert-preset-layout-full-width` },
      { variant: `negative`, class: `alert-negative` },
      { variant: `information`, class: `alert-information` },
      { variant: `positive`, class: `alert-positive` },
      { variant: `attention`, class: `alert-attention` },
      { variant: `neutral`, class: `alert-neutral` },
    ],
    defaultVariants: { layout: `default`, variant: `neutral` },
  }),
  c = n(`alert-icon`, {
    variants: {
      variant: {
        negative: `alert-icon-negative`,
        information: `alert-icon-information`,
        positive: `alert-icon-positive`,
        attention: `alert-icon-attention`,
        neutral: `alert-icon-neutral`,
      },
    },
    defaultVariants: { variant: `neutral` },
  });
function l({
  className: n,
  layout: l = `default`,
  variant: u = `neutral`,
  title: d,
  description: f,
  actionLabel: p,
  onAction: m,
  onDismiss: h,
  ...g
}) {
  let _ = u ?? `neutral`,
    v = !!(p && m),
    y = !!h,
    b = a.has(_) ? `alert` : `status`;
  return i(`div`, {
    className: e(s({ layout: l, variant: u, className: n })),
    "data-slot": `alert`,
    "data-variant": _,
    role: b,
    ...g,
    children: [
      r(`span`, {
        className: c({ variant: _ }),
        "data-slot": `alert-icon`,
        children: r(t, { name: o[_], variant: `filled`, size: 24 }),
      }),
      i(`div`, {
        className: `alert-content`,
        "data-slot": `alert-content`,
        children: [
          r(`div`, { className: `alert-title`, "data-slot": `alert-title`, children: d }),
          f ? r(`div`, { className: `alert-description`, "data-slot": `alert-description`, children: f }) : null,
        ],
      }),
      v
        ? r(`button`, {
            type: `button`,
            className: `alert-action`,
            "data-slot": `alert-action`,
            onClick: m,
            children: p,
          })
        : null,
      y
        ? r(`button`, {
            type: `button`,
            className: `alert-dismiss`,
            "data-slot": `alert-dismiss`,
            "aria-label": `Dismiss`,
            onClick: h,
            children: r(t, { name: `close`, size: 24 }),
          })
        : null,
    ],
  });
}
export { l as Alert, c as alertIconVariants, s as alertVariants };
