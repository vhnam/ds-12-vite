import type { StoryObj } from '@storybook/react-vite';
import { expect, userEvent, waitFor, within } from 'storybook/test';

type PlayFunction = NonNullable<StoryObj['play']>;
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
    const button = canvas.getByRole('button', { name });

    await expect(button).toBeInTheDocument();
    await expect(button).toHaveAccessibleName(name);
  };
}

export function createButtonKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  };
}

export function createButtonFocusVisiblePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
    await expect(button.matches(':focus-visible')).toBe(true);
  };
}

export function createButtonMouseClickPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await userEvent.click(button);
    await expect(button).not.toHaveAttribute('data-focus-visible', 'true');
  };
}

export function createButtonDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await expect(button).toHaveAttribute('aria-disabled', 'true');
    await expect(button).not.toHaveAttribute('disabled');
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).toHaveFocus();
  };
}

/** Native `disabled` button controls (e.g. Popover triggers) that are removed from tab order. */
export function createNativeDisabledButtonPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await expect(button).toBeDisabled();
    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(button).not.toHaveFocus();
  };
}

export function createButtonLoadingA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button', { name });

    await expect(button).toHaveAccessibleName(name);
    await expect(button).toHaveAttribute('aria-busy', 'true');
    await expect(button).toHaveAttribute('aria-disabled', 'true');
  };
}

export async function runButtonInteractionTests(context: PlayContext, name: string | RegExp): Promise<void> {
  await createButtonA11yPlay(name)(context);
  await createButtonKeyboardFocusPlay(name)(context);
  await createButtonFocusVisiblePlay(name)(context);
  await createButtonMouseClickPlay(name)(context);
}

export function createChipA11yPlay(name: string | RegExp, active: boolean): PlayFunction {
  return async (context) => {
    await createButtonA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    const chip = canvas.getByRole('button', { name });

    await expect(chip).toHaveAttribute('aria-pressed', active ? 'true' : 'false');
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
    const input = canvas.getByRole('textbox', { name });

    await expect(input).toBeInTheDocument();
    await expect(input).toHaveAccessibleName(name);
  };
}

export function createTextboxKeyboardFocusPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(input).toHaveFocus();
  };
}

export function createTextboxFocusVisiblePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(input).toHaveFocus();
    await expect(input.matches(':focus-visible')).toBe(true);
  };
}

export function createTextboxMouseClickPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name });

    await userEvent.click(input);
    await expect(input).toHaveFocus();
  };
}

export function createTextboxDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name });

    await expect(input).toBeDisabled();
    await expect(input).not.toHaveAttribute('aria-disabled', 'true');
  };
}

export function createTextboxInvalidA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('textbox', { name });

    await expect(input).toHaveAccessibleName(name);
    await expect(input).toHaveAttribute('aria-invalid', 'true');
  };
}

export async function runTextboxInteractionTests(context: PlayContext, name: string | RegExp): Promise<void> {
  await createTextboxA11yPlay(name)(context);
  await createTextboxKeyboardFocusPlay(name)(context);
  await createTextboxFocusVisiblePlay(name)(context);
  await createTextboxMouseClickPlay(name)(context);
}

function getCombobox(canvas: ReturnType<typeof within>, name?: string | RegExp) {
  return name ? canvas.getByRole('combobox', { name }) : canvas.getByRole('combobox');
}

export function createComboboxA11yPlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    await expect(combobox).toBeInTheDocument();
    if (name) {
      await expect(combobox).toHaveAccessibleName(name);
    }
  };
}

export function createComboboxKeyboardFocusPlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(combobox).toHaveFocus();
  };
}

export function createComboboxFocusVisiblePlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(combobox).toHaveFocus();
    await expect(combobox.matches(':focus-visible')).toBe(true);
  };
}

export function createComboboxMouseClickPlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    await userEvent.click(combobox);
    // Base UI portals the popup to document.body, outside #storybook-root.
    await expect(within(document.body).getByRole('listbox')).toBeInTheDocument();
    await expect(combobox).not.toHaveAttribute('data-focus-visible', 'true');
  };
}

export function createComboboxDisabledPlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    await expect(combobox).toBeDisabled();
    await userEvent.tab();
    await expect(combobox).not.toHaveFocus();
  };
}

export function createComboboxInvalidA11yPlay(name?: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = getCombobox(canvas, name);

    if (name) {
      await expect(combobox).toHaveAccessibleName(name);
    }
    await expect(combobox).toHaveAttribute('aria-invalid', 'true');
  };
}

export async function runComboboxInteractionTests(context: PlayContext, name?: string | RegExp): Promise<void> {
  await createComboboxA11yPlay(name)(context);
  await createComboboxKeyboardFocusPlay(name)(context);
  await createComboboxFocusVisiblePlay(name)(context);
  await createComboboxMouseClickPlay(name)(context);
}

export async function runComboboxA11yAndFocusTests(context: PlayContext, name?: string | RegExp): Promise<void> {
  await createComboboxA11yPlay(name)(context);
  await createComboboxKeyboardFocusPlay(name)(context);
  await createComboboxFocusVisiblePlay(name)(context);
}

export function createSkeletonA11yPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole('status', { name });

    await expect(status).toBeInTheDocument();
    await expect(status).toHaveAccessibleName(name);
    await expect(status).toHaveAttribute('aria-busy', 'true');
  };
}

export function createSeparatorA11yPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('separator')).toBeInTheDocument();
  };
}

export function createBreadcrumbA11yPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('navigation', { name: /breadcrumb/i })).toBeInTheDocument();
  };
}

export function createBreadcrumbLinkPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const link = canvas.getByRole('link', { name });

    await expect(link).toBeInTheDocument();
    await expect(link).toHaveAccessibleName(name);
  };
}

export function createBreadcrumbCurrentPagePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const currentPage = canvas.getByText(name);

    await expect(currentPage).toHaveAttribute('aria-current', 'page');
    await expect(currentPage).toHaveAttribute('data-slot', 'breadcrumb-page');
  };
}

export function createProgressA11yPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('navigation', { name: /progress/i })).toBeInTheDocument();
  };
}

export function createProgressCurrentStepPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const currentStepLabel = canvas.getByText(name);
    const currentStepItem = currentStepLabel.closest('[data-slot="progress-item"]');

    await expect(currentStepItem).toHaveAttribute('aria-current', 'step');
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

export function createAlertA11yPlay(text: string, role: 'alert' | 'status'): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const alert = canvas.getByRole(role);

    await expect(alert).toBeVisible();
    await expect(canvas.getByText(text)).toBeVisible();
    await expect(alert).toHaveAttribute('data-slot', 'alert');
  };
}

export function createAlertDismissPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dismiss = canvas.getByRole('button', { name: /dismiss/i });

    await expect(dismiss).toBeVisible();
    await expect(dismiss).toHaveAccessibleName('Dismiss');
  };
}

export function createIconA11yPlay(iconName: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const icon = canvas.getByText(iconName);

    await expect(icon).toHaveAttribute('aria-hidden', 'true');
    await expect(canvas.queryByRole('img')).not.toBeInTheDocument();
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

    await expect(canvas.getByRole('heading', { level, name })).toBeInTheDocument();
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

    await expect(canvas.getByRole('navigation', { name: 'Pagination' })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: `Page ${activePage}` })).toHaveAttribute('aria-current', 'page');
  };
}

export async function runPaginationInteractionTests(context: PlayContext, activePage: number): Promise<void> {
  await createPaginationA11yPlay(activePage)(context);
  await createButtonKeyboardFocusPlay(`Page ${activePage}`)(context);
  await createButtonFocusVisiblePlay(`Page ${activePage}`)(context);
  await createButtonMouseClickPlay(`Page ${activePage}`)(context);
}

export function createCheckboxA11yPlay(name: string | RegExp, checked = false): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name });

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
    const checkbox = canvas.getByRole('checkbox', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(checkbox).toHaveFocus();
    await expect(checkbox.matches(':focus-visible')).toBe(true);
  };
}

export function createCheckboxTogglePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name });

    await userEvent.click(checkbox);
    await expect(checkbox).toBeChecked();
  };
}

export function createCheckboxDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name });

    await expect(checkbox).toHaveAttribute('aria-disabled', 'true');
  };
}

export function createCheckboxInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole('checkbox', { name });

    await expect(checkbox).toHaveAccessibleName(name);
    await expect(checkbox).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createCheckboxWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createCheckboxA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole('textbox')).toBeInTheDocument();
  };
}

export async function runCheckboxInteractionTests(context: PlayContext, name: string | RegExp): Promise<void> {
  await createCheckboxA11yPlay(name, false)(context);
  await createCheckboxKeyboardFocusPlay(name)(context);
  await createCheckboxTogglePlay(name)(context);
}

export function createRadioA11yPlay(name: string | RegExp, checked = false): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio', { name });

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
    const radio = canvas.getByRole('radio', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(radio).toHaveFocus();
    await expect(radio.matches(':focus-visible')).toBe(true);
  };
}

export function createRadioDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio', { name });

    await expect(radio).toHaveAttribute('aria-disabled', 'true');
  };
}

export function createRadioInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radio = canvas.getByRole('radio', { name });

    await expect(radio).toHaveAccessibleName(name);
    await expect(radio).toHaveAttribute('aria-invalid', 'true');
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createRadioWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createRadioA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole('textbox')).toBeInTheDocument();
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
    const toggle = canvas.getByRole('switch', { name });

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
    const toggle = canvas.getByRole('switch', { name });

    await userEvent.click(canvasElement);
    await userEvent.tab();
    await expect(toggle).toHaveFocus();
    await expect(toggle.matches(':focus-visible')).toBe(true);
  };
}

export function createSwitchTogglePlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name });

    await userEvent.click(toggle);
    await expect(toggle).toBeChecked();
  };
}

export function createSwitchDisabledPlay(name: string | RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name });

    await expect(toggle).toHaveAttribute('aria-disabled', 'true');
  };
}

export function createSwitchInvalidA11yPlay(
  name: string | RegExp,
  helperText: string | RegExp = /helper text/i,
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByRole('switch', { name });

    await expect(toggle).toHaveAccessibleName(name);
    await expect(canvas.getByText(helperText)).toBeInTheDocument();
  };
}

export function createSwitchWithInputA11yPlay(name: string | RegExp): PlayFunction {
  return async (context) => {
    await createSwitchA11yPlay(name)(context);
    const canvas = within(context.canvasElement);
    await expect(canvas.getByRole('textbox')).toBeInTheDocument();
  };
}

export async function runSwitchInteractionTests(context: PlayContext, name: string | RegExp): Promise<void> {
  await createSwitchA11yPlay(name, false)(context);
  await createSwitchKeyboardFocusPlay(name)(context);
  await createSwitchTogglePlay(name)(context);
}

const CALENDAR_NAV_PREVIOUS = 'Go to the Previous Month';
const CALENDAR_NAV_NEXT = 'Go to the Next Month';

function getCalendarDayButton(canvasElement: HTMLElement, isoDate: string, index = 0) {
  const dayButtons = within(canvasElement)
    .getAllByRole('button')
    .filter((button) => button.getAttribute('data-day') === isoDate);

  if (dayButtons.length <= index) {
    throw new Error(`Expected at least ${index + 1} day button(s) for ${isoDate}, found ${dayButtons.length}`);
  }

  return dayButtons[index];
}

export function createCalendarStructureA11yPlay(
  options: { gridCount?: number; monthLabel?: RegExp } = {},
): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const gridCount = options.gridCount ?? 1;

    if (gridCount === 1) {
      await expect(canvas.getByRole('grid')).toBeInTheDocument();
      if (options.monthLabel) {
        await expect(canvas.getByRole('grid', { name: options.monthLabel })).toBeInTheDocument();
      }
    } else {
      await expect(canvas.getAllByRole('grid')).toHaveLength(gridCount);
    }

    await expect(canvas.getByRole('button', { name: CALENDAR_NAV_PREVIOUS })).toBeInTheDocument();
    await expect(canvas.getByRole('button', { name: CALENDAR_NAV_NEXT })).toBeInTheDocument();
  };
}

export function createCalendarSelectedDayA11yPlay(isoDate: string): PlayFunction {
  return async ({ canvasElement }) => {
    const dayButton = getCalendarDayButton(canvasElement, isoDate);

    await expect(dayButton).toHaveAttribute('data-day', isoDate);
    await expect(dayButton).toHaveAttribute('data-selected-single', 'true');
    await expect(dayButton).toHaveAccessibleName(/selected/i);
  };
}

export function createCalendarDropdownA11yPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByLabelText('Choose the Month')).toBeInTheDocument();
    await expect(canvas.getByLabelText('Choose the Year')).toBeInTheDocument();
  };
}

export function createCalendarDropdownInteractionPlay(): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const monthDropdown = canvas.getByLabelText('Choose the Month');
    const yearDropdown = canvas.getByLabelText('Choose the Year');

    await userEvent.click(monthDropdown);
    await expect(monthDropdown).toHaveFocus();

    await userEvent.click(yearDropdown);
    await expect(yearDropdown).toHaveFocus();
  };
}

export function createCalendarMonthNavigationPlay(fromMonth: RegExp, toMonth: RegExp): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole('grid', { name: fromMonth })).toBeInTheDocument();
    await userEvent.click(canvas.getByRole('button', { name: CALENDAR_NAV_NEXT }));
    await expect(canvas.getByRole('grid', { name: toMonth })).toBeInTheDocument();
  };
}

export function createCalendarDaySelectPlay(isoDate: string, previouslySelectedDay?: string): PlayFunction {
  return async ({ canvasElement }) => {
    const dayButton = getCalendarDayButton(canvasElement, isoDate);

    await userEvent.click(dayButton);

    await waitFor(() => {
      const selectedDay = getCalendarDayButton(canvasElement, isoDate);
      if (selectedDay.getAttribute('data-selected-single') !== 'true') {
        throw new Error(`Expected ${isoDate} to be selected`);
      }
    });

    const selectedDayButton = getCalendarDayButton(canvasElement, isoDate);
    await expect(selectedDayButton).toHaveAttribute('data-day', isoDate);
    await expect(selectedDayButton).toHaveAccessibleName(/selected/i);
    await expect(canvasElement.querySelectorAll('button[data-selected-single="true"]')).toHaveLength(1);

    if (previouslySelectedDay) {
      await expect(getCalendarDayButton(canvasElement, previouslySelectedDay)).not.toHaveAttribute(
        'data-selected-single',
      );
    }
  };
}

export function createCalendarRangeA11yPlay(startDay: string, endDay: string): PlayFunction {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const startButton = getCalendarDayButton(canvasElement, startDay);
    const endButton = getCalendarDayButton(canvasElement, endDay);

    await expect(canvas.getAllByRole('grid')).toHaveLength(2);
    await expect(canvas.queryByLabelText('Choose the Month')).not.toBeInTheDocument();
    await expect(startButton).toHaveAttribute('data-day', startDay);
    await expect(startButton).toHaveAttribute('data-range-start', 'true');
    await expect(endButton).toHaveAttribute('data-day', endDay);
    await expect(endButton).toHaveAttribute('data-range-end', 'true');
    await expect(canvasElement.querySelectorAll('button[data-range-middle="true"]').length).toBeGreaterThan(0);
  };
}

export async function runCalendarDefaultInteractionTests(context: PlayContext): Promise<void> {
  await expectDataSlotVariant(context.canvasElement, { slot: 'calendar', variant: 'default' });
  await createCalendarStructureA11yPlay({ monthLabel: /june 2025/i })(context);
  await createCalendarSelectedDayA11yPlay('2025-06-25')(context);
  await createCalendarDropdownA11yPlay()(context);
  await createCalendarDropdownInteractionPlay()(context);
}

export async function runCalendarRangeInteractionTests(context: PlayContext): Promise<void> {
  await expectDataSlotVariant(context.canvasElement, { slot: 'calendar', variant: 'range' });
  await createCalendarRangeA11yPlay('2025-06-25', '2025-07-09')(context);
}

export const textboxTestArgs = {
  'aria-label': 'Input',
  placeholder: 'Input',
};

export const comboboxTestArgs = {
  'aria-label': 'Select',
  placeholder: 'Option',
};

type DataSlotQuery = {
  slot: string;
  variant?: string;
  role?: string;
  name?: string | RegExp;
};

/** Asserts `data-slot` (and optional `data-variant`) on a component root — prefer over CSS class checks. */
export async function expectDataSlotVariant(canvasElement: HTMLElement, query: DataSlotQuery): Promise<void> {
  const canvas = within(canvasElement);
  let root: Element | null = null;

  if (query.role) {
    const el = canvas.getByRole(query.role as Parameters<typeof canvas.getByRole>[0], {
      name: query.name,
    });
    root = el.getAttribute('data-slot') === query.slot ? el : el.closest(`[data-slot="${query.slot}"]`);
  } else {
    root = canvasElement.querySelector(`[data-slot="${query.slot}"]`);
  }

  await expect(root).toBeInTheDocument();
  await expect(root).toHaveAttribute('data-slot', query.slot);
  if (query.variant !== undefined) {
    await expect(root).toHaveAttribute('data-variant', query.variant);
  }
}
