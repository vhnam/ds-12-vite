import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@ds-12/ui/badge";
import { Icon } from "@ds-12/ui/icon";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

const variants = ["neutral", "negative", "attention", "positive", "information"] as const;

const meta = {
  title: "Components/Badge",
  component: Badge,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
    },
    emphasis: {
      control: "select",
      options: ["subtle", "bold"],
    },
    size: {
      control: "select",
      options: ["sm", "lg"],
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

export const Default: Story = {};

export const Subtle: Story = {
  args: { emphasis: "subtle" },
};

export const Bold: Story = {
  args: { emphasis: "bold" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const WithoutIcon: Story = {
  args: { icon: undefined },
};

export const Neutral: Story = {
  args: { variant: "neutral" },
};

export const Negative: Story = {
  args: { variant: "negative" },
};

export const Attention: Story = {
  args: { variant: "attention" },
};

export const Positive: Story = {
  args: { variant: "positive" },
};

export const Information: Story = {
  args: { variant: "information" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "48px", flexWrap: "wrap" }}>
      {(["lg", "sm"] as const).map((size) => (
        <div key={size} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <StoryCaption>{size === "lg" ? "Large" : "Small"}</StoryCaption>
          {variants.map((variant) => (
            <div key={variant} style={{ display: "flex", gap: "8px", alignItems: "center" }}>
              <Badge
                size={size}
                variant={variant}
                emphasis="subtle"
                icon={<Icon name="check_circle" variant="filled" />}
              >
                Badge
              </Badge>
              <Badge
                size={size}
                variant={variant}
                emphasis="bold"
                icon={<Icon name="check_circle" variant="filled" />}
              >
                Badge
              </Badge>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: (args) => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Small</StoryCaption>
        <Badge {...args} size="sm" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Large</StoryCaption>
        <Badge {...args} size="lg" />
      </div>
    </div>
  ),
  args: {
    variant: "neutral",
    emphasis: "subtle",
    icon: <Icon name="check_circle" variant="filled" />,
    children: "Badge",
  },
};

export const A11y: Story = {
  ...testStoryParams(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Badge")).toBeInTheDocument();
    await expect(canvas.getByText("Badge")).toHaveTextContent("Badge");
  },
};
