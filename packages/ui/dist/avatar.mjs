import { Avatar as n } from "@base-ui/react/avatar";
import { cva as r } from "class-variance-authority";
import { jsx as i, jsxs as a } from "react/jsx-runtime";

import { n as t } from "./icon-X93sOh_U.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const o = { sm: 14, md: 16, lg: 20 },
  s = { circle: `person`, square: `apartment` },
  c = r(`avatar`, {
    variants: {
      size: { sm: ``, md: ``, lg: `` },
      shape: { circle: ``, square: `` },
      variant: { initial: ``, image: ``, icon: `` },
    },
    compoundVariants: [
      { size: `sm`, class: `avatar-preset-size-sm` },
      { size: `md`, class: `avatar-preset-size-md` },
      { size: `lg`, class: `avatar-preset-size-lg` },
      { shape: `circle`, class: `avatar-circle` },
      { shape: `square`, class: `avatar-square` },
      { variant: `image`, shape: `circle`, class: `avatar-image-circle` },
      { variant: `image`, shape: `square`, class: `avatar-image-square` },
    ],
    defaultVariants: { size: `md`, shape: `circle`, variant: `initial` },
  }),
  l = r(`avatar-icon`, {
    variants: { size: { sm: `avatar-preset-icon-sm`, md: `avatar-preset-icon-md`, lg: `avatar-preset-icon-lg` } },
    defaultVariants: { size: `md` },
  });
function u({ children: e }) {
  return i(`span`, { className: `avatar-initials`, children: e });
}
function d({ shape: e, size: n, icon: r }) {
  let a = o[n];
  return i(`span`, { className: l({ size: n }), children: r ?? i(t, { name: s[e], size: a }) });
}
function f(e, t, n, r) {
  return (e === `image` && n && r) || !t ? {} : { role: `img`, "aria-label": t };
}
function p({
  className: t,
  size: r = `md`,
  shape: o = `circle`,
  variant: s = `initial`,
  initials: l,
  src: p,
  alt: m = ``,
  icon: h,
  "aria-label": g,
  ..._
}) {
  let v = r ?? `md`,
    y = o ?? `circle`,
    b = s ?? `initial`,
    x = e(c({ size: r, shape: o, variant: s, className: t })),
    S = f(b, g ?? (l || (b === `image` && m ? m : `User avatar`)), p, m);
  return b === `image`
    ? a(n.Root, {
        className: x,
        "data-slot": `avatar`,
        "data-variant": b,
        ...S,
        ..._,
        children: [
          p ? i(n.Image, { className: `avatar-image`, src: p, alt: m }) : null,
          i(n.Fallback, {
            className: `avatar-fallback`,
            delay: 0,
            children: l ? i(u, { children: l }) : i(d, { shape: y, size: v, icon: h }),
          }),
        ],
      })
    : i(n.Root, {
        className: x,
        "data-slot": `avatar`,
        "data-variant": b,
        ...S,
        ..._,
        children: b === `initial` && l ? i(u, { children: l }) : i(d, { shape: y, size: v, icon: h }),
      });
}
export { p as Avatar, c as avatarVariants };
