import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import './menu.css';

export const menuItemVariants = cva('ds-menu__item', {
  variants: {
    variant: {
      single: 'ds-menu__item--single',
      multiple: 'ds-menu__item--multiple',
    },
  },
  defaultVariants: {
    variant: 'single',
  },
});

export type MenuVariant = NonNullable<VariantProps<typeof menuItemVariants>['variant']>;

export type MenuItemTextProps = {
  className?: string;
  children: ReactNode;
};

/** Label text for a menu list item. */
export function MenuItemText({ className, children }: MenuItemTextProps) {
  return <span className={cn('ds-menu__item-text', className)}>{children}</span>;
}

export type MenuItemCheckboxProps = {
  className?: string;
  /** Selection indicator slot — e.g. Combobox.ItemIndicator with a check icon. */
  children: ReactNode;
};

/** Checkbox control for multi-select menu items. Pair with a selection indicator in `children`. */
export function MenuItemCheckbox({ className, children }: MenuItemCheckboxProps) {
  return (
    <span className={cn('ds-menu__item-checkbox', className)} aria-hidden>
      <span className="ds-menu__item-checkbox-control">{children}</span>
    </span>
  );
}

export { menuItemVariants as menuVariants };
