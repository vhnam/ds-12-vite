import { DatePickerProps } from "../date-picker.mjs";

//#region src/components/fields/date-picker-field/index.d.ts
declare const datePickerFieldVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type DatePickerFieldProps = Omit<DatePickerProps, "id" | "invalid" | "disabled"> & {
  /** Visible label text associated with the date picker. */ label?: string /** Helper or error text displayed below the date picker. */;
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
  invalid?: boolean /** ID applied to the date picker trigger. */;
  id?: string;
};
/** Labelled date picker field composed of a label, helper text, and a DatePicker control with shared validation styling. */
declare function DatePickerField({
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
  ...datePickerProps
}: DatePickerFieldProps): import("react").JSX.Element;
//#endregion
export { DatePickerField, DatePickerFieldProps, datePickerFieldVariants };
