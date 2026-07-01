import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { DatePicker, type DatePickerProps } from '@ds-12/ui/date-picker';

import {
  createButtonA11yPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createNativeDisabledButtonPlay,
  expectDataSlotVariant,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { contrastDebtParameters, showcaseParameters } from '../../lib/story-test-config.ts';
import { DatePickerStatesShowcase, SIZES } from './date-picker-story-fixtures.tsx';

const TODAY = new Date();
const CURRENT_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);

function toLocalIsoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

type DatePickerStoryArgs = DatePickerProps;

function DatePickerStory({ value: valueProp, defaultValue, onValueChange, ...props }: DatePickerStoryArgs) {
  const [date, setDate] = useState<Date | undefined>(defaultValue);

  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : date;

  const handleChange = (nextDate: Date | undefined) => {
    if (!isControlled) {
      setDate(nextDate);
    }
    onValueChange?.(nextDate);
  };

  return (
    <DatePicker
      {...props}
      value={value}
      onValueChange={handleChange}
      defaultMonth={props.defaultMonth ?? CURRENT_MONTH}
    />
  );
}

/** Date input with a popup calendar for selecting a single day. */
const meta = {
  title: 'Components/DatePicker',
  component: DatePickerStory,
  tags: ['autodocs'],
  render: (args) => <DatePickerStory {...args} />,
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the date picker control.'),
    invalid: booleanArgType('Marks the control as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents interaction with the control.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the trigger.'),
    placeholder: textArgType('Placeholder text shown when no date is selected.'),
    'aria-label': textArgType('Accessible name when no visible label is provided.'),
    defaultValue: hiddenArgType,
    value: hiddenArgType,
    onValueChange: hiddenArgType,
    defaultOpen: hiddenArgType,
    open: hiddenArgType,
    onOpenChange: hiddenArgType,
    name: hiddenArgType,
    required: hiddenArgType,
    id: hiddenArgType,
    className: hiddenArgType,
    leadingIcon: hiddenArgType,
    'aria-describedby': hiddenArgType,
    defaultMonth: hiddenArgType,
  },
  args: {
    size: 'sm',
    placeholder: 'Select date',
    'aria-label': 'Date',
    showLeadingIcon: false,
    invalid: false,
    disabled: false,
    defaultValue: TODAY,
    defaultMonth: CURRENT_MONTH,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePickerStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use DatePicker when users need to pick a single date from a popup calendar. */
export const Default: Story = {
  play: async (context) => {
    await createButtonA11yPlay('Date')(context);
    await createButtonKeyboardFocusPlay('Date')(context);
    await createButtonFocusVisiblePlay('Date')(context);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'date-picker',
      variant: 'sm',
      role: 'button',
      name: 'Date',
    });
  },
};

/** Use the disabled state when the field depends on a prerequisite selection. */
export const Disabled: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    disabled: true,
  },
  play: createNativeDisabledButtonPlay('Date'),
};

/** Use the invalid state after failed validation. */
export const Invalid: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    invalid: true,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Date' });

    await expect(trigger).toHaveAccessibleName('Date');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
  },
};

/** Clicking the trigger opens the calendar popup; selecting a day updates the value and closes the popup. */
export const SelectDate: Story = {
  args: {
    defaultValue: undefined,
    defaultMonth: CURRENT_MONTH,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const body = within(document.body);
    const trigger = canvas.getByRole('button', { name: 'Date' });
    const todayIso = toLocalIsoDate(TODAY);

    await userEvent.click(trigger);
    await expect(body.getByRole('grid')).toBeInTheDocument();

    const dayButton = body.getAllByRole('button').find((button) => button.getAttribute('data-day') === todayIso);

    await expect(dayButton).toBeDefined();
    await userEvent.click(dayButton!);

    await expect(trigger).toHaveTextContent(formatDisplayDate(TODAY));
    await expect(body.queryByRole('grid')).not.toBeInTheDocument();
  },
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <DatePickerStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <DatePickerStatesShowcase size="lg" />,
};
