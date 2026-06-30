import { Radio as r } from "@base-ui/react/radio";
import { RadioGroup as i } from "@base-ui/react/radio-group";
import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const a = t(`radio`, {
  variants: {
    size: { sm: ``, lg: `` },
    invalid: { true: `radio-invalid`, false: `` },
    disabled: { true: `radio-disabled`, false: `` },
  },
  compoundVariants: [{ size: `sm`, class: `radio-preset-size-sm` }],
  defaultVariants: { size: `lg`, invalid: !1, disabled: !1 },
});
function o({ className: t, size: i = `lg`, invalid: o = !1, disabled: s = !1, value: c, ...l }) {
  let u = i ?? `lg`;
  return n(r.Root, {
    className: e(a({ size: i, invalid: o, disabled: s, className: t })),
    "data-slot": `radio`,
    "data-variant": u,
    value: c,
    disabled: s,
    "aria-invalid": o || void 0,
    ...l,
    children: n(`span`, {
      className: `radio-control`,
      "aria-hidden": !0,
      children: n(r.Indicator, { className: `radio-indicator`, keepMounted: !0 }),
    }),
  });
}
function s({ className: e, ...t }) {
  return n(i, { className: e, ...t });
}
export { o as Radio, s as RadioGroup, a as radioVariants };
