import { Select as o } from "@base-ui/react/select";
import { cva as n } from "class-variance-authority";
import { createContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const s = { sm: 20, lg: 24 },
  c = r(void 0),
  l = n(`select`, {
    variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
    compoundVariants: [
      { size: `sm`, class: `select-preset-size-sm` },
      { size: `lg`, class: `select-preset-size-lg` },
      { size: `sm`, disabled: !0, class: `select-preset-size-sm-disabled` },
      { size: `lg`, disabled: !0, class: `select-preset-size-lg-disabled` },
      { size: `sm`, invalid: !0, class: `select-preset-size-sm-invalid` },
      { size: `lg`, invalid: !0, class: `select-preset-size-lg-invalid` },
    ],
    defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
  });
function u({
  className: n,
  size: r = `sm`,
  invalid: u = !1,
  disabled: d,
  placeholder: f = `Option`,
  options: p,
  leadingIcon: m,
  showLeadingIcon: h = !1,
  value: g,
  defaultValue: _,
  onValueChange: v,
  defaultOpen: y,
  open: b,
  onOpenChange: x,
  id: S,
  name: C,
  required: w,
  "aria-describedby": T,
  "aria-label": E,
}) {
  let D = r ?? `sm`,
    O = !!d,
    k = !!u,
    A = s[D],
    j = h ? (m ?? i(t, { name: `person`, size: A })) : null;
  return i(c.Provider, {
    value: A,
    children: a(o.Root, {
      items: p,
      value: g,
      defaultValue: _,
      onValueChange: v,
      disabled: O,
      modal: !1,
      defaultOpen: y,
      open: b,
      onOpenChange: x,
      name: C,
      required: w,
      children: [
        i(`div`, {
          className: e(l({ size: D, disabled: O, invalid: k, className: n })),
          "data-slot": `select`,
          "data-variant": D,
          children: a(o.Trigger, {
            id: S,
            className: `select-trigger`,
            "data-slot": `select-trigger`,
            disabled: O,
            "aria-invalid": k || void 0,
            "aria-describedby": T,
            "aria-disabled": O || void 0,
            "aria-label": E,
            children: [
              j ? i(`span`, { className: `select-leading`, "data-slot": `select-leading`, children: j }) : null,
              i(o.Value, { placeholder: f, className: `select-value`, "data-slot": `select-value` }),
              i(o.Icon, {
                className: `select-trailing`,
                render: (n, { open: r }) =>
                  i(`span`, {
                    ...n,
                    className: e(`select-trailing`, n.className),
                    "data-slot": `select-trailing`,
                    children: i(t, { name: r ? `arrow_drop_up` : `arrow_drop_down`, size: A }),
                  }),
              }),
            ],
          }),
        }),
        i(o.Portal, {
          children: i(o.Positioner, {
            className: `select-positioner`,
            "data-slot": `select-positioner`,
            sideOffset: 4,
            align: `start`,
            alignItemWithTrigger: !1,
            children: i(o.Popup, {
              className: `select-popup`,
              "data-slot": `select-popup`,
              children: i(o.List, {
                className: `select-list`,
                "data-slot": `select-list`,
                children: p.map((e) =>
                  i(
                    o.Item,
                    {
                      value: e.value,
                      label: e.label,
                      disabled: e.disabled,
                      className: `select-item`,
                      "data-slot": `select-item`,
                      children: i(o.ItemText, {
                        className: `select-item-text`,
                        "data-slot": `select-item-text`,
                        children: e.label,
                      }),
                    },
                    e.value,
                  ),
                ),
              }),
            }),
          }),
        }),
      ],
    }),
  });
}
export { u as Select, c as SelectIconSizeContext, l as selectVariants };
