import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Combobox, type ComboboxOption, type ComboboxProps } from '../../combobox/index.tsx';

const comboboxFieldVariants = cva('combobox-field', {
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
    { size: 'sm', class: 'combobox-field-preset-size-sm' },
    { size: 'lg', class: 'combobox-field-preset-size-lg' },
    { size: 'sm', disabled: true, class: 'combobox-field-preset-size-sm-disabled' },
    { size: 'lg', disabled: true, class: 'combobox-field-preset-size-lg-disabled' },
    { size: 'sm', invalid: true, class: 'combobox-field-preset-size-sm-invalid' },
    { size: 'lg', invalid: true, class: 'combobox-field-preset-size-lg-invalid' },
    { disabled: true, class: 'combobox-field-disabled' },
  ],
  defaultVariants: {
    size: 'sm',
    disabled: false,
    invalid: false,
  },
});

export type ComboboxFieldProps = Omit<ComboboxProps, 'id' | 'invalid' | 'disabled'> & {
  /** Visible label text associated with the combobox. */
  label?: string;
  /** Helper or error text displayed below the combobox. */
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
  /** ID applied to the combobox input. */
  id?: string;
};

/** Labelled combobox field composed of a label, helper text, and a Combobox control with shared validation styling. */
export function ComboboxField({
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
  ...comboboxProps
}: ComboboxFieldProps) {
  const generatedId = useId();
  const comboboxId = idProp ?? generatedId;
  const helperId = `${comboboxId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        comboboxFieldVariants({
          size: resolvedSize,
          disabled: isDisabled,
          invalid: isInvalid,
          className: fieldClassName,
        }),
        isInvalid && 'combobox-field-invalid',
      )}
      data-slot="combobox-field"
      data-variant={resolvedSize}
    >
      {showLabel ? (
        <Field.Label htmlFor={comboboxId} className="combobox-field-label" data-slot="combobox-field-label">
          {label}
        </Field.Label>
      ) : null}
      <Combobox
        id={comboboxId}
        className={className}
        size={resolvedSize}
        invalid={isInvalid}
        disabled={isDisabled}
        options={options}
        aria-describedby={showHelperText ? helperId : undefined}
        {...comboboxProps}
      />
      {showHelperText ? (
        <Field.Description id={helperId} className="combobox-field-helper" data-slot="combobox-field-helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { comboboxFieldVariants };
export type { ComboboxOption };
