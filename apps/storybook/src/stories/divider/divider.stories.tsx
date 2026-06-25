import type { Meta, StoryObj } from "@storybook/react-vite";
import { Divider } from "@ds-12/ui/divider";
import { createSeparatorA11yPlay } from "../../lib/component-tests.ts";
import { selectArgType } from "../../lib/story-arg-types.ts";

/** Visual separator between content sections, rendered horizontally or vertically. */
const meta = {
  title: "Components/Divider",
  component: Divider,
  tags: ["autodocs"],
  argTypes: {
    orientation: selectArgType(
      ["horizontal", "vertical"],
      "Layout direction — horizontal separates stacked sections, vertical separates inline items.",
    ),
  },
  args: {
    orientation: "horizontal",
  },
  decorators: [
    (Story, { args }) =>
      args.orientation === "vertical" ? (
        <div style={{ display: "flex", height: 48, alignItems: "stretch" }}>
          <Story />
        </div>
      ) : (
        <div style={{ width: 327 }}>
          <Story />
        </div>
      ),
  ],
} satisfies Meta<typeof Divider>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the horizontal divider to visually separate stacked content sections such as list items, form groups, or card regions. */
export const Default: Story = {
  play: createSeparatorA11yPlay(),
};

/** Use the vertical divider to separate inline elements such as toolbar actions, breadcrumb segments, or navigation items in a row. */
export const Vertical: Story = {
  args: { orientation: "vertical" },
  play: createSeparatorA11yPlay(),
};
