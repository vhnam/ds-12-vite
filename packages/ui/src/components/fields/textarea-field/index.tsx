import { Field } from "@base-ui/react/field";
import { cva } from "class-variance-authority";
import { useId } from "react";

import { cn } from "../../../lib/utils.ts";
import { Textarea, type TextareaProps } from "../../textarea/index.tsx";
import "./textarea-field.css";

const textareaFieldVariants = cva("ds-textarea-field", {
  variants: {
    size: {
      sm: "ds-textarea-field--sm",
      lg: "ds-textarea-field--lg",
    },
    variant: {
      default: "ds-textarea-field--default",
      suffix: "ds-textarea-field--suffix",
    },
    disabled: {
      true: "ds-textarea-field--disabled",
      false: null,
    },
    invalid: {
      true: "ds-textarea-field--error",
      false: null,
    },
  },
  defaultVariants: {
    size: "sm",
    variant: "default",
    disabled: false,
    invalid: false,
  },
});

export type TextareaFieldProps = TextareaProps & {
  label?: string;
  helperText?: string;
  showLabel?: boolean;
  showHelperText?: boolean;
  fieldClassName?: string;
};

/** Labelled textarea field composed of a label, helper text, and a Textarea control with shared validation styling. */
export function TextareaField({
  className,
  fieldClassName,
  size = "sm",
  variant = "default",
  invalid = false,
  disabled,
  label = "Label",
  helperText = "Helper text",
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
  const resolvedSize = size ?? "sm";
  const resolvedVariant = variant ?? "default";

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
    >
      {showLabel ? (
        <Field.Label htmlFor={textareaId} className="ds-textarea-field__label">
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
        <Field.Description id={helperId} className="ds-textarea-field__helper">
          {helperText}
        </Field.Description>
      ) : null}
    </Field.Root>
  );
}

export { textareaFieldVariants };
