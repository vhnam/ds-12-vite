import { Button as a } from "@base-ui/react/button";
import { cva as t } from "class-variance-authority";
import { Fragment as n, jsx as r, jsxs as i } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const o = t(`button`, {
    variants: {
      variant: { primary: ``, secondary: ``, danger: ``, icon: `` },
      size: { sm: ``, md: ``, lg: `` },
      hasIcon: { true: ``, false: `` },
      loading: { true: `button-loading`, false: `` },
    },
    compoundVariants: [
      { variant: `primary`, size: `sm`, class: `button-primary-sm` },
      { variant: `primary`, size: `md`, class: `button-primary-md` },
      { variant: `primary`, size: `lg`, class: `button-primary-lg` },
      { variant: `secondary`, size: `sm`, class: `button-secondary-sm` },
      { variant: `secondary`, size: `md`, class: `button-secondary-md` },
      { variant: `secondary`, size: `lg`, class: `button-secondary-lg` },
      { variant: `danger`, size: `sm`, class: `button-danger-sm` },
      { variant: `danger`, size: `md`, class: `button-danger-md` },
      { variant: `danger`, size: `lg`, class: `button-danger-lg` },
      { variant: `icon`, size: `sm`, class: `button-icon-sm` },
      { variant: `icon`, size: `md`, class: `button-icon-md` },
      { variant: `icon`, size: `lg`, class: `button-icon-lg` },
      { hasIcon: !0, size: `sm`, class: `button-has-icon-sm` },
      { hasIcon: !0, size: `md`, class: `button-has-icon-md` },
      { hasIcon: !0, size: `lg`, class: `button-has-icon-lg` },
    ],
    defaultVariants: { variant: `primary`, size: `md`, hasIcon: !1, loading: !1 },
  }),
  s = t(`button-icon`, {
    variants: { variant: { primary: ``, secondary: ``, danger: ``, icon: `` }, size: { sm: ``, md: ``, lg: `` } },
    compoundVariants: [
      { variant: `primary`, size: `sm`, class: `button-icon-primary-sm` },
      { variant: `primary`, size: `md`, class: `button-icon-primary-md` },
      { variant: `primary`, size: `lg`, class: `button-icon-primary-lg` },
      { variant: `secondary`, size: `sm`, class: `button-icon-secondary-sm` },
      { variant: `secondary`, size: `md`, class: `button-icon-secondary-md` },
      { variant: `secondary`, size: `lg`, class: `button-icon-secondary-lg` },
      { variant: `danger`, size: `sm`, class: `button-icon-danger-sm` },
      { variant: `danger`, size: `md`, class: `button-icon-danger-md` },
      { variant: `danger`, size: `lg`, class: `button-icon-danger-lg` },
      { variant: `icon`, size: `sm`, class: `button-icon-variant-sm` },
      { variant: `icon`, size: `md`, class: `button-icon-variant-md` },
      { variant: `icon`, size: `lg`, class: `button-icon-variant-lg` },
    ],
    defaultVariants: { variant: `primary`, size: `md` },
  }),
  c = t(`button-loader`, {
    variants: { size: { sm: `button-loader-sm`, md: `button-loader-md`, lg: `button-loader-lg` } },
    defaultVariants: { size: `md` },
  });
function l({ size: e }) {
  return r(`span`, {
    className: c({ size: e }),
    "aria-hidden": `true`,
    children: r(`svg`, {
      viewBox: `0 0 24 24`,
      fill: `none`,
      xmlns: `http://www.w3.org/2000/svg`,
      children: r(`circle`, {
        cx: `12`,
        cy: `12`,
        r: `9`,
        stroke: `currentColor`,
        strokeWidth: `2`,
        strokeLinecap: `round`,
        strokeDasharray: `42`,
        strokeDashoffset: `12`,
      }),
    }),
  });
}
function u({
  children: t,
  className: c,
  variant: u = `primary`,
  size: d = `md`,
  icon: f,
  iconPosition: p = `left`,
  loading: m = !1,
  disabled: h,
  "aria-label": g,
  ..._
}) {
  let v = u ?? `primary`,
    y = d ?? `md`,
    b = v === `icon`,
    x = !!(h || m),
    S = b ? (f ?? t) : f,
    C = !!S && !m,
    w = C && p === `left`,
    T = C && p === `right` && !b,
    E = b && typeof t == `string` ? void 0 : t,
    D = typeof t == `string` ? t : void 0,
    O = g ?? (b ? D : void 0) ?? (m ? D : void 0),
    k = s({ variant: v, size: y });
  return r(a, {
    className: e(o({ variant: v, size: y, hasIcon: C && !b, loading: m, className: c })),
    disabled: x,
    focusableWhenDisabled: !0,
    "data-slot": `button`,
    "data-variant": v,
    "aria-label": O,
    "aria-busy": m || void 0,
    ..._,
    children: m
      ? r(l, { size: y })
      : b
        ? S
          ? r(`span`, { className: k, children: S })
          : null
        : i(n, {
            children: [
              w ? r(`span`, { className: k, children: S }) : null,
              E ? r(`span`, { className: `button-label`, children: E }) : null,
              T ? r(`span`, { className: k, children: S }) : null,
            ],
          }),
  });
}
export { u as Button, o as buttonVariants };
