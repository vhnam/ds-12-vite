import { cva } from 'class-variance-authority';
import { createContext, type ComponentProps, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';

const BADGE_ICON_SIZES = {
  sm: 12,
  lg: 20,
} as const;

type BadgeSize = 'sm' | 'lg';
type BadgeEmphasis = 'subtle' | 'bold';
type BadgeVariant = 'neutral' | 'negative' | 'attention' | 'positive' | 'information';

export const BadgeIconSizeContext = createContext<number | undefined>(undefined);

const badgeVariants = cva('badge', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    emphasis: {
      subtle: '',
      bold: '',
    },
    variant: {
      neutral: '',
      negative: '',
      attention: '',
      positive: '',
      information: '',
    },
  },
  compoundVariants: [
    { size: 'sm', class: 'badge-preset-size-sm' },
    { size: 'lg', class: 'badge-preset-size-lg' },
    { emphasis: 'subtle', variant: 'neutral', class: 'badge-neutral-subtle' },
    { emphasis: 'subtle', variant: 'negative', class: 'badge-negative-subtle' },
    { emphasis: 'subtle', variant: 'attention', class: 'badge-attention-subtle' },
    { emphasis: 'subtle', variant: 'positive', class: 'badge-positive-subtle' },
    { emphasis: 'subtle', variant: 'information', class: 'badge-information-subtle' },
    { emphasis: 'bold', variant: 'neutral', class: 'badge-neutral-bold' },
    { emphasis: 'bold', variant: 'negative', class: 'badge-negative-bold' },
    { emphasis: 'bold', variant: 'attention', class: 'badge-attention-bold' },
    { emphasis: 'bold', variant: 'positive', class: 'badge-positive-bold' },
    { emphasis: 'bold', variant: 'information', class: 'badge-information-bold' },
  ],
  defaultVariants: {
    size: 'lg',
    emphasis: 'subtle',
    variant: 'neutral',
  },
});

const badgeIconVariants = cva('badge-icon', {
  variants: {
    size: {
      sm: 'badge-preset-icon-sm',
      lg: 'badge-preset-icon-lg',
    },
  },
  defaultVariants: {
    size: 'lg',
  },
});

export type BadgeProps = ComponentProps<'span'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Badge dimensions and icon scale — `sm` for compact layouts (e.g. table rows),
   * `lg` for standalone status labels.
   * @default "lg"
   */
  size?: BadgeSize;
  /**
   * Visual weight — `subtle` blends into the background, `bold` stands out on busy surfaces.
   * @default "subtle"
   */
  emphasis?: BadgeEmphasis;
  /**
   * Semantic colour — neutral for metadata, positive/negative/attention/information for status.
   * @default "neutral"
   */
  variant?: BadgeVariant;
  /** Optional leading icon element rendered before the label text. */
  icon?: ReactNode;
};

/** Compact status or count indicator with semantic color variants, subtle or bold emphasis, and an optional leading icon. */
export function Badge({
  children,
  className,
  size = 'lg',
  emphasis = 'subtle',
  variant = 'neutral',
  icon,
  ...props
}: BadgeProps) {
  const resolvedSize = size ?? 'lg';
  const resolvedVariant = variant ?? 'neutral';
  const iconSize = BADGE_ICON_SIZES[resolvedSize];

  return (
    <BadgeIconSizeContext.Provider value={iconSize}>
      <span
        className={cn(badgeVariants({ size, emphasis, variant, className }))}
        data-slot="badge"
        data-variant={resolvedVariant}
        {...props}
      >
        {icon ? <span className={badgeIconVariants({ size: resolvedSize })}>{icon}</span> : null}
        <span className="badge-label">{children}</span>
      </span>
    </BadgeIconSizeContext.Provider>
  );
}

export { badgeVariants, type BadgeEmphasis, type BadgeSize, type BadgeVariant };
