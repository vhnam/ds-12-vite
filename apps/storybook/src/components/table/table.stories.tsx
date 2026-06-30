import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ds-12/ui/table';

import { selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { CELL_STATES, CellStatesShowcase, FullTableShowcase, HeadVariantsShowcase } from './table-story-fixtures.tsx';
import { TanStackSortableTable } from './table-tanstack-story-fixtures.tsx';

type TableStoryArgs = ComponentProps<typeof Table> & {
  state: (typeof CELL_STATES)[number];
};

/** Data table with header and body cell primitives for text, stacked, avatar, badge, and custom content. */
const meta: Meta<TableStoryArgs> = {
  title: 'Components/Table',
  component: Table,
  tags: ['autodocs'],
  argTypes: {
    state: selectArgType(CELL_STATES, 'Visual state applied to a single body cell.'),
  },
  args: {
    state: 'default',
  },
};

export default meta;

type Story = StoryObj<TableStoryArgs>;

/** Use a basic text table for straightforward record lists — no sorting or rich cell content required. */
export const Default: Story = {
  render: () => (
    <Table aria-label="Data table">
      <TableHeader>
        <TableRow>
          <TableHead>Heading</TableHead>
          <TableHead>Heading</TableHead>
          <TableHead align="end">Heading</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow interactive>
          <TableCell text="Text" />
          <TableCell text="Text" />
          <TableCell align="end" text="S$99,999" />
        </TableRow>
        <TableRow interactive>
          <TableCell text="Text" />
          <TableCell text="Text" />
          <TableCell align="end" text="S$99,999" />
        </TableRow>
        <TableRow interactive>
          <TableCell text="Text" />
          <TableCell text="Text" />
          <TableCell align="end" text="S$99,999" />
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('table', { name: /data table/i })).toBeInTheDocument();
    await expect(canvas.getAllByRole('columnheader')).toHaveLength(3);
    await expect(canvas.getAllByRole('row')).toHaveLength(4);
  },
};

/** Pair with TanStack Table to sort by column accessors — e.g. `name` (string) or `amount` (number). Status is not sortable. */
export const WithTanStackSorting: Story = {
  render: () => <TanStackSortableTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const nameSort = canvas.getByRole('button', { name: /sort by name/i });

    await expect(canvas.getByRole('table', { name: /invoices/i })).toBeInTheDocument();
    await expect(nameSort).toBeInTheDocument();
    await expect(canvas.queryByRole('button', { name: /sort by status/i })).not.toBeInTheDocument();

    const rowsBefore = canvas.getAllByRole('row');
    await expect(rowsBefore[1]).toHaveTextContent('Acme Corp');

    await userEvent.click(nameSort);
    await expect(nameSort).toHaveAccessibleName('Name, sorted ascending');

    await userEvent.click(nameSort);
    await expect(nameSort).toHaveAccessibleName('Name, sorted descending');
    await expect(canvas.getAllByRole('row')[1]).toHaveTextContent('Gamma Inc');
  },
};

/** Use a default text cell for single-value columns such as names, categories, or identifiers. */
export const TextCell: Story = {
  render: ({ state }) => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell text="Text" state={state} />
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('cell', { name: /text/i })).toBeInTheDocument();
  },
};

/** Use stacked or avatar cells when a row needs a primary label with supporting metadata underneath. */
export const StackedCell: Story = {
  render: ({ state }) => (
    <Table>
      <TableBody>
        <TableRow>
          <TableCell variant="stacked" text="Text" subText="Sub text" state={state} />
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const cell = canvas.getByRole('cell', { name: /text/i });

    await expect(cell).toBeInTheDocument();
    await expect(cell).toHaveTextContent('Sub text');
  },
};

/** Use right-aligned header and body cells for numeric values such as currency or counts. */
export const RightAligned: Story = {
  render: () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead align="end">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell align="end" text="S$99,999" />
        </TableRow>
      </TableBody>
    </Table>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('columnheader', { name: /amount/i })).toBeInTheDocument();
    await expect(canvas.getByRole('cell', { name: /s\$99,999/i })).toBeInTheDocument();
  },
};

/** Showcase of header cell variants — for human reference only. */
export const HeadVariants: Story = {
  tags: ['a11y-debt'],
  parameters: showcaseParameters,
  render: () => <HeadVariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('columnheader', { name: /heading/i })).not.toHaveLength(0);
  },
};

/** Showcase of body cell content types and states — for human reference only. */
export const CellStates: Story = {
  tags: ['a11y-debt'],
  parameters: showcaseParameters,
  render: () => <CellStatesShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole('cell')).not.toHaveLength(0);
  },
};

/** Showcase of the full multi-column table with avatars, badges, currency, and row actions — for human reference only. */
export const FullExample: Story = {
  tags: ['a11y-debt'],
  parameters: showcaseParameters,
  render: () => <FullTableShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('table', { name: /sample data table/i })).toBeInTheDocument();
  },
};
