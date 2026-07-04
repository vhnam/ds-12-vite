import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { T as t } from "../icon-X93sOh_U.mjs";
import { t as e } from "../utils-tOxW8rXw.mjs";
const s = n(`combobox-field`, {
  variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
  compoundVariants: [
    { size: `sm`, class: `combobox-field-preset-size-sm` },
    { size: `lg`, class: `combobox-field-preset-size-lg` },
    { size: `sm`, disabled: !0, class: `combobox-field-preset-size-sm-disabled` },
    { size: `lg`, disabled: !0, class: `combobox-field-preset-size-lg-disabled` },
    { size: `sm`, invalid: !0, class: `combobox-field-preset-size-sm-invalid` },
    { size: `lg`, invalid: !0, class: `combobox-field-preset-size-lg-invalid` },
    { disabled: !0, class: `combobox-field-disabled` },
  ],
  defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
});
function c({
  className: n,
  fieldClassName: c,
  size: l = `sm`,
  invalid: u = !1,
  disabled: d,
  label: f = `Label`,
  helperText: p = `Helper text`,
  showLabel: m = !0,
  showHelperText: h = !0,
  id: g,
  options: _,
  ...v
}) {
  let y = r(),
    b = g ?? y,
    x = `${b}-helper`,
    S = !!d,
    C = !!u,
    w = l ?? `sm`;
  return a(o.Root, {
    disabled: S,
    invalid: C,
    className: e(s({ size: w, disabled: S, invalid: C, className: c }), C && `combobox-field-invalid`),
    "data-slot": `combobox-field`,
    "data-variant": w,
    children: [
      m
        ? i(o.Label, {
            htmlFor: b,
            className: `combobox-field-label`,
            "data-slot": `combobox-field-label`,
            children: f,
          })
        : null,
      i(t, {
        id: b,
        className: n,
        size: w,
        invalid: C,
        disabled: S,
        options: _,
        "aria-describedby": h ? x : void 0,
        ...v,
      }),
      h
        ? i(o.Description, {
            id: x,
            className: `combobox-field-helper`,
            "data-slot": `combobox-field-helper`,
            children: p,
          })
        : null,
    ],
  });
}
export { c as ComboboxField, s as comboboxFieldVariants };
