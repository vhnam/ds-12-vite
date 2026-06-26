import { expect, userEvent, within } from "storybook/test";
import type { StoryObj } from "@storybook/react-vite";

type PlayFunction = NonNullable<StoryObj["play"]>;
type PlayContext = Parameters<PlayFunction>[0];

const testStoryParameters = {
  docs: { disable: true },
};

export function testStoryParams() {
  return { parameters: testStoryParameters };
}

export function createButtonA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName(name);
  };
}

export function createButtonKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  };
}

export function createButtonFocusVisiblePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button.matches(":focus-visible")).toBe(true);
  };
}

export function createButtonMouseClickPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await userEvent.click(button);
    await expect(button).not.toHaveAttribute("data-focus-visible", "true");
  };
}

export function createButtonDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await expect(button).toHaveAttribute("aria-disabled", "true");
    await expect(button).not.toHaveAttribute("disabled");
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  };
}

export function createButtonLoadingA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });

    await expect(button).toHaveAccessibleName(name);
    await expect(button).toHaveAttribute("aria-busy", "true");
    await expect(button).toHaveAttribute("aria-disabled", "true");
  };
}

export async function runButtonInteractionTests(
  context: PlayContext,
  name: string | RegExp,
): Promise<void> {
  await createButtonA11yPlay(name)(context);
  await createButtonKeyboardFocusPlay(name)(context);
  await createButtonFocusVisiblePlay(name)(context);
  await createButtonMouseClickPlay(name)(context);
}

export function createChipA11yPlay(name: string | RegExp, active: boolean): PlayFunction {
  return async (context) => {
    await createButtonA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    const chip = canvas.getByRole("button", { name });

    await expect(chip).toHaveAttribute("aria-pressed", active ? "true" : "false");
  };
}

export async function runChipInteractionTests(
  context: PlayContext,
  name: string | RegExp,
  active = false,
): Promise<void> {
  await createChipA11yPlay(name, active)(context);
  await createButtonKeyboardFocusPlay(name)(context);
  await createButtonFocusVisiblePlay(name)(context);
  await createButtonMouseClickPlay(name)(context);
}

export function createTextboxA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAccessibleName(name);
  };
}

export function createTextboxKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(input).toHaveFocus();
  };
}

export function createTextboxFocusVisiblePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await expect(input.matches(":focus-visible")).toBe(true);
  };
}

export function createTextboxMouseClickPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await userEvent.click(input);
    await expect(input).toHaveFocus();
  };
}

export function createTextboxDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await expect(input).toBeDisabled();
    await expect(input).not.toHaveAttribute("aria-disabled", "true");
  };
}

export function createTextboxInvalidA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole("textbox", { name });

    await expect(input).toHaveAccessibleName(name);
    await expect(input).toHaveAttribute("aria-invalid", "true");
  };
}

export async function runTextboxInteractionTests(
  context: PlayContext,
  name: string | RegExp,
): Promise<void> {
  await createTextboxA11yPlay(name)(context);
  await createTextboxKeyboardFocusPlay(name)(context);
  await createTextboxFocusVisiblePlay(name)(context);
  await createTextboxMouseClickPlay(name)(context);
}

export function createSkeletonA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status", { name });

    await expect(status).toBeInTheDocument();
    await expect(status).toHaveAccessibleName(name);
    await expect(status).toHaveAttribute("aria-busy", "true");
  };
}

export function createSeparatorA11yPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("separator")).toBeInTheDocument();
  };
}

export function createBadgeA11yPlay(text: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const badge = canvas.getByText(text);

    await expect(badge).toBeVisible();
    await expect(badge).toHaveTextContent(text);
  };
}

export function createIconA11yPlay(iconName: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText(iconName);

    await expect(icon).toHaveAttribute("aria-hidden", "true");
    await expect(canvas.queryByRole("img")).not.toBeInTheDocument();
  };
}

export function createAvatarInitialsA11yPlay(initials: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const label = canvas.getByText(initials);

    await expect(label).toBeInTheDocument();
    await expect(label).toHaveTextContent(initials);
  };
}

export function createHeadingA11yPlay(level: number, name: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { level, name })).toBeInTheDocument();
  };
}

export function createTextA11yPlay(text: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const node = canvas.getByText(text);

    await expect(node).toBeVisible();
    await expect(node).toHaveTextContent(text);
  };
}

export function createPaginationA11yPlay(activePage: number): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("navigation", { name: "Pagination" })).toBeInTheDocument();
    await expect(canvas.getByRole("button", { name: `Page ${activePage}` })).toHaveAttribute(
      "aria-current",
      "page",
    );
  };
}

export async function runPaginationInteractionTests(
  context: PlayContext,
  activePage: number,
): Promise<void> {
  await createPaginationA11yPlay(activePage)(context);
  await createButtonKeyboardFocusPlay(`Page ${activePage}`)(context);
  await createButtonFocusVisiblePlay(`Page ${activePage}`)(context);
  await createButtonMouseClickPlay(`Page ${activePage}`)(context);
}

export function createCheckboxA11yPlay(name: string | RegExp, checked = false): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name });

    await expect(checkbox).toBeInTheDocument();
    await expect(checkbox).toHaveAccessibleName(name);
    if (checked) {
      await expect(checkbox).toBeChecked();
    } else {
      await expect(checkbox).not.toBeChecked();
    }
  };
}

export function createCheckboxKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await expect(checkbox.matches(":focus-visible")).toBe(true);
  };
}

export function createCheckboxTogglePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name });

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  };
}

export function createCheckboxDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name });

    await expect(checkbox).toHaveAttribute("aria-disabled", "true");
  };
}

export function createCheckboxInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox", { name });

    await expect(checkbox).toHaveAccessibleName(name);
    await expect(checkbox).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createCheckboxWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createCheckboxA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole("textbox")).toBeInTheDocument();
  };
}

export async function runCheckboxInteractionTests(
  context: PlayContext,
  name: string | RegExp,
): Promise<void> {
  await createCheckboxA11yPlay(name, false)(context);
  await createCheckboxKeyboardFocusPlay(name)(context);
  await createCheckboxTogglePlay(name)(context);
}

export function createRadioA11yPlay(name: string | RegExp, checked = false): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name });

    await expect(radio).toBeInTheDocument();
    await expect(radio).toHaveAccessibleName(name);
    if (checked) {
      await expect(radio).toBeChecked();
    } else {
      await expect(radio).not.toBeChecked();
    }
  };
}

export function createRadioKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(radio).toHaveFocus();
    await expect(radio.matches(":focus-visible")).toBe(true);
  };
}

export function createRadioDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name });

    await expect(radio).toHaveAttribute("aria-disabled", "true");
  };
}

export function createRadioInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole("radio", { name });

    await expect(radio).toHaveAccessibleName(name);
    await expect(radio).toHaveAttribute("aria-invalid", "true");
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createRadioWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createRadioA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole("textbox")).toBeInTheDocument();
  };
}

export async function runRadioInteractionTests(
  context: PlayContext,
  name: string | RegExp,
  checked = false,
): Promise<void> {
  await createRadioA11yPlay(name, checked)(context);
  await createRadioKeyboardFocusPlay(name)(context);
}

export function createSwitchA11yPlay(name: string | RegExp, checked = false): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name });

    await expect(toggle).toBeInTheDocument();
    await expect(toggle).toHaveAccessibleName(name);
    if (checked) {
      await expect(toggle).toBeChecked();
    } else {
      await expect(toggle).not.toBeChecked();
    }
  };
}

export function createSwitchKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
    await expect(toggle.matches(":focus-visible")).toBe(true);
  };
}

export function createSwitchTogglePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name });

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  };
}

export function createSwitchDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name });

    await expect(toggle).toHaveAttribute("aria-disabled", "true");
  };
}

export function createSwitchInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole("switch", { name });

    await expect(toggle).toHaveAccessibleName(name);
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createSwitchWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createSwitchA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole("textbox")).toBeInTheDocument();
  };
}

export async function runSwitchInteractionTests(
  context: PlayContext,
  name: string | RegExp,
): Promise<void> {
  await createSwitchA11yPlay(name, false)(context);
  await createSwitchKeyboardFocusPlay(name)(context);
  await createSwitchTogglePlay(name)(context);
}

export const textboxTestArgs = {
  "aria-label": "Input",
  placeholder: "Input",
};
