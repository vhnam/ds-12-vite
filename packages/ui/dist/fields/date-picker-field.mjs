import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { b as t } from "../icon-C8br3Qrh.mjs";
import { t as e } from "../utils-tOxW8rXw.mjs";
const s = n(`date-picker-field`, {
  variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
  compoundVariants: [
    { size: `sm`, class: `date-picker-field-preset-size-sm` },
    { size: `lg`, class: `date-picker-field-preset-size-lg` },
    { size: `sm`, disabled: !0, class: `date-picker-field-preset-size-sm-disabled` },
    { size: `lg`, disabled: !0, class: `date-picker-field-preset-size-lg-disabled` },
    { size: `sm`, invalid: !0, class: `date-picker-field-preset-size-sm-invalid` },
    { size: `lg`, invalid: !0, class: `date-picker-field-preset-size-lg-invalid` },
    { disabled: !0, class: `date-picker-field-disabled` },
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
  ..._
}) {
  let v = r(),
    y = g ?? v,
    b = `${y}-helper`,
    x = !!d,
    S = !!u,
    C = l ?? `sm`;
  return a(o.Root, {
    disabled: x,
    invalid: S,
    className: e(s({ size: C, disabled: x, invalid: S, className: c }), S && `date-picker-field-invalid`),
    "data-slot": `date-picker-field`,
    "data-variant": C,
    children: [
      m
        ? i(o.Label, {
            htmlFor: y,
            className: `date-picker-field-label`,
            "data-slot": `date-picker-field-label`,
            children: f,
          })
        : null,
      i(t, { id: y, className: n, size: C, invalid: S, disabled: x, "aria-describedby": h ? b : void 0, ..._ }),
      h
        ? i(o.Description, {
            id: b,
            className: `date-picker-field-helper`,
            "data-slot": `date-picker-field-helper`,
            children: p,
          })
        : null,
    ],
  });
}
export { c as DatePickerField, s as datePickerFieldVariants };
