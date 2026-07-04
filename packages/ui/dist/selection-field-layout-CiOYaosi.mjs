import { Field as o } from "@base-ui/react/field";
import { cva as n } from "class-variance-authority";
import { useId as r } from "react";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { _ as t } from "./icon-X93sOh_U.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const s = n(`selection-field`, {
  variants: {
    size: { sm: ``, lg: `` },
    disabled: { true: ``, false: `` },
    invalid: { true: ``, false: `` },
    supportingText: { true: ``, false: `` },
    input: { true: ``, false: `` },
  },
  compoundVariants: [
    { size: `sm`, class: `selection-field-preset-size-sm` },
    { size: `lg`, class: `selection-field-preset-size-lg` },
    { size: `sm`, disabled: !0, class: `selection-field-preset-size-sm-disabled` },
    { size: `lg`, disabled: !0, class: `selection-field-preset-size-lg-disabled` },
    { size: `sm`, invalid: !0, class: `selection-field-preset-size-sm-invalid` },
    { size: `lg`, invalid: !0, class: `selection-field-preset-size-lg-invalid` },
    { disabled: !0, class: `selection-field-disabled` },
    { invalid: !0, class: `selection-field-gap` },
    { input: !0, class: `selection-field-gap` },
  ],
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
  suffix: m,
  helperText: h = `Helper Text`,
  showLabel: g = !0,
  showSupportingText: _ = !1,
  showSuffix: v = !1,
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
    k = l ?? `sm`,
    A = !!m && v;
  return a(o.Root, {
    disabled: D,
    invalid: O,
    className: e(
      s({ size: k, disabled: D, invalid: O, supportingText: _, input: b, className: c }),
      O && `selection-field-invalid`,
    ),
    "data-slot": `selection-field`,
    "data-variant": k,
    children: [
      a(`div`, {
        className: e(`selection-field-row`, _ && `selection-field-row-supporting`),
        "data-slot": `selection-field-row`,
        children: [
          n(w),
          g || _
            ? a(`div`, {
                className: `selection-field-content`,
                "data-slot": `selection-field-content`,
                children: [
                  g
                    ? i(o.Label, {
                        htmlFor: w,
                        className: `selection-field-label`,
                        "data-slot": `selection-field-label`,
                        children: f,
                      })
                    : null,
                  _
                    ? i(`span`, {
                        className: `selection-field-supporting`,
                        "data-slot": `selection-field-supporting`,
                        children: p,
                      })
                    : null,
                ],
              })
            : null,
          A
            ? i(`span`, { className: `selection-field-suffix`, "data-slot": `selection-field-suffix`, children: m })
            : null,
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
      O && y
        ? i(o.Description, {
            id: E,
            className: `selection-field-helper`,
            "data-slot": `selection-field-helper`,
            children: h,
          })
        : null,
    ],
  });
}
export { s as n, c as t };
