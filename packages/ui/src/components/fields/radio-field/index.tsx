import { Radio, type RadioProps } from '../../radio/index.tsx';
import {
  SelectionFieldLayout,
  selectionFieldVariants,
  type SelectionFieldBaseProps,
} from '../selection-field/selection-field-layout.tsx';

export type RadioFieldProps = Omit<RadioProps, 'size' | 'invalid' | 'disabled' | 'className'> &
  SelectionFieldBaseProps & {
    /** Additional CSS class names applied to the radio control. */
    className?: string;
  };

/** Labelled radio field with optional supporting text, suffix, and embedded input. */
export function RadioField({
  className,
  fieldClassName,
  size = 'sm',
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
  value,
  ...radioProps
}: RadioFieldProps) {
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
        <Radio
          id={controlId}
          className={className}
          size={size}
          invalid={invalid}
          disabled={disabled}
          value={value}
          {...radioProps}
        />
      )}
    />
  );
}

export { selectionFieldVariants as radioFieldVariants };
