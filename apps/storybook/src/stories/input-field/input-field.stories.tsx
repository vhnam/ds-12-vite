import type { Meta, StoryObj } from "@storybook/react-vite";
import { InputField } from "@ds-12/ui/fields/input-field";
import {
  createTextboxA11yPlay,
  createTextboxDisabledPlay,
  createTextboxInvalidA11yPlay,
  runTextboxInteractionTests,
} from "../../lib/component-tests.ts";
import { showcaseParameters, contrastDebtParameters } from "../../lib/story-test-config.ts";
import {
  booleanArgType,
  hiddenArgType,
  selectArgType,
  textArgType,
} from "../../lib/story-arg-types.ts";
import { InputFieldStatesShowcase, SIZES, VARIANTS } from "./input-field-story-fixtures.tsx";

/** Labelled input field composed of a label, helper text, and an Input control with shared validation styling. */
const meta = {
  title: "Fields/InputField",
  component: InputField,
  argTypes: {
    size: selectArgType(SIZES, "Visual size of the input control."),
    variant: selectArgType(
      VARIANTS,
      "Layout variant — default for standard fields, suffix for inline unit hints.",
    ),
    invalid: booleanArgType("Marks the field as invalid and sets aria-invalid."),
    disabled: booleanArgType("Prevents all interaction via the native disabled attribute."),
    showLabel: booleanArgType("Whether to render the visible label element."),
    showHelperText: booleanArgType("Whether to render helper or error text below the input."),
    showLeadingIcon: booleanArgType("Renders a leading icon inside the input."),
    showTrailingIcon: booleanArgType("Renders a trailing icon inside the input."),
    suffix: textArgType("Inline suffix text (requires variant suffix)."),
    label: textArgType("Visible label text associated with the input."),
    helperText: textArgType("Helper or error text displayed below the input."),
    leadingIcon: hiddenArgType,
    trailingIcon: hiddenArgType,
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

/** Use InputField (not a bare Input) whenever the field needs a visible label and helper text — the wrapper ensures they are correctly associated for accessibility. */
export const Default: Story = {
  play: (context) => runTextboxInteractionTests(context, "Label"),
};

/** Use the suffix variant when a unit or format hint should appear inline after the value, such as "kg" or "%". */
export const Suffix: Story = {
  tags: ["a11y-debt"],
  parameters: contrastDebtParameters,
  args: {
    variant: "suffix",
  },
  play: createTextboxA11yPlay("Label"),
};

/** Add a leading icon to help users identify the expected input type at a glance, such as a search icon for query fields. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createTextboxA11yPlay("Label"),
};

/** Use the disabled state when the field is not yet available due to a prerequisite step — pair with helper text explaining when it will become active. */
export const Disabled: Story = {
  tags: ["a11y-debt"],
  parameters: contrastDebtParameters,
  args: {
    disabled: true,
  },
  play: createTextboxDisabledPlay("Label"),
};

/** Use the invalid state after failed validation — always update the helper text to describe the specific error so the user knows how to fix it. */
export const Invalid: Story = {
  tags: ["a11y-debt"],
  parameters: contrastDebtParameters,
  args: {
    invalid: true,
    helperText: "This field is required",
  },
  play: createTextboxInvalidA11yPlay("Label"),
};

/** Showcase of all interactive states for the default variant — for human reference only. */
export const DefaultStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <InputFieldStatesShowcase variant="default" />,
};

/** Showcase of all interactive states for the suffix variant — for human reference only. */
export const SuffixStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <InputFieldStatesShowcase variant="suffix" />,
};
