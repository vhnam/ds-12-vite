import { cva, type VariantProps } from 'class-variance-authority';
import type { ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';

export const menuItemVariants = cva('menu-item', {
  variants: {
    variant: {
      single: '',
      multiple: '',
    },
  },
  compoundVariants: [
    { variant: 'single', class: 'menu-item-single' },
    { variant: 'multiple', class: 'menu-item-multiple' },
  ],
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
  return (
    <span className={cn('menu-item-text', className)} data-slot="menu-item-text">
      {children}
    </span>
  );
}

export type MenuItemCheckboxProps = {
  className?: string;
  /** Selection indicator slot — e.g. Combobox.ItemIndicator with a check icon. */
  children: ReactNode;
};

/** Checkbox control for multi-select menu items. Pair with a selection indicator in `children`. */
export function MenuItemCheckbox({ className, children }: MenuItemCheckboxProps) {
  return (
    <span className={cn('menu-item-checkbox', className)} data-slot="menu-item-checkbox" aria-hidden>
      <span className="menu-item-checkbox-control">{children}</span>
    </span>
  );
}

export { menuItemVariants as menuVariants };
