import { Combobox as u } from "@base-ui/react/combobox";
import { cva as a } from "class-variance-authority";
import { createContext as o } from "react";
import { Fragment as s, jsx as c, jsxs as l } from "react/jsx-runtime";

import { Icon as t } from "./icon.mjs";
import { MenuItemCheckbox as n, MenuItemText as r, menuItemVariants as i } from "./menu.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const d = { sm: 20, lg: 24 },
  f = { sm: 16, lg: 16 },
  p = o(void 0),
  m = a(`combobox`, {
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
function h(e, t) {
  return e.find((e) => e.value === t)?.label ?? t;
}
function g({ iconSize: n }) {
  return l(s, {
    children: [
      c(u.Clear, {
        className: `combobox-clear`,
        "data-slot": `combobox-clear`,
        "aria-label": `Clear search`,
        render: (r) =>
          c(`button`, {
            ...r,
            type: `button`,
            className: e(`combobox-clear`, r.className),
            "data-slot": `combobox-clear`,
            children: c(t, { name: `backspace`, size: n }),
          }),
      }),
      c(u.Icon, {
        className: `combobox-trailing`,
        render: (r) =>
          c(`span`, {
            ...r,
            className: e(`combobox-trailing`, r.className),
            "data-slot": `combobox-trailing`,
            children: c(t, { name: `search`, size: n }),
          }),
      }),
    ],
  });
}
function _({ options: e, variant: a }) {
  let o = i({ variant: a });
  return c(u.List, {
    className: `menu-list`,
    "data-slot": `menu-list`,
    children: e.map((e) =>
      l(
        u.Item,
        {
          value: e.value,
          disabled: e.disabled,
          className: o,
          "data-slot": `menu-item`,
          children: [
            c(r, { children: e.label }),
            a === `multiple`
              ? c(n, {
                  children: c(u.ItemIndicator, {
                    className: `menu-item-checkbox-indicator`,
                    children: c(t, { name: `check`, size: 12 }),
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
function v({ options: e, variant: t }) {
  return c(u.Portal, {
    children: c(u.Positioner, {
      className: `combobox-positioner`,
      "data-slot": `combobox-positioner`,
      sideOffset: 4,
      align: `start`,
      children: c(u.Popup, {
        className: `combobox-popup`,
        "data-slot": `combobox-popup`,
        children: c(_, { options: e, variant: t }),
      }),
    }),
  });
}
function y(e) {
  let n = e.size ?? `sm`,
    r = !!e.disabled,
    i = !!e.invalid,
    a = d[n],
    o = f[n],
    s = e.showLeadingIcon ?? !1,
    l = s ? (e.leadingIcon ?? c(t, { name: `person`, size: a })) : null;
  return {
    className: e.className,
    size: n,
    invalid: i,
    disabled: r,
    placeholder: e.placeholder ?? `Type to search`,
    options: e.options,
    leadingIcon: e.leadingIcon,
    showLeadingIcon: s,
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
    iconSize: a,
    chipRemoveIconSize: o,
    resolvedLeading: l,
  };
}
function b({ value: t, defaultValue: n, onValueChange: r, ...i }) {
  let a = y(i),
    o = e(m({ size: a.size, disabled: a.disabled, invalid: a.invalid, className: a.className }));
  return c(p.Provider, {
    value: a.iconSize,
    children: l(u.Root, {
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
        c(`div`, {
          className: o,
          "data-slot": `combobox`,
          "data-variant": a.size,
          children: l(u.InputGroup, {
            className: `combobox-input-group`,
            "data-slot": `combobox-input-group`,
            children: [
              a.resolvedLeading
                ? c(`span`, {
                    className: `combobox-leading`,
                    "data-slot": `combobox-leading`,
                    children: a.resolvedLeading,
                  })
                : null,
              c(u.Input, {
                id: a.id,
                className: `combobox-input`,
                "data-slot": `combobox-input`,
                disabled: a.disabled,
                "aria-invalid": a.invalid || void 0,
                "aria-describedby": a.ariaDescribedBy,
                "aria-label": a.ariaLabel,
                placeholder: a.placeholder,
              }),
              c(g, { iconSize: a.iconSize }),
            ],
          }),
        }),
        c(v, { options: a.options, variant: `single` }),
      ],
    }),
  });
}
function x({ value: n, defaultValue: r, onValueChange: i, ...a }) {
  let o = y(a),
    d = e(m({ size: o.size, disabled: o.disabled, invalid: o.invalid, className: o.className }));
  return c(p.Provider, {
    value: o.iconSize,
    children: l(u.Root, {
      items: o.options,
      multiple: !0,
      value: n,
      defaultValue: r,
      onValueChange: i,
      disabled: o.disabled,
      modal: !1,
      defaultOpen: o.defaultOpen,
      open: o.open,
      onOpenChange: o.onOpenChange,
      name: o.name,
      required: o.required,
      inputValue: o.inputValue,
      defaultInputValue: o.defaultInputValue,
      onInputValueChange: o.onInputValueChange,
      children: [
        c(`div`, {
          className: d,
          "data-slot": `combobox`,
          "data-variant": o.size,
          children: l(u.InputGroup, {
            className: `combobox-input-group`,
            "data-slot": `combobox-input-group`,
            children: [
              o.resolvedLeading
                ? c(`span`, {
                    className: `combobox-leading`,
                    "data-slot": `combobox-leading`,
                    children: o.resolvedLeading,
                  })
                : null,
              c(u.Chips, {
                className: `combobox-chips`,
                "data-slot": `combobox-chips`,
                children: c(u.Value, {
                  children: (e) =>
                    l(s, {
                      children: [
                        e.map((e) =>
                          l(
                            u.Chip,
                            {
                              className: `combobox-chip`,
                              "data-slot": `combobox-chip`,
                              children: [
                                c(`span`, {
                                  className: `combobox-chip-label`,
                                  "data-slot": `combobox-chip-label`,
                                  children: h(o.options, e),
                                }),
                                c(u.ChipRemove, {
                                  className: `combobox-chip-remove`,
                                  "data-slot": `combobox-chip-remove`,
                                  "aria-label": `Remove ${h(o.options, e)}`,
                                  children: c(t, { name: `close`, size: o.chipRemoveIconSize }),
                                }),
                              ],
                            },
                            e,
                          ),
                        ),
                        c(u.Input, {
                          id: o.id,
                          className: `combobox-input`,
                          "data-slot": `combobox-input`,
                          disabled: o.disabled,
                          "aria-invalid": o.invalid || void 0,
                          "aria-describedby": o.ariaDescribedBy,
                          "aria-label": o.ariaLabel,
                          placeholder: e.length === 0 ? o.placeholder : void 0,
                        }),
                      ],
                    }),
                }),
              }),
              c(g, { iconSize: o.iconSize }),
            ],
          }),
        }),
        c(v, { options: o.options, variant: `multiple` }),
      ],
    }),
  });
}
function S({ multiple: e = !1, value: t, defaultValue: n, onValueChange: r, ...i }) {
  if (e) {
    let e = Array.isArray(t) ? t : t ? [t] : void 0,
      a = Array.isArray(n) ? n : n ? [n] : void 0;
    return c(x, { ...i, value: e, defaultValue: a, onValueChange: r ? (e) => r(e) : void 0 });
  }
  return c(b, {
    ...i,
    value: Array.isArray(t) ? (t[0] ?? null) : t,
    defaultValue: Array.isArray(n) ? (n[0] ?? null) : n,
    onValueChange: r ? (e) => r(e) : void 0,
  });
}
export { S as Combobox, p as ComboboxIconSizeContext, m as comboboxVariants };
