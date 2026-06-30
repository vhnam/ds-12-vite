import type { Meta, StoryObj } from '@storybook/react-vite';

import { TextareaField } from '@ds-12/ui/fields/textarea-field';

import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxInvalidA11yPlay,
  runTextboxInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters, contrastDebtParameters } from '../../lib/story-test-config.ts';
import { SIZES, TextareaFieldStatesShowcase, VARIANTS } from './textarea-field-story-fixtures.tsx';

/** Labelled textarea field composed of a label, helper text, and a Textarea control with shared validation styling. */
const meta = {
  title: 'Fields/TextareaField',
  component: TextareaField,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the textarea control.'),
    variant: selectArgType(VARIANTS, 'Layout variant — default for standard fields, suffix for character count.'),
    invalid: booleanArgType('Marks the field as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents all interaction via the native disabled attribute.'),
    showLabel: booleanArgType('Whether to render the visible label element.'),
    showHelperText: booleanArgType('Whether to render helper or error text below the textarea.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the textarea.'),
    suffix: textArgType('Inline suffix text (requires variant suffix).'),
    label: textArgType('Visible label text associated with the textarea.'),
    helperText: textArgType('Helper or error text displayed below the textarea.'),
    leadingIcon: hiddenArgType,
  },
  args: {
    size: 'sm',
    variant: 'default',
    label: 'Label',
    helperText: 'Helper text',
    placeholder: 'Input',
    showLabel: true,
    showHelperText: true,
    showLeadingIcon: false,
    suffix: '0/100',
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
} satisfies Meta<typeof TextareaField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use TextareaField (not a bare Textarea) whenever the field needs a visible label and helper text — the wrapper ensures they are correctly associated for accessibility. */
export const Default: Story = {
  play: (context) => runTextboxInteractionTests(context, 'Label'),
};

/** Use the suffix variant to show a live character count or limit alongside the textarea. */
export const Suffix: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    variant: 'suffix',
  },
  play: createTextboxA11yPlay('Label'),
};

/** Add a leading icon when the textarea content type benefits from a visual cue, such as a notes or comment icon. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createTextboxA11yPlay('Label'),
};

/** Use the disabled state when the textarea is not yet editable due to a prerequisite step — pair with helper text explaining when it will become active. */
export const Disabled: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    disabled: true,
  },
  play: createTextboxDisabledPlay('Label'),
};

/** Use the invalid state after failed validation — always update the helper text to describe the specific error so the user knows how to fix it. */
export const Invalid: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    invalid: true,
    helperText: 'This field is required',
  },
  play: createTextboxInvalidA11yPlay('Label'),
};

/** Showcase of all interactive states for the default variant — for human reference only. */
export const DefaultStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <TextareaFieldStatesShowcase variant="default" />,
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <TextareaFieldStatesShowcase variant="suffix" />,
};
