import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { Input as t } from "../input.mjs";
import { t as e } from "../utils-tOxW8rXw.mjs";
const s = n(`input-field`, {
  variants: {
    size: { sm: ``, lg: `` },
    variant: { default: ``, suffix: `` },
    disabled: { true: `input-field-disabled`, false: `` },
    invalid: { true: `input-field-error`, false: `` },
  },
  compoundVariants: [
    { size: `sm`, variant: `default`, class: `input-field-preset-sm-default` },
    { size: `sm`, variant: `suffix`, class: `input-field-preset-sm-suffix` },
    { size: `lg`, variant: `default`, class: `input-field-preset-lg-default` },
    { size: `lg`, variant: `suffix`, class: `input-field-preset-lg-suffix` },
  ],
  defaultVariants: { size: `sm`, variant: `default`, disabled: !1, invalid: !1 },
});
function c({
  className: n,
  fieldClassName: c,
  size: l = `sm`,
  variant: u = `default`,
  invalid: d = !1,
  disabled: f,
  label: p = `Label`,
  helperText: m = `Helper text`,
  showLabel: h = !0,
  showHelperText: g = !0,
  id: _,
  ...v
}) {
  let y = r(),
    b = _ ?? y,
    x = `${b}-helper`,
    S = !!f,
    C = !!d,
    w = l ?? `sm`,
    T = u ?? `default`;
  return a(o.Root, {
    disabled: S,
    invalid: C,
    className: e(s({ size: w, variant: T, disabled: S, invalid: C, className: c })),
    "data-slot": `input-field`,
    "data-variant": T,
    children: [
      h ? i(o.Label, { htmlFor: b, className: `input-field-label`, children: p }) : null,
      i(t, {
        id: b,
        className: n,
        size: w,
        variant: T,
        invalid: C,
        disabled: S,
        "aria-describedby": g ? x : void 0,
        ...v,
      }),
      g ? i(o.Description, { id: x, className: `input-field-helper`, children: m }) : null,
    ],
  });
}
export { c as InputField, s as inputFieldVariants };
