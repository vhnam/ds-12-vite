import { Radio as Radio$1 } from "@base-ui/react/radio";
import { RadioGroup as RadioGroup$1 } from "@base-ui/react/radio-group";
import { ComponentProps } from "react";

//#region src/components/radio/index.d.ts
declare const radioVariants: (
  props?: {
    size?: "lg" | "sm" | null | undefined;
    invalid?: boolean | null | undefined;
    disabled?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type RadioProps = Omit<ComponentProps<typeof Radio$1.Root>, "className"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Visual size of the radio control.
   * @default "lg"
   */
  size?: "sm" | "lg";
  /**
   * Marks the control as invalid and sets `aria-invalid`.
   * @default false
   */
  invalid?: boolean;
  /**
   * Prevents interaction and dims the control.
   * @default false
   */
  disabled?: boolean;
};
type RadioGroupProps = ComponentProps<typeof RadioGroup$1>;
/** Circular selection control for choosing one option from a mutually exclusive set. */
declare function Radio({
  className,
  size,
  invalid,
  disabled,
  value,
  ...props
}: RadioProps): import("react").JSX.Element;
/** Groups radio buttons so only one value can be selected at a time. */
declare function RadioGroup({ className, ...props }: RadioGroupProps): import("react").JSX.Element;
//#endregion
export { Radio, RadioGroup, RadioGroupProps, RadioProps, radioVariants };
