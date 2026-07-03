import { jsx as r } from "react/jsx-runtime";

import { n as e, t } from "../selection-field-layout-DkjrAqpo.mjs";
import { Switch as n } from "../switch.mjs";
function i({
  className: e,
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
  return r(t, {
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
    renderControl: (t) =>
      r(n, { id: t, className: e, invalid: o, disabled: s, checked: y, defaultChecked: b, onCheckedChange: x, ...S }),
  });
}
export { i as SwitchField, e as switchFieldVariants };
