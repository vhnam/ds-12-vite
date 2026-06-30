import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const r = t(`menu-item`, {
  variants: { variant: { single: ``, multiple: `` } },
  compoundVariants: [
    { variant: `single`, class: `menu-item-single` },
    { variant: `multiple`, class: `menu-item-multiple` },
  ],
  defaultVariants: { variant: `single` },
});
function i({ className: t, children: r }) {
  return n(`span`, { className: e(`menu-item-text`, t), "data-slot": `menu-item-text`, children: r });
}
function a({ className: t, children: r }) {
  return n(`span`, {
    className: e(`menu-item-checkbox`, t),
    "data-slot": `menu-item-checkbox`,
    "aria-hidden": !0,
    children: n(`span`, { className: `menu-item-checkbox-control`, children: r }),
  });
}
export { a as MenuItemCheckbox, i as MenuItemText, r as menuItemVariants, r as menuVariants };
