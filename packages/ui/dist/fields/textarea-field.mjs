import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { Textarea as t } from "../textarea.mjs";
import { t as e } from "../utils-tOxW8rXw.mjs";
const s = n(`textarea-field`, {
  variants: {
    size: { sm: ``, lg: `` },
    variant: { default: ``, suffix: `` },
    disabled: { true: `textarea-field-disabled`, false: `` },
    invalid: { true: `textarea-field-error`, false: `` },
  },
  compoundVariants: [
    { size: `sm`, variant: `default`, class: `textarea-field-preset-sm-default` },
    { size: `sm`, variant: `suffix`, class: `textarea-field-preset-sm-suffix` },
    { size: `lg`, variant: `default`, class: `textarea-field-preset-lg-default` },
    { size: `lg`, variant: `suffix`, class: `textarea-field-preset-lg-suffix` },
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
    "data-slot": `textarea-field`,
    "data-variant": T,
    children: [
      h ? i(o.Label, { htmlFor: b, className: `textarea-field-label`, children: p }) : null,
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
      g ? i(o.Description, { id: x, className: `textarea-field-helper`, children: m }) : null,
    ],
  });
}
export { c as TextareaField, s as textareaFieldVariants };
