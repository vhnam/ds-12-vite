import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./chip.css";

const CHIP_ICON_SIZE = 16;

const DEFAULT_LEADING_ICON = "filter_list";
const DEFAULT_TRAILING_ICON = "keyboard_arrow_down";

const chipVariants = cva("ds-chip", {
  variants: {
    active: {
      false: "ds-chip--inactive",
      true: "ds-chip--active",
    },
    hasLeading: {
      true: "ds-chip--has-leading",
      false: null,
    },
    hasTrailing: {
      true: "ds-chip--has-trailing",
      false: null,
    },
  },
  defaultVariants: {
    active: false,
    hasLeading: false,
    hasTrailing: false,
  },
});

export type ChipProps = Omit<ComponentProps<typeof BaseButton>, "className"> &
  VariantProps<typeof chipVariants> & {
    className?: string;
    active?: boolean;
    showLeadingIcon?: boolean;
    showTrailingIcon?: boolean;
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
  };

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
      disabled={disabled}
      focusableWhenDisabled
      aria-pressed={active}
      {...props}
    >
      {resolvedLeading ? <span className="ds-chip__icon">{resolvedLeading}</span> : null}
      <span className="ds-chip__label">{children}</span>
      {resolvedTrailing ? <span className="ds-chip__icon">{resolvedTrailing}</span> : null}
    </BaseButton>
  );
}

export { chipVariants };
