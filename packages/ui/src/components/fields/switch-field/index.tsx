import { Switch, type SwitchProps } from "../../switch/index.tsx";
import {
  SelectionFieldLayout,
  selectionFieldVariants,
  type SelectionFieldBaseProps,
} from "../selection-field/selection-field-layout.tsx";

export type SwitchFieldProps = Omit<SwitchProps, "disabled" | "className"> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the switch control. */
    className?: string;
  };

/** Labelled switch field with optional supporting text, suffix, and embedded input. */
export function SwitchField({
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
  ...switchProps
}: SwitchFieldProps) {
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
        <Switch
          id={controlId}
          className={className}
          disabled={disabled}
          checked={checked}
          defaultChecked={defaultChecked}
          onCheckedChange={onCheckedChange}
          {...switchProps}
        />
      )}
    />
  );
}

export { selectionFieldVariants as switchFieldVariants };
