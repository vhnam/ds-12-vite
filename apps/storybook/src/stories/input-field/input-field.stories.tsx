import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "@ds-12/ui/fields/input-field";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
  testStoryParams,
} from "../../lib/component-tests.ts";

const sizes = ["sm", "lg"] as const;
const variants = ["default", "suffix"] as const;

const meta = {
  title: "Fields/InputField",
  component: InputField,
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
    showLabel: { control: "boolean" },
    showHelperText: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    suffix: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    size: "sm",
    variant: "default",
    label: "Label",
    helperText: "Helper text",
    placeholder: "Input",
    showLabel: true,
    showHelperText: true,
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
} satisfies Meta<typeof InputField>;

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
  },
  play: createTextboxDisabledPlay("Label"),
};

export const Error: Story = {
  args: {
    invalid: true,
    defaultValue: "Input",
    helperText: "Helper text",
  },
};

export const Large: Story = {
  args: {
    size: "lg",
  },
};

export const WithoutLabel: Story = {
  args: {
    showLabel: false,
    "aria-label": "Label",
  },
};

export const WithoutHelperText: Story = {
  args: {
    showHelperText: false,
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
              <InputField
                variant={variant}
                showLeadingIcon
                showTrailingIcon={variant === "default"}
                suffix="Suffix"
                placeholder="Input"
              />
            </div>
            <div>
              <StoryCaption>disabled</StoryCaption>
              <InputField
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
              <InputField
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
  play: createTextboxKeyboardFocusPlay("Label"),
};

export const FocusVisible: Story = {
  ...testStoryParams(),
  play: createTextboxFocusVisiblePlay("Label"),
};

export const MouseClick: Story = {
  ...testStoryParams(),
  play: createTextboxMouseClickPlay("Label"),
};

export const A11y: Story = {
  ...testStoryParams(),
  play: createTextboxA11yPlay("Label"),
};
