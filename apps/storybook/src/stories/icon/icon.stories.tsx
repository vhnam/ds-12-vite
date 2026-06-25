import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Icon } from "@ds-12/ui/icon";
import { SIZES, SizesShowcase, VARIANTS, VariantsShowcase } from "./icon-story-fixtures.tsx";

/** Material Symbols icon with outlined or filled style and a configurable pixel size. */
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

/** Use the outlined variant as the default — it works well in most contexts and avoids visual heaviness. Icons are always decorative (aria-hidden) and must be accompanied by a visible or accessible text label. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText("check_circle");

    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

/** Use the filled variant to communicate an active, selected, or toggled state — for example, a filled bookmark when an item is saved. */
export const Filled: Story = {
  args: {
    variant: "filled",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText("check_circle");

    await expect(icon).toHaveAttribute("aria-hidden", "true");
  },
};

/** Use inline alignment to nudge an icon flush with adjacent text in a sentence or label — inline-start aligns to the text start, inline-end to the text end. */
export const InlineAligned: Story = {
  args: {
    align: "inline-start",
  },
  render: (args) => (
    <p style={{ display: "flex", alignItems: "center", gap: 4 }}>
      <Icon {...args} />
      Inline aligned icon
    </p>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("check_circle")).toHaveAttribute("aria-hidden", "true");
  },
};

/** Showcase of outlined vs filled variants — for human reference only. */
export const Variants: Story = {
  tags: ["!manifest"],
  render: () => <VariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByText("check_circle");

    await expect(icons).toHaveLength(VARIANTS.length);
    await expect(icons[0]).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};

/** Showcase of all supported sizes — for human reference only. */
export const Sizes: Story = {
  tags: ["!manifest"],
  render: () => <SizesShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icons = canvas.getAllByText("check_circle");

    await expect(icons).toHaveLength(SIZES.length);
    await expect(icons[0]).toHaveAttribute("aria-hidden", "true");
  },
};
