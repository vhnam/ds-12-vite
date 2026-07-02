import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { booleanArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import {
  DEFAULT_MENU_OPTIONS,
  MenuItemStory,
  MenuStatesShowcase,
  MenuVariantsShowcase,
  VARIANTS,
} from './menu-story-fixtures.tsx';

async function expectMenuItemStructure(
  canvasElement: HTMLElement,
  {
    label,
    variant,
    selected = false,
    disabled = false,
  }: {
    label: string;
    variant: 'single' | 'multiple';
    selected?: boolean;
    disabled?: boolean;
  },
) {
  const canvas = within(canvasElement);

  await expect(canvas.getByRole('listbox', { name: /menu/i })).toBeInTheDocument();
  await expect(canvas.getByRole('listbox')).toHaveAttribute('data-slot', 'menu-list');

  const option = canvas.getByRole('option', { name: new RegExp(label, 'i') });
  await expect(option).toHaveAttribute('data-slot', 'menu-item');
  await expect(option).toHaveAttribute('aria-selected', selected ? 'true' : 'false');
  if (disabled) {
    await expect(option).toHaveAttribute('aria-disabled', 'true');
  }

  await expect(option.querySelector('[data-slot="menu-item-text"]')).toHaveTextContent(label);

  const checkbox = option.querySelector('[data-slot="menu-item-checkbox"]');
  if (variant === 'multiple') {
    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAttribute('aria-hidden', 'true');
  } else {
    await expect(checkbox).not.toBeInTheDocument();
  }
}

/** List item primitives for dropdown menus — single-select rows and multi-select rows with a checkbox indicator. */
const meta = {
  title: 'Components/Menu',
  component: MenuItemStory,
  tags: ['autodocs'],
  argTypes: {
    variant: selectArgType(VARIANTS, 'Layout preset — single for one-choice lists, multiple for checkbox rows.'),
    label: textArgType('Visible label rendered by MenuItemText.'),
    selected: booleanArgType('Applies the selected visual state and sets aria-selected.'),
    disabled: booleanArgType('Applies the disabled visual state and sets aria-disabled.'),
    highlighted: booleanArgType('Applies the keyboard highlight visual state via data-highlighted.'),
  },
  args: {
    variant: 'single',
    label: 'Item One',
    selected: false,
    disabled: false,
    highlighted: false,
  },
} satisfies Meta<typeof MenuItemStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the single variant for one-choice dropdown lists such as Select options. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    await expectMenuItemStructure(canvasElement, { label: 'Item One', variant: 'single' });
  },
};

/** Use the multiple variant when menu rows need a checkbox indicator for multi-select lists such as Combobox. */
export const Multiple: Story = {
  args: {
    variant: 'multiple',
  },
  play: async ({ canvasElement }) => {
    await expectMenuItemStructure(canvasElement, { label: 'Item One', variant: 'multiple' });
  },
};

/** Use the selected state to show the active choice in an open menu list. */
export const Selected: Story = {
  args: {
    selected: true,
  },
  play: async ({ canvasElement }) => {
    await expectMenuItemStructure(canvasElement, { label: 'Item One', variant: 'single', selected: true });
  },
};

/** Use the disabled state for options that are visible but not selectable. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    await expectMenuItemStructure(canvasElement, {
      label: 'Item One',
      variant: 'single',
      disabled: true,
    });
  },
};

/** Use the highlighted state while keyboard navigating an open menu list. */
export const Highlighted: Story = {
  args: {
    highlighted: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const option = canvas.getByRole('option', { name: /item one/i });

    await expect(option).toHaveAttribute('data-highlighted', '');
  },
};

/** Showcase of interactive states for the single-select layout — for human reference only. */
export const SingleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <MenuStatesShowcase variant="single" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole('option')).toHaveLength(DEFAULT_MENU_OPTIONS.length * 4);
    await expect(canvas.getAllByRole('option', { name: /item two/i })[1]).toHaveAttribute('aria-selected', 'true');
    await expect(canvas.getAllByRole('option', { name: /item three/i })[2]).toHaveAttribute('aria-disabled', 'true');
  },
};

/** Showcase of interactive states for the multi-select layout — for human reference only. */
export const MultipleStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <MenuStatesShowcase variant="multiple" />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selectedOptions = canvas.getAllByRole('option', { name: /item two/i });

    await expect(selectedOptions[1]).toHaveAttribute('aria-selected', 'true');
    await expect(selectedOptions[1].querySelector('[data-slot="menu-item-checkbox"]')).toBeInTheDocument();
  },
};

/** Showcase comparing single-select and multi-select menu item layouts — for human reference only. */
export const Variants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <MenuVariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const singleList = canvas.getAllByRole('listbox')[0];
    const multipleList = canvas.getAllByRole('listbox')[1];

    await expect(singleList.querySelector('[data-slot="menu-item-checkbox"]')).not.toBeInTheDocument();
    await expect(multipleList.querySelector('[data-slot="menu-item-checkbox"]')).toBeInTheDocument();
  },
};
