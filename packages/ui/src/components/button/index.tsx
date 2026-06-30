import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';

const buttonVariants = cva('button', {
  variants: {
    variant: {
      primary: '',
      secondary: '',
      danger: '',
      icon: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
    hasIcon: {
      true: '',
      false: '',
    },
    loading: {
      true: 'button-loading',
      false: '',
    },
  },
  compoundVariants: [
    { variant: 'primary', size: 'sm', class: 'button-primary-sm' },
    { variant: 'primary', size: 'md', class: 'button-primary-md' },
    { variant: 'primary', size: 'lg', class: 'button-primary-lg' },
    { variant: 'secondary', size: 'sm', class: 'button-secondary-sm' },
    { variant: 'secondary', size: 'md', class: 'button-secondary-md' },
    { variant: 'secondary', size: 'lg', class: 'button-secondary-lg' },
    { variant: 'danger', size: 'sm', class: 'button-danger-sm' },
    { variant: 'danger', size: 'md', class: 'button-danger-md' },
    { variant: 'danger', size: 'lg', class: 'button-danger-lg' },
    { variant: 'icon', size: 'sm', class: 'button-icon-sm' },
    { variant: 'icon', size: 'md', class: 'button-icon-md' },
    { variant: 'icon', size: 'lg', class: 'button-icon-lg' },
    { hasIcon: true, size: 'sm', class: 'button-has-icon-sm' },
    { hasIcon: true, size: 'md', class: 'button-has-icon-md' },
    { hasIcon: true, size: 'lg', class: 'button-has-icon-lg' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    hasIcon: false,
    loading: false,
  },
});

const buttonIconVariants = cva('button-icon', {
  variants: {
    variant: {
      primary: '',
      secondary: '',
      danger: '',
      icon: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { variant: 'primary', size: 'sm', class: 'button-icon-primary-sm' },
    { variant: 'primary', size: 'md', class: 'button-icon-primary-md' },
    { variant: 'primary', size: 'lg', class: 'button-icon-primary-lg' },
    { variant: 'secondary', size: 'sm', class: 'button-icon-secondary-sm' },
    { variant: 'secondary', size: 'md', class: 'button-icon-secondary-md' },
    { variant: 'secondary', size: 'lg', class: 'button-icon-secondary-lg' },
    { variant: 'danger', size: 'sm', class: 'button-icon-danger-sm' },
    { variant: 'danger', size: 'md', class: 'button-icon-danger-md' },
    { variant: 'danger', size: 'lg', class: 'button-icon-danger-lg' },
    { variant: 'icon', size: 'sm', class: 'button-icon-variant-sm' },
    { variant: 'icon', size: 'md', class: 'button-icon-variant-md' },
    { variant: 'icon', size: 'lg', class: 'button-icon-variant-lg' },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const buttonLoaderVariants = cva('button-loader', {
  variants: {
    size: {
      sm: 'button-loader-sm',
      md: 'button-loader-md',
      lg: 'button-loader-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

function ButtonLoader({ size }: { size: 'sm' | 'md' | 'lg' }) {
  return (
    <span className={buttonLoaderVariants({ size })} aria-hidden="true">
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

export type ButtonProps = Omit<ComponentProps<typeof BaseButton>, 'className'> &
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
    iconPosition?: 'left' | 'right';
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
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  loading = false,
  disabled,
  'aria-label': ariaLabel,
  ...props
}: ButtonProps) {
  const resolvedVariant = variant ?? 'primary';
  const resolvedSize = size ?? 'md';
  const isIconOnly = resolvedVariant === 'icon';
  const isDisabled = Boolean(disabled || loading);
  const resolvedIcon = isIconOnly ? (icon ?? children) : icon;
  const hasIcon = Boolean(resolvedIcon) && !loading;
  const showLeadingIcon = hasIcon && iconPosition === 'left';
  const showTrailingIcon = hasIcon && iconPosition === 'right' && !isIconOnly;
  const label = isIconOnly && typeof children === 'string' ? undefined : children;
  const textLabel = typeof children === 'string' ? children : undefined;
  const resolvedAriaLabel = ariaLabel ?? (isIconOnly ? textLabel : undefined) ?? (loading ? textLabel : undefined);
  const iconClassName = buttonIconVariants({ variant: resolvedVariant, size: resolvedSize });

  return (
    <BaseButton
      className={cn(
        buttonVariants({
          variant: resolvedVariant,
          size: resolvedSize,
          hasIcon: hasIcon && !isIconOnly,
          loading,
          className,
        }),
      )}
      disabled={isDisabled}
      focusableWhenDisabled
      data-slot="button"
      data-variant={resolvedVariant}
      aria-label={resolvedAriaLabel}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? (
        <ButtonLoader size={resolvedSize} />
      ) : isIconOnly ? (
        resolvedIcon ? (
          <span className={iconClassName}>{resolvedIcon}</span>
        ) : null
      ) : (
        <>
          {showLeadingIcon ? <span className={iconClassName}>{resolvedIcon}</span> : null}
          {label ? <span className="button-label">{label}</span> : null}
          {showTrailingIcon ? <span className={iconClassName}>{resolvedIcon}</span> : null}
        </>
      )}
    </BaseButton>
  );
}

export { buttonVariants };
