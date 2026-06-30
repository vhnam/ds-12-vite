import type { Meta, StoryObj } from '@storybook/react-vite';

import { Combobox } from '@ds-12/ui/combobox';

import {
  comboboxTestArgs,
  createComboboxA11yPlay,
  createComboboxDisabledPlay,
  createComboboxInvalidA11yPlay,
  runComboboxInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { ComboboxStatesShowcase, DEFAULT_COMBOBOX_OPTIONS, SIZES } from './combobox-story-fixtures.tsx';

/** Filterable text input with a dropdown list, optional leading icon, multi-select chips, and error and disabled states. */
const meta = {
  title: 'Components/Combobox',
  component: Combobox,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the combobox control.'),
    invalid: booleanArgType('Marks the control as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents interaction with the control.'),
    multiple: booleanArgType('Allows selecting multiple options as removable chips.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the input.'),
    placeholder: textArgType('Placeholder text shown when no value is selected.'),
    'aria-label': textArgType('Accessible name when no visible label is provided.'),
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
    className: hiddenArgType,
    'aria-describedby': hiddenArgType,
  },
  args: {
    ...comboboxTestArgs,
    size: 'sm',
    options: DEFAULT_COMBOBOX_OPTIONS,
    showLeadingIcon: false,
    multiple: false,
    invalid: false,
    disabled: false,
    placeholder: 'Type to search',
    'aria-label': 'Combobox',
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Combobox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use ComboboxField when a labelled combobox is needed in a form — Combobox is the bare control without label or helper text. */
export const Default: Story = {
  play: (context) => runComboboxInteractionTests(context, 'Combobox'),
};

/** Add a leading icon to help users identify the expected search type at a glance. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createComboboxA11yPlay('Combobox'),
};

/** Use multiple selection when users need to pick more than one option from the list. */
export const Multiple: Story = {
  args: {
    multiple: true,
    showLeadingIcon: true,
    defaultValue: ['item-1', 'item-2', 'item-3'],
  },
  play: createComboboxA11yPlay('Combobox'),
};

/** Use the disabled state when the control depends on a prerequisite selection. */
export const Disabled: Story = {
  args: {
    disabled: true,
    showLeadingIcon: true,
    defaultValue: 'item-1',
  },
  play: createComboboxDisabledPlay('Combobox'),
};

/** Use the invalid state to reflect a validation failure — pair with ComboboxField helper text so keyboard and screen reader users know what went wrong. */
export const Invalid: Story = {
  args: {
    invalid: true,
    showLeadingIcon: true,
  },
  play: createComboboxInvalidA11yPlay('Combobox'),
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxStatesShowcase size="lg" />,
};

/** Showcase of multi-select chip states for the small size — for human reference only. */
export const SmallMultipleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxStatesShowcase size="sm" multiple />,
};

/** Showcase of multi-select chip states for the large size — for human reference only. */
export const LargeMultipleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ComboboxStatesShowcase size="lg" multiple />,
};
