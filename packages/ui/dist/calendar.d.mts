import { DateRange, DayPickerProps } from "@daypicker/react";

//#region src/components/calendar/index.d.ts
type CalendarVariant = "default" | "range";
type CalendarSharedProps = {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Visual layout — `default` shows one month with dropdown navigation;
   * `range` shows two months with a label caption for range selection.
   * @default "default"
   */
  variant?: CalendarVariant;
};
type CalendarSingleProps = CalendarSharedProps &
  Omit<DayPickerProps, "mode" | "className" | "numberOfMonths" | "captionLayout" | "navLayout"> & {
    mode?: "single";
    selected?: Date;
    onSelect?: (date: Date | undefined) => void;
  };
type CalendarRangeProps = CalendarSharedProps &
  Omit<DayPickerProps, "mode" | "className" | "numberOfMonths" | "captionLayout" | "navLayout"> & {
    mode: "range";
    selected?: DateRange;
    onSelect?: (range: DateRange | undefined) => void;
  };
type CalendarProps = CalendarSingleProps | CalendarRangeProps;
declare const calendarVariants: (
  props?: {
    variant?: "default" | "range" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
/** Date grid for selecting a single day or a date range, styled to the DS calendar spec. */
declare function Calendar({
  className,
  variant,
  showOutsideDays,
  components,
  classNames,
  formatters,
  ...props
}: CalendarProps): import("react").JSX.Element;
//#endregion
export { Calendar, CalendarProps, type CalendarVariant, type DateRange, calendarVariants };
