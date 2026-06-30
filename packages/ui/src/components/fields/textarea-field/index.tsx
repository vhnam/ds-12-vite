import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Textarea, type TextareaProps } from '../../textarea/index.tsx';

const textareaFieldVariants = cva('textarea-field', {
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
      true: 'textarea-field-disabled',
      false: '',
    },
    invalid: {
      true: 'textarea-field-error',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', variant: 'default', class: 'textarea-field-preset-sm-default' },
    { size: 'sm', variant: 'suffix', class: 'textarea-field-preset-sm-suffix' },
    { size: 'lg', variant: 'default', class: 'textarea-field-preset-lg-default' },
    { size: 'lg', variant: 'suffix', class: 'textarea-field-preset-lg-suffix' },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'default',
    disabled: false,
    invalid: false,
  },
});

export type TextareaFieldProps = TextareaProps & {
  /** Visible label text associated with the textarea. */
  label?: string;
  /** Helper or error text displayed below the textarea. */
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

/** Labelled textarea field composed of a label, helper text, and a Textarea control with shared validation styling. */
export function TextareaField({
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
  ...textareaProps
}: TextareaFieldProps) {
  const generatedId = useId();
  const textareaId = idProp ?? generatedId;
  const helperId = `${textareaId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';
  const resolvedVariant = variant ?? 'default';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        textareaFieldVariants({
          size: resolvedSize,
          variant: resolvedVariant,
          disabled: isDisabled,
          invalid: isInvalid,
          className: fieldClassName,
        }),
      )}
      data-slot="textarea-field"
      data-variant={resolvedVariant}
    >
      {showLabel ? (
        <Field.Label htmlFor={textareaId} className="textarea-field-label">
          {label}
        </Field.Label>
      ) : null}
      <Textarea
        id={textareaId}
        className={className}
        size={resolvedSize}
        variant={resolvedVariant}
        invalid={isInvalid}
        disabled={isDisabled}
        aria-describedby={showHelperText ? helperId : undefined}
        {...textareaProps}
      />
      {showHelperText ? (
        <Field.Description id={helperId} className="textarea-field-helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { textareaFieldVariants };
