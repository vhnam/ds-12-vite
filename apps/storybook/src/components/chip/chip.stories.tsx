import type { Meta, StoryObj } from '@storybook/react-vite';

import { Chip } from '@ds-12/ui/chip';

import {
  createButtonA11yPlay,
  createChipA11yPlay,
  expectDataSlotVariant,
  runChipInteractionTests,
} from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { IconLayoutsShowcase, VariantStatesMatrixTable } from './chip-story-fixtures.tsx';

/** Toggleable filter or selection control with optional leading and trailing icons and a pressed state. */
const meta = {
  title: 'Components/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    active: booleanArgType('Whether the chip is pressed/selected. Reflected as aria-pressed.'),
    showLeadingIcon: booleanArgType('Renders a leading icon before the label.'),
    showTrailingIcon: booleanArgType('Renders a trailing icon after the label.'),
    leadingIcon: hiddenArgType,
    trailingIcon: hiddenArgType,
  },
  args: {
    children: 'Label',
    active: false,
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the inactive chip as the default filter state — tapping it applies the filter and transitions to the active state. */
export const Default: Story = {
  play: async (context) => {
    await runChipInteractionTests(context, 'Label', false);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'chip',
      role: 'button',
      name: 'Label',
    });
  },
};

/** Use the active state to indicate that a filter or option is currently selected — pair it with the inactive state to show the toggle clearly. */
export const Active: Story = {
  args: {
    active: true,
  },
  play: createChipA11yPlay('Label', true),
};

/** Add a leading icon to visually identify the filter category (e.g. a calendar icon before "Date"), reducing reliance on the label text alone. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createButtonA11yPlay('Label'),
};

/** Add a trailing icon (typically a clear or close icon) to let users remove an applied filter without navigating away. */
export const WithTrailingIcon: Story = {
  args: {
    showTrailingIcon: true,
  },
  play: createButtonA11yPlay('Label'),
};

/** Showcase of all variant and state combinations — for human reference only. */
export const VariantStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantStatesMatrixTable />,
};

/** Showcase of all icon layout combinations — for human reference only. */
export const IconLayouts: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <IconLayoutsShowcase />,
};
