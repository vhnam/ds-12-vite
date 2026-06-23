import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { InputField } from "@ds-12/ui/fields/input-field";
import {
  createTextboxA11yPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
} from "../../lib/component-tests.ts";
import { InputFieldStatesShowcase, SIZES, VARIANTS } from "./input-field-story-fixtures.tsx";

const meta = {
  title: "Fields/InputField",
  component: InputField,
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
    showLeadingIcon: false,
    showTrailingIcon: false,
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

export const Default: Story = {
  play: async (context) => {
    await createTextboxA11yPlay("Label")(context);
    await createTextboxKeyboardFocusPlay("Label")(context);
    await createTextboxFocusVisiblePlay("Label")(context);
    await createTextboxMouseClickPlay("Label")(context);
  },
};

export const DefaultStates: Story = {
  render: () => <InputFieldStatesShowcase variant="default" />,
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

export const SuffixStates: Story = {
  render: () => <InputFieldStatesShowcase variant="suffix" />,
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
