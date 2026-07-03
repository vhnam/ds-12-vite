import { Switch as r } from "@base-ui/react/switch";
import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const i = t(`switch`, {
  variants: { invalid: { true: `switch-invalid`, false: `` }, disabled: { true: `switch-disabled`, false: `` } },
  defaultVariants: { invalid: !1, disabled: !1 },
});
function a({
  className: t,
  invalid: a = !1,
  disabled: o = !1,
  checked: s,
  defaultChecked: c,
  onCheckedChange: l,
  ...u
}) {
  return n(r.Root, {
    className: e(i({ invalid: a, disabled: o, className: t })),
    "data-slot": `switch`,
    checked: s,
    defaultChecked: c,
    disabled: o,
    "aria-invalid": a || void 0,
    onCheckedChange: l,
    ...u,
    children: n(r.Thumb, { className: `switch-thumb` }),
  });
}
export { a as Switch, i as switchVariants };
