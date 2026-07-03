import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { o as t } from "../icon-C8br3Qrh.mjs";
import { t as e } from "../utils-tOxW8rXw.mjs";
const s = n(`select-field`, {
  variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
  compoundVariants: [
    { size: `sm`, class: `select-field-preset-size-sm` },
    { size: `lg`, class: `select-field-preset-size-lg` },
    { size: `sm`, disabled: !0, class: `select-field-preset-size-sm-disabled` },
    { size: `lg`, disabled: !0, class: `select-field-preset-size-lg-disabled` },
    { size: `sm`, invalid: !0, class: `select-field-preset-size-sm-invalid` },
    { size: `lg`, invalid: !0, class: `select-field-preset-size-lg-invalid` },
    { disabled: !0, class: `select-field-disabled` },
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
    className: e(s({ size: w, disabled: S, invalid: C, className: c }), C && `select-field-invalid`),
    "data-slot": `select-field`,
    "data-variant": w,
    children: [
      m
        ? i(o.Label, { htmlFor: b, className: `select-field-label`, "data-slot": `select-field-label`, children: f })
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
        ? i(o.Description, { id: x, className: `select-field-helper`, "data-slot": `select-field-helper`, children: p })
        : null,
    ],
  });
}
export { c as SelectField, s as selectFieldVariants };
