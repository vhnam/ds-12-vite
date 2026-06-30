import { r as InputProps } from "../index-C9fHU84I.mjs";

//#region src/components/fields/input-field/index.d.ts
declare const inputFieldVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    variant?: "default" | "suffix" | null | undefined;
    disabled?: boolean | null | undefined;
    invalid?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type InputFieldProps = InputProps & {
  /** Visible label text associated with the input. */ label?: string /** Helper or error text displayed below the input. */;
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
/** Labelled input field composed of a label, helper text, and an Input control with shared validation styling. */
declare function InputField({
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
  ...inputProps
}: InputFieldProps): import("react").JSX.Element;
//#endregion
export { InputField, InputFieldProps, inputFieldVariants };
