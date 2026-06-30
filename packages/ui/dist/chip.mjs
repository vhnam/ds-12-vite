import { Button as a } from "@base-ui/react/button";
import { cva as n } from "class-variance-authority";
import { jsx as r, jsxs as i } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const o = n(`chip`, {
  variants: {
    active: { false: ``, true: `` },
    hasLeading: { true: ``, false: `` },
    hasTrailing: { true: ``, false: `` },
  },
  compoundVariants: [
    { active: !1, class: `chip-inactive` },
    { active: !0, class: `chip-active` },
    { hasLeading: !0, hasTrailing: !0, class: `chip-preset-padding-both` },
    { hasLeading: !0, hasTrailing: !1, class: `chip-preset-padding-leading` },
    { hasLeading: !1, hasTrailing: !0, class: `chip-preset-padding-trailing` },
    { hasLeading: !1, hasTrailing: !1, class: `chip-preset-padding-label` },
  ],
  defaultVariants: { active: !1, hasLeading: !1, hasTrailing: !1 },
});
function s({
  children: n,
  className: s,
  active: c = !1,
  showLeadingIcon: l = !1,
  showTrailingIcon: u = !1,
  leadingIcon: d,
  trailingIcon: f,
  disabled: p,
  ...m
}) {
  let h = l,
    g = u,
    _ = h ? (d ?? r(t, { name: `filter_list`, size: 16 })) : null,
    v = g ? (f ?? r(t, { name: `keyboard_arrow_down`, size: 16 })) : null;
  return i(a, {
    type: `button`,
    className: e(o({ active: c, hasLeading: h, hasTrailing: g, className: s })),
    "data-slot": `chip`,
    disabled: p,
    focusableWhenDisabled: !0,
    "aria-pressed": c,
    ...m,
    children: [
      _ ? r(`span`, { className: `chip-icon`, children: _ }) : null,
      r(`span`, { className: `chip-label`, children: n }),
      v ? r(`span`, { className: `chip-icon`, children: v }) : null,
    ],
  });
}
export { s as Chip, o as chipVariants };
