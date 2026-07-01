import { ReactNode } from "react";

import { r as InputProps } from "./index-C9fHU84I.mjs";

//#region src/components/fields/selection-field/selection-field-layout.d.ts
declare const selectionFieldVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        disabled?: boolean | null | undefined;
        invalid?: boolean | null | undefined;
        supportingText?: boolean | null | undefined;
        input?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type SelectionFieldBaseProps = {
  /** Visible label text associated with the selection control. */ label?: string /** Secondary descriptive text displayed below the label. */;
  supportingText?: string /** Right-aligned supplementary text on the label row. */;
  suffix?: string /** Error message displayed below the field when invalid. */;
  helperText?: string;
  /**
   * Whether to render the label element.
   * @default true
   */
  showLabel?: boolean;
  /**
   * Whether to render supporting text below the label.
   * @default false
   */
  showSupportingText?: boolean;
  /**
   * Whether to render the suffix element.
   * @default true
   */
  showSuffix?: boolean;
  /**
   * Whether to render helper text when the field is invalid.
   * @default true
   */
  showHelperText?: boolean;
  /**
   * Whether to render an input below the selection row.
   * @default false
   */
  showInput?: boolean /** Additional CSS class names applied to the field wrapper. */;
  fieldClassName?: string;
  /**
   * Marks the field as invalid and sets validation styling.
   * @default false
   */
  invalid?: boolean /** Prevents interaction with the control and embedded input. */;
  disabled?: boolean;
  /**
   * Visual size of the selection control.
   * @default "sm"
   */
  size?: "sm" | "lg" /** ID applied to the selection control. */;
  id?: string /** Props forwarded to the embedded input when `showInput` is true. */;
  inputProps?: Omit<InputProps, "size" | "invalid" | "disabled" | "id">;
};
//#endregion
export { selectionFieldVariants as n, SelectionFieldBaseProps as t };
