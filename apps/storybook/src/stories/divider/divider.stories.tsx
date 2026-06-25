import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "@ds-12/ui/divider";

/** Visual separator between content sections, rendered horizontally or vertically. */
const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: {
      control: "select",
      options: ["horizontal", "vertical"],
    },
  },
  args: {
    orientation: "horizontal",
  },
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the horizontal divider to visually separate stacked content sections such as list items, form groups, or card regions. */
export const Default: Story = {};

/** Explicit horizontal divider — use in a vertical flow where a full-width rule is needed between content blocks. */
export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div style={{ width: 327 }}>
      <Divider {...args} />
    </div>
  ),
};

/** Use the vertical divider to separate inline elements such as toolbar actions, breadcrumb segments, or navigation items in a row. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", height: 48, alignItems: "stretch" }}>
      <Divider {...args} />
    </div>
  ),
};
