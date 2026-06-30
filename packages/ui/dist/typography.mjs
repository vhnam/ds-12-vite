import { mergeProps as n } from "@base-ui/react/merge-props";
import { useRender as r } from "@base-ui/react/use-render";
import { cva as t } from "class-variance-authority";

import { t as e } from "./utils-tOxW8rXw.mjs";
const i = t(`m-0 text-semantic-text-neutral-bolder`, {
    variants: {
      variant: {
        display: `typography-display`,
        h1: `typography-h1`,
        h2: `typography-h2`,
        h3: `typography-h3`,
        h4: `typography-h4`,
        paragraph: `typography-paragraph`,
        label: `typography-label`,
      },
      size: { sm: ``, md: ``, lg: ``, xl: `` },
      weight: { regular: ``, semibold: ``, bold: `` },
    },
    compoundVariants: [
      { variant: `display`, class: `typography-preset-display-default` },
      { variant: `h1`, weight: `regular`, class: `typography-preset-heading-h1-regular` },
      { variant: `h1`, weight: `bold`, class: `typography-preset-heading-h1-bold` },
      { variant: `h2`, weight: `regular`, class: `typography-preset-heading-h2-regular` },
      { variant: `h2`, weight: `bold`, class: `typography-preset-heading-h2-bold` },
      { variant: `h3`, weight: `regular`, class: `typography-preset-heading-h3-regular` },
      { variant: `h3`, weight: `bold`, class: `typography-preset-heading-h3-bold` },
      { variant: `h4`, weight: `regular`, class: `typography-preset-heading-h4-regular` },
      { variant: `h4`, weight: `bold`, class: `typography-preset-heading-h4-bold` },
      { variant: `paragraph`, size: `sm`, weight: `regular`, class: `typography-preset-paragraph-small` },
      { variant: `paragraph`, size: `md`, weight: `regular`, class: `typography-preset-paragraph-default` },
      { variant: `paragraph`, size: `md`, weight: `semibold`, class: `typography-preset-paragraph-default-strong` },
      { variant: `paragraph`, size: `lg`, weight: `regular`, class: `typography-preset-paragraph-large` },
      { variant: `paragraph`, size: `lg`, weight: `semibold`, class: `typography-preset-paragraph-large-strong` },
      { variant: `paragraph`, size: `xl`, weight: `semibold`, class: `typography-preset-paragraph-xlarge-strong` },
      { variant: `label`, size: `sm`, class: `typography-preset-label-small` },
      { variant: `label`, size: `md`, class: `typography-preset-label-default` },
      { variant: `label`, size: `lg`, class: `typography-preset-label-large` },
    ],
    defaultVariants: { variant: `paragraph`, size: `md`, weight: `regular` },
  }),
  a = new Set([`h1`, `h2`, `h3`, `h4`]);
function o(e, t, n) {
  if (
    process.env.NODE_ENV !== `production` &&
    (e === `display` &&
      (t !== void 0 || n !== void 0) &&
      console.warn(`[Typography] variant="display" does not accept size or weight props.`),
    a.has(e) && t !== void 0 && console.warn(`[Typography] variant="${e}" does not accept a size prop.`),
    e === `label` && n !== void 0 && console.warn(`[Typography] variant="label" does not accept a weight prop.`),
    a.has(e) &&
      n === `semibold` &&
      console.warn(`[Typography] variant="${e}" only supports weight="regular" or weight="bold".`),
    e === `paragraph`)
  ) {
    let e = t ?? `md`,
      r = n ?? `regular`;
    (e === `sm` && r !== `regular` && console.warn(`[Typography] paragraph size="sm" only supports weight="regular".`),
      e === `xl` &&
        r !== `semibold` &&
        console.warn(`[Typography] paragraph size="xl" only supports weight="semibold".`));
  }
}
function s(e, t, n) {
  if ((o(e, t, n), e === `display`)) return { variant: e, size: void 0, weight: void 0 };
  if (e === `label`) return { variant: e, size: t ?? `md`, weight: void 0 };
  if (a.has(e)) return { variant: e, size: void 0, weight: n ?? `bold` };
  let r = t ?? `md`,
    i = n ?? `regular`;
  return (r === `sm` && (i = `regular`), r === `xl` && (i = `semibold`), { variant: e, size: r, weight: i });
}
function c({ className: t, variant: a, size: o, weight: c, children: l, render: u, ...d }) {
  let f = s(a, o, c),
    p = { slot: `typography`, variant: a, size: f.size, weight: f.weight },
    m = typeof u == `string`;
  return r({
    defaultTagName: m ? u : `div`,
    props: n({ className: e(i({ ...f, className: t })), children: l, "data-slot": `typography`, "data-variant": a }, d),
    render: m ? void 0 : u,
    state: p,
  });
}
export { c as Typography, i as typographyVariants };
