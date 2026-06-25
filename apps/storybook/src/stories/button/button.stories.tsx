import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Button } from "@ds-12/ui/button";
import { Icon } from "@ds-12/ui/icon";
import {
  createButtonA11yPlay,
  createButtonDisabledPlay,
  createButtonLoadingA11yPlay,
  runButtonInteractionTests,
} from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { booleanArgType, hiddenArgType, selectArgType } from "../../lib/story-arg-types.ts";
import {
  SIZES,
  VARIANTS,
  VariantSizeMatrixTable,
  VariantsTable,
} from "./button-story-fixtures.tsx";

/** Primary action control with visual variants, sizes, loading state, and optional leading or trailing icons. */
const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: selectArgType(
      VARIANTS,
      "Visual style — primary for the main CTA, secondary for supporting actions, danger for destructive actions, icon for icon-only buttons.",
    ),
    size: selectArgType(SIZES, "Control dimensions and typography scale."),
    iconPosition: selectArgType(
      ["left", "right"],
      "Position of the icon relative to the label text.",
    ),
    loading: booleanArgType("Shows a loading spinner, sets aria-busy, and disables interaction."),
    disabled: booleanArgType("Prevents interaction. Disabled buttons remain keyboard-focusable."),
    icon: hiddenArgType,
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
  play: (context) => runButtonInteractionTests(context, "Button"),
};

/** Use a leading icon to reinforce the action (e.g. a download arrow before "Export"). */
export const WithLeadingIcon: Story = {
  args: {
    children: "Download",
    icon: <Icon name="download" variant="outlined" />,
    iconPosition: "left",
  },
  play: createButtonA11yPlay("Download"),
};

/** Use a trailing icon to indicate navigation or progression (e.g. a chevron after "Continue"). */
export const WithTrailingIcon: Story = {
  args: {
    children: "Continue",
    icon: <Icon name="arrow_forward" variant="outlined" />,
    iconPosition: "right",
  },
  play: createButtonA11yPlay("Continue"),
};

/** Use the loading state to block repeated submission and communicate that an async operation is in progress. */
export const Loading: Story = {
  args: {
    loading: true,
    children: "Loading",
  },
  play: createButtonLoadingA11yPlay("Loading"),
};

/** Disabled buttons remain keyboard-focusable so screen reader users can discover why the action is unavailable. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createButtonDisabledPlay("Button"),
};

/** Use icon-only buttons in compact spaces such as toolbars — always provide an accessible name via `aria-label`. */
export const IconOnly: Story = {
  args: {
    variant: "icon",
    "aria-label": "Add",
    children: <Icon name="add" variant="outlined" />,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: /add/i });

    await expect(button).toHaveAccessibleName("Add");
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  },
};

/** Showcase of all visual variants — for human reference only. */
export const Variants: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <VariantsTable />,
};

/** Showcase of all variant and size combinations — for human reference only. */
export const Sizes: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <VariantSizeMatrixTable />,
};
