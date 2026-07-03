import { Switch as Switch$1 } from "@base-ui/react/switch";
import { ComponentProps } from "react";

//#region src/components/switch/index.d.ts
declare const switchVariants: (
  props?:
    | ({
        invalid?: boolean | null | undefined;
        disabled?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type SwitchProps = Omit<ComponentProps<typeof Switch$1.Root>, "className"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
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
/** Pill-shaped toggle for binary on/off settings such as feature flags or preferences. */
declare function Switch({
  className,
  invalid,
  disabled,
  checked,
  defaultChecked,
  onCheckedChange,
  ...props
}: SwitchProps): import("react").JSX.Element;
//#endregion
export { Switch, SwitchProps, switchVariants };
