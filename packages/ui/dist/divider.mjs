import { Separator as r } from "@base-ui/react/separator";
import { cva as t } from "class-variance-authority";
import { jsx as n } from "react/jsx-runtime";

import { t as e } from "./utils-tOxW8rXw.mjs";
const i = t(`divider`, {
  variants: { orientation: { horizontal: ``, vertical: `` } },
  compoundVariants: [
    { orientation: `horizontal`, class: `divider-horizontal` },
    { orientation: `vertical`, class: `divider-vertical` },
  ],
  defaultVariants: { orientation: `horizontal` },
});
function a({ className: t, orientation: a = `horizontal`, ...o }) {
  let s = a ?? `horizontal`;
  return n(r, {
    className: e(i({ orientation: a, className: t })),
    "data-slot": `divider`,
    "data-variant": s,
    orientation: s,
    ...o,
  });
}
export { a as Divider, i as dividerVariants };
