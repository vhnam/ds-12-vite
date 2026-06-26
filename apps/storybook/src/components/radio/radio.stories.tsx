import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Radio, RadioGroup } from "@ds-12/ui/radio";
import { createRadioDisabledPlay, runRadioInteractionTests } from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { booleanArgType, selectArgType } from "../../lib/story-arg-types.ts";
import { RADIO_SIZES, RadioStatesMatrix } from "./radio-story-fixtures.tsx";

/** Circular selection control for choosing one option from a mutually exclusive set. */
const meta = {
  title: "Components/Radio",
  component: Radio,
  tags: ["autodocs"],
  argTypes: {
    size: selectArgType(RADIO_SIZES, "Visual size of the radio control."),
    invalid: booleanArgType("Marks the control as invalid and sets aria-invalid."),
    disabled: booleanArgType("Prevents interaction."),
    value: { control: false },
  },
  args: {
    size: "lg",
    invalid: false,
    disabled: false,
    value: "option-a",
    "aria-label": "Option A",
  },
  decorators: [
    (Story, context) => (
      <RadioGroup defaultValue="option-a">
        <Story {...context} />
      </RadioGroup>
    ),
  ],
} satisfies Meta<typeof Radio>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use within a `RadioGroup` when users must pick exactly one option — for example, a delivery method selector. */
export const Default: Story = {
  play: (context) => runRadioInteractionTests(context, /option a/i, true),
};

/** Use the small size in compact desktop layouts such as settings sidebars or comparison tables. */
export const Small: Story = {
  args: {
    size: "sm",
  },
  play: (context) => runRadioInteractionTests(context, /option a/i, true),
};

/** Use the invalid state when no option has been selected in a required radio group. */
export const Invalid: Story = {
  args: {
    invalid: true,
    value: "option-b",
    "aria-label": "Option B",
  },
  decorators: [
    (Story) => (
      <RadioGroup>
        <Story />
      </RadioGroup>
    ),
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name: /option b/i });

    await expect(radio).toHaveAttribute("aria-invalid", "true");
  },
};

/** Use the disabled state when an option is unavailable for the current selection context. */
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: createRadioDisabledPlay(/option a/i),
};

/** Showcase of radio sizes and states — for human reference only. */
export const States: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <RadioStatesMatrix />,
};
