import { jsx as r } from "react/jsx-runtime";

import { Radio as n } from "../radio.mjs";
import { n as e, t } from "../selection-field-layout-DkjrAqpo.mjs";
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
  value: y,
  ...b
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
    renderControl: (t) => r(n, { id: t, className: e, size: a, invalid: o, disabled: s, value: y, ...b }),
  });
}
export { i as RadioField, e as radioFieldVariants };
