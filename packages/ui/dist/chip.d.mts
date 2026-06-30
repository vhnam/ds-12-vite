import { Button } from "@base-ui/react/button";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

//#region src/components/chip/index.d.ts
declare const chipVariants: (
  props?: {
    active?: boolean | null | undefined;
    hasLeading?: boolean | null | undefined;
    hasTrailing?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type ChipProps = Omit<ComponentProps<typeof Button>, "className"> &
  VariantProps<typeof chipVariants> & {
    /** Additional CSS class names applied to the root element. */ className?: string;
    /**
     * Whether the chip is in the pressed/selected state. Reflected as `aria-pressed`.
     * @default false
     */
    active?: boolean;
    /**
     * Renders a leading icon before the label.
     * @default false
     */
    showLeadingIcon?: boolean;
    /**
     * Renders a trailing icon after the label.
     * @default false
     */
    showTrailingIcon?: boolean /** Custom leading icon element. Defaults to a filter icon when `showLeadingIcon` is true. */;
    leadingIcon?: ReactNode /** Custom trailing icon element. Defaults to a chevron icon when `showTrailingIcon` is true. */;
    trailingIcon?: ReactNode;
  };
/** Toggleable filter or selection control with optional leading and trailing icons and a pressed state. */
declare function Chip({
  children,
  className,
  active,
  showLeadingIcon,
  showTrailingIcon,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: ChipProps): import("react").JSX.Element;
//#endregion
export { Chip, ChipProps, chipVariants };
