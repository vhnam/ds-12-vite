import type { Meta, StoryObj } from "@storybook/react-vite";
import { Input } from "@ds-12/ui/input";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
  testStoryParams,
  textboxTestArgs,
} from "../../lib/component-tests.ts";

const sizes = ["sm", "lg"] as const;
const variants = ["default", "suffix"] as const;

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    variant: {
      control: "select",
      options: variants,
    },
    invalid: { control: "boolean" },
    disabled: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    suffix: { control: "text" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    size: "sm",
    variant: "default",
    placeholder: "Input",
    showLeadingIcon: true,
    showTrailingIcon: true,
    suffix: "Suffix",
    invalid: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div style={{ width: 343 }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSuffix: Story = {
  args: {
    variant: "suffix",
    showTrailingIcon: false,
    suffix: "Suffix",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "Input",
    "aria-label": "Input",
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
  play: createTextboxDisabledPlay("Input"),
};

export const Error: Story = {
  args: {
    invalid: true,
    defaultValue: "Input",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 48, width: 343 }}>
      {variants.map((variant) => (
        <div key={variant}>
          <StorySectionTitle>{variant}</StorySectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <div>
              <StoryCaption>enabled</StoryCaption>
              <Input
                variant={variant}
                showLeadingIcon
                showTrailingIcon={variant === "default"}
                suffix="Suffix"
                placeholder="Input"
              />
            </div>
            <div>
              <StoryCaption>disabled</StoryCaption>
              <Input
                variant={variant}
                showLeadingIcon
                showTrailingIcon={variant === "default"}
                suffix="Suffix"
                defaultValue="Input"
                disabled
              />
            </div>
            <div>
              <StoryCaption>error</StoryCaption>
              <Input
                variant={variant}
                showLeadingIcon
                showTrailingIcon={variant === "default"}
                suffix="Suffix"
                defaultValue="Input"
                invalid
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const KeyboardFocus: Story = {
  ...testStoryParams(),
  args: textboxTestArgs,
  play: createTextboxKeyboardFocusPlay("Input"),
};

export const FocusVisible: Story = {
  ...testStoryParams(),
  args: textboxTestArgs,
  play: createTextboxFocusVisiblePlay("Input"),
};

export const MouseClick: Story = {
  ...testStoryParams(),
  args: textboxTestArgs,
  play: createTextboxMouseClickPlay("Input"),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: textboxTestArgs,
  play: createTextboxA11yPlay("Input"),
};
