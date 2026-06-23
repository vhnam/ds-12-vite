import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Icon } from "@ds-12/ui/icon";
import { Typography } from "@ds-12/ui/typography";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

const commonIcons = [
  "check_circle",
  "error",
  "warning",
  "info",
  "home",
  "search",
  "settings",
  "favorite",
  "delete",
  "edit",
] as const;

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
      options: ["outlined", "filled"],
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

export const Default: Story = {};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

export const Filled: Story = {
  args: { variant: "filled" },
};

export const Small: Story = {
  args: { size: 12 },
};

export const Large: Story = {
  args: { size: 32 },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
      <Icon name="check_circle" variant="outlined" size={24} />
      <Icon name="check_circle" variant="filled" size={24} />
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
      {([12, 16, 20, 24, 32] as const).map((size) => (
        <div
          key={size}
          style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}
        >
          <StoryCaption>{size}px</StoryCaption>
          <Icon name="check_circle" variant="filled" size={size} />
        </div>
      ))}
    </div>
  ),
};

export const CommonIcons: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)",
        gap: "16px",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {commonIcons.map((name) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}
        >
          <Icon name={name} variant="outlined" size={24} />
          <Typography variant="label-small">{name}</Typography>
        </div>
      ))}
    </div>
  ),
};

export const CommonIconsFilled: Story = {
  render: () => (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, auto)",
        gap: "16px",
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      {commonIcons.map((name) => (
        <div
          key={name}
          style={{ display: "flex", flexDirection: "column", gap: "4px", alignItems: "center" }}
        >
          <Icon name={name} variant="filled" size={24} />
          <Typography variant="label-small">{name}</Typography>
        </div>
      ))}
    </div>
  ),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { name: "check_circle" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText("check_circle");
    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  },
};
