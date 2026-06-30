import { n as CheckboxProps } from "../index-CWwbAwBe.mjs";
import { n as selectionFieldVariants, t as SelectionFieldBaseProps } from "../selection-field-layout-CgxPUUHX.mjs";

//#region src/components/fields/checkbox-field/index.d.ts
type CheckboxFieldProps = Omit<CheckboxProps, "size" | "invalid" | "disabled" | "id" | "className"> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the checkbox control. */ className?: string;
  };
/** Labelled checkbox field with optional supporting text, suffix, and embedded input. */
declare function CheckboxField({
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
  checked,
  defaultChecked,
  onCheckedChange,
  ...checkboxProps
}: CheckboxFieldProps): import("react").JSX.Element;
//#endregion
export { CheckboxField, CheckboxFieldProps, selectionFieldVariants as checkboxFieldVariants };
