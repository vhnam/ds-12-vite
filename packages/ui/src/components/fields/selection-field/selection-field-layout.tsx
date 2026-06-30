import { Field } from '@base-ui/react/field';
import { cva } from 'class-variance-authority';
import { useId, type ReactNode } from 'react';

import { cn } from '../../../lib/utils.ts';
import { Input, type InputProps } from '../../input/index.tsx';
import './selection-field.css';

const selectionFieldVariants = cva('ds-selection-field', {
  variants: {
    size: {
      sm: 'ds-selection-field--sm',
      lg: 'ds-selection-field--lg',
    },
    disabled: {
      true: 'ds-selection-field--disabled',
      false: null,
    },
    invalid: {
      true: 'ds-selection-field--error',
      false: null,
    },
    supportingText: {
      true: 'ds-selection-field--supporting-text',
      false: null,
    },
    input: {
      true: 'ds-selection-field--input',
      false: null,
    },
  },
  defaultVariants: {
    size: 'sm',
    disabled: false,
    invalid: false,
    supportingText: false,
    input: false,
  },
});

export type SelectionFieldBaseProps = {
  /** Visible label text associated with the selection control. */
  label?: string;
  /** Secondary descriptive text displayed below the label. */
  supportingText?: string;
  /** Right-aligned supplementary text on the label row. */
  suffix?: string;
  /** Error message displayed below the field when invalid. */
  helperText?: string;
  /**
   * Whether to render the label element.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Whether to render supporting text below the label.
   * @default false
   */
  showSupportingText?: boolean;
  /**
   * Whether to render the suffix element.
   * @default true
   */
  showSuffix?: boolean;
  /**
   * Whether to render helper text when the field is invalid.
   * @default true
   */
  showHelperText?: boolean;
  /**
   * Whether to render an input below the selection row.
   * @default false
   */
  showInput?: boolean;
  /** Additional CSS class names applied to the field wrapper. */
  fieldClassName?: string;
  /**
   * Marks the field as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean;
  /** Prevents interaction with the control and embedded input. */
  disabled?: boolean;
  /**
   * Visual size of the selection control.
   * @default "sm"
   */
  size?: 'sm' | 'lg';
  /** ID applied to the selection control. */
  id?: string;
  /** Props forwarded to the embedded input when `showInput` is true. */
  inputProps?: Omit<InputProps, 'size' | 'invalid' | 'disabled' | 'id'>;
};

type SelectionFieldLayoutProps = SelectionFieldBaseProps & {
  renderControl: (controlId: string) => ReactNode;
};

/** Shared labelled layout for checkbox, radio, and switch field components. */
export function SelectionFieldLayout({
  renderControl,
  fieldClassName,
  size = 'sm',
  invalid = false,
  disabled,
  label = 'Selection label',
  supportingText = 'Supporting text',
  suffix = 'Suffix',
  helperText = 'Helper Text',
  showLabel = true,
  showSupportingText = false,
  showSuffix = true,
  showHelperText = true,
  showInput = false,
  inputProps,
  id: idProp,
}: SelectionFieldLayoutProps) {
  const generatedId = useId();
  const controlId = idProp ?? generatedId;
  const inputId = `${controlId}-input`;
  const helperId = `${controlId}-helper`;
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const resolvedSize = size ?? 'sm';

  return (
    <Field.Root
      disabled={isDisabled}
      invalid={isInvalid}
      className={cn(
        selectionFieldVariants({
          size: resolvedSize,
          disabled: isDisabled,
          invalid: isInvalid,
          supportingText: showSupportingText,
          input: showInput,
          className: fieldClassName,
        }),
      )}
    >
      <div className="ds-selection-field__row">
        {renderControl(controlId)}
        {showLabel || showSupportingText ? (
          <div className="ds-selection-field__content">
            {showLabel ? (
              <Field.Label htmlFor={controlId} className="ds-selection-field__label">
                {label}
              </Field.Label>
            ) : null}
            {showSupportingText ? <span className="ds-selection-field__supporting">{supportingText}</span> : null}
          </div>
        ) : null}
        {showSuffix ? <span className="ds-selection-field__suffix">{suffix}</span> : null}
      </div>
      {showInput ? (
        <Input
          id={inputId}
          size="lg"
          invalid={isInvalid}
          disabled={isDisabled}
          placeholder="Input"
          aria-describedby={isInvalid && showHelperText ? helperId : undefined}
          {...inputProps}
        />
      ) : null}
      {isInvalid && showHelperText ? (
        <Field.Description id={helperId} className="ds-selection-field__helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { selectionFieldVariants };
