import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Input } from "@ds-12/ui/input";
import {
  createTextboxA11yPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
} from "../../lib/component-tests.ts";
import { InputStatesShowcase, SIZES, VARIANTS } from "./input-story-fixtures.tsx";

/** Single-line text field with size and suffix variants, optional leading and trailing icons, and error and disabled states. */
const meta = {
  title: "Components/Input",
  component: Input,
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
    "aria-label": "Input",
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
} satisfies Meta<typeof Input>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use a bare Input (without InputField) only in custom form layouts where you manage label association yourself — otherwise prefer InputField for built-in label and helper text wiring. */
export const Default: Story = {
  play: async (context) => {
    await createTextboxA11yPlay("Input")(context);
    await createTextboxKeyboardFocusPlay("Input")(context);
    await createTextboxFocusVisiblePlay("Input")(context);
    await createTextboxMouseClickPlay("Input")(context);
  },
};

/** Use the disabled state when the field is temporarily unavailable — the browser prevents all interaction, so no additional guarding is needed in the form submit handler. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "Input" })).toBeDisabled();
  },
};

/** Use the invalid state to reflect a validation failure — always surface a visible error message nearby so keyboard and screen reader users know what went wrong. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("textbox", { name: "Input" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  },
};

/** Showcase of all interactive states for the default variant — for human reference only. */
export const DefaultStates: Story = {
  tags: ["!manifest"],
  render: () => <InputStatesShowcase variant="default" />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox", { name: "Input" });

    await expect(inputs).toHaveLength(4);
    await expect(inputs[0]).toHaveAccessibleName("Input");
    await expect(inputs[2]).toBeDisabled();
    await expect(inputs[3]).toHaveAttribute("aria-invalid", "true");
  },
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ["!manifest"],
  render: () => <InputStatesShowcase variant="suffix" />,
  decorators: [(Story) => <Story />],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const inputs = canvas.getAllByRole("textbox", { name: "Input" });

    await expect(inputs).toHaveLength(4);
    await expect(inputs[0]).toHaveAccessibleName("Input");
    await expect(inputs[2]).toBeDisabled();
    await expect(inputs[3]).toHaveAttribute("aria-invalid", "true");
  },
};
