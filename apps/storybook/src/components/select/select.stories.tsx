import type { Meta, StoryObj } from "@storybook/react-vite";
import { Select } from "@ds-12/ui/select";
import {
  comboboxTestArgs,
  createComboboxA11yPlay,
  createComboboxDisabledPlay,
  createComboboxInvalidA11yPlay,
  runComboboxInteractionTests,
} from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import {
  booleanArgType,
  hiddenArgType,
  selectArgType,
  textArgType,
} from "../../lib/story-arg-types.ts";
import { DEFAULT_SELECT_OPTIONS, SelectStatesShowcase, SIZES } from "./select-story-fixtures.tsx";

/** Single-select dropdown with size variants, optional leading icon, and error and disabled states. */
const meta = {
  title: "Components/Select",
  component: Select,
  tags: ["autodocs"],
  argTypes: {
    size: selectArgType(SIZES, "Visual size of the select control."),
    invalid: booleanArgType("Marks the control as invalid and sets aria-invalid."),
    disabled: booleanArgType("Prevents interaction with the control."),
    showLeadingIcon: booleanArgType("Renders a leading icon inside the trigger."),
    placeholder: textArgType("Placeholder text shown when no value is selected."),
    "aria-label": textArgType("Accessible name when no visible label is provided."),
    options: hiddenArgType,
    leadingIcon: hiddenArgType,
    defaultOpen: hiddenArgType,
    open: hiddenArgType,
    onOpenChange: hiddenArgType,
    onValueChange: hiddenArgType,
    value: hiddenArgType,
    defaultValue: hiddenArgType,
    name: hiddenArgType,
    required: hiddenArgType,
    id: hiddenArgType,
    className: hiddenArgType,
    "aria-describedby": hiddenArgType,
  },
  args: {
    ...comboboxTestArgs,
    size: "sm",
    options: DEFAULT_SELECT_OPTIONS,
    showLeadingIcon: false,
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
} satisfies Meta<typeof Select>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use SelectField when a labelled select is needed in a form — Select is the bare control without label or helper text. */
export const Default: Story = {
  play: (context) => runComboboxInteractionTests(context, "Select"),
};

/** Add a leading icon to help users identify the expected selection type at a glance. */
export const WithLeadingIcon: Story = {
  args: {
    showLeadingIcon: true,
  },
  play: createComboboxA11yPlay("Select"),
};

/** Use the disabled state when the control depends on a prerequisite selection. */
export const Disabled: Story = {
  args: {
    disabled: true,
    defaultValue: "option-1",
  },
  play: createComboboxDisabledPlay("Select"),
};

/** Use the invalid state to reflect a validation failure — pair with SelectField helper text so keyboard and screen reader users know what went wrong. */
export const Invalid: Story = {
  args: {
    invalid: true,
  },
  play: createComboboxInvalidA11yPlay("Select"),
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SelectStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SelectStatesShowcase size="lg" />,
};
