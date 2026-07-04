import { Combobox as _ } from "@base-ui/react/combobox";
import { Input as x } from "@base-ui/react/input";
import { Popover as v } from "@base-ui/react/popover";
import { Select as S } from "@base-ui/react/select";
import { DayPicker as y, getDefaultClassNames as b } from "@daypicker/react";
import { cva as o } from "class-variance-authority";
import {
  Fragment as s,
  createContext as c,
  useContext as l,
  useEffect as u,
  useMemo as d,
  useRef as f,
  useState as p,
} from "react";
import { Fragment as m, jsx as h, jsxs as g } from "react/jsx-runtime";

import { BadgeIconSizeContext as t } from "./badge.mjs";
import { Button as a } from "./button.mjs";
import { MenuItemCheckbox as n, MenuItemText as r, menuItemVariants as i } from "./menu.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
function C(e, t) {
  if (e.length === 0) return [];
  let n = (e, t) =>
    !t && e.href
      ? { type: `link`, label: e.label, href: e.href, render: e.render }
      : { type: `page`, label: e.label, render: e.render };
  if (!t || e.length <= 3) return e.map((t, r) => n(t, r === e.length - 1));
  let r = e.slice(-2);
  return [n(e[0], !1), { type: `ellipsis` }, n(r[0], r.length === 1), ...(r.length > 1 ? [n(r[1], !0)] : [])];
}
const w = `breadcrumb-link breadcrumb-label`,
  T = c(void 0),
  E = o(`breadcrumb`, { variants: { collapsed: { true: ``, false: `` } }, defaultVariants: { collapsed: !1 } });
function D() {
  return h(`span`, {
    className: `breadcrumb-separator`,
    "data-slot": `breadcrumb-separator`,
    "aria-hidden": `true`,
    children: h(`span`, { className: `breadcrumb-icon`, children: h($, { name: `chevron_forward`, size: 14 }) }),
  });
}
function O() {
  return g(`span`, {
    className: `breadcrumb-ellipsis`,
    "data-slot": `breadcrumb-ellipsis`,
    children: [
      h(`span`, { className: `sr-only`, children: `Collapsed breadcrumb items` }),
      h(`span`, {
        className: `breadcrumb-icon`,
        "aria-hidden": `true`,
        children: h($, { name: `more_horiz`, size: 14 }),
      }),
    ],
  });
}
function k(e, t, n) {
  return e.type === `ellipsis`
    ? h(O, {}, t)
    : e.render
      ? h(s, { children: e.render }, t)
      : e.type === `link`
        ? n
          ? h(s, { children: n({ href: e.href, label: e.label, className: w, "data-slot": `breadcrumb-link` }) }, t)
          : h(`a`, { className: w, href: e.href, "data-slot": `breadcrumb-link`, children: e.label }, t)
        : h(
            `span`,
            {
              className: `breadcrumb-page breadcrumb-label`,
              "data-slot": `breadcrumb-page`,
              "aria-current": `page`,
              children: e.label,
            },
            t,
          );
}
function ee({ className: t, items: n, collapsed: r = !1, renderLink: i, "aria-label": a = `Breadcrumb`, ...o }) {
  let s = C(n, r),
    c = r && n.length > 3;
  return h(T.Provider, {
    value: 14,
    children: h(`nav`, {
      className: e(E({ collapsed: r, className: t })),
      "data-slot": `breadcrumb`,
      "data-variant": c ? `collapsed` : `default`,
      "aria-label": a,
      ...o,
      children: h(`ol`, {
        className: `breadcrumb-list`,
        children: s.map((e, t) => {
          let n = t === s.length - 1;
          return g(
            `li`,
            {
              className: `breadcrumb-item`,
              "data-slot": `breadcrumb-item`,
              children: [k(e, `${e.type}-${t}`, i), n ? null : h(D, {})],
            },
            `${e.type}-${t}`,
          );
        }),
      }),
    }),
  });
}
const A = { sm: 20, lg: 24 },
  j = { sm: 16, lg: 16 },
  M = c(void 0),
  N = o(`combobox`, {
    variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
    compoundVariants: [
      { size: `sm`, class: `combobox-preset-size-sm` },
      { size: `lg`, class: `combobox-preset-size-lg` },
      { size: `sm`, disabled: !0, class: `combobox-preset-size-sm-disabled` },
      { size: `lg`, disabled: !0, class: `combobox-preset-size-lg-disabled` },
      { size: `sm`, invalid: !0, class: `combobox-preset-size-sm-invalid` },
      { size: `lg`, invalid: !0, class: `combobox-preset-size-lg-invalid` },
    ],
    defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
  });
function P(e, t) {
  return e.find((e) => e.value === t)?.label ?? t;
}
function F({ iconSize: t }) {
  return g(m, {
    children: [
      h(_.Clear, {
        className: `combobox-clear`,
        "data-slot": `combobox-clear`,
        "aria-label": `Clear search`,
        render: (n) =>
          h(`button`, {
            ...n,
            type: `button`,
            className: e(`combobox-clear`, n.className),
            "data-slot": `combobox-clear`,
            children: h($, { name: `backspace`, size: t }),
          }),
      }),
      h(_.Icon, {
        className: `combobox-trailing`,
        render: (n) =>
          h(`span`, {
            ...n,
            className: e(`combobox-trailing`, n.className),
            "data-slot": `combobox-trailing`,
            children: h($, { name: `search`, size: t }),
          }),
      }),
    ],
  });
}
function te({ options: e, variant: t }) {
  let a = i({ variant: t });
  return h(_.List, {
    className: `menu-list`,
    "data-slot": `menu-list`,
    children: e.map((e) =>
      g(
        _.Item,
        {
          value: e.value,
          disabled: e.disabled,
          className: a,
          "data-slot": `menu-item`,
          children: [
            h(r, { children: e.label }),
            t === `multiple`
              ? h(n, {
                  children: h(_.ItemIndicator, {
                    className: `menu-item-checkbox-indicator`,
                    children: h($, { name: `check`, size: 12 }),
                  }),
                })
              : null,
          ],
        },
        e.value,
      ),
    ),
  });
}
function I({ options: e, variant: t }) {
  return h(_.Portal, {
    children: h(_.Positioner, {
      className: `combobox-positioner`,
      "data-slot": `combobox-positioner`,
      sideOffset: 4,
      align: `start`,
      children: h(_.Popup, {
        className: `combobox-popup`,
        "data-slot": `combobox-popup`,
        children: h(te, { options: e, variant: t }),
      }),
    }),
  });
}
function L(e) {
  let t = e.size ?? `sm`,
    n = !!e.disabled,
    r = !!e.invalid,
    i = A[t],
    a = j[t],
    o = e.showLeadingIcon ?? !1,
    s = o ? (e.leadingIcon ?? h($, { name: `person`, size: i })) : null;
  return {
    className: e.className,
    size: t,
    invalid: r,
    disabled: n,
    placeholder: e.placeholder ?? `Type to search`,
    options: e.options,
    leadingIcon: e.leadingIcon,
    showLeadingIcon: o,
    defaultOpen: e.defaultOpen,
    open: e.open,
    onOpenChange: e.onOpenChange,
    id: e.id,
    name: e.name,
    required: e.required,
    ariaDescribedBy: e[`aria-describedby`],
    ariaLabel: e[`aria-label`],
    inputValue: e.inputValue,
    defaultInputValue: e.defaultInputValue,
    onInputValueChange: e.onInputValueChange,
    iconSize: i,
    chipRemoveIconSize: a,
    resolvedLeading: s,
  };
}
function ne({ value: t, defaultValue: n, onValueChange: r, ...i }) {
  let a = L(i),
    o = e(N({ size: a.size, disabled: a.disabled, invalid: a.invalid, className: a.className }));
  return h(M.Provider, {
    value: a.iconSize,
    children: g(_.Root, {
      items: a.options,
      value: t,
      defaultValue: n,
      onValueChange: r,
      disabled: a.disabled,
      modal: !1,
      defaultOpen: a.defaultOpen,
      open: a.open,
      onOpenChange: a.onOpenChange,
      name: a.name,
      required: a.required,
      inputValue: a.inputValue,
      defaultInputValue: a.defaultInputValue,
      onInputValueChange: a.onInputValueChange,
      children: [
        h(`div`, {
          className: o,
          "data-slot": `combobox`,
          "data-variant": a.size,
          children: g(_.InputGroup, {
            className: `combobox-input-group`,
            "data-slot": `combobox-input-group`,
            children: [
              a.resolvedLeading
                ? h(`span`, {
                    className: `combobox-leading`,
                    "data-slot": `combobox-leading`,
                    children: a.resolvedLeading,
                  })
                : null,
              h(_.Input, {
                id: a.id,
                className: `combobox-input`,
                "data-slot": `combobox-input`,
                disabled: a.disabled,
                "aria-invalid": a.invalid || void 0,
                "aria-describedby": a.ariaDescribedBy,
                "aria-label": a.ariaLabel,
                placeholder: a.placeholder,
              }),
              h(F, { iconSize: a.iconSize }),
            ],
          }),
        }),
        h(I, { options: a.options, variant: `single` }),
      ],
    }),
  });
}
function re({ value: t, defaultValue: n, onValueChange: r, ...i }) {
  let a = L(i),
    o = e(N({ size: a.size, disabled: a.disabled, invalid: a.invalid, className: a.className }));
  return h(M.Provider, {
    value: a.iconSize,
    children: g(_.Root, {
      items: a.options,
      multiple: !0,
      value: t,
      defaultValue: n,
      onValueChange: r,
      disabled: a.disabled,
      modal: !1,
      defaultOpen: a.defaultOpen,
      open: a.open,
      onOpenChange: a.onOpenChange,
      name: a.name,
      required: a.required,
      inputValue: a.inputValue,
      defaultInputValue: a.defaultInputValue,
      onInputValueChange: a.onInputValueChange,
      children: [
        h(`div`, {
          className: o,
          "data-slot": `combobox`,
          "data-variant": a.size,
          children: g(_.InputGroup, {
            className: `combobox-input-group`,
            "data-slot": `combobox-input-group`,
            children: [
              a.resolvedLeading
                ? h(`span`, {
                    className: `combobox-leading`,
                    "data-slot": `combobox-leading`,
                    children: a.resolvedLeading,
                  })
                : null,
              h(_.Chips, {
                className: `combobox-chips`,
                "data-slot": `combobox-chips`,
                children: h(_.Value, {
                  children: (e) =>
                    g(m, {
                      children: [
                        e.map((e) =>
                          g(
                            _.Chip,
                            {
                              className: `combobox-chip`,
                              "data-slot": `combobox-chip`,
                              children: [
                                h(`span`, {
                                  className: `combobox-chip-label`,
                                  "data-slot": `combobox-chip-label`,
                                  children: P(a.options, e),
                                }),
                                h(_.ChipRemove, {
                                  className: `combobox-chip-remove`,
                                  "data-slot": `combobox-chip-remove`,
                                  "aria-label": `Remove ${P(a.options, e)}`,
                                  children: h($, { name: `close`, size: a.chipRemoveIconSize }),
                                }),
                              ],
                            },
                            e,
                          ),
                        ),
                        h(_.Input, {
                          id: a.id,
                          className: `combobox-input`,
                          "data-slot": `combobox-input`,
                          disabled: a.disabled,
                          "aria-invalid": a.invalid || void 0,
                          "aria-describedby": a.ariaDescribedBy,
                          "aria-label": a.ariaLabel,
                          placeholder: e.length === 0 ? a.placeholder : void 0,
                        }),
                      ],
                    }),
                }),
              }),
              h(F, { iconSize: a.iconSize }),
            ],
          }),
        }),
        h(I, { options: a.options, variant: `multiple` }),
      ],
    }),
  });
}
function R(e) {
  if (e !== void 0) return e === null || e === `` ? [] : (Array.isArray(e) ? e : [e]).filter((e) => e !== ``);
}
function ie(e) {
  if (e !== void 0) return e === null || e === `` ? null : Array.isArray(e) ? (e.find((e) => e !== ``) ?? null) : e;
}
function ae({ multiple: e = !1, value: t, defaultValue: n, onValueChange: r, ...i }) {
  if (e) {
    let e = R(t),
      a = R(n);
    return h(re, { ...i, value: e, defaultValue: a, onValueChange: r ? (e) => r(e) : void 0 });
  }
  return h(ne, { ...i, value: ie(t), defaultValue: ie(n), onValueChange: r ? (e) => r(e) : void 0 });
}
const oe = { left: `arrow_back_ios_new`, right: `arrow_forward_ios`, down: `arrow_drop_down`, up: `arrow_drop_up` };
function se({ className: t, disabled: n, orientation: r = `right`, size: i }) {
  let a = oe[r],
    o = r === `down` || r === `up` ? 12 : (i ?? 16);
  return h(`span`, {
    className: e(`calendar-chevron`, t),
    "aria-hidden": !0,
    "data-disabled": n || void 0,
    children: h($, { name: a, size: o }),
  });
}
function ce({ className: t, rootRef: n, ...r }) {
  return h(`div`, { ref: n, className: e(`rdp-root`, t), ...r });
}
function z({ disabled: e, "aria-disabled": t }) {
  return !!(e || t === !0 || t === `true`);
}
function le({ className: t, children: n, disabled: r, "aria-disabled": i, ...o }) {
  return h(a, {
    ...o,
    variant: `icon`,
    size: `sm`,
    className: e(t),
    disabled: z({ disabled: r, "aria-disabled": i }),
    icon: h($, { name: `arrow_back_ios_new`, size: 16 }),
  });
}
function ue({ className: t, children: n, disabled: r, "aria-disabled": i, ...o }) {
  return h(a, {
    ...o,
    variant: `icon`,
    size: `sm`,
    className: e(t),
    disabled: z({ disabled: r, "aria-disabled": i }),
    icon: h($, { name: `arrow_forward_ios`, size: 16 }),
  });
}
function de({ className: t, day: n, modifiers: r, children: i, ...a }) {
  let o = f(null);
  u(() => {
    if (!r.focused) return;
    let e = o.current;
    !e || document.activeElement === e || e.focus({ preventScroll: !0 });
  }, [r.focused]);
  let s = r.selected && !r.range_start && !r.range_end && !r.range_middle;
  return h(`button`, {
    ...a,
    ref: o,
    type: `button`,
    "data-day": n.isoDate,
    "data-selected-single": s || void 0,
    "data-range-start": r.range_start || void 0,
    "data-range-end": r.range_end || void 0,
    "data-range-middle": r.range_middle || void 0,
    className: e(t),
    children: i,
  });
}
const B = o(`calendar`, {
    variants: { variant: { default: `calendar-default`, range: `calendar-range` } },
    defaultVariants: { variant: `default` },
  }),
  fe = {
    default: { numberOfMonths: 1, captionLayout: `dropdown`, navLayout: `around` },
    range: { numberOfMonths: 2, captionLayout: `label`, navLayout: `around` },
  };
function pe(e) {
  return fe[e];
}
function V({
  className: t,
  variant: n = `default`,
  locale: r,
  showOutsideDays: i = !0,
  components: a,
  classNames: o,
  formatters: s,
  ...c
}) {
  let l = n ?? `default`,
    u = pe(l),
    f = b(),
    p = d(
      () => ({
        Root: (n) =>
          h(ce, { ...n, className: e(B({ variant: l }), t, n.className), "data-slot": `calendar`, "data-variant": l }),
        Chevron: se,
        DayButton: de,
        PreviousMonthButton: le,
        NextMonthButton: ue,
        ...a,
      }),
      [l, t, a],
    );
  return h(y, {
    locale: r,
    showOutsideDays: i,
    numberOfMonths: u.numberOfMonths,
    captionLayout: u.captionLayout,
    navLayout: u.navLayout,
    classNames: { ...f, ...o },
    formatters: {
      formatCaption: (e) => e.toLocaleDateString(r, { month: `long`, year: `numeric` }),
      formatMonthDropdown: (e) => e.toLocaleDateString(r, { month: `short` }),
      ...s,
    },
    components: p,
    ...c,
  });
}
const me = { sm: 20, lg: 24 },
  H = c(void 0),
  U = o(`date-picker`, {
    variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
    compoundVariants: [
      { size: `sm`, class: `date-picker-preset-size-sm` },
      { size: `lg`, class: `date-picker-preset-size-lg` },
      { size: `sm`, disabled: !0, class: `date-picker-preset-size-sm-disabled` },
      { size: `lg`, disabled: !0, class: `date-picker-preset-size-lg-disabled` },
      { size: `sm`, invalid: !0, class: `date-picker-preset-size-sm-invalid` },
      { size: `lg`, invalid: !0, class: `date-picker-preset-size-lg-invalid` },
    ],
    defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
  });
function he(e, t) {
  return e.toLocaleDateString(t, { month: `short`, day: `numeric`, year: `numeric` });
}
function ge(e) {
  return `${e.getFullYear()}-${String(e.getMonth() + 1).padStart(2, `0`)}-${String(e.getDate()).padStart(2, `0`)}`;
}
function _e({
  className: t,
  size: n = `sm`,
  invalid: r = !1,
  disabled: i,
  placeholder: a = `Select date`,
  leadingIcon: o,
  showLeadingIcon: s = !1,
  value: c,
  defaultValue: l,
  onValueChange: u,
  defaultOpen: d,
  open: f,
  onOpenChange: m,
  id: _,
  name: y,
  required: b,
  "aria-describedby": x,
  "aria-label": S,
  locale: C,
  ...w
}) {
  let T = n ?? `sm`,
    E = !!i,
    D = !!r,
    O = me[T],
    k = s ? (o ?? h($, { name: `event`, size: O })) : null,
    [ee, A] = p(l),
    [j, M] = p(d ?? !1),
    N = c !== void 0,
    P = f !== void 0,
    F = N ? c : ee,
    te = P ? f : j,
    I = (e) => {
      (P || M(e), m?.(e));
    },
    L = (e) => {
      (N || A(e), u?.(e), I(!1));
    };
  return h(H.Provider, {
    value: O,
    children: g(v.Root, {
      open: te,
      onOpenChange: I,
      modal: !1,
      children: [
        g(`div`, {
          className: e(U({ size: T, disabled: E, invalid: D, className: t })),
          "data-slot": `date-picker`,
          "data-variant": T,
          children: [
            g(v.Trigger, {
              id: _,
              className: `date-picker-trigger`,
              "data-slot": `date-picker-trigger`,
              disabled: E,
              "aria-invalid": D || void 0,
              "aria-describedby": x,
              "aria-disabled": E || void 0,
              "aria-label": S,
              children: [
                k
                  ? h(`span`, { className: `date-picker-leading`, "data-slot": `date-picker-leading`, children: k })
                  : null,
                h(`span`, {
                  className: `date-picker-value`,
                  "data-slot": `date-picker-value`,
                  "data-placeholder": F ? void 0 : ``,
                  children: F ? he(F, C) : a,
                }),
                h(`span`, {
                  className: `date-picker-trailing`,
                  "data-slot": `date-picker-trailing`,
                  children: h($, { name: `calendar_today`, size: O }),
                }),
              ],
            }),
            y && !E ? h(`input`, { type: `hidden`, name: y, value: F ? ge(F) : ``, required: b }) : null,
          ],
        }),
        h(v.Portal, {
          children: h(v.Positioner, {
            className: `date-picker-positioner`,
            "data-slot": `date-picker-positioner`,
            sideOffset: 4,
            align: `start`,
            children: h(v.Popup, {
              className: `date-picker-popup`,
              "data-slot": `date-picker-popup`,
              children: h(V, {
                ...w,
                locale: C,
                variant: `default`,
                mode: `single`,
                selected: F,
                onSelect: L,
                defaultMonth: w.defaultMonth ?? F,
                className: `[&_.rdp-month]:w-full`,
              }),
            }),
          }),
        }),
      ],
    }),
  });
}
const ve = { sm: 20, lg: 24 },
  W = c(void 0),
  G = o(`input`, {
    variants: {
      size: { sm: ``, lg: `` },
      variant: { default: ``, suffix: `` },
      disabled: { true: `input-disabled`, false: `` },
      invalid: { true: `input-error`, false: `` },
    },
    compoundVariants: [
      { size: `sm`, variant: `default`, class: `input-preset-sm-default` },
      { size: `sm`, variant: `suffix`, class: `input-preset-sm-suffix` },
      { size: `lg`, variant: `default`, class: `input-preset-lg-default` },
      { size: `lg`, variant: `suffix`, class: `input-preset-lg-suffix` },
    ],
    defaultVariants: { size: `sm`, variant: `default`, disabled: !1, invalid: !1 },
  });
function ye({
  className: t,
  size: n = `sm`,
  variant: r = `default`,
  invalid: i = !1,
  disabled: a,
  leadingIcon: o,
  trailingIcon: s,
  showLeadingIcon: c = !1,
  showTrailingIcon: l = !1,
  suffix: u,
  placeholder: d = `Input`,
  ...f
}) {
  let p = n ?? `sm`,
    m = r ?? `default`,
    _ = !!a,
    v = !!i,
    y = ve[p],
    b = c,
    S = l && m === "default",
    C = m === `suffix` && u !== void 0,
    w = b ? (o ?? h($, { name: `person`, size: y })) : null,
    T = S ? (s ?? h($, { name: v ? `error` : `visibility`, size: y, variant: v ? `filled` : `outlined` })) : null;
  return h(W.Provider, {
    value: y,
    children: g(`div`, {
      className: e(G({ size: p, variant: m, disabled: _, invalid: v, className: t })),
      "data-slot": `input`,
      "data-variant": m,
      children: [
        w ? h(`span`, { className: `input-leading`, children: w }) : null,
        h(x, { className: `input-control`, disabled: _, "aria-invalid": v || void 0, placeholder: d, ...f }),
        C ? h(`span`, { className: `input-suffix`, children: u }) : null,
        T ? h(`span`, { className: `input-trailing`, children: T }) : null,
      ],
    }),
  });
}
function K(e, t) {
  let n = e + 1;
  return n < t ? `past` : n === t ? `current` : `upcoming`;
}
const q = c(void 0),
  J = o(`progress`, { variants: {}, defaultVariants: {} }),
  Y = o(`progress-step`, {
    variants: { status: { upcoming: ``, current: ``, past: `` } },
    defaultVariants: { status: `upcoming` },
  }),
  X = o(`progress-indicator`, {
    variants: { status: { upcoming: ``, current: ``, past: `` } },
    compoundVariants: [
      { status: `upcoming`, class: `progress-indicator-upcoming` },
      { status: `current`, class: `progress-indicator-current` },
      { status: `past`, class: `progress-indicator-past` },
    ],
    defaultVariants: { status: `upcoming` },
  }),
  be = o(`progress-indicator-number`, {
    variants: {
      status: {
        upcoming: `progress-indicator-number-upcoming`,
        current: `progress-indicator-number-current`,
        past: ``,
      },
    },
    defaultVariants: { status: `upcoming` },
  }),
  xe = o(`progress-label`, {
    variants: {
      status: { upcoming: `progress-label-upcoming`, current: `progress-label-current`, past: `progress-label-past` },
    },
    defaultVariants: { status: `upcoming` },
  });
function Se() {
  return h(`span`, {
    className: `progress-separator`,
    "data-slot": `progress-separator`,
    "aria-hidden": `true`,
    children: h(`span`, { className: `progress-icon`, children: h($, { name: `chevron_forward`, size: 24 }) }),
  });
}
function Ce({ className: t, label: n, status: r = `upcoming`, stepNumber: i, ...a }) {
  let o = r ?? `upcoming`,
    s = o !== `past` && i !== void 0;
  return g(`div`, {
    className: e(Y({ status: o, className: t })),
    "data-slot": `progress-step`,
    "data-variant": o,
    ...a,
    children: [
      h(`span`, {
        className: X({ status: o }),
        "data-slot": `progress-indicator`,
        children:
          o === `past`
            ? h(`span`, {
                className: `progress-indicator-check`,
                "data-slot": `progress-indicator-check`,
                children: h($, { name: `check`, variant: `filled`, size: 15 }),
              })
            : s
              ? h(`span`, { className: be({ status: o }), "data-slot": `progress-indicator-number`, children: i })
              : null,
      }),
      h(`span`, { className: xe({ status: o }), "data-slot": `progress-label`, children: n }),
    ],
  });
}
function we({ className: t, steps: n, currentStep: r, "aria-label": i = `Progress`, ...a }) {
  return h(q.Provider, {
    value: 24,
    children: h(`nav`, {
      className: e(J({ className: t })),
      "data-slot": `progress`,
      "data-variant": `default`,
      "aria-label": i,
      ...a,
      children: h(`ol`, {
        className: `progress-list`,
        children: n.map((e, t) => {
          let i = K(t, r),
            a = t === n.length - 1;
          return g(
            `li`,
            {
              className: `progress-item`,
              "data-slot": `progress-item`,
              "aria-current": i === `current` ? `step` : void 0,
              children: [h(Ce, { label: e.label, status: i, stepNumber: t + 1 }), a ? null : h(Se, {})],
            },
            `${e.label}-${t}`,
          );
        }),
      }),
    }),
  });
}
const Te = { sm: 20, lg: 24 },
  Z = c(void 0),
  Ee = o(`select`, {
    variants: { size: { sm: ``, lg: `` }, disabled: { true: ``, false: `` }, invalid: { true: ``, false: `` } },
    compoundVariants: [
      { size: `sm`, class: `select-preset-size-sm` },
      { size: `lg`, class: `select-preset-size-lg` },
      { size: `sm`, disabled: !0, class: `select-preset-size-sm-disabled` },
      { size: `lg`, disabled: !0, class: `select-preset-size-lg-disabled` },
      { size: `sm`, invalid: !0, class: `select-preset-size-sm-invalid` },
      { size: `lg`, invalid: !0, class: `select-preset-size-lg-invalid` },
    ],
    defaultVariants: { size: `sm`, disabled: !1, invalid: !1 },
  });
function De({
  className: t,
  size: n = `sm`,
  invalid: r = !1,
  disabled: i,
  placeholder: a = `Option`,
  options: o,
  leadingIcon: s,
  showLeadingIcon: c = !1,
  value: l,
  defaultValue: u,
  onValueChange: d,
  defaultOpen: f,
  open: p,
  onOpenChange: m,
  id: _,
  name: v,
  required: y,
  "aria-describedby": b,
  "aria-label": x,
}) {
  let C = n ?? `sm`,
    w = !!i,
    T = !!r,
    E = Te[C],
    D = c ? (s ?? h($, { name: `person`, size: E })) : null;
  return h(Z.Provider, {
    value: E,
    children: g(S.Root, {
      items: o,
      value: l,
      defaultValue: u,
      onValueChange: d,
      disabled: w,
      modal: !1,
      defaultOpen: f,
      open: p,
      onOpenChange: m,
      name: v,
      required: y,
      children: [
        h(`div`, {
          className: e(Ee({ size: C, disabled: w, invalid: T, className: t })),
          "data-slot": `select`,
          "data-variant": C,
          children: g(S.Trigger, {
            id: _,
            className: `select-trigger`,
            "data-slot": `select-trigger`,
            disabled: w,
            "aria-invalid": T || void 0,
            "aria-describedby": b,
            "aria-disabled": w || void 0,
            "aria-label": x,
            children: [
              D ? h(`span`, { className: `select-leading`, "data-slot": `select-leading`, children: D }) : null,
              h(S.Value, { placeholder: a, className: `select-value`, "data-slot": `select-value` }),
              h(S.Icon, {
                className: `select-trailing`,
                render: (t, { open: n }) =>
                  h(`span`, {
                    ...t,
                    className: e(`select-trailing`, t.className),
                    "data-slot": `select-trailing`,
                    children: h($, { name: n ? `arrow_drop_up` : `arrow_drop_down`, size: E }),
                  }),
              }),
            ],
          }),
        }),
        h(S.Portal, {
          children: h(S.Positioner, {
            className: `select-positioner`,
            "data-slot": `select-positioner`,
            sideOffset: 4,
            align: `start`,
            alignItemWithTrigger: !1,
            children: h(S.Popup, {
              className: `select-popup`,
              "data-slot": `select-popup`,
              children: h(S.List, {
                className: `select-list`,
                "data-slot": `select-list`,
                children: o.map((e) =>
                  h(
                    S.Item,
                    {
                      value: e.value,
                      label: e.label,
                      disabled: e.disabled,
                      className: `select-item`,
                      "data-slot": `select-item`,
                      children: h(S.ItemText, {
                        className: `select-item-text`,
                        "data-slot": `select-item-text`,
                        children: e.label,
                      }),
                    },
                    e.value,
                  ),
                ),
              }),
            }),
          }),
        }),
      ],
    }),
  });
}
const Oe = { sm: 20, lg: 24 },
  Q = c(void 0),
  ke = o(`textarea`, {
    variants: {
      size: { sm: ``, lg: `` },
      variant: { default: ``, suffix: `` },
      disabled: { true: `textarea-disabled`, false: `` },
      invalid: { true: `textarea-error`, false: `` },
    },
    compoundVariants: [
      { size: `sm`, variant: `default`, class: `textarea-preset-sm-default` },
      { size: `sm`, variant: `suffix`, class: `textarea-preset-sm-suffix` },
      { size: `lg`, variant: `default`, class: `textarea-preset-lg-default` },
      { size: `lg`, variant: `suffix`, class: `textarea-preset-lg-suffix` },
    ],
    defaultVariants: { size: `sm`, variant: `default`, disabled: !1, invalid: !1 },
  });
function Ae({
  className: t,
  size: n = `sm`,
  variant: r = `default`,
  invalid: i = !1,
  disabled: a,
  leadingIcon: o,
  showLeadingIcon: s = !1,
  suffix: c,
  placeholder: l = `Input`,
  ...u
}) {
  let d = n ?? `sm`,
    f = r ?? `default`,
    p = !!a,
    m = !!i,
    _ = Oe[d],
    v = s,
    y = f === `suffix` && c !== void 0,
    b = v ? (o ?? h($, { name: `person`, size: _ })) : null,
    x = h(`textarea`, {
      className: `textarea-control`,
      disabled: p,
      "aria-invalid": m || void 0,
      placeholder: l,
      ...u,
    });
  return h(Q.Provider, {
    value: _,
    children: g(`div`, {
      className: e(ke({ size: d, variant: f, disabled: p, invalid: m, className: t })),
      "data-slot": `textarea`,
      "data-variant": f,
      children: [
        b ? h(`span`, { className: `textarea-leading`, children: b }) : null,
        f === `suffix`
          ? g(`div`, {
              className: `textarea-content`,
              children: [x, y ? h(`span`, { className: `textarea-suffix`, children: c }) : null],
            })
          : x,
      ],
    }),
  });
}
const je = 20;
function Me(e, t) {
  return `"FILL" ${+(e === `filled`)}, "wght" 400, "GRAD" 0, "opsz" ${t}`;
}
function Ne(e) {
  let n = l(t),
    r = l(T),
    i = l(M),
    a = l(H),
    o = l(W),
    s = l(q),
    c = l(Z),
    u = l(Q);
  return e ?? n ?? r ?? i ?? a ?? o ?? s ?? c ?? u ?? 20;
}
function $({ name: t, variant: n = `outlined`, align: r, size: i, className: a, style: o, ...s }) {
  let c = Ne(i);
  return h(`span`, {
    className: e(`material-symbols-outlined`, `icon`, a),
    "data-slot": `icon`,
    "data-align": r,
    style: { fontSize: c, fontVariationSettings: Me(n, c), ...o },
    "aria-hidden": !0,
    ...s,
    children: t,
  });
}
export {
  E as A,
  V as C,
  N as D,
  M as E,
  ee as O,
  U as S,
  ae as T,
  ye as _,
  ke as a,
  _e as b,
  Ee as c,
  Ce as d,
  X as f,
  K as g,
  J as h,
  Q as i,
  C as j,
  T as k,
  we as l,
  Y as m,
  $ as n,
  De as o,
  xe as p,
  Ae as r,
  Z as s,
  je as t,
  q as u,
  W as v,
  B as w,
  H as x,
  G as y,
};
