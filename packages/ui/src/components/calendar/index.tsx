import { DayPicker, getDefaultClassNames, type DateRange, type DayPickerProps } from '@daypicker/react';
import { cva } from 'class-variance-authority';
import { useMemo } from 'react';

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
  /**
   * Locale used for month and caption formatting. Defaults to the runtime locale when omitted.
   */
  locale?: Intl.LocalesArgument;
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
  locale,
  showOutsideDays = true,
  components,
  classNames,
  formatters,
  ...props
}: CalendarProps) {
  const resolvedVariant = variant ?? 'default';
  const layout = getVariantDefaults(resolvedVariant);
  const defaultClassNames = getDefaultClassNames();

  const resolvedComponents = useMemo(
    () => ({
      Root: (rootProps: Parameters<typeof CalendarRoot>[0]) => (
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
    }),
    [resolvedVariant, className, components],
  );

  return (
    <DayPicker
      locale={locale}
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
          date.toLocaleDateString(locale, {
            month: 'long',
            year: 'numeric',
          }),
        formatMonthDropdown: (date) =>
          date.toLocaleDateString(locale, {
            month: 'short',
          }),
        ...formatters,
      }}
      components={resolvedComponents}
      {...(props as DayPickerProps)}
    />
  );
}

export { calendarVariants, type CalendarVariant, type DateRange };
