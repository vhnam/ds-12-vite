import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SwitchField } from "@ds-12/ui/fields/switch-field";
import {
  createSwitchA11yPlay,
  createSwitchDisabledPlay,
  createSwitchInvalidA11yPlay,
  createSwitchKeyboardFocusPlay,
  createSwitchTogglePlay,
  createSwitchWithInputA11yPlay,
} from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { booleanArgType, selectArgType, textArgType } from "../../lib/story-arg-types.ts";
import {
  createSelectionFieldDecorator,
  SwitchFieldStatesShowcase,
  SIZES,
} from "../selection-field/selection-field-story-fixtures.tsx";

/** Labelled switch field with optional supporting text, suffix, and embedded input. */
const meta = {
  title: "Fields/SwitchField",
  component: SwitchField,
  argTypes: {
    size: selectArgType(
      SIZES,
      "Visual size token for field typography (switch has no size variant).",
    ),
    invalid: booleanArgType("Marks the field as invalid."),
    disabled: booleanArgType("Prevents interaction."),
    showLabel: booleanArgType("Whether to render the visible label element."),
    showSupportingText: booleanArgType("Whether to render supporting text below the label."),
    showSuffix: booleanArgType("Whether to render the suffix element."),
    showHelperText: booleanArgType("Whether to render helper text when invalid."),
    showInput: booleanArgType("Whether to render an input below the selection row."),
    label: textArgType("Visible label text associated with the switch."),
    supportingText: textArgType("Secondary descriptive text below the label."),
    suffix: textArgType("Right-aligned supplementary text on the label row."),
    helperText: textArgType("Error message displayed when invalid."),
  },
  args: {
    size: "sm",
    label: "Selection label",
    supportingText: "Supporting text",
    suffix: "Suffix",
    helperText: "Helper Text",
    showLabel: true,
    showSupportingText: false,
    showSuffix: false,
    showHelperText: true,
    showInput: false,
    invalid: false,
    disabled: false,
  },
  decorators: [createSelectionFieldDecorator()],
} satisfies Meta<typeof SwitchField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use SwitchField for labelled toggle settings that may include supporting text or a conditional input. */
export const Default: Story = {
  play: async (context) => {
    await createSwitchA11yPlay(/selection label/i)(context);
    await createSwitchKeyboardFocusPlay(/selection label/i)(context);
    await createSwitchTogglePlay(/selection label/i)(context);
  },
};

/** Use supporting text to add secondary context below the label without cluttering the primary label. */
export const WithSupportingText: Story = {
  args: {
    showSupportingText: true,
  },
  play: createSwitchA11yPlay(/selection label/i),
};

/** Use a suffix for right-aligned supplementary text on the label row, such as a unit or status. */
export const WithSuffix: Story = {
  args: {
    showSuffix: true,
  },
  play: async (context) => {
    await createSwitchA11yPlay(/selection label/i)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText("Suffix")).toBeInTheDocument();
  },
};

/** Use the input layout when enabling the switch reveals a related text field. */
export const WithInput: Story = {
  args: {
    showInput: true,
  },
  play: createSwitchWithInputA11yPlay(/selection label/i),
};

/** Use the disabled state when the setting is unavailable in the current context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createSwitchDisabledPlay(/selection label/i),
};

/** Use the invalid state after validation fails — update helper text to describe the specific error. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: createSwitchInvalidA11yPlay(/selection label/i),
};

/** Showcase of default layout states — for human reference only. */
export const DefaultStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SwitchFieldStatesShowcase layout="default" />,
};

/** Showcase of supporting-text layout states — for human reference only. */
export const SupportingTextStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SwitchFieldStatesShowcase layout="supporting-text" />,
};

/** Showcase of input layout states — for human reference only. */
export const InputStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SwitchFieldStatesShowcase layout="input" />,
};
