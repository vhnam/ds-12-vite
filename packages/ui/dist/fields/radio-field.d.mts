import { RadioProps } from "../radio.mjs";
import { n as selectionFieldVariants, t as SelectionFieldBaseProps } from "../selection-field-layout-CHorFcIc.mjs";

//#region src/components/fields/radio-field/index.d.ts
type RadioFieldProps = Omit<RadioProps, "size" | "invalid" | "disabled" | "className"> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the radio control. */ className?: string;
  };
/** Labelled radio field with optional supporting text, suffix, and embedded input. */
declare function RadioField({
  className,
  fieldClassName,
  size,
  invalid,
  disabled,
  label,
  supportingText,
  suffix,
  helperText,
  showLabel,
  showSupportingText,
  showSuffix,
  showHelperText,
  showInput,
  inputProps,
  id,
  value,
  ...radioProps
}: RadioFieldProps): import("react").JSX.Element;
//#endregion
export { RadioField, RadioFieldProps, selectionFieldVariants as radioFieldVariants };
