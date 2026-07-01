import { cva as n } from "class-variance-authority";
import { Fragment as r, createContext as i } from "react";
import { jsx as a, jsxs as o } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
function s(e, t) {
  if (e.length === 0) return [];
  let n = (e, t) =>
    !t && e.href
      ? { type: `link`, label: e.label, href: e.href, render: e.render }
      : { type: `page`, label: e.label, render: e.render };
  if (!t || e.length <= 3) return e.map((t, r) => n(t, r === e.length - 1));
  let r = e.slice(-2);
  return [n(e[0], !1), { type: `ellipsis` }, n(r[0], r.length === 1), ...(r.length > 1 ? [n(r[1], !0)] : [])];
}
const c = `breadcrumb-link breadcrumb-label`,
  l = i(void 0),
  u = n(`breadcrumb`, { variants: { collapsed: { true: ``, false: `` } }, defaultVariants: { collapsed: !1 } });
function d() {
  return a(`span`, {
    className: `breadcrumb-separator`,
    "data-slot": `breadcrumb-separator`,
    "aria-hidden": `true`,
    children: a(`span`, { className: `breadcrumb-icon`, children: a(t, { name: `chevron_forward`, size: 14 }) }),
  });
}
function f() {
  return a(`span`, {
    className: `breadcrumb-ellipsis`,
    "data-slot": `breadcrumb-ellipsis`,
    "aria-hidden": `true`,
    children: a(`span`, { className: `breadcrumb-icon`, children: a(t, { name: `more_horiz`, size: 14 }) }),
  });
}
function p(e, t, n) {
  return e.type === `ellipsis`
    ? a(f, {}, t)
    : e.render
      ? a(r, { children: e.render }, t)
      : e.type === `link`
        ? n
          ? a(r, { children: n({ href: e.href, label: e.label, className: c, "data-slot": `breadcrumb-link` }) }, t)
          : a(`a`, { className: c, href: e.href, "data-slot": `breadcrumb-link`, children: e.label }, t)
        : a(
            `span`,
            {
              className: `breadcrumb-page breadcrumb-label`,
              "data-slot": `breadcrumb-page`,
              "aria-current": `page`,
              children: e.label,
            },
            t,
          );
}
function m({ className: t, items: n, collapsed: r = !1, renderLink: i, "aria-label": c = `Breadcrumb`, ...f }) {
  let m = s(n, r),
    h = r && n.length > 3;
  return a(l.Provider, {
    value: 14,
    children: a(`nav`, {
      className: e(u({ collapsed: r, className: t })),
      "data-slot": `breadcrumb`,
      "data-variant": h ? `collapsed` : `default`,
      "aria-label": c,
      ...f,
      children: a(`ol`, {
        className: `breadcrumb-list`,
        children: m.map((e, t) => {
          let n = t === m.length - 1;
          return o(
            `li`,
            {
              className: `breadcrumb-item`,
              "data-slot": `breadcrumb-item`,
              children: [p(e, `${e.type}-${t}`, i), n ? null : a(d, {})],
            },
            `${e.type}-${t}`,
          );
        }),
      }),
    }),
  });
}
export { s as i, l as n, u as r, m as t };
