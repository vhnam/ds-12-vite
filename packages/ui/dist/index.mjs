import { cva as H } from "class-variance-authority";
import { createContext as Me } from "react";
import { jsx as U, jsxs as W } from "react/jsx-runtime";

import { Avatar as o, avatarVariants as s } from "./avatar.mjs";
import { Badge as t, BadgeIconSizeContext as n, badgeVariants as r } from "./badge.mjs";
import { i as c, n as l, r as u, t as d } from "./breadcrumb-D_bz7zHR.mjs";
import { Button as f, buttonVariants as p } from "./button.mjs";
import { n as m, t as ee } from "./calendar-CbfvgQnx.mjs";
import { Chip as g, chipVariants as re } from "./chip.mjs";
import { Combobox as v, ComboboxIconSizeContext as y, comboboxVariants as b } from "./combobox.mjs";
import { DatePicker as te, DatePickerIconSizeContext as ne, datePickerVariants as h } from "./date-picker.mjs";
import { Divider as ie, dividerVariants as ae } from "./divider.mjs";
import { CheckboxField as F } from "./fields/checkbox-field.mjs";
import { ComboboxField as D, comboboxFieldVariants as O } from "./fields/combobox-field.mjs";
import { DatePickerField as T, datePickerFieldVariants as E } from "./fields/date-picker-field.mjs";
import { InputField as x, inputFieldVariants as S } from "./fields/input-field.mjs";
import { RadioField as z } from "./fields/radio-field.mjs";
import { SelectField as C, selectFieldVariants as w } from "./fields/select-field.mjs";
import { SwitchField as V } from "./fields/switch-field.mjs";
import { TextareaField as M, textareaFieldVariants as N } from "./fields/textarea-field.mjs";
import { DEFAULT_ICON_SIZE as i, Icon as a } from "./icon.mjs";
import { Input as oe, InputIconSizeContext as se, inputVariants as ce } from "./input.mjs";
import { MenuItemCheckbox as fe, MenuItemText as pe, menuItemVariants as _ } from "./menu.mjs";
import { i as he, n as ge, r as _e, t as ve } from "./pagination-DUujh8H2.mjs";
import { Radio as I, RadioGroup as L, radioVariants as R } from "./radio.mjs";
import { Select as le, SelectIconSizeContext as ue, selectVariants as de } from "./select.mjs";
import { n as P } from "./selection-field-layout-Bj6R9jEa.mjs";
import { Skeleton as Oe, skeletonVariants as ke } from "./skeleton.mjs";
import { Switch as B, switchVariants as me } from "./switch.mjs";
import {
  Table as ye,
  TableBody as be,
  TableCell as xe,
  TableHead as Se,
  TableHeader as Ce,
  TableRow as we,
  tableCellVariants as Te,
  tableHeadVariants as Ee,
  tableRowVariants as De,
} from "./table.mjs";
import { Textarea as k, TextareaIconSizeContext as A, textareaVariants as j } from "./textarea.mjs";
import { Typography as Ae, typographyVariants as je } from "./typography.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const Ne = new Set([`negative`, `attention`]),
  Pe = { negative: `warning`, information: `info`, positive: `check_circle`, attention: `error`, neutral: `info` },
  G = H(`alert`, {
    variants: {
      layout: { default: ``, fullWidth: `` },
      variant: { negative: ``, information: ``, positive: ``, attention: ``, neutral: `` },
    },
    compoundVariants: [
      { layout: `default`, class: `alert-preset-layout-default` },
      { layout: `fullWidth`, class: `alert-preset-layout-full-width` },
      { variant: `negative`, class: `alert-negative` },
      { variant: `information`, class: `alert-information` },
      { variant: `positive`, class: `alert-positive` },
      { variant: `attention`, class: `alert-attention` },
      { variant: `neutral`, class: `alert-neutral` },
    ],
    defaultVariants: { layout: `default`, variant: `neutral` },
  }),
  K = H(`alert-icon`, {
    variants: {
      variant: {
        negative: `alert-icon-negative`,
        information: `alert-icon-information`,
        positive: `alert-icon-positive`,
        attention: `alert-icon-attention`,
        neutral: `alert-icon-neutral`,
      },
    },
    defaultVariants: { variant: `negative` },
  });
function Fe({
  className: t,
  layout: n = `default`,
  variant: r = `neutral`,
  title: i,
  description: o,
  actionLabel: s,
  onAction: c,
  onDismiss: l,
  ...u
}) {
  let d = r ?? `negative`,
    f = !!(s && c),
    p = !!l,
    m = Ne.has(d) ? `alert` : `status`;
  return W(`div`, {
    className: e(G({ layout: n, variant: r, className: t })),
    "data-slot": `alert`,
    "data-variant": d,
    role: m,
    ...u,
    children: [
      U(`span`, {
        className: K({ variant: d }),
        "data-slot": `alert-icon`,
        children: U(a, { name: Pe[d], variant: `filled`, size: 24 }),
      }),
      W(`div`, {
        className: `alert-content`,
        "data-slot": `alert-content`,
        children: [
          U(`div`, { className: `alert-title`, "data-slot": `alert-title`, children: i }),
          o ? U(`div`, { className: `alert-description`, "data-slot": `alert-description`, children: o }) : null,
        ],
      }),
      f
        ? U(`button`, {
            type: `button`,
            className: `alert-action`,
            "data-slot": `alert-action`,
            onClick: c,
            children: s,
          })
        : null,
      p
        ? U(`button`, {
            type: `button`,
            className: `alert-dismiss`,
            "data-slot": `alert-dismiss`,
            "aria-label": `Dismiss`,
            onClick: l,
            children: U(a, { name: `close`, size: 24 }),
          })
        : null,
    ],
  });
}
function q(e, t) {
  let n = e + 1;
  return n < t ? `past` : n === t ? `current` : `upcoming`;
}
const J = Me(void 0),
  Y = H(`progress`, { variants: {}, defaultVariants: {} }),
  X = H(`progress-step`, {
    variants: { status: { upcoming: ``, current: ``, past: `` } },
    defaultVariants: { status: `upcoming` },
  }),
  Z = H(`progress-indicator`, {
    variants: { status: { upcoming: ``, current: ``, past: `` } },
    compoundVariants: [
      { status: `upcoming`, class: `progress-indicator-upcoming` },
      { status: `current`, class: `progress-indicator-current` },
      { status: `past`, class: `progress-indicator-past` },
    ],
    defaultVariants: { status: `upcoming` },
  }),
  Ie = H(`progress-indicator-number`, {
    variants: {
      status: {
        upcoming: `progress-indicator-number-upcoming`,
        current: `progress-indicator-number-current`,
        past: ``,
      },
    },
    defaultVariants: { status: `upcoming` },
  }),
  Q = H(`progress-label`, {
    variants: {
      status: { upcoming: `progress-label-upcoming`, current: `progress-label-current`, past: `progress-label-past` },
    },
    defaultVariants: { status: `upcoming` },
  });
function Le() {
  return U(`span`, {
    className: `progress-separator`,
    "data-slot": `progress-separator`,
    "aria-hidden": `true`,
    children: U(`span`, { className: `progress-icon`, children: U(a, { name: `chevron_forward`, size: 24 }) }),
  });
}
function $({ className: t, label: n, status: r = `upcoming`, stepNumber: i, ...o }) {
  let s = r ?? `upcoming`,
    c = s !== `past` && i !== void 0;
  return W(`div`, {
    className: e(X({ status: s, className: t })),
    "data-slot": `progress-step`,
    "data-variant": s,
    ...o,
    children: [
      U(`span`, {
        className: Z({ status: s }),
        "data-slot": `progress-indicator`,
        children:
          s === `past`
            ? U(`span`, {
                className: `progress-indicator-check`,
                "data-slot": `progress-indicator-check`,
                children: U(a, { name: `check`, variant: `filled`, size: 15 }),
              })
            : c
              ? U(`span`, { className: Ie({ status: s }), "data-slot": `progress-indicator-number`, children: i })
              : null,
      }),
      U(`span`, { className: Q({ status: s }), "data-slot": `progress-label`, children: n }),
    ],
  });
}
function Re({ className: t, steps: n, currentStep: r, "aria-label": i = `Progress`, ...a }) {
  return U(J.Provider, {
    value: 24,
    children: U(`nav`, {
      className: e(Y({ className: t })),
      "data-slot": `progress`,
      "data-variant": `default`,
      "aria-label": i,
      ...a,
      children: U(`ol`, {
        className: `progress-list`,
        children: n.map((e, t) => {
          let i = q(t, r),
            a = t === n.length - 1;
          return W(
            `li`,
            {
              className: `progress-item`,
              "data-slot": `progress-item`,
              "aria-current": i === `current` ? `step` : void 0,
              children: [U($, { label: e.label, status: i, stepNumber: t + 1 }), a ? null : U(Le, {})],
            },
            `${e.label}-${t}`,
          );
        }),
      }),
    }),
  });
}
export {
  Fe as Alert,
  o as Avatar,
  t as Badge,
  n as BadgeIconSizeContext,
  d as Breadcrumb,
  l as BreadcrumbIconSizeContext,
  f as Button,
  ee as Calendar,
  F as CheckboxField,
  g as Chip,
  v as Combobox,
  D as ComboboxField,
  y as ComboboxIconSizeContext,
  i as DEFAULT_ICON_SIZE,
  te as DatePicker,
  T as DatePickerField,
  ne as DatePickerIconSizeContext,
  ie as Divider,
  a as Icon,
  oe as Input,
  x as InputField,
  se as InputIconSizeContext,
  fe as MenuItemCheckbox,
  pe as MenuItemText,
  ve as Pagination,
  Re as Progress,
  J as ProgressIconSizeContext,
  $ as ProgressStep,
  I as Radio,
  z as RadioField,
  L as RadioGroup,
  le as Select,
  C as SelectField,
  ue as SelectIconSizeContext,
  Oe as Skeleton,
  B as Switch,
  V as SwitchField,
  ye as Table,
  be as TableBody,
  xe as TableCell,
  Se as TableHead,
  Ce as TableHeader,
  we as TableRow,
  k as Textarea,
  M as TextareaField,
  A as TextareaIconSizeContext,
  Ae as Typography,
  K as alertIconVariants,
  G as alertVariants,
  s as avatarVariants,
  r as badgeVariants,
  u as breadcrumbVariants,
  p as buttonVariants,
  m as calendarVariants,
  P as checkboxFieldVariants,
  P as radioFieldVariants,
  P as switchFieldVariants,
  re as chipVariants,
  O as comboboxFieldVariants,
  b as comboboxVariants,
  E as datePickerFieldVariants,
  h as datePickerVariants,
  ae as dividerVariants,
  c as getBreadcrumbSegments,
  he as getPaginationItems,
  q as getProgressStepStatus,
  S as inputFieldVariants,
  ce as inputVariants,
  _ as menuItemVariants,
  _ as menuVariants,
  ge as paginationButtonVariants,
  _e as paginationVariants,
  Z as progressIndicatorVariants,
  Q as progressLabelVariants,
  X as progressStepVariants,
  Y as progressVariants,
  R as radioVariants,
  w as selectFieldVariants,
  de as selectVariants,
  ke as skeletonVariants,
  me as switchVariants,
  Te as tableCellVariants,
  Ee as tableHeadVariants,
  De as tableRowVariants,
  N as textareaFieldVariants,
  j as textareaVariants,
  je as typographyVariants,
};
