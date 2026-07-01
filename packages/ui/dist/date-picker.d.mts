import { DayPickerProps } from "@daypicker/react";
import { ReactNode } from "react";

//#region src/components/date-picker/index.d.ts
declare const DatePickerIconSizeContext: import("react").Context<number | undefined>;
declare const datePickerVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type DatePickerCalendarProps = Omit<
  DayPickerProps,
  "mode" | "className" | "numberOfMonths" | "captionLayout" | "navLayout" | "selected" | "onSelect"
>;
type DatePickerProps = DatePickerCalendarProps & {
  /** Additional CSS class names applied to the trigger wrapper. */ className?: string;
  /**
   * Visual size of the date picker control.
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Marks the control as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean /** Prevents interaction with the control. */;
  disabled?: boolean /** Placeholder text shown when no date is selected. */;
  placeholder?: string /** Custom leading icon element. */;
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the trigger.
   * @default false
   */
  showLeadingIcon?: boolean /** Controlled selected date. */;
  value?: Date /** Initial selected date for uncontrolled usage. */;
  defaultValue?: Date /** Called when the selected date changes. */;
  onValueChange?: (date: Date | undefined) => void /** Whether the popup is initially open. */;
  defaultOpen?: boolean /** Controlled open state. */;
  open?: boolean /** Called when the popup opens or closes. */;
  onOpenChange?: (open: boolean) => void /** ID applied to the trigger button. */;
  id?: string /** Form field name for the hidden input. */;
  name?: string /** Marks the field as required in forms. */;
  required?: boolean /** ID of the element that describes the date picker, typically helper text. */;
  "aria-describedby"?: string;
  /**
   * Accessible name when no visible label is provided — use DatePickerField for labelled forms.
   */
  "aria-label"?: string;
};
/** Date input with a popup calendar for selecting a single day. */
declare function DatePicker({
  className,
  size,
  invalid,
  disabled,
  placeholder,
  leadingIcon,
  showLeadingIcon,
  value: valueProp,
  defaultValue,
  onValueChange,
  defaultOpen,
  open: openProp,
  onOpenChange,
  id,
  name,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
  ...calendarProps
}: DatePickerProps): import("react").JSX.Element;
//#endregion
export { DatePicker, DatePickerIconSizeContext, DatePickerProps, datePickerVariants };
