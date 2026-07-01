import { ComponentProps, ReactNode } from "react";

import { Avatar, AvatarProps, avatarVariants } from "./avatar.mjs";
import { Badge, BadgeIconSizeContext, BadgeProps, badgeVariants } from "./badge.mjs";
import { Button, ButtonProps, buttonVariants } from "./button.mjs";
import { Calendar, CalendarProps, CalendarVariant, DateRange, calendarVariants } from "./calendar.mjs";
import { Chip, ChipProps, chipVariants } from "./chip.mjs";
import { Combobox, ComboboxIconSizeContext, ComboboxOption, ComboboxProps, comboboxVariants } from "./combobox.mjs";
import { DatePicker, DatePickerIconSizeContext, DatePickerProps, datePickerVariants } from "./date-picker.mjs";
import { Divider, DividerProps, dividerVariants } from "./divider.mjs";
import { CheckboxField, CheckboxFieldProps } from "./fields/checkbox-field.mjs";
import { ComboboxField, ComboboxFieldProps, comboboxFieldVariants } from "./fields/combobox-field.mjs";
import { DatePickerField, DatePickerFieldProps, datePickerFieldVariants } from "./fields/date-picker-field.mjs";
import { InputField, InputFieldProps, inputFieldVariants } from "./fields/input-field.mjs";
import { RadioField, RadioFieldProps } from "./fields/radio-field.mjs";
import { SelectField, SelectFieldProps, selectFieldVariants } from "./fields/select-field.mjs";
import { SwitchField, SwitchFieldProps } from "./fields/switch-field.mjs";
import { TextareaField, TextareaFieldProps, textareaFieldVariants } from "./fields/textarea-field.mjs";
import { DEFAULT_ICON_SIZE, Icon, IconAlign, IconVariant } from "./icon.mjs";
import { i as inputVariants, n as InputIconSizeContext, r as InputProps, t as Input } from "./index-C9fHU84I.mjs";
import {
  a as getPaginationItems,
  i as paginationVariants,
  n as PaginationProps,
  r as paginationButtonVariants,
  t as Pagination,
} from "./index-CDwRLW7h.mjs";
import {
  a as breadcrumbVariants,
  c as getBreadcrumbSegments,
  i as BreadcrumbProps,
  n as BreadcrumbIconSizeContext,
  o as BreadcrumbItem,
  r as BreadcrumbLinkRenderProps,
  s as BreadcrumbSegment,
  t as Breadcrumb,
} from "./index-xSjXmq8y.mjs";
import {
  MenuItemCheckbox,
  MenuItemCheckboxProps,
  MenuItemText,
  MenuItemTextProps,
  MenuVariant,
  menuItemVariants,
} from "./menu.mjs";
import { Radio, RadioGroup, RadioGroupProps, RadioProps, radioVariants } from "./radio.mjs";
import { Select, SelectIconSizeContext, SelectOption, SelectProps, selectVariants } from "./select.mjs";
import { n as selectionFieldVariants } from "./selection-field-layout-CgxPUUHX.mjs";
import { Skeleton, SkeletonProps, skeletonVariants } from "./skeleton.mjs";
import { Switch, SwitchProps, switchVariants } from "./switch.mjs";
import {
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
  TableHeader,
  TableHeaderProps,
  TableProps,
  TableRow,
  TableRowProps,
  TableSortDirection,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
} from "./table.mjs";
import { Textarea, TextareaIconSizeContext, TextareaProps, textareaVariants } from "./textarea.mjs";
import {
  Typography,
  TypographyProps,
  TypographyRender,
  TypographySize,
  TypographyVariant,
  TypographyWeight,
  typographyVariants,
} from "./typography.mjs";

//#region src/components/alert/index.d.ts
type AlertLayout = "default" | "fullWidth";
type AlertVariant = "negative" | "information" | "positive" | "attention" | "neutral";
declare const alertVariants: (
  props?:
    | ({
        layout?: "default" | "fullWidth" | null | undefined;
        variant?: "attention" | "information" | "negative" | "neutral" | "positive" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const alertIconVariants: (
  props?:
    | ({
        variant?: "attention" | "information" | "negative" | "neutral" | "positive" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Container layout — `default` is a rounded inline card; `fullWidth` spans edge-to-edge without radius.
   * @default "default"
   */
  layout?: AlertLayout;
  /**
   * Semantic colour and icon — negative for errors, positive for success, attention for warnings,
   * information for guidance, neutral for general notices.
   * @default "negative"
   */
  variant?: AlertVariant /** Primary message shown in semibold body text. */;
  title: ReactNode /** Optional supporting detail shown below the title in regular body text. */;
  description?: ReactNode /** Label for the optional text action rendered on the trailing edge. */;
  actionLabel?: string /** Called when the trailing text action is activated. */;
  onAction?: () => void /** Called when the dismiss control is activated. When omitted, the dismiss button is hidden. */;
  onDismiss?: () => void;
};
/** Contextual status banner with semantic colour, optional description, action, and dismiss controls. */
declare function Alert({
  className,
  layout,
  variant,
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  ...props
}: AlertProps): import("react").JSX.Element;
//#endregion
//#region src/components/progress/get-progress-step-status.d.ts
type ProgressStepStatus = "upcoming" | "current" | "past";
/** Maps a 0-based step index and 1-based current step to a visual status. */
declare function getProgressStepStatus(stepIndex: number, currentStep: number): ProgressStepStatus;
//#endregion
//#region src/components/progress/index.d.ts
declare const ProgressIconSizeContext: import("react").Context<number | undefined>;
declare const progressVariants: (
  props?: ({} & import("class-variance-authority/types").ClassProp) | undefined,
) => string;
declare const progressStepVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const progressIndicatorVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const progressLabelVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type ProgressStepItem = {
  /** Step label shown beside the indicator. */ label: string;
};
type ProgressStepProps = ComponentProps<"div"> & {
  /** Additional CSS class names applied to the step element. */ className?: string /** Step label shown beside the indicator. */;
  label: string;
  /**
   * Visual state — `current` for the active step, `past` for completed steps, `upcoming` for future steps.
   * @default "upcoming"
   */
  status?: ProgressStepStatus;
  /**
   * Step number shown inside the indicator for upcoming and current states.
   * Ignored when `status` is `past` (checkmark is shown instead).
   */
  stepNumber?: number;
};
type ProgressProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Additional CSS class names applied to the navigation element. */ className?: string /** Ordered steps from first to last. */;
  steps: ProgressStepItem[];
  /**
   * 1-based index of the active step.
   * Steps before this index render as completed; steps after render as upcoming.
   */
  currentStep: number;
};
/** Single progress step with numbered or completed indicator and label. */
declare function ProgressStep({
  className,
  label,
  status,
  stepNumber,
  ...props
}: ProgressStepProps): import("react").JSX.Element;
/** Horizontal step indicator for multi-step flows on desktop. */
declare function Progress({
  className,
  steps,
  currentStep,
  "aria-label": ariaLabel,
  ...props
}: ProgressProps): import("react").JSX.Element;
//#endregion
export {
  Alert,
  type AlertLayout,
  type AlertProps,
  type AlertVariant,
  Avatar,
  type AvatarProps,
  Badge,
  BadgeIconSizeContext,
  type BadgeProps,
  Breadcrumb,
  BreadcrumbIconSizeContext,
  type BreadcrumbItem,
  type BreadcrumbLinkRenderProps,
  type BreadcrumbProps,
  type BreadcrumbSegment,
  Button,
  type ButtonProps,
  Calendar,
  type CalendarProps,
  type CalendarVariant,
  CheckboxField,
  type CheckboxFieldProps,
  Chip,
  type ChipProps,
  Combobox,
  ComboboxField,
  type ComboboxFieldProps,
  ComboboxIconSizeContext,
  type ComboboxOption,
  type ComboboxProps,
  DEFAULT_ICON_SIZE,
  DatePicker,
  DatePickerField,
  type DatePickerFieldProps,
  DatePickerIconSizeContext,
  type DatePickerProps,
  type DateRange,
  Divider,
  type DividerProps,
  Icon,
  type IconAlign,
  type IconVariant,
  Input,
  InputField,
  type InputFieldProps,
  InputIconSizeContext,
  type InputProps,
  MenuItemCheckbox,
  type MenuItemCheckboxProps,
  MenuItemText,
  type MenuItemTextProps,
  type MenuVariant,
  Pagination,
  type PaginationProps,
  Progress,
  ProgressIconSizeContext,
  type ProgressProps,
  ProgressStep,
  type ProgressStepItem,
  type ProgressStepProps,
  type ProgressStepStatus,
  Radio,
  RadioField,
  type RadioFieldProps,
  RadioGroup,
  type RadioGroupProps,
  type RadioProps,
  Select,
  SelectField,
  type SelectFieldProps,
  SelectIconSizeContext,
  type SelectOption,
  type SelectProps,
  Skeleton,
  type SkeletonProps,
  Switch,
  SwitchField,
  type SwitchFieldProps,
  type SwitchProps,
  Table,
  TableBody,
  type TableBodyProps,
  TableCell,
  type TableCellProps,
  TableHead,
  type TableHeadProps,
  TableHeader,
  type TableHeaderProps,
  type TableProps,
  TableRow,
  type TableRowProps,
  type TableSortDirection,
  Textarea,
  TextareaField,
  type TextareaFieldProps,
  TextareaIconSizeContext,
  type TextareaProps,
  Typography,
  type TypographyProps,
  type TypographyRender,
  type TypographySize,
  type TypographyVariant,
  type TypographyWeight,
  alertIconVariants,
  alertVariants,
  avatarVariants,
  badgeVariants,
  breadcrumbVariants,
  buttonVariants,
  calendarVariants,
  selectionFieldVariants as checkboxFieldVariants,
  selectionFieldVariants as radioFieldVariants,
  selectionFieldVariants as switchFieldVariants,
  chipVariants,
  comboboxFieldVariants,
  comboboxVariants,
  datePickerFieldVariants,
  datePickerVariants,
  dividerVariants,
  getBreadcrumbSegments,
  getPaginationItems,
  getProgressStepStatus,
  inputFieldVariants,
  inputVariants,
  menuItemVariants,
  menuItemVariants as menuVariants,
  paginationButtonVariants,
  paginationVariants,
  progressIndicatorVariants,
  progressLabelVariants,
  progressStepVariants,
  progressVariants,
  radioVariants,
  selectFieldVariants,
  selectVariants,
  skeletonVariants,
  switchVariants,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
  textareaFieldVariants,
  textareaVariants,
  typographyVariants,
};
