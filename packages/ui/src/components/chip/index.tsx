import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const CHIP_ICON_SIZE = 16;

const DEFAULT_LEADING_ICON = 'filter_list';
const DEFAULT_TRAILING_ICON = 'keyboard_arrow_down';

const chipVariants = cva('chip', {
  variants: {
    active: {
      false: '',
      true: '',
    },
    hasLeading: {
      true: '',
      false: '',
    },
    hasTrailing: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { active: false, class: 'chip-inactive' },
    { active: true, class: 'chip-active' },
    { hasLeading: true, hasTrailing: true, class: 'chip-preset-padding-both' },
    { hasLeading: true, hasTrailing: false, class: 'chip-preset-padding-leading' },
    { hasLeading: false, hasTrailing: true, class: 'chip-preset-padding-trailing' },
    { hasLeading: false, hasTrailing: false, class: 'chip-preset-padding-label' },
  ],
  defaultVariants: {
    active: false,
    hasLeading: false,
    hasTrailing: false,
  },
});

export type ChipProps = Omit<ComponentProps<typeof BaseButton>, 'className'> &
  VariantProps<typeof chipVariants> & {
    /** Additional CSS class names applied to the root element. */
    className?: string;
    /**
     * Whether the chip is in the pressed/selected state. Reflected as `aria-pressed`.
     * @default false
     */
    active?: boolean;
    /**
     * Renders a leading icon before the label.
     * @default false
     */
    showLeadingIcon?: boolean;
    /**
     * Renders a trailing icon after the label.
     * @default false
     */
    showTrailingIcon?: boolean;
    /** Custom leading icon element. Defaults to a filter icon when `showLeadingIcon` is true. */
    leadingIcon?: ReactNode;
    /** Custom trailing icon element. Defaults to a chevron icon when `showTrailingIcon` is true. */
    trailingIcon?: ReactNode;
  };

/** Toggleable filter or selection control with optional leading and trailing icons and a pressed state. */
export function Chip({
  children,
  className,
  active = false,
  showLeadingIcon = false,
  showTrailingIcon = false,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: ChipProps) {
  const hasLeading = showLeadingIcon;
  const hasTrailing = showTrailingIcon;
  const resolvedLeading = hasLeading
    ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={CHIP_ICON_SIZE} />)
    : null;
  const resolvedTrailing = hasTrailing
    ? (trailingIcon ?? <Icon name={DEFAULT_TRAILING_ICON} size={CHIP_ICON_SIZE} />)
    : null;

  return (
    <BaseButton
      type="button"
      className={cn(
        chipVariants({
          active,
          hasLeading,
          hasTrailing,
          className,
        }),
      )}
      data-slot="chip"
      disabled={disabled}
      focusableWhenDisabled
      aria-pressed={active}
      {...props}
    >
      {resolvedLeading ? <span className="chip-icon">{resolvedLeading}</span> : null}
      <span className="chip-label">{children}</span>
      {resolvedTrailing ? <span className="chip-icon">{resolvedTrailing}</span> : null}
    </BaseButton>
  );
}

export { chipVariants };
