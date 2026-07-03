import { Button as o } from "@base-ui/react/button";
import { cva as n } from "class-variance-authority";
import { Fragment as r, jsx as i, jsxs as a } from "react/jsx-runtime";

import { n as t } from "./icon-C8br3Qrh.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const s = n(`table-head-cell`, {
    variants: { align: { start: ``, end: `` }, variant: { default: ``, avatar: `` } },
    compoundVariants: [{ align: `end`, class: `table-head-cell-end` }],
    defaultVariants: { align: `start`, variant: `default` },
  }),
  c = n(`table-cell`, {
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
  l = n(`table-row`, {
    variants: { interactive: { true: ``, false: `` } },
    compoundVariants: [{ interactive: !0, class: `table-row-interactive` }],
    defaultVariants: { interactive: !1 },
  });
function u(e, t) {
  if (e) return t ?? `none`;
}
function d(e, t) {
  return t === `ascending` ? `${e}, sorted ascending` : t === `descending` ? `${e}, sorted descending` : `Sort by ${e}`;
}
function f({ className: t, children: n, ...r }) {
  return i(`table`, { className: e(`table`, t), "data-slot": `table`, ...r, children: n });
}
function p({ className: t, children: n, ...r }) {
  return i(`thead`, { className: e(`table-head`, t), "data-slot": `table-head`, ...r, children: n });
}
function m({ className: t, children: n, ...r }) {
  return i(`tbody`, { className: e(`table-body`, t), "data-slot": `table-body`, ...r, children: n });
}
function h({ className: t, interactive: n, children: r, ...a }) {
  return i(`tr`, { className: e(l({ interactive: n, className: t })), "data-slot": `table-row`, ...a, children: r });
}
function g(e) {
  return e === `ascending` ? `keyboard_arrow_up` : e === `descending` ? `keyboard_arrow_down` : `unfold_more`;
}
function _({ label: e, sortDirection: n, onClick: r }) {
  return i(o, {
    type: `button`,
    className: `table-sort-button`,
    "data-slot": `table-sort-button`,
    "aria-label": e,
    onClick: r,
    children: i(t, { name: g(n), size: 20 }),
  });
}
function v({
  className: t,
  align: n = `start`,
  variant: r = `default`,
  avatar: o,
  sortable: c = !1,
  sortDirection: l,
  sortLabel: f,
  children: p,
  onSort: m,
  ...h
}) {
  let g = n ?? `start`,
    v = r ?? `default`,
    y = f ?? d(typeof p == `string` || typeof p == `number` ? String(p) : `column`, l);
  return i(`th`, {
    scope: `col`,
    className: e(s({ align: g, variant: v, className: t })),
    "data-slot": `table-head-cell`,
    "data-variant": v,
    "aria-sort": u(c, l),
    ...h,
    children: a(`div`, {
      className: `table-head-inner`,
      "data-slot": `table-head-inner`,
      children: [
        v === `avatar` && o
          ? i(`span`, { className: `table-head-avatar`, "data-slot": `table-head-avatar`, children: o })
          : null,
        i(`span`, { className: `table-head-label`, "data-slot": `table-head-label`, children: p }),
        c ? i(_, { label: y, sortDirection: l, onClick: m }) : null,
      ],
    }),
  });
}
function y({ variant: e, state: n, text: o, subText: s, avatar: c, showChevron: l, children: u }) {
  let d = n === `disabled`;
  return e === `custom`
    ? i(`div`, { className: `table-cell-slot`, "data-slot": `table-cell-slot`, children: u })
    : e === `stacked` || e === `avatar`
      ? a(r, {
          children: [
            e === `avatar` && c ? c : null,
            a(`div`, {
              className: `table-cell-stack`,
              "data-slot": `table-cell-stack`,
              children: [
                o
                  ? i(`span`, { className: `table-cell-primary`, "data-slot": `table-cell-primary`, children: o })
                  : null,
                s
                  ? i(`span`, { className: `table-cell-subtext`, "data-slot": `table-cell-subtext`, children: s })
                  : null,
              ],
            }),
            l && !d
              ? i(t, {
                  name: `chevron_forward`,
                  size: 20,
                  className: `table-cell-chevron`,
                  "data-slot": `table-cell-chevron`,
                })
              : null,
          ],
        })
      : a(r, {
          children: [
            o || u
              ? i(`span`, { className: `table-cell-text`, "data-slot": `table-cell-text`, children: o ?? u })
              : null,
            l && !d
              ? i(t, {
                  name: `chevron_forward`,
                  size: 20,
                  className: `table-cell-chevron`,
                  "data-slot": `table-cell-chevron`,
                })
              : null,
          ],
        });
}
function b({
  className: t,
  variant: n = `default`,
  align: r = `start`,
  state: o = `default`,
  text: s,
  subText: l,
  avatar: u,
  showChevron: d = !1,
  children: f,
  ...p
}) {
  let m = n ?? `default`,
    h = r ?? `start`,
    g = o ?? `default`,
    _ = m === `custom` || (m === "default" && !s);
  return a(`td`, {
    className: e(c({ variant: m, align: h, state: g, className: t })),
    "data-slot": `table-cell`,
    "data-variant": m,
    ...p,
    children: [
      i(`div`, {
        className: `table-cell-inner`,
        "data-slot": `table-cell-inner`,
        children: i(y, {
          variant: m,
          state: g,
          text: s,
          subText: l,
          avatar: u,
          showChevron: d,
          children: _ ? f : void 0,
        }),
      }),
      g === `focused`
        ? i(`span`, { className: `table-cell-focus-ring`, "data-slot": `table-cell-focus-ring`, "aria-hidden": !0 })
        : null,
    ],
  });
}
export {
  f as Table,
  m as TableBody,
  b as TableCell,
  v as TableHead,
  p as TableHeader,
  h as TableRow,
  c as tableCellVariants,
  s as tableHeadVariants,
  l as tableRowVariants,
};
