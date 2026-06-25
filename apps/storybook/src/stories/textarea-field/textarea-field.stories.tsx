import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { TextareaField } from "@ds-12/ui/fields/textarea-field";
import {
  createTextboxA11yPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
} from "../../lib/component-tests.ts";
import { SIZES, TextareaFieldStatesShowcase, VARIANTS } from "./textarea-field-story-fixtures.tsx";

/** Labelled textarea field composed of a label, helper text, and a Textarea control with shared validation styling. */
const meta = {
  title: "Fields/TextareaField",
  component: TextareaField,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: SIZES,
    },
    variant: {
      control: "select",
      options: VARIANTS,
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
    showLeadingIcon: false,
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

/** Use TextareaField (not a bare Textarea) whenever the field needs a visible label and helper text — the wrapper ensures they are correctly associated for accessibility. */
export const Default: Story = {
  play: async (context) => {
    await createTextboxA11yPlay("Label")(context);
    await createTextboxKeyboardFocusPlay("Label")(context);
    await createTextboxFocusVisiblePlay("Label")(context);
    await createTextboxMouseClickPlay("Label")(context);
  },
};

/** Use the disabled state when the textarea is not yet editable due to a prerequisite step — pair with helper text explaining when it will become active. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "Label" })).toBeDisabled();
  },
};

/** Use the invalid state after failed validation — always update the helper text to describe the specific error so the user knows how to fix it. */
export const Invalid: Story = {
  args: {
    invalid: true,
    helperText: "This field is required",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "Label" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  },
};

/** Showcase of all interactive states for the default variant — for human reference only. */
export const DefaultStates: Story = {
  tags: ["!manifest"],
  render: () => <TextareaFieldStatesShowcase variant="default" />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox", { name: "Label" });

    await expect(inputs).toHaveLength(4);
    await expect(inputs[0]).toHaveAccessibleName("Label");
    await expect(inputs[2]).toBeDisabled();
    await expect(inputs[3]).toHaveAttribute("aria-invalid", "true");
  },
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ["!manifest"],
  render: () => <TextareaFieldStatesShowcase variant="suffix" />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox", { name: "Label" });

    await expect(inputs).toHaveLength(4);
    await expect(inputs[0]).toHaveAccessibleName("Label");
    await expect(inputs[2]).toBeDisabled();
    await expect(inputs[3]).toHaveAttribute("aria-invalid", "true");
  },
};
