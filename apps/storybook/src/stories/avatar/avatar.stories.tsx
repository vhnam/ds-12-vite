import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Avatar } from "@ds-12/ui/avatar";
import {
  PLACEHOLDER_IMAGE,
  SHAPES,
  SIZES,
  SizesShowcase,
  VARIANTS,
  VariantsShowcase,
} from "./avatar-story-fixtures.tsx";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: SIZES,
    },
    shape: {
      control: "select",
      options: SHAPES,
    },
    variant: {
      control: "select",
      options: VARIANTS,
    },
    icon: { control: false },
  },
  args: {
    size: "md",
    shape: "user",
    variant: "initial",
    initials: "BL",
    src: PLACEHOLDER_IMAGE,
    alt: "User avatar",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getByText("BL");

    await expect(initials).toBeInTheDocument();
    await expect(initials).toHaveTextContent("BL");
  },
};

export const Variants: Story = {
  render: () => <VariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByText("BL")).toHaveLength(SHAPES.length);
    await expect(canvas.getAllByRole("img", { name: "Avatar" })).toHaveLength(SHAPES.length);
  },
};

export const Sizes: Story = {
  render: () => <SizesShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getAllByText("BL");

    await expect(initials).toHaveLength(SIZES.length);
    await expect(initials[0]).toBeVisible();
  },
};
