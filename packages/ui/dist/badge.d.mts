import { ComponentProps, ReactNode } from "react";

//#region src/components/badge/index.d.ts
type BadgeSize = "sm" | "lg";
type BadgeEmphasis = "subtle" | "bold";
type BadgeVariant = "neutral" | "negative" | "attention" | "positive" | "information";
declare const BadgeIconSizeContext: import("react").Context<number | undefined>;
declare const badgeVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        emphasis?: "bold" | "subtle" | null | undefined;
        variant?: "attention" | "information" | "negative" | "neutral" | "positive" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type BadgeProps = ComponentProps<"span"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
  /**
   * Badge dimensions and icon scale — `sm` for compact layouts (e.g. table rows),
   * `lg` for standalone status labels.
   * @default "lg"
   */
  size?: BadgeSize;
  /**
   * Visual weight — `subtle` blends into the background, `bold` stands out on busy surfaces.
   * @default "subtle"
   */
  emphasis?: BadgeEmphasis;
  /**
   * Semantic colour — neutral for metadata, positive/negative/attention/information for status.
   * @default "neutral"
   */
  variant?: BadgeVariant /** Optional leading icon element rendered before the label text. */;
  icon?: ReactNode;
};
/** Compact status or count indicator with semantic color variants, subtle or bold emphasis, and an optional leading icon. */
declare function Badge({
  children,
  className,
  size,
  emphasis,
  variant,
  icon,
  ...props
}: BadgeProps): import("react").JSX.Element;
//#endregion
export {
  Badge,
  type BadgeEmphasis,
  BadgeIconSizeContext,
  BadgeProps,
  type BadgeSize,
  type BadgeVariant,
  badgeVariants,
};
