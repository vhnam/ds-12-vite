import { Input } from "@base-ui/react/input";
import { ComponentProps, ReactNode } from "react";

//#region src/components/input/index.d.ts
declare const InputIconSizeContext: import("react").Context<number | undefined>;
declare const inputVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    variant?: "default" | "suffix" | null | undefined;
    disabled?: boolean | null | undefined;
    invalid?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type InputProps = Omit<ComponentProps<typeof Input>, "className" | "size"> & {
  /** Additional CSS class names applied to the input wrapper. */ className?: string;
  /**
   * Visual size of the input control.
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Layout variant — use `"suffix"` to show inline text after the value (e.g. units).
   * @default "default"
   */
  variant?: "default" | "suffix";
  /**
   * Marks the field as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean /** Custom leading icon element. */;
  leadingIcon?: ReactNode /** Custom trailing icon element. Shown only on the `"default"` variant. */;
  trailingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the input.
   * @default false
   */
  showLeadingIcon?: boolean;
  /**
   * Renders a trailing icon inside the input.
   * @default false
   */
  showTrailingIcon?: boolean /** Inline suffix text displayed after the input value (requires `variant="suffix"`). */;
  suffix?: string;
};
/** Single-line text field with size and suffix variants, optional leading and trailing icons, and error and disabled states. */
declare function Input$1({
  className,
  size,
  variant,
  invalid,
  disabled,
  leadingIcon,
  trailingIcon,
  showLeadingIcon,
  showTrailingIcon,
  suffix,
  placeholder,
  ...props
}: InputProps): import("react").JSX.Element;
//#endregion
export { inputVariants as i, InputIconSizeContext as n, InputProps as r, Input$1 as t };
