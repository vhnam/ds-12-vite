import type { Meta, StoryObj } from '@storybook/react-vite';

import { Icon } from '@ds-12/ui/icon';

import { createIconA11yPlay } from '../../lib/component-tests.ts';
import { selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { SizesShowcase, VARIANTS, VariantsShowcase } from './icon-story-fixtures.tsx';

/** Material Symbols icon with outlined or filled style and a configurable pixel size. */
const meta = {
  title: 'Components/Icon',
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: textArgType('Material Symbols icon name (e.g. check_circle, download).'),
    variant: selectArgType(VARIANTS, 'Visual style — outlined for default use, filled for active or selected states.'),
    size: {
      control: { type: 'number', min: 12, max: 48, step: 2 },
      description: 'Icon size in pixels.',
    },
    align: selectArgType(
      [undefined, 'inline-start', 'inline-end'] as const,
      'Nudges the icon flush with adjacent inline text.',
    ),
  },
  args: {
    name: 'check_circle',
    variant: 'outlined',
    size: 20,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the outlined variant as the default — it works well in most contexts and avoids visual heaviness. Icons are always decorative (aria-hidden) and must be accompanied by a visible or accessible text label. */
export const Default: Story = {
  play: createIconA11yPlay('check_circle'),
};

/** Use the filled variant to communicate an active, selected, or toggled state — for example, a filled bookmark when an item is saved. */
export const Filled: Story = {
  args: {
    variant: 'filled',
  },
  play: createIconA11yPlay('check_circle'),
};

/** Use a larger size when the icon is the primary visual element in a card or empty state. */
export const Large: Story = {
  args: {
    size: 32,
  },
  play: createIconA11yPlay('check_circle'),
};

/** Use inline alignment to nudge an icon flush with adjacent text in a sentence or label — inline-start aligns to the text start, inline-end to the text end. */
export const InlineAligned: Story = {
  args: {
    align: 'inline-start',
  },
  decorators: [
    (Story) => (
      <p style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <Story />
        Inline aligned icon
      </p>
    ),
  ],
  play: createIconA11yPlay('check_circle'),
};

/** Showcase of outlined vs filled variants — for human reference only. */
export const Variants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantsShowcase />,
};

/** Showcase of all supported sizes — for human reference only. */
export const Sizes: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SizesShowcase />,
};
