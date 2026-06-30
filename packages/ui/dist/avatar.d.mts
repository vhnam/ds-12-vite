import { Avatar as Avatar$1 } from "@base-ui/react/avatar";
import { ComponentProps, ReactNode } from "react";

//#region src/components/avatar/index.d.ts
type AvatarSize = "sm" | "md" | "lg";
type AvatarShape = "circle" | "square";
type AvatarVariant = "initial" | "image" | "icon";
declare const avatarVariants: (
  props?: {
    size?: "lg" | "md" | "sm" | null | undefined;
    shape?: "circle" | "square" | null | undefined;
    variant?: "icon" | "image" | "initial" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type AvatarProps = Omit<ComponentProps<typeof Avatar$1.Root>, "className"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Avatar dimensions — `sm` for compact layouts (e.g. table rows),
   * `lg` for profile headers.
   * @default "md"
   */
  size?: AvatarSize;
  /**
   * `circle` for round avatars; `square` for rounded-square avatars.
   * @default "circle"
   */
  shape?: AvatarShape;
  /**
   * Content type — `initial` for initials, `image` for a photo with fallback,
   * `icon` for a generic placeholder.
   * @default "initial"
   */
  variant?: AvatarVariant;
  /**
   * One or two characters displayed when `variant` is `"initial"` or as an image fallback.
   * Ignored when `variant` is `"icon"`.
   */
  initials?: string;
  /**
   * Image URL used when `variant` is `"image"`.
   */
  src?: string;
  /**
   * Accessible alternative text for the profile image when `variant` is `"image"`.
   */
  alt?: string;
  /**
   * Custom icon element used when `variant` is `"icon"` or as an image fallback
   * when no initials are provided.
   */
  icon?: ReactNode;
};
/** Displays a profile image with initials, photo, or fallback icon. Available in circle and square shapes with small, medium, and large sizes. */
declare function Avatar({
  className,
  size,
  shape,
  variant,
  initials,
  src,
  alt,
  icon,
  ...props
}: AvatarProps): import("react").JSX.Element;
//#endregion
export { Avatar, AvatarProps, type AvatarShape, type AvatarSize, type AvatarVariant, avatarVariants };
