import { cva as n } from "class-variance-authority";
import { createContext as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const o = { sm: 20, lg: 24 },
  s = r(void 0),
  c = n(`textarea`, {
    variants: {
      size: { sm: ``, lg: `` },
      variant: { default: ``, suffix: `` },
      disabled: { true: `textarea-disabled`, false: `` },
      invalid: { true: `textarea-error`, false: `` },
    },
    compoundVariants: [
      { size: `sm`, variant: `default`, class: `textarea-preset-sm-default` },
      { size: `sm`, variant: `suffix`, class: `textarea-preset-sm-suffix` },
      { size: `lg`, variant: `default`, class: `textarea-preset-lg-default` },
      { size: `lg`, variant: `suffix`, class: `textarea-preset-lg-suffix` },
    ],
    defaultVariants: { size: `sm`, variant: `default`, disabled: !1, invalid: !1 },
  });
function l({
  className: n,
  size: r = `sm`,
  variant: l = `default`,
  invalid: u = !1,
  disabled: d,
  leadingIcon: f,
  showLeadingIcon: p = !1,
  suffix: m,
  placeholder: h = `Input`,
  ...g
}) {
  let _ = r ?? `sm`,
    v = l ?? `default`,
    y = !!d,
    b = !!u,
    x = o[_],
    S = p,
    C = v === `suffix` && m !== void 0,
    w = S ? (f ?? i(t, { name: `person`, size: x })) : null,
    T = i(`textarea`, {
      className: `textarea-control`,
      disabled: y,
      "aria-invalid": b || void 0,
      placeholder: h,
      ...g,
    });
  return i(s.Provider, {
    value: x,
    children: a(`div`, {
      className: e(c({ size: _, variant: v, disabled: y, invalid: b, className: n })),
      "data-slot": `textarea`,
      "data-variant": v,
      children: [
        w ? i(`span`, { className: `textarea-leading`, children: w }) : null,
        v === `suffix`
          ? a(`div`, {
              className: `textarea-content`,
              children: [T, C ? i(`span`, { className: `textarea-suffix`, children: m }) : null],
            })
          : T,
      ],
    }),
  });
}
export { l as Textarea, s as TextareaIconSizeContext, c as textareaVariants };
