import { useContext as n } from "react";
import { jsx as r } from "react/jsx-runtime";

import { BadgeIconSizeContext as t } from "./badge.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const i = 20;
function a(e, t) {
  return `"FILL" ${+(e === `filled`)}, "wght" 400, "GRAD" 0, "opsz" ${t}`;
}
function o({ name: i, variant: o = `outlined`, align: s, size: c, className: l, style: u, ...d }) {
  let f = n(t),
    p = c ?? f ?? 20;
  return r(`span`, {
    className: e(`material-symbols-outlined`, `icon`, l),
    "data-slot": `icon`,
    "data-align": s,
    style: { fontSize: p, fontVariationSettings: a(o, p), ...u },
    "aria-hidden": !0,
    ...d,
    children: i,
  });
}
export { i as DEFAULT_ICON_SIZE, o as Icon };
