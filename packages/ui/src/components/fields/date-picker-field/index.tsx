import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { DatePicker, type DatePickerProps } from '../../date-picker/index.tsx';

const datePickerFieldVariants = cva('date-picker-field', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', class: 'date-picker-field-preset-size-sm' },
    { size: 'lg', class: 'date-picker-field-preset-size-lg' },
    { size: 'sm', disabled: true, class: 'date-picker-field-preset-size-sm-disabled' },
    { size: 'lg', disabled: true, class: 'date-picker-field-preset-size-lg-disabled' },
    { size: 'sm', invalid: true, class: 'date-picker-field-preset-size-sm-invalid' },
    { size: 'lg', invalid: true, class: 'date-picker-field-preset-size-lg-invalid' },
    { disabled: true, class: 'date-picker-field-disabled' },
  ],
  defaultVariants: {
    size: 'sm',
    disabled: false,
    invalid: false,
  },
});

export type DatePickerFieldProps = Omit<DatePickerProps, 'id' | 'invalid' | 'disabled'> & {
  /** Visible label text associated with the date picker. */
  label?: string;
  /** Helper or error text displayed below the date picker. */
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
  showHelperText?: boolean;
  /** Additional CSS class names applied to the field wrapper. */
  fieldClassName?: string;
  /** Prevents interaction with the control. */
  disabled?: boolean;
  /** Marks the field as invalid and sets validation styling. */
  invalid?: boolean;
  /** ID applied to the date picker trigger. */
  id?: string;
};

/** Labelled date picker field composed of a label, helper text, and a DatePicker control with shared validation styling. */
export function DatePickerField({
  className,
  fieldClassName,
  size = 'sm',
  invalid = false,
  disabled,
  label = 'Label',
  helperText = 'Helper text',
  showLabel = true,
  showHelperText = true,
  id: idProp,
  ...datePickerProps
}: DatePickerFieldProps) {
  const generatedId = useId();
  const datePickerId = idProp ?? generatedId;
  const helperId = `${datePickerId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        datePickerFieldVariants({
          size: resolvedSize,
          disabled: isDisabled,
          invalid: isInvalid,
          className: fieldClassName,
        }),
        isInvalid && 'date-picker-field-invalid',
      )}
      data-slot="date-picker-field"
      data-variant={resolvedSize}
    >
      {showLabel ? (
        <Field.Label htmlFor={datePickerId} className="date-picker-field-label" data-slot="date-picker-field-label">
          {label}
        </Field.Label>
      ) : null}
      <DatePicker
        id={datePickerId}
        className={className}
        size={resolvedSize}
        invalid={isInvalid}
        disabled={isDisabled}
        aria-describedby={showHelperText ? helperId : undefined}
        {...datePickerProps}
      />
      {showHelperText ? (
        <Field.Description id={helperId} className="date-picker-field-helper" data-slot="date-picker-field-helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { datePickerFieldVariants };
