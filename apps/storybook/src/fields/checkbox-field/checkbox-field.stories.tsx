import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { CheckboxField } from "@ds-12/ui/fields/checkbox-field";
import {
  createCheckboxA11yPlay,
  createCheckboxDisabledPlay,
  createCheckboxInvalidA11yPlay,
  createCheckboxKeyboardFocusPlay,
  createCheckboxTogglePlay,
  createCheckboxWithInputA11yPlay,
} from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { booleanArgType, selectArgType, textArgType } from "../../lib/story-arg-types.ts";
import {
  CheckboxFieldStatesShowcase,
  createSelectionFieldDecorator,
  SIZES,
} from "../selection-field/selection-field-story-fixtures.tsx";

/** Labelled checkbox field with optional supporting text, suffix, and embedded input. */
const meta = {
  title: "Fields/CheckboxField",
  component: CheckboxField,
  argTypes: {
    size: selectArgType(SIZES, "Visual size of the checkbox control."),
    invalid: booleanArgType("Marks the field as invalid."),
    disabled: booleanArgType("Prevents interaction."),
    showLabel: booleanArgType("Whether to render the visible label element."),
    showSupportingText: booleanArgType("Whether to render supporting text below the label."),
    showSuffix: booleanArgType("Whether to render the suffix element."),
    showHelperText: booleanArgType("Whether to render helper text when invalid."),
    showInput: booleanArgType("Whether to render an input below the selection row."),
    label: textArgType("Visible label text associated with the checkbox."),
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
} satisfies Meta<typeof CheckboxField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use CheckboxField when a labelled checkbox needs supporting text, a suffix, or a conditional input. */
export const Default: Story = {
  play: async (context) => {
    await createCheckboxA11yPlay(/selection label/i)(context);
    await createCheckboxKeyboardFocusPlay(/selection label/i)(context);
    await createCheckboxTogglePlay(/selection label/i)(context);
  },
};

/** Use supporting text to add secondary context below the label without cluttering the primary label. */
export const WithSupportingText: Story = {
  args: {
    showSupportingText: true,
  },
  play: createCheckboxA11yPlay(/selection label/i),
};

/** Use a suffix for right-aligned supplementary text on the label row, such as a unit or status. */
export const WithSuffix: Story = {
  args: {
    showSuffix: true,
  },
  play: async (context) => {
    await createCheckboxA11yPlay(/selection label/i)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText("Suffix")).toBeInTheDocument();
  },
};

/** Use the input layout when selecting this option reveals a related text field, such as "Other". */
export const WithInput: Story = {
  args: {
    showInput: true,
  },
  play: createCheckboxWithInputA11yPlay(/selection label/i),
};

/** Use the disabled state when the option is unavailable in the current form context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createCheckboxDisabledPlay(/selection label/i),
};

/** Use the invalid state after validation fails — update helper text to describe the specific error. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: createCheckboxInvalidA11yPlay(/selection label/i),
};

/** Showcase of default layout states — for human reference only. */
export const DefaultStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <CheckboxFieldStatesShowcase layout="default" />,
};

/** Showcase of supporting-text layout states — for human reference only. */
export const SupportingTextStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <CheckboxFieldStatesShowcase layout="supporting-text" />,
};

/** Showcase of input layout states — for human reference only. */
export const InputStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <CheckboxFieldStatesShowcase layout="input" />,
};
