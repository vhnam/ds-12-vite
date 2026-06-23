import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "@ds-12/ui/divider";

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

export const Default: Story = {};

export const Horizontal: Story = {
  args: { orientation: "horizontal" },
  render: (args) => (
    <div style={{ width: 327 }}>
      <Divider {...args} />
    </div>
  ),
};

export const Vertical: Story = {
  args: { orientation: "vertical" },
  render: (args) => (
    <div style={{ display: "flex", height: 48, alignItems: "stretch" }}>
      <Divider {...args} />
    </div>
  ),
};
