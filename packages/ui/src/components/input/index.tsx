import { Input as BaseInput } from "@base-ui/react/input";
import { cva } from "class-variance-authority";
import { createContext, type ComponentProps, type ReactNode } from "react";

import "@ds-12/design-tokens/tokens.css";
import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./input.css";

const INPUT_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = "person";
const DEFAULT_TRAILING_ICON = "visibility";
const ERROR_TRAILING_ICON = "error";

export const InputIconSizeContext = createContext<number | undefined>(undefined);

const inputVariants = cva("ds-input", {
  variants: {
    size: {
      sm: "ds-input--sm",
      lg: "ds-input--lg",
    },
    variant: {
      default: "ds-input--default",
      suffix: "ds-input--suffix",
    },
    disabled: {
      true: "ds-input--disabled",
      false: null,
    },
    invalid: {
      true: "ds-input--error",
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

export type InputProps = Omit<ComponentProps<typeof BaseInput>, "className" | "size"> & {
  className?: string;
  size?: "sm" | "lg";
  variant?: "default" | "suffix";
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  showLeadingIcon?: boolean;
  showTrailingIcon?: boolean;
  suffix?: string;
};

export function Input({
  className,
  size = "sm",
  variant = "default",
  invalid = false,
  disabled,
  leadingIcon,
  trailingIcon,
  showLeadingIcon = false,
  showTrailingIcon = false,
  suffix,
  placeholder = "Input",
  ...props
}: InputProps) {
  const resolvedSize = size ?? "sm";
  const resolvedVariant = variant ?? "default";
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = INPUT_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const hasTrailing = showTrailingIcon && resolvedVariant === "default";
  const hasSuffix = resolvedVariant === "suffix" && suffix !== undefined;

  const resolvedLeading = hasLeading
    ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />)
    : null;

  const defaultTrailingIcon = isInvalid ? ERROR_TRAILING_ICON : DEFAULT_TRAILING_ICON;
  const resolvedTrailing = hasTrailing
    ? (trailingIcon ?? <Icon name={defaultTrailingIcon} size={iconSize} />)
    : null;

  return (
    <InputIconSizeContext.Provider value={iconSize}>
      <div
        className={cn(
          inputVariants({
            size: resolvedSize,
            variant: resolvedVariant,
            disabled: isDisabled,
            invalid: isInvalid,
            className,
          }),
        )}
      >
        {resolvedLeading ? <span className="ds-input__leading">{resolvedLeading}</span> : null}
        <BaseInput
          className="ds-input__control"
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          placeholder={placeholder}
          {...props}
        />
        {hasSuffix ? <span className="ds-input__suffix">{suffix}</span> : null}
        {resolvedTrailing ? <span className="ds-input__trailing">{resolvedTrailing}</span> : null}
      </div>
    </InputIconSizeContext.Provider>
  );
}

export { inputVariants };
