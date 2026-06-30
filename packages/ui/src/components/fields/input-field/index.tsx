import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Input, type InputProps } from '../../input/index.tsx';
import './input-field.css';

const inputFieldVariants = cva('ds-input-field', {
  variants: {
    size: {
      sm: 'ds-input-field--sm',
      lg: 'ds-input-field--lg',
    },
    variant: {
      default: 'ds-input-field--default',
      suffix: 'ds-input-field--suffix',
    },
    disabled: {
      true: 'ds-input-field--disabled',
      false: null,
    },
    invalid: {
      true: 'ds-input-field--error',
      false: null,
    },
  },
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
    >
      {showLabel ? (
        <Field.Label htmlFor={inputId} className="ds-input-field__label">
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
        <Field.Description id={helperId} className="ds-input-field__helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { inputFieldVariants };
