import { ComboboxOption, ComboboxProps } from "../combobox.mjs";

//#region src/components/fields/combobox-field/index.d.ts
declare const comboboxFieldVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type ComboboxFieldProps = Omit<ComboboxProps, "id" | "invalid" | "disabled"> & {
  /** Visible label text associated with the combobox. */ label?: string /** Helper or error text displayed below the combobox. */;
  helperText?: string;
  /**
   * Whether to render the label element.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Whether to render the helper text element.
   * @default true
   */
  showHelperText?: boolean /** Additional CSS class names applied to the field wrapper. */;
  fieldClassName?: string /** Prevents interaction with the control. */;
  disabled?: boolean /** Marks the field as invalid and sets validation styling. */;
  invalid?: boolean /** ID applied to the combobox input. */;
  id?: string;
};
/** Labelled combobox field composed of a label, helper text, and a Combobox control with shared validation styling. */
declare function ComboboxField({
  className,
  fieldClassName,
  size,
  invalid,
  disabled,
  label,
  helperText,
  showLabel,
  showHelperText,
  id: idProp,
  options,
  ...comboboxProps
}: ComboboxFieldProps): import("react").JSX.Element;
//#endregion
export { ComboboxField, ComboboxFieldProps, type ComboboxOption, comboboxFieldVariants };
