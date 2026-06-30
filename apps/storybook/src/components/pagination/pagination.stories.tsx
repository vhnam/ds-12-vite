import type { Decorator, Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Pagination, type PaginationProps } from '@ds-12/ui/pagination';

import { createPaginationA11yPlay, runPaginationInteractionTests } from '../../lib/component-tests.ts';
import { booleanArgType, numberArgType, selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import {
  ActivePagePositionsShowcase,
  InteractivePagination,
  NumbersOnlyShowcase,
  WithBackNextShowcase,
} from './pagination-story-fixtures.tsx';

const interactivePaginationDecorator: Decorator = (_, { args }) => (
  <InteractivePagination {...(args as PaginationProps)} />
);

/** Page navigation control with numbered pages, ellipsis for long ranges, and optional previous and next actions. */
const meta = {
  title: 'Components/Pagination',
  component: Pagination,
  tags: ['autodocs'],
  argTypes: {
    size: selectArgType(['sm', 'lg'], 'Visual size — sm for compact toolbars, lg for standard page navigation.'),
    showNavigation: booleanArgType('Shows Back and Next buttons alongside page numbers.'),
    page: numberArgType('Currently active page (1-based).', 1),
    totalPages: numberArgType('Total number of pages available.', 1),
  },
  args: {
    page: 1,
    totalPages: 3,
    size: 'lg',
    showNavigation: false,
  },
} satisfies Meta<typeof Pagination>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the default (numbers-only) pagination for short page ranges where all pages fit without truncation — it keeps the UI minimal and scannable. */
export const Default: Story = {
  decorators: [interactivePaginationDecorator],
  play: (context) => runPaginationInteractionTests(context, 1),
};

/** Enable navigation buttons when users benefit from a "Back / Next" affordance — useful for sequential flows like multi-step wizards or reading articles in series. */
export const WithNavigation: Story = {
  args: {
    showNavigation: true,
    totalPages: 10,
    page: 5,
  },
  decorators: [interactivePaginationDecorator],
  play: async (context) => {
    const canvas = within(context.canvasElement);

    await createPaginationA11yPlay(5)(context);
    await expect(canvas.getByRole('button', { name: 'Back' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: 'Next' })).toBeInTheDocument();
  },
};

/** Use the small size in compact toolbars or data tables where vertical space is limited. */
export const Small: Story = {
  args: {
    size: 'sm',
  },
  decorators: [interactivePaginationDecorator],
  play: createPaginationA11yPlay(1),
};

/** Showcase of Back/Next navigation across page scenarios and sizes — for human reference only. */
export const WithBackNext: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <WithBackNextShowcase />,
};

/** Showcase of numbers-only pagination across page scenarios and sizes — for human reference only. */
export const NumbersOnly: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <NumbersOnlyShowcase />,
};

/** Showcase of ellipsis behaviour as the active page moves through a long range — for human reference only. */
export const ActivePagePositions: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ActivePagePositionsShowcase />,
};
