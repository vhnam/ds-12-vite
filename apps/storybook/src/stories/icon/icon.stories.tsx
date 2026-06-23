import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Icon } from "@ds-12/ui/icon";
import { SIZES, SizesShowcase, VARIANTS, VariantsShowcase } from "./icon-story-fixtures.tsx";

const meta = {
  title: "Components/Icon",
  component: Icon,
  tags: ["autodocs"],
  argTypes: {
    name: {
      control: "text",
    },
    variant: {
      control: "select",
      options: VARIANTS,
    },
    size: {
      control: { type: "number", min: 12, max: 48, step: 2 },
    },
    align: {
      control: "select",
      options: [undefined, "inline-start", "inline-end"],
    },
  },
  args: {
    name: "check_circle",
    variant: "outlined",
    size: 20,
  },
} satisfies Meta<typeof Icon>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText("check_circle");

    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const Variants: Story = {
  render: () => <VariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByText("check_circle");

    await expect(icons).toHaveLength(VARIANTS.length);
    await expect(icons[0]).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

export const Sizes: Story = {
  render: () => <SizesShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByText("check_circle");

    await expect(icons).toHaveLength(SIZES.length);
    await expect(icons[0]).toHaveAttribute("aria-hidden", "true");
  },
};
