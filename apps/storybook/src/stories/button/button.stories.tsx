import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "@ds-12/ui/button";
import { Icon as IconComponent } from "@ds-12/ui/icon";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import {
  createButtonA11yPlay,
  createButtonDisabledPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
  testStoryParams,
} from "../../lib/component-tests.ts";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "danger", "icon"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
    },
    iconPosition: {
      control: "select",
      options: ["left", "right"],
    },
    loading: { control: "boolean" },
    disabled: { control: "boolean" },
    icon: { control: false },
  },
  args: {
    children: "Button",
    variant: "primary",
    size: "md",
  },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary" },
};

export const Secondary: Story = {
  args: { variant: "secondary" },
};

export const Danger: Story = {
  args: { variant: "danger" },
};

export const Icon: Story = {
  args: {
    variant: "icon",
    children: "Add",
    icon: <IconComponent name="add" variant="outlined" />,
  },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: createButtonDisabledPlay("Button"),
};

export const Loading: Story = {
  args: { loading: true },
};

export const WithIconLeft: Story = {
  args: {
    icon: <IconComponent name="add" variant="outlined" />,
    iconPosition: "left",
    children: "Button",
  },
};

export const WithIconRight: Story = {
  args: {
    icon: <IconComponent name="add" variant="outlined" />,
    iconPosition: "right",
    children: "Button",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "center", flexWrap: "wrap" }}>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Primary</StoryCaption>
        <Button variant="primary">Button</Button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Secondary</StoryCaption>
        <Button variant="secondary">Button</Button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Danger</StoryCaption>
        <Button variant="danger">Button</Button>
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Icon</StoryCaption>
        <Button variant="icon" aria-label="Add">
          <IconComponent name="add" variant="outlined" />
        </Button>
      </div>
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
        <Button {...args} size="sm" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Medium</StoryCaption>
        <Button {...args} size="md" />
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "flex-start" }}
      >
        <StoryCaption>Large</StoryCaption>
        <Button {...args} size="lg" />
      </div>
    </div>
  ),
  args: { variant: "primary", children: "Button" },
};

export const SecondaryWithIcon: Story = {
  args: {
    variant: "secondary",
    icon: <IconComponent name="add" variant="outlined" />,
    iconPosition: "left",
    children: "Button",
  },
};

export const DangerLoading: Story = {
  args: {
    variant: "danger",
    loading: true,
  },
};

export const IconSizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "16px", alignItems: "flex-end" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <StoryCaption>Small</StoryCaption>
        <Button variant="icon" size="sm" aria-label="Add small">
          <IconComponent name="add" variant="outlined" />
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <StoryCaption>Medium</StoryCaption>
        <Button variant="icon" size="md" aria-label="Add medium">
          <IconComponent name="add" variant="outlined" />
        </Button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px", alignItems: "center" }}>
        <StoryCaption>Large</StoryCaption>
        <Button variant="icon" size="lg" aria-label="Add large">
          <IconComponent name="add" variant="outlined" />
        </Button>
      </div>
    </div>
  ),
};

export const KeyboardFocus: Story = {
  ...testStoryParams(),
  args: { children: "Button", variant: "primary" },
  play: createButtonKeyboardFocusPlay("Button"),
};

export const FocusVisible: Story = {
  ...testStoryParams(),
  args: { children: "Button", variant: "primary" },
  play: createButtonFocusVisiblePlay("Button"),
};

export const MouseClick: Story = {
  ...testStoryParams(),
  args: { children: "Button", variant: "primary" },
  play: createButtonMouseClickPlay("Button"),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { children: "Button", variant: "primary" },
  play: createButtonA11yPlay("Button"),
};
