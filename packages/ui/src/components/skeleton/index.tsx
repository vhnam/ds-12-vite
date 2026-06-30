import { cva } from 'class-variance-authority';
import type { ComponentProps, CSSProperties } from 'react';

import { cn } from '../../lib/utils.ts';

const TEXT_VARIANTS = ['h1', 'h2', 'h3', 'h4', 'paragraph', 'label'] as const;
const THUMBNAIL_VARIANTS = ['circle', 'square', 'rectangle'] as const;

type TextVariant = (typeof TEXT_VARIANTS)[number];
type ThumbnailVariant = (typeof THUMBNAIL_VARIANTS)[number];
type SkeletonVariant = TextVariant | ThumbnailVariant;
type ThumbnailSize = '32' | '48' | '72' | '128';

const skeletonVariants = cva('skeleton', {
  variants: {
    variant: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      paragraph: '',
      label: '',
      circle: '',
      square: '',
      rectangle: '',
    },
    size: {
      '32': '',
      '48': '',
      '72': '',
      '128': '',
    },
  },
  compoundVariants: [
    { variant: 'h1', class: 'skeleton-text skeleton-h1' },
    { variant: 'h2', class: 'skeleton-text skeleton-h2' },
    { variant: 'h3', class: 'skeleton-text skeleton-h3' },
    { variant: 'h4', class: 'skeleton-text skeleton-h4' },
    { variant: 'paragraph', class: 'skeleton-text skeleton-paragraph' },
    { variant: 'label', class: 'skeleton-text skeleton-label' },
    { variant: 'circle', size: '32', class: 'skeleton-thumbnail skeleton-preset-circle-32' },
    { variant: 'circle', size: '48', class: 'skeleton-thumbnail skeleton-preset-circle-48' },
    { variant: 'circle', size: '72', class: 'skeleton-thumbnail skeleton-preset-circle-72' },
    { variant: 'circle', size: '128', class: 'skeleton-thumbnail skeleton-preset-circle-128' },
    { variant: 'square', size: '32', class: 'skeleton-thumbnail skeleton-preset-square-32' },
    { variant: 'square', size: '48', class: 'skeleton-thumbnail skeleton-preset-square-48' },
    { variant: 'square', size: '72', class: 'skeleton-thumbnail skeleton-preset-square-72' },
    { variant: 'square', size: '128', class: 'skeleton-thumbnail skeleton-preset-square-128' },
    { variant: 'rectangle', size: '32', class: 'skeleton-thumbnail skeleton-preset-rectangle-32' },
    { variant: 'rectangle', size: '48', class: 'skeleton-thumbnail skeleton-preset-rectangle-48' },
    { variant: 'rectangle', size: '72', class: 'skeleton-thumbnail skeleton-preset-rectangle-72' },
    { variant: 'rectangle', size: '128', class: 'skeleton-thumbnail skeleton-preset-rectangle-128' },
  ],
  defaultVariants: {
    variant: 'paragraph',
    size: '48',
  },
});

const skeletonBarVariants = cva('skeleton-bar', {
  variants: {
    variant: {
      h1: '',
      h2: '',
      h3: '',
      h4: '',
      paragraph: '',
      label: '',
    },
  },
  compoundVariants: [
    { variant: 'h1', class: 'skeleton-bar-h1' },
    { variant: 'h2', class: 'skeleton-bar-h2' },
    { variant: 'h3', class: 'skeleton-bar-h3' },
    { variant: 'h4', class: 'skeleton-bar-h4' },
    { variant: 'paragraph', class: 'skeleton-bar-paragraph' },
    { variant: 'label', class: 'skeleton-bar-label' },
  ],
  defaultVariants: {
    variant: 'paragraph',
  },
});

type SkeletonBaseProps = {
  /** Additional CSS class names applied to the skeleton element. */
  className?: string;
  /**
   * Accessible name announced by screen readers while content is loading.
   * @default "Loading"
   */
  'aria-label'?: string;
  /** Custom width for text skeleton variants (e.g. `"240px"`, `"100%"`). */
  width?: CSSProperties['width'];
};

type TextSkeletonProps = SkeletonBaseProps & {
  /**
   * Text placeholder shape matching typography styles.
   * @default "paragraph"
   */
  variant?: TextVariant;
  size?: never;
};

type ThumbnailSkeletonProps = SkeletonBaseProps & {
  /** Thumbnail placeholder shape — circle, square, or rectangle. */
  variant: ThumbnailVariant;
  /**
   * Thumbnail dimensions in pixels.
   * @default "48"
   */
  size?: ThumbnailSize;
};

export type SkeletonProps = (TextSkeletonProps | ThumbnailSkeletonProps) & Omit<ComponentProps<'div'>, 'className'>;

function isTextVariant(variant: SkeletonVariant): variant is TextVariant {
  return (TEXT_VARIANTS as readonly string[]).includes(variant);
}

/** Loading placeholder with shimmer animation for text lines and circular, square, or rectangular thumbnails. */
export function Skeleton({
  className,
  variant = 'paragraph',
  size = '48',
  width,
  'aria-label': ariaLabel = 'Loading',
  style,
  ...props
}: SkeletonProps) {
  const resolvedVariant = variant ?? 'paragraph';
  const isText = isTextVariant(resolvedVariant);
  const classes = cn(
    skeletonVariants({
      variant: resolvedVariant,
      size: isText ? undefined : size,
      className,
    }),
  );
  const mergedStyle = width !== undefined ? { ...style, width } : style;

  if (isText) {
    return (
      <div
        className={classes}
        data-slot="skeleton"
        data-variant={resolvedVariant}
        style={mergedStyle}
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        {...props}
      >
        <div className={skeletonBarVariants({ variant: resolvedVariant })} aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={classes}
      data-slot="skeleton"
      data-variant={resolvedVariant}
      style={mergedStyle}
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export { skeletonBarVariants, skeletonVariants };
