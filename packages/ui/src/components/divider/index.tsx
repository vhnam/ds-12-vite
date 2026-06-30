import { Separator } from '@base-ui/react/separator';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';

type DividerOrientation = 'horizontal' | 'vertical';

const dividerVariants = cva('divider', {
  variants: {
    orientation: {
      horizontal: '',
      vertical: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', class: 'divider-horizontal' },
    { orientation: 'vertical', class: 'divider-vertical' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
  },
});

export type DividerProps = ComponentProps<typeof Separator> & {
  /** Additional CSS class names applied to the separator element. */
  className?: string;
  /**
   * Layout direction of the separator line.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
};

/** Visual separator between content sections, rendered horizontally or vertically. */
export function Divider({ className, orientation = 'horizontal', ...props }: DividerProps) {
  const resolvedOrientation = orientation ?? 'horizontal';

  return (
    <Separator
      className={cn(dividerVariants({ orientation, className }))}
      data-slot="divider"
      data-variant={resolvedOrientation}
      orientation={resolvedOrientation}
      {...props}
    />
  );
}

export { dividerVariants, type DividerOrientation };
