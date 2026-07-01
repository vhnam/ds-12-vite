import { ReactNode } from "react";

//#region src/components/select/index.d.ts
declare const SelectIconSizeContext: import("react").Context<number | undefined>;
declare const selectVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type SelectOption = {
  /** Visible label for the option. */ label: string /** Unique value submitted with the form. */;
  value: string /** Prevents selecting this option. */;
  disabled?: boolean;
};
type SelectProps = {
  /** Additional CSS class names applied to the trigger wrapper. */ className?: string;
  /**
   * Visual size of the select control.
   * @default "sm"
   */
  size?: "sm" | "lg";
  /**
   * Marks the control as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean /** Prevents interaction with the control. */;
  disabled?: boolean /** Placeholder text shown when no value is selected. */;
  placeholder?: string /** Options rendered in the dropdown list. */;
  options: readonly SelectOption[] /** Custom leading icon element. */;
  leadingIcon?: ReactNode;
  /**
   * Renders a leading icon inside the trigger.
   * @default false
   */
  showLeadingIcon?: boolean /** Controlled selected value. */;
  value?: string | null /** Initial selected value for uncontrolled usage. */;
  defaultValue?: string | null /** Called when the selected value changes. */;
  onValueChange?: (value: string | null) => void /** Whether the popup is initially open. */;
  defaultOpen?: boolean /** Controlled open state. */;
  open?: boolean /** Called when the popup opens or closes. */;
  onOpenChange?: (open: boolean) => void /** ID applied to the trigger button. */;
  id?: string /** Form field name for the hidden input. */;
  name?: string /** Marks the field as required in forms. */;
  required?: boolean /** ID of the element that describes the select, typically helper text. */;
  "aria-describedby"?: string;
  /**
   * Accessible name when no visible label is provided — use SelectField for labelled forms.
   */
  "aria-label"?: string;
};
/** Single-select dropdown with size variants, optional leading icon, and error and disabled states. */
declare function Select({
  className,
  size,
  invalid,
  disabled,
  placeholder,
  options,
  leadingIcon,
  showLeadingIcon,
  value,
  defaultValue,
  onValueChange,
  defaultOpen,
  open,
  onOpenChange,
  id,
  name,
  required,
  "aria-describedby": ariaDescribedBy,
  "aria-label": ariaLabel,
}: SelectProps): import("react").JSX.Element;
//#endregion
export { Select, SelectIconSizeContext, SelectOption, SelectProps, selectVariants };
