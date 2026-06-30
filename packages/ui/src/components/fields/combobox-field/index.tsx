import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Combobox, type ComboboxOption, type ComboboxProps } from '../../combobox/index.tsx';
import './combobox-field.css';

const comboboxFieldVariants = cva('ds-combobox-field', {
  variants: {
    size: {
      sm: 'ds-combobox-field--sm',
      lg: 'ds-combobox-field--lg',
    },
    disabled: {
      true: 'ds-combobox-field--disabled',
      false: null,
    },
    invalid: {
      true: 'ds-combobox-field--error',
      false: null,
    },
  },
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
      )}
    >
      {showLabel ? (
        <Field.Label htmlFor={comboboxId} className="ds-combobox-field__label">
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
        <Field.Description id={helperId} className="ds-combobox-field__helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { comboboxFieldVariants };
export type { ComboboxOption };
