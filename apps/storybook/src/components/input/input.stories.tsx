import type { Meta, StoryObj } from '@storybook/react-vite';

import { Input } from '@ds-12/ui/input';

import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxInvalidA11yPlay,
  runTextboxInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters, contrastDebtParameters } from '../../lib/story-test-config.ts';
import { InputStatesShowcase, SIZES, VARIANTS } from './input-story-fixtures.tsx';

/** Single-line text field with size and suffix variants, optional leading and trailing icons, and error and disabled states. */
const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the input control.'),
    variant: selectArgType(VARIANTS, 'Layout variant — default for standard fields, suffix for inline unit hints.'),
    invalid: booleanArgType('Marks the field as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents all interaction via the native disabled attribute.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the input.'),
    showTrailingIcon: booleanArgType('Renders a trailing icon inside the input.'),
    suffix: textArgType('Inline suffix text (requires variant suffix).'),
    leadingIcon: hiddenArgType,
    trailingIcon: hiddenArgType,
  },
  args: {
    size: 'sm',
    variant: 'default',
    placeholder: 'Input',
    'aria-label': 'Input',
    showLeadingIcon: false,
    showTrailingIcon: false,
    suffix: 'Suffix',
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use a bare Input (without InputField) only in custom form layouts where you manage label association yourself — otherwise prefer InputField for built-in label and helper text wiring. */
export const Default: Story = {
  play: (context) => runTextboxInteractionTests(context, 'Input'),
};

/** Use the suffix variant when a unit or format hint should appear inline after the value, such as "kg" or "%". */
export const Suffix: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    variant: 'suffix',
  },
  play: createTextboxA11yPlay('Input'),
};

/** Add a leading icon to help users identify the expected input type at a glance, such as a search icon for query fields. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createTextboxA11yPlay('Input'),
};

/** Use the disabled state when the field is temporarily unavailable — the browser prevents all interaction, so no additional guarding is needed in the form submit handler. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createTextboxDisabledPlay('Input'),
};

/** Use the invalid state to reflect a validation failure — always surface a visible error message nearby so keyboard and screen reader users know what went wrong. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: createTextboxInvalidA11yPlay('Input'),
};

/** Showcase of all interactive states for the default variant — for human reference only. */
export const DefaultStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <InputStatesShowcase variant="default" />,
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <InputStatesShowcase variant="suffix" />,
};
