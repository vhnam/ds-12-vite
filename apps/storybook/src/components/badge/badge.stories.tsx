import type { Meta, StoryObj } from '@storybook/react-vite';

import { Badge } from '@ds-12/ui/badge';
import { Icon } from '@ds-12/ui/icon';

import { createBadgeA11yPlay } from '../../lib/component-tests.ts';
import { hiddenArgType, selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { EMPHASIS, SIZES, SizesTable, VARIANTS } from './badge-story-fixtures.tsx';

/** Compact status or count indicator with semantic color variants, subtle or bold emphasis, and an optional leading icon. */
const meta = {
  title: 'Components/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: selectArgType(
      VARIANTS,
      'Semantic colour — neutral for metadata, positive/negative/attention/information for status.',
    ),
    emphasis: selectArgType(
      EMPHASIS,
      'Visual weight — subtle blends into the background, bold stands out on busy surfaces.',
    ),
    size: selectArgType(SIZES, 'Badge dimensions and icon scale.'),
    icon: hiddenArgType,
  },
  args: {
    children: 'Badge',
    variant: 'neutral',
    emphasis: 'subtle',
    size: 'lg',
    icon: <Icon name="check_circle" variant="filled" />,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the neutral-subtle badge for general metadata such as tags, categories, or counts where no semantic colour is needed. */
export const Default: Story = {
  play: createBadgeA11yPlay('Badge'),
};

/** Use bold emphasis when the badge must stand out against a busy background — for example, "New" labels or unread counts in a sidebar. */
export const Bold: Story = {
  args: {
    emphasis: 'bold',
  },
  play: createBadgeA11yPlay('Badge'),
};

/** Use the positive variant for success status such as "Completed" or "Active". */
export const Positive: Story = {
  args: {
    variant: 'positive',
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: createBadgeA11yPlay('Badge'),
};

/** Use a leading icon to add visual context to the status — for example, a checkmark on a "Completed" badge or a warning icon on an "At risk" badge. */
export const WithIcon: Story = {
  args: {
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: createBadgeA11yPlay('Badge'),
};

/** Showcase of all variant and emphasis combinations across sizes — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SizesTable />,
};
