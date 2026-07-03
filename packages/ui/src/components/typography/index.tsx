import { mergeProps } from '@base-ui/react/merge-props';
import { useRender } from '@base-ui/react/use-render';
import { cva } from 'class-variance-authority';
import type { ComponentProps, JSX } from 'react';

import { cn } from '../../lib/utils.ts';

const typographyVariants = cva('m-0 text-semantic-text-neutral-bolder', {
  variants: {
    variant: {
      display: 'typography-display',
      h1: 'typography-h1',
      h2: 'typography-h2',
      h3: 'typography-h3',
      h4: 'typography-h4',
      paragraph: 'typography-paragraph',
      label: 'typography-label',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
      xl: '',
    },
    weight: {
      regular: '',
      semibold: '',
      bold: '',
    },
  },
  compoundVariants: [
    {
      variant: 'display',
      class: 'typography-preset-display-default',
    },
    {
      variant: 'h1',
      weight: 'regular',
      class: 'typography-preset-heading-h1-regular',
    },
    {
      variant: 'h1',
      weight: 'bold',
      class: 'typography-preset-heading-h1-bold',
    },
    {
      variant: 'h2',
      weight: 'regular',
      class: 'typography-preset-heading-h2-regular',
    },
    {
      variant: 'h2',
      weight: 'bold',
      class: 'typography-preset-heading-h2-bold',
    },
    {
      variant: 'h3',
      weight: 'regular',
      class: 'typography-preset-heading-h3-regular',
    },
    {
      variant: 'h3',
      weight: 'bold',
      class: 'typography-preset-heading-h3-bold',
    },
    {
      variant: 'h4',
      weight: 'regular',
      class: 'typography-preset-heading-h4-regular',
    },
    {
      variant: 'h4',
      weight: 'bold',
      class: 'typography-preset-heading-h4-bold',
    },
    {
      variant: 'paragraph',
      size: 'sm',
      weight: 'regular',
      class: 'typography-preset-paragraph-small',
    },
    {
      variant: 'paragraph',
      size: 'md',
      weight: 'regular',
      class: 'typography-preset-paragraph-default',
    },
    {
      variant: 'paragraph',
      size: 'md',
      weight: 'semibold',
      class: 'typography-preset-paragraph-default-strong',
    },
    {
      variant: 'paragraph',
      size: 'lg',
      weight: 'regular',
      class: 'typography-preset-paragraph-large',
    },
    {
      variant: 'paragraph',
      size: 'lg',
      weight: 'semibold',
      class: 'typography-preset-paragraph-large-strong',
    },
    {
      variant: 'paragraph',
      size: 'xl',
      weight: 'semibold',
      class: 'typography-preset-paragraph-xlarge-strong',
    },
    {
      variant: 'label',
      size: 'sm',
      class: 'typography-preset-label-small',
    },
    {
      variant: 'label',
      size: 'md',
      class: 'typography-preset-label-default',
    },
    {
      variant: 'label',
      size: 'lg',
      class: 'typography-preset-label-large',
    },
  ],
  defaultVariants: {
    variant: 'paragraph',
    size: 'md',
    weight: 'regular',
  },
});

type TypographyVariant = 'display' | 'h1' | 'h2' | 'h3' | 'h4' | 'paragraph' | 'label';
type TypographySize = 'sm' | 'md' | 'lg' | 'xl';
type TypographyWeight = 'regular' | 'semibold' | 'bold';

const VARIANT_DEFAULT_TAG: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  display: 'p',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  paragraph: 'p',
  label: 'span',
};

type TypographyState = {
  slot: 'typography';
  variant?: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
};

type TypographyRender = keyof JSX.IntrinsicElements | useRender.RenderProp<TypographyState>;

type TypographyBaseProps = Omit<useRender.ComponentProps<'p'>, 'render'> & {
  /**
   * Semantic HTML element or render prop. Use a tag name (e.g. `"h1"`, `"p"`, `"label"`)
   * to output the correct element for the chosen variant.
   */
  render?: TypographyRender;
};

type TypographyDisplayProps = TypographyBaseProps & {
  variant: 'display';
  size?: never;
  weight?: never;
};

type TypographyHeadingProps = TypographyBaseProps & {
  variant: 'h1' | 'h2' | 'h3' | 'h4';
  size?: never;
  /** Only `regular` and `bold` are valid. Defaults to `bold`. */
  weight?: 'regular' | 'bold';
};

type TypographyParagraphProps = TypographyBaseProps & {
  variant: 'paragraph';
  /** Defaults to `md`. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * Constrained per size: `sm` → `regular` only; `xl` → `semibold` only;
   * `md`/`lg` → `regular` or `semibold`. Defaults to `regular`.
   */
  weight?: 'regular' | 'semibold';
};

type TypographyLabelProps = TypographyBaseProps & {
  variant: 'label';
  /** Defaults to `md`. Weight is always semibold and is not configurable. */
  size?: 'sm' | 'md' | 'lg';
  weight?: never;
};

type TypographyProps =
  | TypographyDisplayProps
  | TypographyHeadingProps
  | TypographyParagraphProps
  | TypographyLabelProps;

const HEADING_VARIANTS = new Set<TypographyVariant>(['h1', 'h2', 'h3', 'h4']);

function warnInvalidTypographyCombination(
  variant: TypographyVariant,
  size?: TypographySize,
  weight?: TypographyWeight,
) {
  if (process.env.NODE_ENV === 'production') {
    return;
  }

  if (variant === 'display' && (size !== undefined || weight !== undefined)) {
    console.warn('[Typography] variant="display" does not accept size or weight props.');
  }

  if (HEADING_VARIANTS.has(variant) && size !== undefined) {
    console.warn(`[Typography] variant="${variant}" does not accept a size prop.`);
  }

  if (variant === 'label' && weight !== undefined) {
    console.warn('[Typography] variant="label" does not accept a weight prop.');
  }

  if (HEADING_VARIANTS.has(variant) && weight === 'semibold') {
    console.warn(`[Typography] variant="${variant}" only supports weight="regular" or weight="bold".`);
  }

  if (variant === 'paragraph') {
    const resolvedSize = size ?? 'md';
    const resolvedWeight = weight ?? 'regular';

    if (resolvedSize === 'sm' && resolvedWeight !== 'regular') {
      console.warn('[Typography] paragraph size="sm" only supports weight="regular".');
    }

    if (resolvedSize === 'xl' && resolvedWeight !== 'semibold') {
      console.warn('[Typography] paragraph size="xl" only supports weight="semibold".');
    }
  }
}

function resolveTypographyVariants(variant: TypographyVariant, size?: TypographySize, weight?: TypographyWeight) {
  warnInvalidTypographyCombination(variant, size, weight);

  if (variant === 'display') {
    return { variant, size: undefined, weight: undefined };
  }

  if (variant === 'label') {
    return { variant, size: size ?? 'md', weight: undefined };
  }

  if (HEADING_VARIANTS.has(variant)) {
    return { variant, size: undefined, weight: weight ?? 'bold' };
  }

  const resolvedSize = size ?? 'md';
  let resolvedWeight = weight ?? 'regular';

  if (resolvedSize === 'sm') {
    resolvedWeight = 'regular';
  }

  if (resolvedSize === 'xl') {
    resolvedWeight = 'semibold';
  }

  return { variant, size: resolvedSize, weight: resolvedWeight };
}

/** Semantic text styles for display copy, headings, paragraphs, and labels. */
function Typography({ className, variant, size, weight, children, render, ...props }: TypographyProps) {
  const resolved = resolveTypographyVariants(variant, size, weight);
  const state: TypographyState = {
    slot: 'typography',
    variant,
    size: resolved.size,
    weight: resolved.weight,
  };
  const isTagName = typeof render === 'string';
  const defaultTagName = isTagName ? render : VARIANT_DEFAULT_TAG[variant ?? 'paragraph'];

  return useRender({
    defaultTagName,
    props: mergeProps<'div'>(
      {
        className: cn(typographyVariants({ ...resolved, className })),
        children,
        'data-slot': 'typography',
        'data-variant': variant,
      } as ComponentProps<'div'>,
      props,
    ),
    render: isTagName ? undefined : render,
    state,
  });
}

export {
  Typography,
  type TypographyProps,
  type TypographyRender,
  type TypographySize,
  type TypographyVariant,
  type TypographyWeight,
  typographyVariants,
};
