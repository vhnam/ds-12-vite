import { ComponentProps, ReactNode } from "react";

//#region src/components/textarea/index.d.ts
declare const TextareaIconSizeContext: import("react").Context<number | undefined>;
declare const textareaVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    variant?: "default" | "suffix" | null | undefined;
    disabled?: boolean | null | undefined;
    invalid?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type TextareaProps = Omit<ComponentProps<"textarea">, "className" | "size"> & {
  /** Additional CSS class names applied to the textarea wrapper. */ className?: string;
  /**
   * Visual size of the textarea control.
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Layout variant — use `"suffix"` to show inline text after the value (e.g. character count).
   * @default "default"
   */
  variant?: "default" | "suffix";
  /**
   * Marks the field as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean /** Custom leading icon element. */;
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the textarea.
   * @default false
   */
  showLeadingIcon?: boolean /** Inline suffix text displayed after the textarea value (requires `variant="suffix"`). */;
  suffix?: string;
};
/** Multi-line text field with optional leading icon, character suffix, and error and disabled states. */
declare function Textarea({
  className,
  size,
  variant,
  invalid,
  disabled,
  leadingIcon,
  showLeadingIcon,
  suffix,
  placeholder,
  ...props
}: TextareaProps): import("react").JSX.Element;
//#endregion
export { Textarea, TextareaIconSizeContext, TextareaProps, textareaVariants };
