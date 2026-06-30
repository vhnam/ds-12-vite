import { VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

//#region src/components/menu/index.d.ts
declare const menuItemVariants: (
  props?: {
    variant?: "multiple" | "single" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type MenuVariant = NonNullable<VariantProps<typeof menuItemVariants>["variant"]>;
type MenuItemTextProps = {
  className?: string;
  children: ReactNode;
};
/** Label text for a menu list item. */
declare function MenuItemText({ className, children }: MenuItemTextProps): import("react").JSX.Element;
type MenuItemCheckboxProps = {
  className?: string /** Selection indicator slot — e.g. Combobox.ItemIndicator with a check icon. */;
  children: ReactNode;
};
/** Checkbox control for multi-select menu items. Pair with a selection indicator in `children`. */
declare function MenuItemCheckbox({ className, children }: MenuItemCheckboxProps): import("react").JSX.Element;
//#endregion
export {
  MenuItemCheckbox,
  MenuItemCheckboxProps,
  MenuItemText,
  MenuItemTextProps,
  MenuVariant,
  menuItemVariants,
  menuItemVariants as menuVariants,
};
