import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Input, type InputProps } from '../../input/index.tsx';

const inputFieldVariants = cva('input-field', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    variant: {
      default: '',
      suffix: '',
    },
    disabled: {
      true: 'input-field-disabled',
      false: '',
    },
    invalid: {
      true: 'input-field-error',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', variant: 'default', class: 'input-field-preset-sm-default' },
    { size: 'sm', variant: 'suffix', class: 'input-field-preset-sm-suffix' },
    { size: 'lg', variant: 'default', class: 'input-field-preset-lg-default' },
    { size: 'lg', variant: 'suffix', class: 'input-field-preset-lg-suffix' },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'default',
    disabled: false,
    invalid: false,
  },
});

export type InputFieldProps = InputProps & {
  /** Visible label text associated with the input. */
  label?: string;
  /** Helper or error text displayed below the input. */
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
};

/** Labelled input field composed of a label, helper text, and an Input control with shared validation styling. */
export function InputField({
  className,
  fieldClassName,
  size = 'sm',
  variant = 'default',
  invalid = false,
  disabled,
  label = 'Label',
  helperText = 'Helper text',
  showLabel = true,
  showHelperText = true,
  id: idProp,
  ...inputProps
}: InputFieldProps) {
  const generatedId = useId();
  const inputId = idProp ?? generatedId;
  const helperId = `${inputId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';
  const resolvedVariant = variant ?? 'default';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        inputFieldVariants({
          size: resolvedSize,
          variant: resolvedVariant,
          disabled: isDisabled,
          invalid: isInvalid,
          className: fieldClassName,
        }),
      )}
      data-slot="input-field"
      data-variant={resolvedVariant}
    >
      {showLabel ? (
        <Field.Label htmlFor={inputId} className="input-field-label">
          {label}
        </Field.Label>
      ) : null}
      <Input
        id={inputId}
        className={className}
        size={resolvedSize}
        variant={resolvedVariant}
        invalid={isInvalid}
        disabled={isDisabled}
        aria-describedby={showHelperText ? helperId : undefined}
        {...inputProps}
      />
      {showHelperText ? (
        <Field.Description id={helperId} className="input-field-helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { inputFieldVariants };
