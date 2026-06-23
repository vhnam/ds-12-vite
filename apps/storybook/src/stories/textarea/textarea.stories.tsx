import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Textarea } from "@ds-12/ui/textarea";
import {
  createTextboxA11yPlay,
  createTextboxFocusVisiblePlay,
  createTextboxKeyboardFocusPlay,
  createTextboxMouseClickPlay,
} from "../../lib/component-tests.ts";
import { SIZES, TextareaStatesShowcase, VARIANTS } from "./textarea-story-fixtures.tsx";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
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
    suffix: { control: "text" },
    leadingIcon: { control: false },
  },
  args: {
    size: "sm",
    variant: "default",
    placeholder: "Input",
    "aria-label": "Input",
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
} satisfies Meta<typeof Textarea>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async (context) => {
    await createTextboxA11yPlay("Input")(context);
    await createTextboxKeyboardFocusPlay("Input")(context);
    await createTextboxFocusVisiblePlay("Input")(context);
    await createTextboxMouseClickPlay("Input")(context);
  },
};

export const DefaultStates: Story = {
  render: () => <TextareaStatesShowcase variant="default" />,
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

export const SuffixStates: Story = {
  render: () => <TextareaStatesShowcase variant="suffix" />,
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
