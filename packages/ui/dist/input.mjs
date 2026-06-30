import { Input as o } from "@base-ui/react/input";
import { cva as n } from "class-variance-authority";
import { createContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const s = { sm: 20, lg: 24 },
  c = r(void 0),
  l = n(`input`, {
    variants: {
      size: { sm: ``, lg: `` },
      variant: { default: ``, suffix: `` },
      disabled: { true: `input-disabled`, false: `` },
      invalid: { true: `input-error`, false: `` },
    },
    compoundVariants: [
      { size: `sm`, variant: `default`, class: `input-preset-sm-default` },
      { size: `sm`, variant: `suffix`, class: `input-preset-sm-suffix` },
      { size: `lg`, variant: `default`, class: `input-preset-lg-default` },
      { size: `lg`, variant: `suffix`, class: `input-preset-lg-suffix` },
    ],
    defaultVariants: { size: `sm`, variant: `default`, disabled: !1, invalid: !1 },
  });
function u({
  className: n,
  size: r = `sm`,
  variant: u = `default`,
  invalid: d = !1,
  disabled: f,
  leadingIcon: p,
  trailingIcon: m,
  showLeadingIcon: h = !1,
  showTrailingIcon: g = !1,
  suffix: _,
  placeholder: v = `Input`,
  ...y
}) {
  let b = r ?? `sm`,
    x = u ?? `default`,
    S = !!f,
    C = !!d,
    w = s[b],
    T = h,
    E = g && x === "default",
    D = x === `suffix` && _ !== void 0,
    O = T ? (p ?? i(t, { name: `person`, size: w })) : null,
    k = E ? (m ?? i(t, { name: C ? `error` : `visibility`, size: w, variant: C ? `filled` : `outlined` })) : null;
  return i(c.Provider, {
    value: w,
    children: a(`div`, {
      className: e(l({ size: b, variant: x, disabled: S, invalid: C, className: n })),
      "data-slot": `input`,
      "data-variant": x,
      children: [
        O ? i(`span`, { className: `input-leading`, children: O }) : null,
        i(o, { className: `input-control`, disabled: S, "aria-invalid": C || void 0, placeholder: v, ...y }),
        D ? i(`span`, { className: `input-suffix`, children: _ }) : null,
        k ? i(`span`, { className: `input-trailing`, children: k }) : null,
      ],
    }),
  });
}
export { u as Input, c as InputIconSizeContext, l as inputVariants };
