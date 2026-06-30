import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { ComboboxField } from '@ds-12/ui/fields/combobox-field';

import {
  createComboboxDisabledPlay,
  createComboboxInvalidA11yPlay,
  runComboboxA11yAndFocusTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { contrastDebtParameters, showcaseParameters } from '../../lib/story-test-config.ts';
import { ComboboxFieldStatesShowcase, DEFAULT_COMBOBOX_OPTIONS, SIZES } from './combobox-field-story-fixtures.tsx';

/** Labelled combobox field composed of a label, helper text, and a Combobox control with shared validation styling. */
const meta = {
  title: 'Fields/ComboboxField',
  component: ComboboxField,
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the combobox control.'),
    invalid: booleanArgType('Marks the field as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents all interaction with the control.'),
    multiple: booleanArgType('Allows selecting multiple options as removable chips.'),
    showLabel: booleanArgType('Whether to render the visible label element.'),
    showHelperText: booleanArgType('Whether to render helper or error text below the combobox.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the input.'),
    label: textArgType('Visible label text associated with the combobox.'),
    helperText: textArgType('Helper or error text displayed below the combobox.'),
    placeholder: textArgType('Placeholder text shown when no value is selected.'),
    options: hiddenArgType,
    leadingIcon: hiddenArgType,
    defaultOpen: hiddenArgType,
    open: hiddenArgType,
    onOpenChange: hiddenArgType,
    onValueChange: hiddenArgType,
    onInputValueChange: hiddenArgType,
    value: hiddenArgType,
    defaultValue: hiddenArgType,
    inputValue: hiddenArgType,
    defaultInputValue: hiddenArgType,
    name: hiddenArgType,
    required: hiddenArgType,
    id: hiddenArgType,
    fieldClassName: hiddenArgType,
    className: hiddenArgType,
  },
  args: {
    size: 'sm',
    label: 'Label',
    helperText: 'Helper text',
    placeholder: 'Type to search',
    options: DEFAULT_COMBOBOX_OPTIONS,
    showLabel: true,
    showHelperText: true,
    showLeadingIcon: true,
    multiple: false,
    invalid: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ComboboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use ComboboxField when a labelled filterable dropdown is needed in a form. */
export const Default: Story = {
  play: (context) => runComboboxA11yAndFocusTests(context, 'Label'),
};

/** Use the disabled state when the field depends on a prerequisite selection. */
export const Disabled: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    disabled: true,
    defaultValue: 'item-1',
  },
  play: createComboboxDisabledPlay('Label'),
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
    await createComboboxInvalidA11yPlay('Label')(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText('This field is required')).toBeInTheDocument();
  },
};

/** Use multiple selection when users need to pick more than one option from the list. */
export const Multiple: Story = {
  args: {
    multiple: true,
    defaultValue: ['item-1', 'item-2', 'item-3'],
  },
  play: (context) => runComboboxA11yAndFocusTests(context, 'Label'),
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxFieldStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxFieldStatesShowcase size="lg" />,
};

/** Showcase of multi-select chip states for the small size — for human reference only. */
export const SmallMultipleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxFieldStatesShowcase size="sm" multiple />,
};

/** Showcase of multi-select chip states for the large size — for human reference only. */
export const LargeMultipleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxFieldStatesShowcase size="lg" multiple />,
};
