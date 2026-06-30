import { Button as Button$1 } from "@base-ui/react/button";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

//#region src/components/button/index.d.ts
declare const buttonVariants: (
  props?: {
    variant?: "danger" | "icon" | "primary" | "secondary" | null | undefined;
    size?: "lg" | "md" | "sm" | null | undefined;
    hasIcon?: boolean | null | undefined;
    loading?: boolean | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type ButtonProps = Omit<ComponentProps<typeof Button$1>, "className"> &
  VariantProps<typeof buttonVariants> & {
    /** Additional CSS class names applied to the root element. */ className?: string;
    /**
     * Icon element rendered alongside the label, or as the sole content when `variant` is `"icon"`.
     */
    icon?: ReactNode;
    /**
     * Position of the icon relative to the label text.
     * @default "left"
     */
    iconPosition?: "left" | "right";
    /**
     * Shows a loading spinner, sets `aria-busy`, and disables interaction.
     * @default false
     */
    loading?: boolean;
  };
/** Primary action control with visual variants, sizes, loading state, and optional leading or trailing icons. */
declare function Button({
  children,
  className,
  variant,
  size,
  icon,
  iconPosition,
  loading,
  disabled,
  "aria-label": ariaLabel,
  ...props
}: ButtonProps): import("react").JSX.Element;
//#endregion
export { Button, ButtonProps, buttonVariants };
