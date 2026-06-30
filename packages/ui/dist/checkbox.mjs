import { Checkbox as i } from "@base-ui/react/checkbox";
import { cva as n } from "class-variance-authority";
import { jsx as r } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const a = n(`checkbox`, {
  variants: {
    size: { sm: ``, lg: `` },
    invalid: { true: `checkbox-invalid`, false: `` },
    disabled: { true: `checkbox-disabled`, false: `` },
  },
  compoundVariants: [{ size: `sm`, class: `checkbox-preset-size-sm` }],
  defaultVariants: { size: `lg`, invalid: !1, disabled: !1 },
});
function o({
  className: n,
  size: o = `lg`,
  invalid: s = !1,
  disabled: c = !1,
  checked: l,
  defaultChecked: u,
  onCheckedChange: d,
  ...f
}) {
  let p = o ?? `lg`,
    m = p === `sm` ? 12 : 16;
  return r(i.Root, {
    className: e(a({ size: o, invalid: s, disabled: c, className: n })),
    "data-slot": `checkbox`,
    "data-variant": p,
    checked: l,
    defaultChecked: u,
    disabled: c,
    "aria-invalid": s || void 0,
    onCheckedChange: d,
    ...f,
    children: r(`span`, {
      className: `checkbox-control`,
      "aria-hidden": !0,
      children: r(i.Indicator, {
        className: `checkbox-indicator`,
        keepMounted: !0,
        children: r(t, { name: `check`, size: m }),
      }),
    }),
  });
}
export { o as Checkbox, a as checkboxVariants };
