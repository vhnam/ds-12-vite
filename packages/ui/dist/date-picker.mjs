import { Popover as c } from "@base-ui/react/popover";
import { cva as r } from "class-variance-authority";
import { createContext as i, useState as a } from "react";
import { jsx as o, jsxs as s } from "react/jsx-runtime";

import { t as n } from "./calendar-CbfvgQnx.mjs";
import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const l = { sm: 20, lg: 24 },
  u = i(void 0),
  d = r(`date-picker`, {
    variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
    compoundVariants: [
      { size: `sm`, class: `date-picker-preset-size-sm` },
      { size: `lg`, class: `date-picker-preset-size-lg` },
      { size: `sm`, disabled: !0, class: `date-picker-preset-size-sm-disabled` },
      { size: `lg`, disabled: !0, class: `date-picker-preset-size-lg-disabled` },
      { size: `sm`, invalid: !0, class: `date-picker-preset-size-sm-invalid` },
      { size: `lg`, invalid: !0, class: `date-picker-preset-size-lg-invalid` },
    ],
    defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
  });
function f(e) {
  return e.toLocaleDateString(`en-US`, { month: `short`, day: `numeric`, year: `numeric` });
}
function p(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`;
}
function m({
  className: r,
  size: i = `sm`,
  invalid: m = !1,
  disabled: h,
  placeholder: g = `Select date`,
  leadingIcon: _,
  showLeadingIcon: v = !1,
  value: y,
  defaultValue: b,
  onValueChange: x,
  defaultOpen: S,
  open: C,
  onOpenChange: w,
  id: T,
  name: E,
  required: D,
  "aria-describedby": O,
  "aria-label": k,
  ...A
}) {
  let j = i ?? `sm`,
    M = !!h,
    N = !!m,
    P = l[j],
    F = v ? (_ ?? o(t, { name: `event`, size: P })) : null,
    [I, L] = a(b),
    [R, z] = a(S ?? !1),
    B = y !== void 0,
    V = C !== void 0,
    H = B ? y : I,
    U = V ? C : R,
    W = (e) => {
      (V || z(e), w?.(e));
    },
    G = (e) => {
      (B || L(e), x?.(e), W(!1));
    };
  return o(u.Provider, {
    value: P,
    children: s(c.Root, {
      open: U,
      onOpenChange: W,
      modal: !1,
      children: [
        s(`div`, {
          className: e(d({ size: j, disabled: M, invalid: N, className: r })),
          "data-slot": `date-picker`,
          "data-variant": j,
          children: [
            s(c.Trigger, {
              id: T,
              className: `date-picker-trigger`,
              "data-slot": `date-picker-trigger`,
              disabled: M,
              "aria-invalid": N || void 0,
              "aria-describedby": O,
              "aria-disabled": M || void 0,
              "aria-label": k,
              children: [
                F
                  ? o(`span`, { className: `date-picker-leading`, "data-slot": `date-picker-leading`, children: F })
                  : null,
                o(`span`, {
                  className: `date-picker-value`,
                  "data-slot": `date-picker-value`,
                  "data-placeholder": H ? void 0 : ``,
                  children: H ? f(H) : g,
                }),
                o(`span`, {
                  className: `date-picker-trailing`,
                  "data-slot": `date-picker-trailing`,
                  children: o(t, { name: `calendar_today`, size: P }),
                }),
              ],
            }),
            E ? o(`input`, { type: `hidden`, name: E, value: H ? p(H) : ``, required: D }) : null,
          ],
        }),
        o(c.Portal, {
          children: o(c.Positioner, {
            className: `date-picker-positioner`,
            "data-slot": `date-picker-positioner`,
            sideOffset: 4,
            align: `start`,
            children: o(c.Popup, {
              className: `date-picker-popup`,
              "data-slot": `date-picker-popup`,
              children: o(n, {
                ...A,
                variant: `default`,
                mode: `single`,
                selected: H,
                onSelect: G,
                defaultMonth: A.defaultMonth ?? H,
                className: `[&_.rdp-month]:w-full`,
              }),
            }),
          }),
        }),
      ],
    }),
  });
}
export { m as DatePicker, u as DatePickerIconSizeContext, d as datePickerVariants };
