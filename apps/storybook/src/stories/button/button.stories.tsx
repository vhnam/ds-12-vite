import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Button } from "@ds-12/ui/button";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import {
  createButtonA11yPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
} from "../../lib/component-tests.ts";
import {
  IconButtonMatrixTable,
  IconOnlyMatrixTable,
  SIZES,
  VARIANTS,
  VariantSizeMatrixTable,
  VariantsTable,
  leadingIconButtons,
  trailingIconButtons,
} from "./button-story-fixtures.tsx";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
    },
    size: {
      control: "select",
      options: SIZES,
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

export const Default: Story = {
  play: async (context) => {
    await createButtonA11yPlay("Button")(context);
    await createButtonKeyboardFocusPlay("Button")(context);
    await createButtonFocusVisiblePlay("Button")(context);
    await createButtonMouseClickPlay("Button")(context);
  },
};

export const Variants: Story = {
  render: () => <VariantsTable />,
};

export const Sizes: Story = {
  render: () => <VariantSizeMatrixTable />,
};

export const ButtonWithIcon: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <StoryCaption>Leading Icon</StoryCaption>
        <div style={{ marginTop: 12 }}>
          <IconButtonMatrixTable buttons={leadingIconButtons} iconPosition="left" />
        </div>
      </div>

      <div>
        <StoryCaption>Trailing Icon</StoryCaption>
        <div style={{ marginTop: 12 }}>
          <IconButtonMatrixTable buttons={trailingIconButtons} iconPosition="right" />
        </div>
      </div>
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const leadingButtons = canvas.getAllByRole("button", { name: "Download" });
    const trailingButtons = canvas.getAllByRole("button", { name: "Continue" });

    await expect(leadingButtons).toHaveLength(3);
    await expect(trailingButtons).toHaveLength(3);
    await expect(leadingButtons[0]).toHaveAccessibleName("Download");
    await expect(trailingButtons[0]).toHaveAccessibleName("Continue");
  },
};

export const LoadingState: Story = {
  render: () => <VariantSizeMatrixTable loading />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getAllByRole("button", { name: /loading/i })[0];

    await expect(button).toHaveAccessibleName("Loading");
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
  },
};

export const IconOnly: Story = {
  render: () => <IconOnlyMatrixTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole("button", { name: /add/i });
    const disabledButton = buttons.find(
      (button) => button.getAttribute("aria-disabled") === "true",
    );

    await expect(buttons[0]).toHaveAccessibleName("Add");
    await expect(disabledButton).toBeDefined();
    await expect(disabledButton).not.toHaveAttribute("disabled");

    if (!disabledButton) {
      throw new Error("Expected a disabled icon button");
    }

    disabledButton.focus();
    await expect(disabledButton).toHaveFocus();
  },
};
