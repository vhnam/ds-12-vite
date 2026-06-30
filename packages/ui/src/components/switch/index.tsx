import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';
import './switch.css';

const switchVariants = cva('ds-switch', {
  variants: {
    disabled: {
      true: 'ds-switch--disabled',
      false: null,
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, 'className'> &
  VariantProps<typeof switchVariants> & {
    /** Additional CSS class names applied to the root element. */
    className?: string;
  };

/** Pill-shaped toggle for binary on/off settings such as feature flags or preferences. */
export function Switch({
  className,
  disabled = false,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps) {
  return (
    <BaseSwitch.Root
      className={cn(
        switchVariants({
          disabled,
          className,
        }),
      )}
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <BaseSwitch.Thumb className="ds-switch__thumb" />
    </BaseSwitch.Root>
  );
}

export { switchVariants };
