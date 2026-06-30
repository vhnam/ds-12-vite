import { TextareaProps } from "../textarea.mjs";

//#region src/components/fields/textarea-field/index.d.ts
declare const textareaFieldVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    variant?: "default" | "suffix" | null | undefined;
    disabled?: boolean | null | undefined;
    invalid?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type TextareaFieldProps = TextareaProps & {
  /** Visible label text associated with the textarea. */ label?: string /** Helper or error text displayed below the textarea. */;
  helperText?: string;
  /**
   * Whether to render the label element.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Whether to render the helper text element.
   * @default true
   */
  showHelperText?: boolean /** Additional CSS class names applied to the field wrapper. */;
  fieldClassName?: string;
};
/** Labelled textarea field composed of a label, helper text, and a Textarea control with shared validation styling. */
declare function TextareaField({
  className,
  fieldClassName,
  size,
  variant,
  invalid,
  disabled,
  label,
  helperText,
  showLabel,
  showHelperText,
  id: idProp,
  ...textareaProps
}: TextareaFieldProps): import("react").JSX.Element;
//#endregion
export { TextareaField, TextareaFieldProps, textareaFieldVariants };
