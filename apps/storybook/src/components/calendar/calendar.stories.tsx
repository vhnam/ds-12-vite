import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { Calendar, type CalendarVariant, type DateRange } from '@ds-12/ui/calendar';

import {
  createCalendarDaySelectPlay,
  createCalendarMonthNavigationPlay,
  runCalendarDefaultInteractionTests,
  runCalendarRangeInteractionTests,
} from '../../lib/component-tests.ts';
import { selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { CalendarVariantsTable, VARIANTS } from './calendar-story-fixtures.tsx';

type CalendarStoryArgs = {
  variant?: CalendarVariant;
  defaultMonth?: Date;
  selected?: Date | DateRange;
  className?: string;
};

const JUNE_2025 = new Date(2025, 5, 1);
const SELECTED_DAY = new Date(2025, 5, 25);
const RANGE_SELECTION: DateRange = {
  from: new Date(2025, 5, 25),
  to: new Date(2025, 6, 9),
};

function CalendarStory({ variant = 'default', selected, ...props }: CalendarStoryArgs) {
  if (variant === 'range') {
    const [range, setRange] = useState<DateRange | undefined>((selected as DateRange | undefined) ?? RANGE_SELECTION);

    return (
      <Calendar
        {...props}
        variant="range"
        mode="range"
        selected={range}
        onSelect={setRange}
        defaultMonth={props.defaultMonth ?? JUNE_2025}
      />
    );
  }

  const [date, setDate] = useState<Date | undefined>((selected as Date | undefined) ?? SELECTED_DAY);

  return (
    <Calendar
      {...props}
      variant="default"
      mode="single"
      selected={date}
      onSelect={setDate}
      defaultMonth={props.defaultMonth ?? JUNE_2025}
    />
  );
}

/** Date grid for selecting a single day or a date range with month navigation. */
const meta = {
  title: 'Components/Calendar',
  component: CalendarStory,
  tags: ['autodocs'],
  render: (args) => <CalendarStory {...args} />,
  argTypes: {
    variant: selectArgType(
      VARIANTS,
      'Visual layout — default shows one month with dropdowns; range shows two months for interval selection.',
    ),
    defaultMonth: { control: false },
    selected: { control: false },
    className: { control: false },
  },
  args: {
    variant: 'default',
    defaultMonth: JUNE_2025,
    selected: SELECTED_DAY,
  },
} satisfies Meta<typeof CalendarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the default single-month calendar with dropdown month/year navigation for compact date picking in forms and filters. */
export const Default: Story = {
  play: async (context) => {
    await runCalendarDefaultInteractionTests(context);
    await createCalendarMonthNavigationPlay(/june 2025/i, /july 2025/i)(context);
  },
};

/** Use the range variant when users need to pick a start and end date — it shows two consecutive months with a connected range highlight. */
export const Range: Story = {
  args: {
    variant: 'range',
    selected: RANGE_SELECTION,
  },
  play: runCalendarRangeInteractionTests,
};

/** Selecting a day updates the controlled selection state. */
export const SelectDay: Story = {
  play: (context) => createCalendarDaySelectPlay('2025-06-10', '2025-06-25')(context),
};

/** Showcase of default and range calendar layouts — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <CalendarVariantsTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const calendars = canvasElement.querySelectorAll('[data-slot="calendar"]');

    await expect(calendars).toHaveLength(2);
    await expect(canvas.getAllByRole('grid')).toHaveLength(3);
    await expect(canvas.getAllByRole('button', { name: 'Go to the Previous Month' })).toHaveLength(2);
    await expect(canvas.getByLabelText('Choose the Month')).toBeInTheDocument();
    await expect(canvasElement.querySelectorAll('button[data-selected-single="true"]')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('button[data-range-start="true"]')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('button[data-range-end="true"]')).toHaveLength(1);
    await expect(canvasElement.querySelectorAll('button[data-range-middle="true"]').length).toBeGreaterThan(0);
  },
};
