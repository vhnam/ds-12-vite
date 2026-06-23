import { cva, type VariantProps } from "class-variance-authority";
import { createContext, type ComponentProps, type ReactNode } from "react";

import "./badge.css";

const BADGE_ICON_SIZES = {
  sm: 12,
  lg: 20,
} as const;

export const BadgeIconSizeContext = createContext<number | undefined>(undefined);

const badgeVariants = cva("ds-badge", {
  variants: {
    size: {
      sm: "ds-badge--sm",
      lg: "ds-badge--lg",
    },
    emphasis: {
      subtle: "ds-badge--subtle",
      bold: "ds-badge--bold",
    },
    variant: {
      neutral: "ds-badge--neutral",
      negative: "ds-badge--negative",
      attention: "ds-badge--attention",
      positive: "ds-badge--positive",
      information: "ds-badge--information",
    },
  },
  defaultVariants: {
    size: "lg",
    emphasis: "subtle",
    variant: "neutral",
  },
});

export type BadgeProps = ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & {
    className?: string;
    icon?: ReactNode;
  };

export function Badge({
  children,
  className,
  size = "lg",
  emphasis = "subtle",
  variant = "neutral",
  icon,
  ...props
}: BadgeProps) {
  const resolvedSize = size ?? "lg";
  const iconSize = BADGE_ICON_SIZES[resolvedSize];

  return (
    <BadgeIconSizeContext.Provider value={iconSize}>
      <span className={badgeVariants({ size, emphasis, variant, className })} {...props}>
        {icon ? <span className="ds-badge__icon">{icon}</span> : null}
        <span className="ds-badge__label">{children}</span>
      </span>
    </BadgeIconSizeContext.Provider>
  );
}

export { badgeVariants };
