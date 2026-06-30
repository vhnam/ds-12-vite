import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const checkboxVariants = cva('checkbox', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    invalid: {
      true: 'checkbox-invalid',
      false: '',
    },
    disabled: {
      true: 'checkbox-disabled',
      false: '',
    },
  },
  compoundVariants: [{ size: 'sm', class: 'checkbox-preset-size-sm' }],
  defaultVariants: {
    size: 'lg',
    invalid: false,
    disabled: false,
  },
});

export type CheckboxProps = Omit<ComponentProps<typeof BaseCheckbox.Root>, 'className'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Visual size of the checkbox control.
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

/** Square selection control for independent on/off choices in forms and settings. */
export function Checkbox({
  className,
  size = 'lg',
  invalid = false,
  disabled = false,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: CheckboxProps) {
  const resolvedSize = size ?? 'lg';
  const iconSize = resolvedSize === 'sm' ? 12 : 16;

  return (
    <BaseCheckbox.Root
      className={cn(
        checkboxVariants({
          size,
          invalid,
          disabled,
          className,
        }),
      )}
      data-slot="checkbox"
      data-variant={resolvedSize}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      aria-invalid={invalid || undefined}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <span className="checkbox-control" aria-hidden>
        <BaseCheckbox.Indicator className="checkbox-indicator" keepMounted>
          <Icon name="check" size={iconSize} />
        </BaseCheckbox.Indicator>
      </span>
    </BaseCheckbox.Root>
  );
}

export { checkboxVariants };
