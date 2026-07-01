import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { DatePickerField } from '@ds-12/ui/fields/date-picker-field';

import {
  createNativeDisabledButtonPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  expectDataSlotVariant,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { contrastDebtParameters, showcaseParameters } from '../../lib/story-test-config.ts';
import { DatePickerFieldStatesShowcase, SIZES } from './date-picker-field-story-fixtures.tsx';

const JUNE_2025 = new Date(2025, 5, 25);

/** Labelled date picker field composed of a label, helper text, and a DatePicker control with shared validation styling. */
const meta = {
  title: 'Fields/DatePickerField',
  component: DatePickerField,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the date picker control.'),
    invalid: booleanArgType('Marks the field as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents all interaction with the control.'),
    showLabel: booleanArgType('Whether to render the visible label element.'),
    showHelperText: booleanArgType('Whether to render helper or error text below the date picker.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the trigger.'),
    label: textArgType('Visible label text associated with the date picker.'),
    helperText: textArgType('Helper or error text displayed below the date picker.'),
    placeholder: textArgType('Placeholder text shown when no date is selected.'),
    defaultValue: hiddenArgType,
    value: hiddenArgType,
    onValueChange: hiddenArgType,
    defaultOpen: hiddenArgType,
    open: hiddenArgType,
    onOpenChange: hiddenArgType,
    name: hiddenArgType,
    required: hiddenArgType,
    id: hiddenArgType,
    fieldClassName: hiddenArgType,
    className: hiddenArgType,
    leadingIcon: hiddenArgType,
    'aria-describedby': hiddenArgType,
  },
  args: {
    size: 'sm',
    label: 'Label',
    helperText: 'Helper text',
    placeholder: 'Select date',
    showLabel: true,
    showHelperText: true,
    showLeadingIcon: true,
    invalid: false,
    disabled: false,
    defaultValue: JUNE_2025,
    defaultMonth: JUNE_2025,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof DatePickerField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use DatePickerField when a labelled date picker is needed in a form. */
export const Default: Story = {
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Label' });

    await expect(trigger).toBeInTheDocument();
    await expect(trigger).toHaveAccessibleName('Label');
    await createButtonKeyboardFocusPlay('Label')(context);
    await createButtonFocusVisiblePlay('Label')(context);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'date-picker-field',
      variant: 'sm',
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
  play: createNativeDisabledButtonPlay('Label'),
};

/** Use the invalid state after failed validation and update helper text to describe the error. */
export const Invalid: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    invalid: true,
    helperText: 'This field is required',
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    const trigger = canvas.getByRole('button', { name: 'Label' });

    await expect(trigger).toHaveAccessibleName('Label');
    await expect(trigger).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText('This field is required')).toBeInTheDocument();
  },
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <DatePickerFieldStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <DatePickerFieldStatesShowcase size="lg" />,
};
