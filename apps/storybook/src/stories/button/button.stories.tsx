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

/** Primary action control with visual variants, sizes, loading state, and optional leading or trailing icons. */
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

/** Use the primary variant for the single most important action on a page or in a section — there should only be one primary button per context. */
export const Default: Story = {
  play: async (context) => {
    await createButtonA11yPlay("Button")(context);
    await createButtonKeyboardFocusPlay("Button")(context);
    await createButtonFocusVisiblePlay("Button")(context);
    await createButtonMouseClickPlay("Button")(context);
  },
};

/** Use a leading icon to reinforce the action (e.g. a download arrow before "Export") and a trailing icon to indicate navigation or progression (e.g. a chevron after "Continue"). */
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

/** Use the loading state to block repeated submission and communicate that an async operation (e.g. a form save) is in progress. */
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

/** Use icon-only buttons in compact spaces such as toolbars or table row actions where a label would take too much space — always pair with a tooltip so the intent is clear to screen reader users. */
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

/** Showcase of all visual variants — for human reference only. */
export const Variants: Story = {
  tags: ["!manifest"],
  render: () => <VariantsTable />,
};

/** Showcase of all variant and size combinations — for human reference only. */
export const Sizes: Story = {
  tags: ["!manifest"],
  render: () => <VariantSizeMatrixTable />,
};
