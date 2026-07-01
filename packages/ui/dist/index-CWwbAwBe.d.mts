import { Checkbox } from "@base-ui/react/checkbox";
import { ComponentProps } from "react";

//#region src/components/checkbox/index.d.ts
declare const checkboxVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        invalid?: boolean | null | undefined;
        disabled?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type CheckboxProps = Omit<ComponentProps<typeof Checkbox.Root>, "className"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Visual size of the checkbox control.
   * @default "lg"
   */
  size?: "sm" | "lg";
  /**
   * Marks the control as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Prevents interaction and dims the control.
   * @default false
   */
  disabled?: boolean;
};
/** Square selection control for independent on/off choices in forms and settings. */
declare function Checkbox$1({
  className,
  size,
  invalid,
  disabled,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps): import("react").JSX.Element;
//#endregion
export { CheckboxProps as n, checkboxVariants as r, Checkbox$1 as t };
