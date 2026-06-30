import { DayPicker as s, getDefaultClassNames as c } from "@daypicker/react";
import { cva as r } from "class-variance-authority";
import { useEffect as i, useRef as a } from "react";
import { jsx as o } from "react/jsx-runtime";

import { Button as n } from "./button.mjs";
import { Icon as t } from "./icon.mjs";
import { t as e } from "./utils-tOxW8rXw.mjs";
const l = { left: `arrow_back_ios_new`, right: `arrow_forward_ios`, down: `arrow_drop_down`, up: `arrow_drop_up` };
function u({ className: n, disabled: r, orientation: i = `right`, size: a }) {
  let s = l[i],
    c = i === `down` || i === `up` ? 12 : (a ?? 16);
  return o(`span`, {
    className: e(`calendar-chevron`, n),
    "aria-hidden": !0,
    "data-disabled": r || void 0,
    children: o(t, { name: s, size: c }),
  });
}
function d({ className: t, rootRef: n, ...r }) {
  return o(`div`, { ref: n, className: e(`rdp-root`, t), ...r });
}
function f({ disabled: e, "aria-disabled": t }) {
  return !!(e || t === !0 || t === `true`);
}
function p({ className: r, children: i, disabled: a, "aria-disabled": s, ...c }) {
  return o(n, {
    ...c,
    variant: `icon`,
    size: `sm`,
    className: e(r),
    disabled: f({ disabled: a, "aria-disabled": s }),
    icon: o(t, { name: `arrow_back_ios_new`, size: 16 }),
  });
}
function m({ className: r, children: i, disabled: a, "aria-disabled": s, ...c }) {
  return o(n, {
    ...c,
    variant: `icon`,
    size: `sm`,
    className: e(r),
    disabled: f({ disabled: a, "aria-disabled": s }),
    icon: o(t, { name: `arrow_forward_ios`, size: 16 }),
  });
}
function h({ className: t, day: n, modifiers: r, children: s, ...c }) {
  let l = a(null);
  i(() => {
    r.focused && l.current?.focus();
  }, [r.focused]);
  let u = r.selected && !r.range_start && !r.range_end && !r.range_middle;
  return o(`button`, {
    ...c,
    ref: l,
    type: `button`,
    "data-day": n.isoDate,
    "data-selected-single": u || void 0,
    "data-range-start": r.range_start || void 0,
    "data-range-end": r.range_end || void 0,
    "data-range-middle": r.range_middle || void 0,
    className: e(t),
    children: s,
  });
}
const g = r(`calendar`, {
    variants: { variant: { default: `calendar-default`, range: `calendar-range` } },
    defaultVariants: { variant: `default` },
  }),
  _ = {
    default: { numberOfMonths: 1, captionLayout: `dropdown`, navLayout: `around` },
    range: { numberOfMonths: 2, captionLayout: `label`, navLayout: `around` },
  };
function v(e) {
  return _[e];
}
function y({
  className: t,
  variant: n = `default`,
  showOutsideDays: r = !0,
  components: i,
  classNames: a,
  formatters: l,
  ...f
}) {
  let _ = n ?? `default`,
    y = v(_),
    b = c();
  return o(s, {
    showOutsideDays: r,
    numberOfMonths: y.numberOfMonths,
    captionLayout: y.captionLayout,
    navLayout: y.navLayout,
    classNames: { ...b, ...a },
    formatters: {
      formatCaption: (e) => e.toLocaleDateString(`en-US`, { month: `long`, year: `numeric` }),
      formatMonthDropdown: (e) => e.toLocaleDateString(`en-US`, { month: `short` }),
      ...l,
    },
    components: {
      Root: (n) =>
        o(d, { ...n, className: e(g({ variant: _ }), t, n.className), "data-slot": `calendar`, "data-variant": _ }),
      Chevron: u,
      DayButton: h,
      PreviousMonthButton: p,
      NextMonthButton: m,
      ...i,
    },
    ...f,
  });
}
export { g as n, y as t };
