import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { SelectField } from "@ds-12/ui/fields/select-field";
import {
  createComboboxDisabledPlay,
  createComboboxInvalidA11yPlay,
  runComboboxA11yAndFocusTests,
} from "../../lib/component-tests.ts";
import { contrastDebtParameters, showcaseParameters } from "../../lib/story-test-config.ts";
import {
  booleanArgType,
  hiddenArgType,
  selectArgType,
  textArgType,
} from "../../lib/story-arg-types.ts";
import {
  DEFAULT_SELECT_OPTIONS,
  SelectFieldStatesShowcase,
  SIZES,
} from "./select-field-story-fixtures.tsx";

/** Labelled select field composed of a label, helper text, and a Select control with shared validation styling. */
const meta = {
  title: "Fields/SelectField",
  component: SelectField,
  argTypes: {
    size: selectArgType(SIZES, "Visual size of the select control."),
    invalid: booleanArgType("Marks the field as invalid and sets aria-invalid."),
    disabled: booleanArgType("Prevents all interaction with the control."),
    showLabel: booleanArgType("Whether to render the visible label element."),
    showHelperText: booleanArgType("Whether to render helper or error text below the select."),
    showLeadingIcon: booleanArgType("Renders a leading icon inside the trigger."),
    label: textArgType("Visible label text associated with the select."),
    helperText: textArgType("Helper or error text displayed below the select."),
    placeholder: textArgType("Placeholder text shown when no value is selected."),
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
    fieldClassName: hiddenArgType,
    className: hiddenArgType,
    "aria-describedby": hiddenArgType,
  },
  args: {
    size: "sm",
    label: "Label",
    helperText: "Helper text",
    placeholder: "Option",
    options: DEFAULT_SELECT_OPTIONS,
    showLabel: true,
    showHelperText: true,
    showLeadingIcon: true,
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
} satisfies Meta<typeof SelectField>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use SelectField when a labelled single-select dropdown is needed in a form. */
export const Default: Story = {
  play: (context) => runComboboxA11yAndFocusTests(context, "Label"),
};

/** Use the disabled state when the field depends on a prerequisite selection. */
export const Disabled: Story = {
  tags: ["a11y-debt"],
  parameters: contrastDebtParameters,
  args: {
    disabled: true,
    defaultValue: "option-1",
  },
  play: createComboboxDisabledPlay("Label"),
};

/** Use the invalid state after failed validation and update helper text to describe the error. */
export const Invalid: Story = {
  tags: ["a11y-debt"],
  parameters: contrastDebtParameters,
  args: {
    invalid: true,
    helperText: "This field is required",
  },
  play: async (context) => {
    await createComboboxInvalidA11yPlay("Label")(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByText("This field is required")).toBeInTheDocument();
  },
};

/** Showcase of all interactive states for the small size — for human reference only. */
export const SmallStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SelectFieldStatesShowcase size="sm" />,
};

/** Showcase of all interactive states for the large size — for human reference only. */
export const LargeStates: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SelectFieldStatesShowcase size="lg" />,
};
