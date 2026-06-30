import { SelectOption, SelectProps } from "../select.mjs";

//#region src/components/fields/select-field/index.d.ts
declare const selectFieldVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    disabled?: boolean | null | undefined;
    invalid?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type SelectFieldProps = Omit<SelectProps, "id" | "invalid" | "disabled"> & {
  /** Visible label text associated with the select. */ label?: string /** Helper or error text displayed below the select. */;
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
  fieldClassName?: string /** Prevents interaction with the control. */;
  disabled?: boolean /** Marks the field as invalid and sets validation styling. */;
  invalid?: boolean /** ID applied to the select trigger. */;
  id?: string;
};
/** Labelled select field composed of a label, helper text, and a Select control with shared validation styling. */
declare function SelectField({
  className,
  fieldClassName,
  size,
  invalid,
  disabled,
  label,
  helperText,
  showLabel,
  showHelperText,
  id: idProp,
  options,
  ...selectProps
}: SelectFieldProps): import("react").JSX.Element;
//#endregion
export { SelectField, SelectFieldProps, type SelectOption, selectFieldVariants };
