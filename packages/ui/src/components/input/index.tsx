import { Input as BaseInput } from '@base-ui/react/input';
import { cva } from 'class-variance-authority';
import { createContext, type ComponentProps, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const INPUT_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = 'person';
const DEFAULT_TRAILING_ICON = 'visibility';
const ERROR_TRAILING_ICON = 'error';

export const InputIconSizeContext = createContext<number | undefined>(undefined);

const inputVariants = cva('input', {
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
      true: 'input-disabled',
      false: '',
    },
    invalid: {
      true: 'input-error',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', variant: 'default', class: 'input-preset-sm-default' },
    { size: 'sm', variant: 'suffix', class: 'input-preset-sm-suffix' },
    { size: 'lg', variant: 'default', class: 'input-preset-lg-default' },
    { size: 'lg', variant: 'suffix', class: 'input-preset-lg-suffix' },
  ],
  defaultVariants: {
    size: 'sm',
    variant: 'default',
    disabled: false,
    invalid: false,
  },
});

export type InputProps = Omit<ComponentProps<typeof BaseInput>, 'className' | 'size'> & {
  /** Additional CSS class names applied to the input wrapper. */
  className?: string;
  /**
   * Visual size of the input control.
   * @default "sm"
   */
  size?: 'sm' | 'lg';
  /**
   * Layout variant — use `"suffix"` to show inline text after the value (e.g. units).
   * @default "default"
   */
  variant?: 'default' | 'suffix';
  /**
   * Marks the field as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean;
  /** Custom leading icon element. */
  leadingIcon?: ReactNode;
  /** Custom trailing icon element. Shown only on the `"default"` variant. */
  trailingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the input.
   * @default false
   */
  showLeadingIcon?: boolean;
  /**
   * Renders a trailing icon inside the input.
   * @default false
   */
  showTrailingIcon?: boolean;
  /** Inline suffix text displayed after the input value (requires `variant="suffix"`). */
  suffix?: string;
};

/** Single-line text field with size and suffix variants, optional leading and trailing icons, and error and disabled states. */
export function Input({
  className,
  size = 'sm',
  variant = 'default',
  invalid = false,
  disabled,
  leadingIcon,
  trailingIcon,
  showLeadingIcon = false,
  showTrailingIcon = false,
  suffix,
  placeholder = 'Input',
  ...props
}: InputProps) {
  const resolvedSize = size ?? 'sm';
  const resolvedVariant = variant ?? 'default';
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = INPUT_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const hasTrailing = showTrailingIcon && resolvedVariant === 'default';
  const hasSuffix = resolvedVariant === 'suffix' && suffix !== undefined;

  const resolvedLeading = hasLeading ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />) : null;

  const defaultTrailingIcon = isInvalid ? ERROR_TRAILING_ICON : DEFAULT_TRAILING_ICON;
  const resolvedTrailing = hasTrailing
    ? (trailingIcon ?? <Icon name={defaultTrailingIcon} size={iconSize} variant={isInvalid ? 'filled' : 'outlined'} />)
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
        data-slot="input"
        data-variant={resolvedVariant}
      >
        {resolvedLeading ? <span className="input-leading">{resolvedLeading}</span> : null}
        <BaseInput
          className="input-control"
          disabled={isDisabled}
          aria-invalid={isInvalid || undefined}
          placeholder={placeholder}
          {...props}
        />
        {hasSuffix ? <span className="input-suffix">{suffix}</span> : null}
        {resolvedTrailing ? <span className="input-trailing">{resolvedTrailing}</span> : null}
      </div>
    </InputIconSizeContext.Provider>
  );
}

export { inputVariants };
