import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Select, type SelectOption, type SelectProps } from '../../select/index.tsx';

const selectFieldVariants = cva('select-field', {
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
    { size: 'sm', class: 'select-field-preset-size-sm' },
    { size: 'lg', class: 'select-field-preset-size-lg' },
    { size: 'sm', disabled: true, class: 'select-field-preset-size-sm-disabled' },
    { size: 'lg', disabled: true, class: 'select-field-preset-size-lg-disabled' },
    { size: 'sm', invalid: true, class: 'select-field-preset-size-sm-invalid' },
    { size: 'lg', invalid: true, class: 'select-field-preset-size-lg-invalid' },
    { disabled: true, class: 'select-field-disabled' },
  ],
  defaultVariants: {
    size: 'sm',
    disabled: false,
    invalid: false,
  },
});

export type SelectFieldProps = Omit<SelectProps, 'id' | 'invalid' | 'disabled'> & {
  /** Visible label text associated with the select. */
  label?: string;
  /** Helper or error text displayed below the select. */
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
  /** ID applied to the select trigger. */
  id?: string;
};

/** Labelled select field composed of a label, helper text, and a Select control with shared validation styling. */
export function SelectField({
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
  options,
  ...selectProps
}: SelectFieldProps) {
  const generatedId = useId();
  const selectId = idProp ?? generatedId;
  const helperId = `${selectId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        selectFieldVariants({
          size: resolvedSize,
          disabled: isDisabled,
          invalid: isInvalid,
          className: fieldClassName,
        }),
        isInvalid && 'select-field-invalid',
      )}
      data-slot="select-field"
      data-variant={resolvedSize}
    >
      {showLabel ? (
        <Field.Label htmlFor={selectId} className="select-field-label" data-slot="select-field-label">
          {label}
        </Field.Label>
      ) : null}
      <Select
        id={selectId}
        className={className}
        size={resolvedSize}
        invalid={isInvalid}
        disabled={isDisabled}
        options={options}
        aria-describedby={showHelperText ? helperId : undefined}
        {...selectProps}
      />
      {showHelperText ? (
        <Field.Description id={helperId} className="select-field-helper" data-slot="select-field-helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { selectFieldVariants };
export type { SelectOption };
