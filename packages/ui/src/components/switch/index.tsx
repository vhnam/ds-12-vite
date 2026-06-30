import { Switch as BaseSwitch } from '@base-ui/react/switch';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';

const switchVariants = cva('switch', {
  variants: {
    disabled: {
      true: 'switch-disabled',
      false: '',
    },
  },
  defaultVariants: {
    disabled: false,
  },
});

export type SwitchProps = Omit<ComponentProps<typeof BaseSwitch.Root>, 'className'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Prevents interaction and dims the control.
   * @default false
   */
  disabled?: boolean;
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
      data-slot="switch"
      checked={checked}
      defaultChecked={defaultChecked}
      disabled={disabled}
      onCheckedChange={onCheckedChange}
      {...props}
    >
      <BaseSwitch.Thumb className="switch-thumb" />
    </BaseSwitch.Root>
  );
}

export { switchVariants };
