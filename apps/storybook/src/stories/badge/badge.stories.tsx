import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@ds-12/ui/badge";
import { Icon } from "@ds-12/ui/icon";
import { EMPHASIS, SIZES, SizesTable, VARIANTS } from "./badge-story-fixtures.tsx";

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

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Badge")).toBeInTheDocument();
    await expect(canvas.getByText("Badge")).toBeVisible();
    await expect(canvas.getByText("Badge")).toHaveTextContent("Badge");
  },
};

export const TypesAndVariants: Story = {
  render: () => <SizesTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badges = canvas.getAllByText("Badge");

    await expect(badges).toHaveLength(20);
    await expect(badges[0]).toBeVisible();
  },
};
