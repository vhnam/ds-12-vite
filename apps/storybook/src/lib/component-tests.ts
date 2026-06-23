import { expect, userEvent, within } from "storybook/test";
import type { StoryObj } from "@storybook/react-vite";

type PlayFunction = NonNullable<StoryObj["play"]>;

const testStoryParameters = {
  docs: { disable: true },
};

export function testStoryParams() {
  return { parameters: testStoryParameters };
}

export function createButtonA11yPlay(name: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });
    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName(name);
  };
}

export function createButtonKeyboardFocusPlay(name: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  };
}

export function createButtonFocusVisiblePlay(name: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button.matches(":focus-visible")).toBe(true);
  };
}

export function createButtonMouseClickPlay(name: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name });
    await userEvent.click(button);
    await expect(button).not.toHaveAttribute("data-focus-visible", "true");
  };
}

export function createButtonDisabledPlay(name: string): PlayFunction {
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

export const textboxTestArgs = {
  "aria-label": "Input",
  placeholder: "Input",
};

export function createSkeletonA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status", { name });

    await expect(status).toBeInTheDocument();
    await expect(status).toHaveAccessibleName(name);
    await expect(status).toHaveAttribute("aria-busy", "true");
  };
}
