import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@ds-12/ui/badge";
import { Icon } from "@ds-12/ui/icon";
import { EMPHASIS, SIZES, SizesTable, VARIANTS } from "./badge-story-fixtures.tsx";

/** Compact status or count indicator with semantic color variants, subtle or bold emphasis, and an optional leading icon. */
const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
    },
    emphasis: {
      control: "select",
      options: EMPHASIS,
    },
    size: {
      control: "select",
      options: SIZES,
    },
    icon: { control: false },
  },
  args: {
    children: "Badge",
    variant: "neutral",
    emphasis: "subtle",
    size: "lg",
    icon: <Icon name="check_circle" variant="filled" />,
  },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the neutral-subtle badge for general metadata such as tags, categories, or counts where no semantic colour is needed. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Badge")).toBeInTheDocument();
    await expect(canvas.getByText("Badge")).toBeVisible();
    await expect(canvas.getByText("Badge")).toHaveTextContent("Badge");
  },
};

/** Use bold emphasis when the badge must stand out against a busy background — for example, "New" labels or unread counts in a sidebar. */
export const Bold: Story = {
  args: {
    emphasis: "bold",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Badge")).toBeInTheDocument();
  },
};

/** Use a leading icon to add visual context to the status — for example, a checkmark on a "Completed" badge or a warning icon on an "At risk" badge. */
export const WithIcon: Story = {
  args: {
    icon: <Icon name="check_circle" variant="filled" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Badge")).toBeInTheDocument();
  },
};

/** Showcase of all variant and emphasis combinations across sizes — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ["!manifest"],
  render: () => <SizesTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvas.getAllByText("Badge");

    await expect(badges).toHaveLength(20);
    await expect(badges[0]).toBeVisible();
  },
};
