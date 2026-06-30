import type { DayButtonProps, RootProps } from '@daypicker/react';
import type { ComponentProps } from 'react';
import { useEffect, useRef } from 'react';

import { cn } from '../../lib/utils.ts';
import { Button } from '../button/index.tsx';
import { Icon } from '../icon/index.tsx';

type CalendarChevronProps = {
  className?: string;
  disabled?: boolean;
  orientation?: 'up' | 'down' | 'left' | 'right';
  size?: number;
};

const CHEVRON_ICONS = {
  left: 'arrow_back_ios_new',
  right: 'arrow_forward_ios',
  down: 'arrow_drop_down',
  up: 'arrow_drop_up',
} as const;

function CalendarChevron({ className, disabled, orientation = 'right', size }: CalendarChevronProps) {
  const iconName = CHEVRON_ICONS[orientation];
  const isDropdownChevron = orientation === 'down' || orientation === 'up';
  const resolvedSize = isDropdownChevron ? 12 : (size ?? 16);

  return (
    <span className={cn('calendar-chevron', className)} aria-hidden data-disabled={disabled || undefined}>
      <Icon name={iconName} size={resolvedSize} />
    </span>
  );
}

function CalendarRoot({ className, rootRef, ...props }: RootProps) {
  return <div ref={rootRef} className={cn('rdp-root', className)} {...props} />;
}

type CalendarNavButtonProps = ComponentProps<'button'>;

function getNavButtonDisabled({
  disabled,
  'aria-disabled': ariaDisabled,
}: Pick<CalendarNavButtonProps, 'disabled' | 'aria-disabled'>) {
  return Boolean(disabled || ariaDisabled === true || ariaDisabled === 'true');
}

function CalendarPreviousMonthButton({
  className,
  children: _chevron,
  disabled,
  'aria-disabled': ariaDisabled,
  ...props
}: CalendarNavButtonProps) {
  return (
    <Button
      {...props}
      variant="icon"
      size="sm"
      className={cn(className)}
      disabled={getNavButtonDisabled({ disabled, 'aria-disabled': ariaDisabled })}
      icon={<Icon name="arrow_back_ios_new" size={16} />}
    />
  );
}

function CalendarNextMonthButton({
  className,
  children: _chevron,
  disabled,
  'aria-disabled': ariaDisabled,
  ...props
}: CalendarNavButtonProps) {
  return (
    <Button
      {...props}
      variant="icon"
      size="sm"
      className={cn(className)}
      disabled={getNavButtonDisabled({ disabled, 'aria-disabled': ariaDisabled })}
      icon={<Icon name="arrow_forward_ios" size={16} />}
    />
  );
}

function CalendarDayButton({ className, day, modifiers, children, ...props }: DayButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    modifiers.selected && !modifiers.range_start && !modifiers.range_end && !modifiers.range_middle;

  return (
    <button
      {...props}
      ref={ref}
      type="button"
      data-day={day.isoDate}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      className={cn(className)}
    >
      {children}
    </button>
  );
}

export { CalendarChevron, CalendarDayButton, CalendarNextMonthButton, CalendarPreviousMonthButton, CalendarRoot };
export type { CalendarChevronProps };
