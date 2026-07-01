import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import "./selection-field-layout-B8dq3g0S.css";
import { Input as t } from "./input.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const s = n(`ds-selection-field`, {
  variants: {
    size: { sm: `ds-selection-field--sm`, lg: `ds-selection-field--lg` },
    disabled: { true: `ds-selection-field--disabled`, false: null },
    invalid: { true: `ds-selection-field--error`, false: null },
    supportingText: { true: `ds-selection-field--supporting-text`, false: null },
    input: { true: `ds-selection-field--input`, false: null },
  },
  defaultVariants: { size: `sm`, disabled: !1, invalid: !1, supportingText: !1, input: !1 },
});
function c({
  renderControl: n,
  fieldClassName: c,
  size: l = `sm`,
  invalid: u = !1,
  disabled: d,
  label: f = `Selection label`,
  supportingText: p = `Supporting text`,
  suffix: m = `Suffix`,
  helperText: h = `Helper Text`,
  showLabel: g = !0,
  showSupportingText: _ = !1,
  showSuffix: v = !0,
  showHelperText: y = !0,
  showInput: b = !1,
  inputProps: x,
  id: S,
}) {
  let C = r(),
    w = S ?? C,
    T = `${w}-input`,
    E = `${w}-helper`,
    D = !!d,
    O = !!u,
    k = l ?? `sm`;
  return a(o.Root, {
    disabled: D,
    invalid: O,
    className: e(s({ size: k, disabled: D, invalid: O, supportingText: _, input: b, className: c })),
    children: [
      a(`div`, {
        className: `ds-selection-field__row`,
        children: [
          n(w),
          g || _
            ? a(`div`, {
                className: `ds-selection-field__content`,
                children: [
                  g ? i(o.Label, { htmlFor: w, className: `ds-selection-field__label`, children: f }) : null,
                  _ ? i(`span`, { className: `ds-selection-field__supporting`, children: p }) : null,
                ],
              })
            : null,
          v ? i(`span`, { className: `ds-selection-field__suffix`, children: m }) : null,
        ],
      }),
      b
        ? i(t, {
            id: T,
            size: `lg`,
            invalid: O,
            disabled: D,
            placeholder: `Input`,
            "aria-describedby": O && y ? E : void 0,
            ...x,
          })
        : null,
      O && y ? i(o.Description, { id: E, className: `ds-selection-field__helper`, children: h }) : null,
    ],
  });
}
export { s as n, c as t };
