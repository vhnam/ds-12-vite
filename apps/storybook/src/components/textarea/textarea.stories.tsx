import type { Meta, StoryObj } from '@storybook/react-vite';

import { Textarea } from '@ds-12/ui/textarea';

import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxInvalidA11yPlay,
  expectDataSlotVariant,
  runTextboxInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters, contrastDebtParameters } from '../../lib/story-test-config.ts';
import { SIZES, TextareaStatesShowcase, VARIANTS } from './textarea-story-fixtures.tsx';

/** Multi-line text field with optional leading icon, character suffix, and error and disabled states. */
const meta = {
  title: 'Components/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(SIZES, 'Visual size of the textarea control.'),
    variant: selectArgType(VARIANTS, 'Layout variant — default for standard fields, suffix for character count.'),
    invalid: booleanArgType('Marks the field as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents all interaction via the native disabled attribute.'),
    showLeadingIcon: booleanArgType('Renders a leading icon inside the textarea.'),
    suffix: textArgType('Inline suffix text (requires variant suffix).'),
    leadingIcon: hiddenArgType,
  },
  args: {
    size: 'sm',
    variant: 'default',
    placeholder: 'Input',
    'aria-label': 'Input',
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
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use a bare Textarea (without TextareaField) only in custom form layouts where you manage label association yourself — otherwise prefer TextareaField for built-in label and helper text wiring. */
export const Default: Story = {
  play: async (context) => {
    await runTextboxInteractionTests(context, 'Input');
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'textarea',
      variant: 'default',
      role: 'textbox',
      name: 'Input',
    });
  },
};

/** Use the suffix variant to show a live character count or limit alongside the textarea. */
export const Suffix: Story = {
  tags: ['a11y-debt'],
  parameters: contrastDebtParameters,
  args: {
    variant: 'suffix',
  },
  play: createTextboxA11yPlay('Input'),
};

/** Add a leading icon when the textarea content type benefits from a visual cue, such as a notes or comment icon. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createTextboxA11yPlay('Input'),
};

/** Use the disabled state when the textarea is temporarily unavailable — the browser prevents all interaction, so no additional guarding is needed in the form submit handler. */
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
  render: () => <TextareaStatesShowcase variant="default" />,
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <TextareaStatesShowcase variant="suffix" />,
};
