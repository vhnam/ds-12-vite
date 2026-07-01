import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, within } from 'storybook/test';

import { Breadcrumb, type BreadcrumbItem } from '@ds-12/ui/breadcrumb';

import {
  createBreadcrumbA11yPlay,
  createBreadcrumbCurrentPagePlay,
  createBreadcrumbLinkPlay,
  expectDataSlotVariant,
} from '../../lib/component-tests.ts';
import { booleanArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { COLLAPSED_ITEMS, DEFAULT_ITEMS, VariantsShowcase } from './breadcrumb-story-fixtures.tsx';

type BreadcrumbStoryArgs = {
  items: BreadcrumbItem[];
  collapsed?: boolean;
  className?: string;
  renderLink?: (props: { href: string; label: string; className: string; 'data-slot': 'breadcrumb-link' }) => ReactNode;
};

function BreadcrumbStory({ items, ...props }: BreadcrumbStoryArgs) {
  return <Breadcrumb items={items} {...props} />;
}

/** Secondary navigation trail showing the user's location within a page hierarchy. */
const meta = {
  title: 'Components/Breadcrumb',
  component: BreadcrumbStory,
  tags: ['autodocs'],
  render: (args) => <BreadcrumbStory {...args} />,
  argTypes: {
    collapsed: booleanArgType('Collapses middle segments with an ellipsis when more than three items are present.'),
    items: { control: false },
  },
  args: {
    items: [...DEFAULT_ITEMS],
    collapsed: false,
  },
} satisfies Meta<typeof BreadcrumbStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the default breadcrumb for short paths where every ancestor fits inline without truncation. */
export const Default: Story = {
  play: async (context) => {
    await createBreadcrumbA11yPlay()(context);
    await createBreadcrumbLinkPlay('Home')(context);
    await createBreadcrumbCurrentPagePlay('Breadcrumb')(context);
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'breadcrumb',
      variant: 'default',
      role: 'navigation',
      name: /breadcrumb/i,
    });
  },
};

/** Enable collapsed mode on long paths to preserve horizontal space while keeping the root, parent, and current page visible. */
export const Collapsed: Story = {
  args: {
    items: [...COLLAPSED_ITEMS],
    collapsed: true,
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await createBreadcrumbA11yPlay()(context);
    await createBreadcrumbCurrentPagePlay('Breadcrumb')(context);
    await expect(canvas.getByText('Home')).toBeVisible();
    await expect(canvas.getByText('Components')).toBeVisible();
    await expect(canvas.queryByText('Foundations')).not.toBeInTheDocument();
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'breadcrumb',
      variant: 'collapsed',
      role: 'navigation',
      name: /breadcrumb/i,
    });
  },
};

/** Showcase of default and collapsed breadcrumb variants — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantsShowcase />,
};

/** Use `renderLink` to plug in framework routers — TanStack Router, Next.js, React Router, etc. */
export const WithCustomLink: Story = {
  args: {
    renderLink: ({ href, label, className, 'data-slot': dataSlot }) => (
      <a href={href} className={className} data-slot={dataSlot} data-router="custom">
        {label}
      </a>
    ),
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await createBreadcrumbA11yPlay()(context);
    await createBreadcrumbLinkPlay('Home')(context);
    await expect(canvas.getByRole('link', { name: 'Home' })).toHaveAttribute('data-router', 'custom');
  },
};
