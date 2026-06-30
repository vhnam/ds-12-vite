import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, within } from 'storybook/test';

import { Badge, type BadgeEmphasis, type BadgeSize, type BadgeVariant } from '@ds-12/ui/badge';
import { Icon } from '@ds-12/ui/icon';

import { createBadgeA11yPlay } from '../../lib/component-tests.ts';
import { hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { EMPHASIS, SIZES, SizesTable, VARIANTS } from './badge-story-fixtures.tsx';

/** Args accepted by the Storybook wrapper for Controls — mirrors BadgeProps. */
type BadgeStoryArgs = {
  size?: BadgeSize;
  emphasis?: BadgeEmphasis;
  variant?: BadgeVariant;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
};

function BadgeStory(args: BadgeStoryArgs) {
  return <Badge {...args} />;
}

async function expectBadgeRoot(canvasElement: HTMLElement, { text, variant }: { text: string; variant: BadgeVariant }) {
  const canvas = within(canvasElement);
  const label = canvas.getByText(text);
  const root = label.closest('[data-slot="badge"]');

  await expect(label).toBeVisible();
  await expect(root).toHaveAttribute('data-slot', 'badge');
  await expect(root).toHaveAttribute('data-variant', variant);
}

/** Compact status or count indicator with semantic color variants, subtle or bold emphasis, and an optional leading icon. */
const meta = {
  title: 'Components/Badge',
  component: BadgeStory,
  tags: ['autodocs'],
  render: (args) => <BadgeStory {...args} />,
  argTypes: {
    variant: selectArgType(
      VARIANTS,
      'Semantic colour — neutral for metadata, positive/negative/attention/information for status.',
    ),
    emphasis: selectArgType(
      EMPHASIS,
      'Visual weight — subtle blends into the background, bold stands out on busy surfaces.',
    ),
    size: selectArgType(SIZES, 'Badge dimensions and icon scale — sm for compact layouts, lg for standalone labels.'),
    children: textArgType('Badge label text.'),
    icon: hiddenArgType,
  },
  args: {
    children: 'Badge',
    variant: 'neutral',
    emphasis: 'subtle',
    size: 'lg',
  },
} satisfies Meta<typeof BadgeStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the neutral-subtle badge for general metadata such as tags, categories, or counts where no semantic colour is needed. */
export const Default: Story = {
  play: async (context) => {
    await createBadgeA11yPlay('Badge')(context);
    await expectBadgeRoot(context.canvasElement, { text: 'Badge', variant: 'neutral' });
  },
};

/** Use bold emphasis when the badge must stand out against a busy background — for example, "New" labels or unread counts in a sidebar. */
export const Bold: Story = {
  args: {
    emphasis: 'bold',
  },
  play: async (context) => {
    await createBadgeA11yPlay('Badge')(context);
    await expectBadgeRoot(context.canvasElement, { text: 'Badge', variant: 'neutral' });
  },
};

/** Use the positive variant for success status such as "Completed" or "Active". */
export const Positive: Story = {
  args: {
    variant: 'positive',
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: async (context) => {
    await createBadgeA11yPlay('Badge')(context);
    await expectBadgeRoot(context.canvasElement, { text: 'Badge', variant: 'positive' });
  },
};

/** Use a leading icon to add visual context to the status — for example, a checkmark on a "Completed" badge or a warning icon on an "At risk" badge. */
export const WithIcon: Story = {
  args: {
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: async (context) => {
    await createBadgeA11yPlay('Badge')(context);
    await expectBadgeRoot(context.canvasElement, { text: 'Badge', variant: 'neutral' });
  },
};

/** Use the small size in compact layouts such as table rows, list items, or inline metadata. */
export const Small: Story = {
  args: {
    size: 'sm',
    variant: 'information',
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: async (context) => {
    await createBadgeA11yPlay('Badge')(context);
    await expectBadgeRoot(context.canvasElement, { text: 'Badge', variant: 'information' });
  },
};

/** Showcase of all variant and emphasis combinations across sizes — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SizesTable />,
};
