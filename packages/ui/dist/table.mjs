import { Button as s } from "@base-ui/react/button";
import { cva as n } from "class-variance-authority";
import { isValidElement as r } from "react";
import { Fragment as i, jsx as a, jsxs as o } from "react/jsx-runtime";

import { n as t } from "./icon-X93sOh_U.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const c = n(`table-head-cell`, {
    variants: { align: { start: ``, end: `` }, variant: { default: ``, avatar: `` } },
    compoundVariants: [{ align: `end`, class: `table-head-cell-end` }],
    defaultVariants: { align: `start`, variant: `default` },
  }),
  l = n(`table-cell`, {
    variants: {
      variant: { default: ``, stacked: ``, avatar: ``, custom: `` },
      align: { start: ``, end: `` },
      state: { default: ``, hovered: ``, focused: ``, highlighted: ``, disabled: `` },
    },
    compoundVariants: [
      { variant: `stacked`, class: `table-cell-stacked` },
      { variant: `avatar`, class: `table-cell-avatar` },
      { variant: `custom`, class: `table-cell-custom` },
      { align: `end`, class: `table-cell-end` },
      { state: `default`, class: `table-cell-default` },
      { state: `hovered`, class: `table-cell-hovered` },
      { state: `focused`, class: `table-cell-focused` },
      { state: `highlighted`, class: `table-cell-highlighted` },
      { state: `disabled`, class: `table-cell-disabled` },
    ],
    defaultVariants: { variant: `default`, align: `start`, state: `default` },
  }),
  u = n(`table-row`, {
    variants: { interactive: { true: ``, false: `` } },
    compoundVariants: [{ interactive: !0, class: `table-row-interactive` }],
    defaultVariants: { interactive: !1 },
  });
function d(e, t) {
  if (e) return t ?? `none`;
}
function f(e, t) {
  return t === `ascending` ? `${e}, sorted ascending` : t === `descending` ? `${e}, sorted descending` : `Sort by ${e}`;
}
function p(e) {
  if (!(e == null || typeof e == `boolean`)) {
    if (typeof e == `string` || typeof e == `number`) return String(e);
    if (Array.isArray(e)) return e.map(p).filter(Boolean).join(` `) || void 0;
    if (r(e)) return p(e.props.children);
  }
}
function m({ className: t, children: n, ...r }) {
  return a(`table`, { className: e(`table`, t), "data-slot": `table`, ...r, children: n });
}
function h({ className: t, children: n, ...r }) {
  return a(`thead`, { className: e(`table-head`, t), "data-slot": `table-head`, ...r, children: n });
}
function g({ className: t, children: n, ...r }) {
  return a(`tbody`, { className: e(`table-body`, t), "data-slot": `table-body`, ...r, children: n });
}
function _({ className: t, interactive: n, children: r, ...i }) {
  return a(`tr`, { className: e(u({ interactive: n, className: t })), "data-slot": `table-row`, ...i, children: r });
}
function v(e) {
  return e === `ascending` ? `keyboard_arrow_up` : e === `descending` ? `keyboard_arrow_down` : `unfold_more`;
}
function y({ label: e, sortDirection: n, onClick: r }) {
  return a(s, {
    type: `button`,
    className: `table-sort-button`,
    "data-slot": `table-sort-button`,
    "aria-label": e,
    onClick: r,
    children: a(t, { name: v(n), size: 20 }),
  });
}
function b({
  className: t,
  align: n = `start`,
  variant: r = `default`,
  avatar: i,
  sortable: s = !1,
  sortDirection: l,
  sortLabel: u,
  children: m,
  onSort: h,
  ...g
}) {
  let _ = n ?? `start`,
    v = r ?? `default`,
    b = p(m) ?? `column`,
    x = u ?? f(b, l);
  return a(`th`, {
    scope: `col`,
    className: e(c({ align: _, variant: v, className: t })),
    "data-slot": `table-head-cell`,
    "data-variant": v,
    "aria-sort": d(s, l),
    ...g,
    children: o(`div`, {
      className: `table-head-inner`,
      "data-slot": `table-head-inner`,
      children: [
        v === `avatar` && i
          ? a(`span`, { className: `table-head-avatar`, "data-slot": `table-head-avatar`, children: i })
          : null,
        a(`span`, { className: `table-head-label`, "data-slot": `table-head-label`, children: m }),
        s ? a(y, { label: x, sortDirection: l, onClick: h }) : null,
      ],
    }),
  });
}
function x({ variant: e, state: n, text: r, subText: s, avatar: c, showChevron: l, children: u }) {
  let d = n === `disabled`;
  return e === `custom`
    ? a(`div`, { className: `table-cell-slot`, "data-slot": `table-cell-slot`, children: u })
    : e === `stacked` || e === `avatar`
      ? o(i, {
          children: [
            e === `avatar` && c ? c : null,
            o(`div`, {
              className: `table-cell-stack`,
              "data-slot": `table-cell-stack`,
              children: [
                r
                  ? a(`span`, { className: `table-cell-primary`, "data-slot": `table-cell-primary`, children: r })
                  : null,
                s
                  ? a(`span`, { className: `table-cell-subtext`, "data-slot": `table-cell-subtext`, children: s })
                  : null,
              ],
            }),
            l && !d
              ? a(t, {
                  name: `chevron_forward`,
                  size: 20,
                  className: `table-cell-chevron`,
                  "data-slot": `table-cell-chevron`,
                })
              : null,
          ],
        })
      : o(i, {
          children: [
            r || u
              ? a(`span`, { className: `table-cell-text`, "data-slot": `table-cell-text`, children: r ?? u })
              : null,
            l && !d
              ? a(t, {
                  name: `chevron_forward`,
                  size: 20,
                  className: `table-cell-chevron`,
                  "data-slot": `table-cell-chevron`,
                })
              : null,
          ],
        });
}
function S({
  className: t,
  variant: n = `default`,
  align: r = `start`,
  state: i = `default`,
  text: s,
  subText: c,
  avatar: u,
  showChevron: d = !1,
  children: f,
  ...p
}) {
  let m = n ?? `default`,
    h = r ?? `start`,
    g = i ?? `default`,
    _ = m === `custom` || (m === "default" && !s);
  return o(`td`, {
    className: e(l({ variant: m, align: h, state: g, className: t })),
    "data-slot": `table-cell`,
    "data-variant": m,
    ...p,
    children: [
      a(`div`, {
        className: `table-cell-inner`,
        "data-slot": `table-cell-inner`,
        children: a(x, {
          variant: m,
          state: g,
          text: s,
          subText: c,
          avatar: u,
          showChevron: d,
          children: _ ? f : void 0,
        }),
      }),
      g === `focused`
        ? a(`span`, { className: `table-cell-focus-ring`, "data-slot": `table-cell-focus-ring`, "aria-hidden": !0 })
        : null,
    ],
  });
}
export {
  m as Table,
  g as TableBody,
  S as TableCell,
  b as TableHead,
  h as TableHeader,
  _ as TableRow,
  l as tableCellVariants,
  c as tableHeadVariants,
  u as tableRowVariants,
};
