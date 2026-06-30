import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Checkbox } from '@ds-12/ui/checkbox';

import {
  createCheckboxA11yPlay,
  createCheckboxDisabledPlay,
  createCheckboxKeyboardFocusPlay,
  expectDataSlotVariant,
  runCheckboxInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { CHECKBOX_SIZES, CheckboxStatesMatrix } from './checkbox-story-fixtures.tsx';

/** Square selection control for independent on/off choices in forms and settings. */
const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(CHECKBOX_SIZES, 'Visual size of the checkbox control.'),
    invalid: booleanArgType('Marks the control as invalid and sets aria-invalid.'),
    disabled: booleanArgType('Prevents interaction.'),
    defaultChecked: booleanArgType('Initial checked state for uncontrolled usage.'),
  },
  args: {
    'aria-label': 'Accept terms',
    size: 'lg',
    invalid: false,
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Checkbox>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use for standalone boolean consent or preference fields — pair with a visible label via `aria-label` or an associated `<label>`. */
export const Default: Story = {
  play: async (context) => {
    await runCheckboxInteractionTests(context, /accept terms/i);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'checkbox',
      variant: 'lg',
      role: 'checkbox',
      name: /accept terms/i,
    });
  },
};

/** Use the checked state when a preference is enabled by default, such as opting into notifications. */
export const Checked: Story = {
  args: {
    defaultChecked: true,
  },
  play: async (context) => {
    await createCheckboxA11yPlay(/accept terms/i, true)(context);
    await createCheckboxKeyboardFocusPlay(/accept terms/i)(context);
  },
};

/** Use the small size in dense desktop layouts such as data tables or filter panels. */
export const Small: Story = {
  args: {
    size: 'sm',
  },
  play: async (context) => {
    await runCheckboxInteractionTests(context, /accept terms/i);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'checkbox',
      variant: 'sm',
      role: 'checkbox',
      name: /accept terms/i,
    });
  },
};

/** Use the invalid state when validation fails — for example, when a required consent checkbox is left unchecked. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name: /accept terms/i });

    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
  },
};

/** Use the disabled state for options that are unavailable in the current context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createCheckboxDisabledPlay(/accept terms/i),
};

/** Showcase of checkbox sizes and states — for human reference only. */
export const States: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <CheckboxStatesMatrix />,
};
