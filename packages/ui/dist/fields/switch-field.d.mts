import { n as selectionFieldVariants, t as SelectionFieldBaseProps } from "../selection-field-layout-CHorFcIc.mjs";
import { SwitchProps } from "../switch.mjs";

//#region src/components/fields/switch-field/index.d.ts
type SwitchFieldProps = Omit<SwitchProps, "disabled" | "className"> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the switch control. */ className?: string;
  };
/** Labelled switch field with optional supporting text, suffix, and embedded input. */
declare function SwitchField({
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
  ...switchProps
}: SwitchFieldProps): import("react").JSX.Element;
//#endregion
export { SwitchField, SwitchFieldProps, selectionFieldVariants as switchFieldVariants };
