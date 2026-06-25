import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Chip } from "@ds-12/ui/chip";
import {
  createButtonA11yPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
} from "../../lib/component-tests.ts";
import { IconLayoutsShowcase, VariantStatesMatrixTable } from "./chip-story-fixtures.tsx";

/** Toggleable filter or selection control with optional leading and trailing icons and a pressed state. */
const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    children: "Label",
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
    await createButtonA11yPlay("Label")(context);
    const canvas = within(context.canvasElement);
    const chip = canvas.getByRole("button", { name: "Label" });
    await expect(chip).toHaveAttribute("aria-pressed", "false");
    await createButtonKeyboardFocusPlay("Label")(context);
    await createButtonFocusVisiblePlay("Label")(context);
    await createButtonMouseClickPlay("Label")(context);
  },
};

/** Use the active state to indicate that a filter or option is currently selected — pair it with the inactive state to show the toggle clearly. */
export const Active: Story = {
  args: {
    active: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button", { name: "Label" });

    await expect(chip).toHaveAttribute("aria-pressed", "true");
  },
};

/** Add a leading icon to visually identify the filter category (e.g. a calendar icon before "Date"), reducing reliance on the label text alone. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Label" })).toBeInTheDocument();
  },
};

/** Add a trailing icon (typically a clear or close icon) to let users remove an applied filter without navigating away. */
export const WithTrailingIcon: Story = {
  args: {
    showTrailingIcon: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("button", { name: "Label" })).toBeInTheDocument();
  },
};

/** Showcase of all variant and state combinations — for human reference only. */
export const VariantStates: Story = {
  tags: ["!manifest"],
  render: () => <VariantStatesMatrixTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chips = canvas.getAllByRole("button", { name: "Label" });

    await expect(chips).toHaveLength(8);
    await expect(chips[0]).toHaveAccessibleName("Label");
  },
};

/** Showcase of all icon layout combinations — for human reference only. */
export const IconLayouts: Story = {
  tags: ["!manifest"],
  render: () => <IconLayoutsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByRole("button", { name: "User" })).toHaveLength(2);
    await expect(canvas.getAllByRole("button", { name: "Label" })).toHaveLength(2);
    await expect(canvas.getAllByRole("button", { name: "Filters" })).toHaveLength(2);
    await expect(canvas.getAllByRole("button", { name: "User" })[0]).toHaveAccessibleName("User");
    await expect(canvas.getAllByRole("button", { name: "Label" })[0]).toHaveAccessibleName("Label");
    await expect(canvas.getAllByRole("button", { name: "Filters" })[0]).toHaveAccessibleName(
      "Filters",
    );
  },
};
