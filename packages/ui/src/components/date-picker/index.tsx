import { Popover as BasePopover } from '@base-ui/react/popover';
import type { DayPickerProps } from '@daypicker/react';
import { cva } from 'class-variance-authority';
import { createContext, useState, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Calendar } from '../calendar/index.tsx';
import { Icon } from '../icon/index.tsx';

const DATE_PICKER_ICON_SIZES = {
  sm: 20,
  lg: 24,
} as const;

const DEFAULT_LEADING_ICON = 'event';

export const DatePickerIconSizeContext = createContext<number | undefined>(undefined);

const datePickerVariants = cva('date-picker', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    disabled: {
      true: '',
      false: '',
    },
    invalid: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    { size: 'sm', class: 'date-picker-preset-size-sm' },
    { size: 'lg', class: 'date-picker-preset-size-lg' },
    { size: 'sm', disabled: true, class: 'date-picker-preset-size-sm-disabled' },
    { size: 'lg', disabled: true, class: 'date-picker-preset-size-lg-disabled' },
    { size: 'sm', invalid: true, class: 'date-picker-preset-size-sm-invalid' },
    { size: 'lg', invalid: true, class: 'date-picker-preset-size-lg-invalid' },
  ],
  defaultVariants: {
    size: 'sm',
    disabled: false,
    invalid: false,
  },
});

type DatePickerCalendarProps = Omit<
  DayPickerProps,
  'mode' | 'className' | 'numberOfMonths' | 'captionLayout' | 'navLayout' | 'selected' | 'onSelect'
>;

export type DatePickerProps = DatePickerCalendarProps & {
  /** Additional CSS class names applied to the trigger wrapper. */
  className?: string;
  /**
   * Visual size of the date picker control.
   * @default "sm"
   */
  size?: 'sm' | 'lg';
  /**
   * Marks the control as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean;
  /** Prevents interaction with the control. */
  disabled?: boolean;
  /** Placeholder text shown when no date is selected. */
  placeholder?: string;
  /** Custom leading icon element. */
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the trigger.
   * @default false
   */
  showLeadingIcon?: boolean;
  /** Controlled selected date. */
  value?: Date;
  /** Initial selected date for uncontrolled usage. */
  defaultValue?: Date;
  /** Called when the selected date changes. */
  onValueChange?: (date: Date | undefined) => void;
  /** Whether the popup is initially open. */
  defaultOpen?: boolean;
  /** Controlled open state. */
  open?: boolean;
  /** Called when the popup opens or closes. */
  onOpenChange?: (open: boolean) => void;
  /** ID applied to the trigger button. */
  id?: string;
  /** Form field name for the hidden input. */
  name?: string;
  /** Marks the field as required in forms. */
  required?: boolean;
  /** ID of the element that describes the date picker, typically helper text. */
  'aria-describedby'?: string;
  /**
   * Accessible name when no visible label is provided — use DatePickerField for labelled forms.
   */
  'aria-label'?: string;
};

function formatDisplayDate(date: Date): string {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Date input with a popup calendar for selecting a single day. */
export function DatePicker({
  className,
  size = 'sm',
  invalid = false,
  disabled,
  placeholder = 'Select date',
  leadingIcon,
  showLeadingIcon = false,
  value: valueProp,
  defaultValue,
  onValueChange,
  defaultOpen,
  open: openProp,
  onOpenChange,
  id,
  name,
  required,
  'aria-describedby': ariaDescribedBy,
  'aria-label': ariaLabel,
  ...calendarProps
}: DatePickerProps) {
  const resolvedSize = size ?? 'sm';
  const isDisabled = Boolean(disabled);
  const isInvalid = Boolean(invalid);
  const iconSize = DATE_PICKER_ICON_SIZES[resolvedSize];
  const hasLeading = showLeadingIcon;
  const resolvedLeading = hasLeading ? (leadingIcon ?? <Icon name={DEFAULT_LEADING_ICON} size={iconSize} />) : null;

  const [internalValue, setInternalValue] = useState<Date | undefined>(defaultValue);
  const [internalOpen, setInternalOpen] = useState(defaultOpen ?? false);

  const isValueControlled = valueProp !== undefined;
  const isOpenControlled = openProp !== undefined;
  const selectedDate = isValueControlled ? valueProp : internalValue;
  const isOpen = isOpenControlled ? openProp : internalOpen;

  const handleOpenChange = (nextOpen: boolean) => {
    if (!isOpenControlled) {
      setInternalOpen(nextOpen);
    }
    onOpenChange?.(nextOpen);
  };

  const handleSelect = (date: Date | undefined) => {
    if (!isValueControlled) {
      setInternalValue(date);
    }
    onValueChange?.(date);
    handleOpenChange(false);
  };

  return (
    <DatePickerIconSizeContext.Provider value={iconSize}>
      <BasePopover.Root open={isOpen} onOpenChange={handleOpenChange} modal={false}>
        <div
          className={cn(
            datePickerVariants({
              size: resolvedSize,
              disabled: isDisabled,
              invalid: isInvalid,
              className,
            }),
          )}
          data-slot="date-picker"
          data-variant={resolvedSize}
        >
          <BasePopover.Trigger
            id={id}
            className="date-picker-trigger"
            data-slot="date-picker-trigger"
            disabled={isDisabled}
            aria-invalid={isInvalid || undefined}
            aria-describedby={ariaDescribedBy}
            aria-disabled={isDisabled || undefined}
            aria-label={ariaLabel}
          >
            {resolvedLeading ? (
              <span className="date-picker-leading" data-slot="date-picker-leading">
                {resolvedLeading}
              </span>
            ) : null}
            <span
              className="date-picker-value"
              data-slot="date-picker-value"
              data-placeholder={selectedDate ? undefined : ''}
            >
              {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
            </span>
            <span className="date-picker-trailing" data-slot="date-picker-trailing">
              <Icon name="calendar_today" size={iconSize} />
            </span>
          </BasePopover.Trigger>
          {name ? (
            <input
              type="hidden"
              name={name}
              value={selectedDate ? formatInputDate(selectedDate) : ''}
              required={required}
            />
          ) : null}
        </div>
        <BasePopover.Portal>
          <BasePopover.Positioner
            className="date-picker-positioner"
            data-slot="date-picker-positioner"
            sideOffset={4}
            align="start"
          >
            <BasePopover.Popup className="date-picker-popup" data-slot="date-picker-popup">
              <Calendar
                {...calendarProps}
                variant="default"
                mode="single"
                selected={selectedDate}
                onSelect={handleSelect}
                defaultMonth={calendarProps.defaultMonth ?? selectedDate}
                className="[&_.rdp-month]:w-full"
              />
            </BasePopover.Popup>
          </BasePopover.Positioner>
        </BasePopover.Portal>
      </BasePopover.Root>
    </DatePickerIconSizeContext.Provider>
  );
}

export { datePickerVariants };
