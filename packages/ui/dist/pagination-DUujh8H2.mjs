import { Button as i } from "@base-ui/react/button";
import { cva as t } from "class-variance-authority";
import { jsx as n, jsxs as r } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
function a(e, t) {
  return t <= 0
    ? []
    : t <= 5
      ? Array.from({ length: t }, (e, t) => ({ type: `page`, page: t + 1 }))
      : e <= 4
        ? [
            ...Array.from({ length: 5 }, (e, t) => ({ type: `page`, page: t + 1 })),
            { type: `ellipsis` },
            { type: `page`, page: t },
          ]
        : e >= t - 3
          ? [
              { type: `page`, page: 1 },
              { type: `ellipsis` },
              ...Array.from({ length: 5 }, (e, n) => ({ type: `page`, page: t - 4 + n })),
            ]
          : [
              { type: `page`, page: 1 },
              { type: `ellipsis` },
              { type: `page`, page: e - 1 },
              { type: `page`, page: e },
              { type: `page`, page: e + 1 },
              { type: `ellipsis` },
              { type: `page`, page: t },
            ];
}
const o = t(`pagination`, {
    variants: { size: { sm: ``, lg: `` }, layout: { centered: ``, spread: ``, end: `` } },
    compoundVariants: [
      { size: `lg`, layout: `centered`, class: `pagination-preset-lg-centered` },
      { size: `lg`, layout: `spread`, class: `pagination-preset-lg-spread` },
      { size: `lg`, layout: `end`, class: `pagination-preset-lg-end` },
      { size: `sm`, layout: `end`, class: `pagination-preset-sm-end` },
    ],
    defaultVariants: { size: `lg`, layout: `centered` },
  }),
  s = t(`pagination-button`, {
    variants: { size: { sm: ``, lg: `` }, state: { default: ``, active: ``, disabled: `` } },
    compoundVariants: [
      { size: `lg`, state: `default`, class: `pagination-button-preset-lg-default` },
      { size: `lg`, state: `active`, class: `pagination-button-preset-lg-active` },
      { size: `lg`, state: `disabled`, class: `pagination-button-preset-lg-disabled` },
      { size: `sm`, state: `default`, class: `pagination-button-preset-sm-default` },
      { size: `sm`, state: `active`, class: `pagination-button-preset-sm-active` },
      { size: `sm`, state: `disabled`, class: `pagination-button-preset-sm-disabled` },
    ],
    defaultVariants: { size: `lg`, state: `default` },
  });
function c({ className: t, size: r, state: a, label: o, onClick: c, disabled: l, "aria-label": u, "aria-current": d }) {
  let f = l || a === `disabled`;
  return n(i, {
    type: `button`,
    className: e(s({ size: r, state: a, className: t })),
    "data-slot": `pagination-button`,
    disabled: f,
    focusableWhenDisabled: !0,
    onClick: c,
    "aria-label": u,
    "aria-current": d,
    tabIndex: a === `disabled` && o === `...` ? -1 : void 0,
    children: n(`span`, { className: `pagination-label`, children: o }),
  });
}
function l({
  className: t,
  page: i,
  totalPages: s,
  onPageChange: l,
  size: u = `lg`,
  showNavigation: d,
  previousLabel: f = `Back`,
  nextLabel: p = `Next`,
  "aria-label": m = `Pagination`,
  ...h
}) {
  let g = u ?? `lg`,
    _ = d ?? g === `lg`,
    v = Math.min(Math.max(i, 1), Math.max(s, 1)),
    y = a(v, s),
    b = g === `lg` && _ && s >= 5 ? `spread` : `centered`,
    x = (e) => {
      e < 1 || e > s || e === v || l?.(e);
    },
    S = y.map((e, t) => {
      if (e.type === `ellipsis`)
        return n(
          c,
          { size: g, state: `disabled`, label: `...`, disabled: !0, "aria-label": `More pages` },
          `ellipsis-${t}`,
        );
      let r = e.page === v;
      return n(
        c,
        {
          size: g,
          state: r ? `active` : `default`,
          label: String(e.page),
          onClick: () => x(e.page),
          "aria-label": `Page ${e.page}`,
          "aria-current": r ? `page` : void 0,
        },
        e.page,
      );
    });
  return _
    ? r(`nav`, {
        className: e(o({ size: g, layout: b, className: t })),
        "data-slot": `pagination`,
        "aria-label": m,
        ...h,
        children: [
          n(c, {
            size: g,
            state: v <= 1 ? `disabled` : `default`,
            label: f,
            disabled: v <= 1,
            onClick: () => x(v - 1),
            "aria-label": f,
          }),
          n(`div`, { className: `pagination-pages`, children: S }),
          n(c, {
            size: g,
            state: v >= s ? `disabled` : `default`,
            label: p,
            disabled: v >= s,
            onClick: () => x(v + 1),
            "aria-label": p,
          }),
        ],
      })
    : n(`nav`, {
        className: e(o({ size: g, layout: `end`, className: t })),
        "data-slot": `pagination`,
        "aria-label": m,
        ...h,
        children: S,
      });
}
export { a as i, s as n, o as r, l as t };
