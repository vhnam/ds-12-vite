import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Divider } from "@ds-12/ui/divider";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

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

export const InList: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", width: 327 }}>
      <StoryCaption>Item one</StoryCaption>
      <Divider />
      <StoryCaption>Item two</StoryCaption>
      <Divider />
      <StoryCaption>Item three</StoryCaption>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <StoryCaption>Horizontal (327px)</StoryCaption>
        <div style={{ width: 327 }}>
          <Divider />
        </div>
      </div>
      <div>
        <StoryCaption>Horizontal (full width)</StoryCaption>
        <Divider />
      </div>
      <div>
        <StoryCaption>Vertical (48px height)</StoryCaption>
        <div style={{ display: "flex", height: 48, alignItems: "stretch" }}>
          <Divider orientation="vertical" />
        </div>
      </div>
    </div>
  ),
};

export const A11y: Story = {
  ...testStoryParams(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  },
};
