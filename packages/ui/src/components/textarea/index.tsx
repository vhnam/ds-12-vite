import { cva } from "class-variance-authority";
import { createContext, type ComponentProps, type ReactNode } from "react";

import "@ds-12/design-tokens/tokens.css";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./textarea.css";

const TEXTAREA_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = "person";

export const TextareaIconSizeContext = createContext<number | undefined>(undefined);

const textareaVariants = cva("ds-textarea", {
  variants: {
    size: {
      sm: "ds-textarea--sm",
      lg: "ds-textarea--lg",
    },
    variant: {
      default: "ds-textarea--default",
      suffix: "ds-textarea--suffix",
    },
    disabled: {
      true: "ds-textarea--disabled",
      false: null,
    },
    invalid: {
      true: "ds-textarea--error",
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

export type TextareaProps = Omit<ComponentProps<"textarea">, "className" | "size"> & {
  className?: string;
  size?: "sm" | "lg";
  variant?: "default" | "suffix";
  invalid?: boolean;
  leadingIcon?: ReactNode;
  showLeadingIcon?: boolean;
  suffix?: string;
};

export function Textarea({
  className,
  size = "sm",
  variant = "default",
  invalid = false,
  disabled,
  leadingIcon,
  showLeadingIcon = false,
  suffix,
  placeholder = "Input",
  ...props
}: TextareaProps) {
  const resolvedSize = size ?? "sm";
  const resolvedVariant = variant ?? "default";
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = TEXTAREA_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const hasSuffix = resolvedVariant === "suffix" && suffix !== undefined;

  const resolvedLeading = hasLeading
    ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />)
    : null;

  const control = (
    <textarea
      className="ds-textarea__control"
      disabled={isDisabled}
      aria-invalid={isInvalid || undefined}
      placeholder={placeholder}
      {...props}
    />
  );

  return (
    <TextareaIconSizeContext.Provider value={iconSize}>
      <div
        className={cn(
          textareaVariants({
            size: resolvedSize,
            variant: resolvedVariant,
            disabled: isDisabled,
            invalid: isInvalid,
            className,
          }),
        )}
      >
        {resolvedLeading ? <span className="ds-textarea__leading">{resolvedLeading}</span> : null}
        {resolvedVariant === "suffix" ? (
          <div className="ds-textarea__content">
            {control}
            {hasSuffix ? <span className="ds-textarea__suffix">{suffix}</span> : null}
          </div>
        ) : (
          control
        )}
      </div>
    </TextareaIconSizeContext.Provider>
  );
}

export { textareaVariants };
