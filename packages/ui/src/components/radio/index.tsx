import { Radio as BaseRadio } from '@base-ui/react/radio';
import { RadioGroup as BaseRadioGroup } from '@base-ui/react/radio-group';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';
import './radio.css';

const radioVariants = cva('ds-radio', {
  variants: {
    size: {
      sm: 'ds-radio--sm',
      lg: 'ds-radio--lg',
    },
    invalid: {
      true: 'ds-radio--invalid',
      false: null,
    },
    disabled: {
      true: 'ds-radio--disabled',
      false: null,
    },
  },
  defaultVariants: {
    size: 'lg',
    invalid: false,
    disabled: false,
  },
});

export type RadioProps = Omit<ComponentProps<typeof BaseRadio.Root>, 'className'> &
  VariantProps<typeof radioVariants> & {
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
  };

export type RadioGroupProps = ComponentProps<typeof BaseRadioGroup>;

/** Circular selection control for choosing one option from a mutually exclusive set. */
export function Radio({ className, size = 'lg', invalid = false, disabled = false, value, ...props }: RadioProps) {
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
      value={value}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      {...props}
    >
      <span className="ds-radio__control" aria-hidden>
        <BaseRadio.Indicator className="ds-radio__indicator" keepMounted />
      </span>
    </BaseRadio.Root>
  );
}

/** Groups radio buttons so only one value can be selected at a time. */
export function RadioGroup({ className, ...props }: RadioGroupProps) {
  return <BaseRadioGroup className={className} {...props} />;
}

export { radioVariants };
