import { DayPicker, getDefaultClassNames, type DateRange, type DayPickerProps } from '@daypicker/react';
import { cva } from 'class-variance-authority';

import { cn } from '../../lib/utils.ts';
import {
  CalendarChevron,
  CalendarDayButton,
  CalendarNextMonthButton,
  CalendarPreviousMonthButton,
  CalendarRoot,
} from './calendar-components.tsx';

type CalendarVariant = 'default' | 'range';

type CalendarSharedProps = {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Visual layout — `default` shows one month with dropdown navigation;
   * `range` shows two months with a label caption for range selection.
   * @default "default"
   */
  variant?: CalendarVariant;
};

type CalendarSingleProps = CalendarSharedProps &
  Omit<DayPickerProps, 'mode' | 'className' | 'numberOfMonths' | 'captionLayout' | 'navLayout'> & {
    mode?: 'single';
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
  };

type CalendarRangeProps = CalendarSharedProps &
  Omit<DayPickerProps, 'mode' | 'className' | 'numberOfMonths' | 'captionLayout' | 'navLayout'> & {
    mode: 'range';
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
  };

export type CalendarProps = CalendarSingleProps | CalendarRangeProps;

const calendarVariants = cva('calendar', {
  variants: {
    variant: {
      default: 'calendar-default',
      range: 'calendar-range',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const VARIANT_CONFIG = {
  default: {
    numberOfMonths: 1,
    captionLayout: 'dropdown' as const,
    navLayout: 'around' as const,
  },
  range: {
    numberOfMonths: 2,
    captionLayout: 'label' as const,
    navLayout: 'around' as const,
  },
};

function getVariantDefaults(variant: CalendarVariant) {
  return VARIANT_CONFIG[variant];
}

/** Date grid for selecting a single day or a date range, styled to the DS calendar spec. */
export function Calendar({
  className,
  variant = 'default',
  showOutsideDays = true,
  components,
  classNames,
  formatters,
  ...props
}: CalendarProps) {
  const resolvedVariant = variant ?? 'default';
  const layout = getVariantDefaults(resolvedVariant);
  const defaultClassNames = getDefaultClassNames();

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      numberOfMonths={layout.numberOfMonths}
      captionLayout={layout.captionLayout}
      navLayout={layout.navLayout}
      classNames={{
        ...defaultClassNames,
        ...classNames,
      }}
      formatters={{
        formatCaption: (date) =>
          date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          }),
        formatMonthDropdown: (date) =>
          date.toLocaleDateString('en-US', {
            month: 'short',
          }),
        ...formatters,
      }}
      components={{
        Root: (rootProps) => (
          <CalendarRoot
            {...rootProps}
            className={cn(calendarVariants({ variant: resolvedVariant }), className, rootProps.className)}
            data-slot="calendar"
            data-variant={resolvedVariant}
          />
        ),
        Chevron: CalendarChevron,
        DayButton: CalendarDayButton,
        PreviousMonthButton: CalendarPreviousMonthButton,
        NextMonthButton: CalendarNextMonthButton,
        ...components,
      }}
      {...(props as DayPickerProps)}
    />
  );
}

export { calendarVariants, type CalendarVariant, type DateRange };
