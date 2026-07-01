import { ReactNode } from "react";

//#region src/components/combobox/index.d.ts
declare const ComboboxIconSizeContext: import("react").Context<number | undefined>;
declare const comboboxVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type ComboboxOption = {
  /** Visible label for the option. */ label: string /** Unique value submitted with the form. */;
  value: string /** Prevents selecting this option. */;
  disabled?: boolean;
};
type ComboboxSharedProps = {
  className?: string;
  size?: "sm" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  placeholder?: string;
  options: readonly ComboboxOption[];
  leadingIcon?: ReactNode;
  showLeadingIcon?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  id?: string;
  name?: string;
  required?: boolean;
  "aria-describedby"?: string;
  "aria-label"?: string;
  inputValue?: string;
  defaultInputValue?: string;
  onInputValueChange?: (value: string) => void;
};
type ComboboxProps = ComboboxSharedProps & {
  /**
   * Allows selecting multiple options.
   * @default false
   */
  multiple?: boolean /** Controlled selected value or values. */;
  value?: string | string[] | null /** Initial selected value or values for uncontrolled usage. */;
  defaultValue?: string | string[] | null /** Called when the selected value or values change. */;
  onValueChange?: (value: string | string[] | null) => void;
};
/** Filterable text input with a dropdown list, optional leading icon, multi-select chips, and error and disabled states. */
declare function Combobox({
  multiple,
  value,
  defaultValue,
  onValueChange,
  ...sharedProps
}: ComboboxProps): import("react").JSX.Element;
//#endregion
export { Combobox, ComboboxIconSizeContext, ComboboxOption, ComboboxProps, comboboxVariants };
