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

export const VariantStates: Story = {
  render: () => <VariantStatesMatrixTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chips = canvas.getAllByRole("button", { name: "Label" });

    await expect(chips).toHaveLength(8);
    await expect(chips[0]).toHaveAccessibleName("Label");
  },
};

export const IconLayouts: Story = {
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
