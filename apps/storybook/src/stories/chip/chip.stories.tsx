import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { expect, userEvent, within } from "storybook/test";
import { Chip } from "@ds-12/ui/chip";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import {
  createButtonA11yPlay,
  createButtonDisabledPlay,
  createButtonFocusVisiblePlay,
  createButtonKeyboardFocusPlay,
  createButtonMouseClickPlay,
  testStoryParams,
} from "../../lib/component-tests.ts";

const meta = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  argTypes: {
    active: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
    leadingIcon: { control: false },
    trailingIcon: { control: false },
  },
  args: {
    children: "Label",
    active: false,
    showLeadingIcon: true,
    showTrailingIcon: true,
  },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Inactive: Story = {
  args: { active: false },
};

export const Active: Story = {
  args: { active: true },
};

export const LabelOnly: Story = {
  args: {
    showLeadingIcon: false,
    showTrailingIcon: false,
  },
};

export const LeadingIconOnly: Story = {
  args: {
    showLeadingIcon: true,
    showTrailingIcon: false,
  },
};

export const TrailingIconOnly: Story = {
  args: {
    showLeadingIcon: false,
    showTrailingIcon: true,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  play: createButtonDisabledPlay("Label"),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {(
        [
          { active: false, title: "Inactive" },
          { active: true, title: "Active" },
        ] as const
      ).map(({ active, title }) => (
        <div key={title}>
          <StorySectionTitle>{title}</StorySectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <StoryCaption>Leading + label + trailing</StoryCaption>
              <Chip active={active} showLeadingIcon showTrailingIcon>
                Label
              </Chip>
            </div>
            <div>
              <StoryCaption>Label only</StoryCaption>
              <Chip active={active}>Label</Chip>
            </div>
            <div>
              <StoryCaption>Leading + label</StoryCaption>
              <Chip active={active} showLeadingIcon>
                Label
              </Chip>
            </div>
            <div>
              <StoryCaption>Label + trailing</StoryCaption>
              <Chip active={active} showTrailingIcon>
                Label
              </Chip>
            </div>
          </div>
        </div>
      ))}
    </div>
  ),
};

export const KeyboardFocus: Story = {
  ...testStoryParams(),
  args: { children: "Label" },
  play: createButtonKeyboardFocusPlay("Label"),
};

export const FocusVisible: Story = {
  ...testStoryParams(),
  args: { children: "Label" },
  play: createButtonFocusVisiblePlay("Label"),
};

export const MouseClick: Story = {
  ...testStoryParams(),
  args: { children: "Label" },
  play: createButtonMouseClickPlay("Label"),
};

export const Toggle: Story = {
  ...testStoryParams(),
  render: function ToggleStory() {
    const [active, setActive] = useState(false);
    return (
      <Chip active={active} onClick={() => setActive((value) => !value)}>
        Label
      </Chip>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button", { name: "Label" });
    expect(chip).toHaveAttribute("aria-pressed", "false");
    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "true");
    await userEvent.click(chip);
    expect(chip).toHaveAttribute("aria-pressed", "false");
  },
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { children: "Label" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole("button", { name: "Label" });
    expect(chip).toBeInTheDocument();
    expect(chip).toHaveAccessibleName("Label");
    expect(chip).toHaveAttribute("aria-pressed", "false");
  },
};
