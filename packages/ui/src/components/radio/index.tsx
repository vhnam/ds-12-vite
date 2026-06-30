import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';

const radioVariants = cva('radio', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    invalid: {
      true: 'radio-invalid',
      false: '',
    },
    disabled: {
      true: 'radio-disabled',
      false: '',
    },
  },
  compoundVariants: [{ size: 'sm', class: 'radio-preset-size-sm' }],
  defaultVariants: {
    size: 'lg',
    invalid: false,
    disabled: false,
  },
});

export type RadioProps = Omit<ComponentProps<typeof BaseRadio.Root>, 'className'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Visual size of the radio control.
   * @default "lg"
   */
  size?: 'sm' | 'lg';
  /**
   * Marks the control as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Prevents interaction and dims the control.
   * @default false
   */
  disabled?: boolean;
};

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

/** Circular selection control for choosing one option from a mutually exclusive set. */
export function Radio({ className, size = 'lg', invalid = false, disabled = false, value, ...props }: RadioProps) {
  const resolvedSize = size ?? 'lg';

  return (
    <BaseRadio.Root
      className={cn(
        radioVariants({
          size,
          invalid,
          disabled,
          className,
        }),
      )}
      data-slot="radio"
      data-variant={resolvedSize}
      value={value}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...props}
    >
      <span className="radio-control" aria-hidden>
        <BaseRadio.Indicator className="radio-indicator" keepMounted />
      </span>
    </BaseRadio.Root>
  );
}

/** Groups radio buttons so only one value can be selected at a time. */
export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={className} {...props} />;
}

export { radioVariants };
