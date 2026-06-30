import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { RadioField } from '@ds-12/ui/fields/radio-field';
import { RadioGroup } from '@ds-12/ui/radio';

import {
  createRadioA11yPlay,
  createRadioDisabledPlay,
  createRadioInvalidA11yPlay,
  createRadioKeyboardFocusPlay,
  createRadioWithInputA11yPlay,
} from '../../lib/component-tests.ts';
import { booleanArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import {
  createSelectionFieldDecorator,
  RadioFieldStatesShowcase,
  SIZES,
} from '../selection-field/selection-field-story-fixtures.tsx';

/** Labelled radio field with optional supporting text, suffix, and embedded input. */
const meta = {
  title: 'Fields/RadioField',
  component: RadioField,
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the radio control.'),
    invalid: booleanArgType('Marks the field as invalid.'),
    disabled: booleanArgType('Prevents interaction.'),
    showLabel: booleanArgType('Whether to render the visible label element.'),
    showSupportingText: booleanArgType('Whether to render supporting text below the label.'),
    showSuffix: booleanArgType('Whether to render the suffix element.'),
    showHelperText: booleanArgType('Whether to render helper text when invalid.'),
    showInput: booleanArgType('Whether to render an input below the selection row.'),
    label: textArgType('Visible label text associated with the radio.'),
    supportingText: textArgType('Secondary descriptive text below the label.'),
    suffix: textArgType('Right-aligned supplementary text on the label row.'),
    helperText: textArgType('Error message displayed when invalid.'),
  },
  args: {
    size: 'sm',
    value: 'option',
    label: 'Selection label',
    supportingText: 'Supporting text',
    suffix: 'Suffix',
    helperText: 'Helper Text',
    showLabel: true,
    showSupportingText: false,
    showSuffix: false,
    showHelperText: true,
    showInput: false,
    invalid: false,
    disabled: false,
  },
  decorators: [
    createSelectionFieldDecorator(),
    (Story) => (
      <RadioGroup defaultValue="">
        <Story />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof RadioField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use RadioField inside a RadioGroup when each option needs a label, suffix, or conditional input. */
export const Default: Story = {
  play: async (context) => {
    await createRadioA11yPlay(/selection label/i)(context);
    await createRadioKeyboardFocusPlay(/selection label/i)(context);
  },
};

/** Use supporting text to add secondary context below the label without cluttering the primary label. */
export const WithSupportingText: Story = {
  args: {
    showSupportingText: true,
  },
  play: createRadioA11yPlay(/selection label/i),
};

/** Use a suffix for right-aligned supplementary text on the label row, such as a unit or status. */
export const WithSuffix: Story = {
  args: {
    showSuffix: true,
  },
  play: async (context) => {
    await createRadioA11yPlay(/selection label/i)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText('Suffix')).toBeInTheDocument();
  },
};

/** Use the input layout when selecting this option reveals a related text field, such as "Other". */
export const WithInput: Story = {
  args: {
    showInput: true,
  },
  play: createRadioWithInputA11yPlay(/selection label/i),
};

/** Use the disabled state when the option is unavailable in the current form context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createRadioDisabledPlay(/selection label/i),
};

/** Use the invalid state after validation fails — update helper text to describe the specific error. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: createRadioInvalidA11yPlay(/selection label/i),
};

/** Showcase of default layout states — for human reference only. */
export const DefaultStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <RadioFieldStatesShowcase layout="default" />,
};

/** Showcase of supporting-text layout states — for human reference only. */
export const SupportingTextStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <RadioFieldStatesShowcase layout="supporting-text" />,
};

/** Showcase of input layout states — for human reference only. */
export const InputStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <RadioFieldStatesShowcase layout="input" />,
};
