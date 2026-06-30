import type { Meta, StoryObj } from '@storybook/react-vite';

import { Switch } from '@ds-12/ui/switch';

import {
  createSwitchA11yPlay,
  createSwitchDisabledPlay,
  createSwitchKeyboardFocusPlay,
  expectDataSlotVariant,
  runSwitchInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { SwitchStatesMatrix } from './switch-story-fixtures.tsx';

/** Pill-shaped toggle for binary on/off settings such as feature flags or preferences. */
const meta = {
  title: 'Components/Switch',
  component: Switch,
  tags: ['autodocs'],
  argTypes: {
    disabled: booleanArgType('Prevents interaction.'),
    defaultChecked: booleanArgType('Initial on state for uncontrolled usage.'),
  },
  args: {
    'aria-label': 'Enable notifications',
    disabled: false,
    defaultChecked: false,
  },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use for immediate binary settings that take effect without a separate save action — for example, enabling notifications. */
export const Default: Story = {
  play: async (context) => {
    await runSwitchInteractionTests(context, /enable notifications/i);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'switch',
      role: 'switch',
      name: /enable notifications/i,
    });
  },
};

/** Use the on state when a preference is enabled by default. */
export const On: Story = {
  args: {
    defaultChecked: true,
  },
  play: async (context) => {
    await createSwitchA11yPlay(/enable notifications/i, true)(context);
    await createSwitchKeyboardFocusPlay(/enable notifications/i)(context);
  },
};

/** Use the disabled state when a setting cannot be changed in the current context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createSwitchDisabledPlay(/enable notifications/i),
};

/** Showcase of switch states — for human reference only. */
export const States: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SwitchStatesMatrix />,
};
