import { jsx as r } from "react/jsx-runtime";

import { Checkbox as e } from "../checkbox.mjs";
import { n as t, t as n } from "../selection-field-layout-DkjrAqpo.mjs";
function i({
  className: t,
  fieldClassName: i,
  size: a = `sm`,
  invalid: o = !1,
  disabled: s,
  label: c,
  supportingText: l,
  suffix: u,
  helperText: d,
  showLabel: f,
  showSupportingText: p,
  showSuffix: m,
  showHelperText: h,
  showInput: g,
  inputProps: _,
  id: v,
  checked: y,
  defaultChecked: b,
  onCheckedChange: x,
  ...S
}) {
  return r(n, {
    fieldClassName: i,
    size: a,
    invalid: o,
    disabled: s,
    label: c,
    supportingText: l,
    suffix: u,
    helperText: d,
    showLabel: f,
    showSupportingText: p,
    showSuffix: m,
    showHelperText: h,
    showInput: g,
    inputProps: _,
    id: v,
    renderControl: (n) =>
      r(e, {
        id: n,
        className: t,
        size: a,
        invalid: o,
        disabled: s,
        checked: y,
        defaultChecked: b,
        onCheckedChange: x,
        ...S,
      }),
  });
}
export { i as CheckboxField, t as checkboxFieldVariants };
