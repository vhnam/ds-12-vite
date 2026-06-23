import type { Meta, StoryObj } from "@storybook/react-vite";
import { TextareaField } from "@ds-12/ui/fields/textarea-field";
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
  title: "Fields/TextareaField",
  component: TextareaField,
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
    suffix: { control: "text" },
    label: { control: "text" },
    helperText: { control: "text" },
    leadingIcon: { control: false },
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
    suffix: "0/100",
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
} satisfies Meta<typeof TextareaField>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithSuffix: Story = {
  args: {
    variant: "suffix",
    suffix: "0/100",
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
              <TextareaField variant={variant} showLeadingIcon suffix="0/100" placeholder="Input" />
            </div>
            <div>
              <StoryCaption>disabled</StoryCaption>
              <TextareaField
                variant={variant}
                showLeadingIcon
                suffix="0/100"
                defaultValue="Input"
                disabled
              />
            </div>
            <div>
              <StoryCaption>error</StoryCaption>
              <TextareaField
                variant={variant}
                showLeadingIcon
                suffix="0/100"
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
