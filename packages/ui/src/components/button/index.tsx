import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import "./button.css";

const buttonVariants = cva("ds-button", {
  variants: {
    variant: {
      primary: "ds-button--primary",
      secondary: "ds-button--secondary",
      danger: "ds-button--danger",
      icon: "ds-button--icon",
    },
    size: {
      sm: "ds-button--sm",
      md: "ds-button--md",
      lg: "ds-button--lg",
    },
    hasIcon: {
      true: "ds-button--has-icon",
      false: null,
    },
    loading: {
      true: "ds-button--loading",
      false: null,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    hasIcon: false,
    loading: false,
  },
});

function ButtonLoader() {
  return (
    <span className="ds-button__loader" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="42"
          strokeDashoffset="12"
        />
      </svg>
    </span>
  );
}

export type ButtonProps = Omit<ComponentProps<typeof BaseButton>, "className"> &
  VariantProps<typeof buttonVariants> & {
    /** Additional CSS class names applied to the root element. */
    className?: string;
    /**
     * Icon element rendered alongside the label, or as the sole content when `variant` is `"icon"`.
     */
    icon?: ReactNode;
    /**
     * Position of the icon relative to the label text.
     * @default "left"
     */
    iconPosition?: "left" | "right";
    /**
     * Shows a loading spinner, sets `aria-busy`, and disables interaction.
     * @default false
     */
    loading?: boolean;
  };

/** Primary action control with visual variants, sizes, loading state, and optional leading or trailing icons. */
export function Button({
  children,
  className,
  variant = "primary",
  size = "md",
  icon,
  iconPosition = "left",
  loading = false,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps) {
  const isIconOnly = variant === "icon";
  const isDisabled = Boolean(disabled || loading);
  const resolvedIcon = isIconOnly ? (icon ?? children) : icon;
  const hasIcon = Boolean(resolvedIcon) && !loading;
  const showLeadingIcon = hasIcon && iconPosition === "left";
  const showTrailingIcon = hasIcon && iconPosition === "right" && !isIconOnly;
  const label = isIconOnly && typeof children === "string" ? undefined : children;
  const textLabel = typeof children === "string" ? children : undefined;
  const resolvedAriaLabel =
    ariaLabel ?? (isIconOnly ? textLabel : undefined) ?? (loading ? textLabel : undefined);

  return (
    <BaseButton
      className={buttonVariants({
        variant,
        size,
        hasIcon: hasIcon && !isIconOnly,
        loading,
        className,
      })}
      disabled={isDisabled}
      focusableWhenDisabled
      aria-label={resolvedAriaLabel}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <ButtonLoader />
      ) : isIconOnly ? (
        resolvedIcon ? (
          <span className="ds-button__icon">{resolvedIcon}</span>
        ) : null
      ) : (
        <>
          {showLeadingIcon ? <span className="ds-button__icon">{resolvedIcon}</span> : null}
          {label ? <span className="ds-button__label">{label}</span> : null}
          {showTrailingIcon ? <span className="ds-button__icon">{resolvedIcon}</span> : null}
        </>
      )}
    </BaseButton>
  );
}

export { buttonVariants };
