import { Switch as r } from "@base-ui/react/switch";
import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const i = t(`switch`, {
  variants: { disabled: { true: `switch-disabled`, false: `` } },
  defaultVariants: { disabled: !1 },
});
function a({ className: t, disabled: a = !1, checked: o, defaultChecked: s, onCheckedChange: c, ...l }) {
  return n(r.Root, {
    className: e(i({ disabled: a, className: t })),
    "data-slot": `switch`,
    checked: o,
    defaultChecked: s,
    disabled: a,
    onCheckedChange: c,
    ...l,
    children: n(r.Thumb, { className: `switch-thumb` }),
  });
}
export { a as Switch, i as switchVariants };
