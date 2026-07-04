import { Button as o } from "@base-ui/react/button";
import { cva as t } from "class-variance-authority";
import { isValidElement as n } from "react";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const s = t(`button`, {
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
  c = t(`button-icon`, {
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
  l = t(`button-loader`, {
    variants: { size: { sm: `button-loader-sm`, md: `button-loader-md`, lg: `button-loader-lg` } },
    defaultVariants: { size: `md` },
  });
function u(e) {
  if (!(e == null || typeof e == `boolean`)) {
    if (typeof e == `string` || typeof e == `number`) return String(e);
    if (Array.isArray(e)) return e.map(u).filter(Boolean).join(` `) || void 0;
    if (n(e)) return u(e.props.children);
  }
}
function d(e) {
  if (!n(e)) return;
  let { name: t, children: r } = e.props;
  return typeof t == `string` ? t.replace(/_/g, ` `) : u(r);
}
function f({ size: e }) {
  return i(`span`, {
    className: l({ size: e }),
    "aria-hidden": `true`,
    children: i(`svg`, {
      viewBox: `0 0 24 24`,
      fill: `none`,
      xmlns: `http://www.w3.org/2000/svg`,
      children: i(`circle`, {
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
function p({
  children: t,
  className: n,
  variant: l = `primary`,
  size: u = `md`,
  icon: p,
  iconPosition: m = `left`,
  loading: h = !1,
  disabled: g,
  "aria-label": _,
  ...v
}) {
  let y = l ?? `primary`,
    b = u ?? `md`,
    x = y === `icon`,
    S = !!(g || h),
    C = x ? (p ?? t) : p,
    w = !!C && !h,
    T = w && m === `left`,
    E = w && m === `right` && !x,
    D = x && typeof t == `string` ? void 0 : t,
    O = typeof t == `string` ? t : void 0,
    k = x ? d(C) : void 0,
    A = _ ?? (x ? (O ?? k) : void 0) ?? (h ? (O ?? k) : void 0);
  process.env.NODE_ENV !== `production` &&
    x &&
    !A &&
    !h &&
    console.warn(
      `Button: icon-only buttons require an accessible name via aria-label, string children, or an Icon name.`,
    );
  let j = c({ variant: y, size: b });
  return i(o, {
    className: e(s({ variant: y, size: b, hasIcon: w && !x, loading: h, className: n })),
    disabled: S,
    focusableWhenDisabled: !0,
    "data-slot": `button`,
    "data-variant": y,
    "aria-label": A,
    "aria-busy": h || void 0,
    ...v,
    children: h
      ? i(f, { size: b })
      : x
        ? C
          ? i(`span`, { className: j, children: C })
          : null
        : a(r, {
            children: [
              T ? i(`span`, { className: j, children: C }) : null,
              D ? i(`span`, { className: `button-label`, children: D }) : null,
              E ? i(`span`, { className: j, children: C }) : null,
            ],
          }),
  });
}
export { p as Button, s as buttonVariants };
