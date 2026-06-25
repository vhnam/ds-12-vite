import { Checkbox, type CheckboxProps } from "../../checkbox/index.tsx";
import {
  SelectionFieldLayout,
  selectionFieldVariants,
  type SelectionFieldBaseProps,
} from "../selection-field/selection-field-layout.tsx";

export type CheckboxFieldProps = Omit<
  CheckboxProps,
  "size" | "invalid" | "disabled" | "id" | "className"
> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the checkbox control. */
    className?: string;
  };

/** Labelled checkbox field with optional supporting text, suffix, and embedded input. */
export function CheckboxField({
  className,
  fieldClassName,
  size = "sm",
  invalid = false,
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
}: CheckboxFieldProps) {
  return (
    <SelectionFieldLayout
      fieldClassName={fieldClassName}
      size={size}
      invalid={invalid}
      disabled={disabled}
      label={label}
      supportingText={supportingText}
      suffix={suffix}
      helperText={helperText}
      showLabel={showLabel}
      showSupportingText={showSupportingText}
      showSuffix={showSuffix}
      showHelperText={showHelperText}
      showInput={showInput}
      inputProps={inputProps}
      id={id}
      renderControl={(controlId) => (
        <Checkbox
          id={controlId}
          className={className}
          size={size}
          invalid={invalid}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          {...checkboxProps}
        />
      )}
    />
  );
}

export { selectionFieldVariants as checkboxFieldVariants };
