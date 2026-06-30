import { CSSProperties, ComponentProps } from "react";

//#region src/components/skeleton/index.d.ts
declare const TEXT_VARIANTS: readonly ["h1", "h2", "h3", "h4", "paragraph", "label"];
declare const THUMBNAIL_VARIANTS: readonly ["circle", "square", "rectangle"];
type TextVariant = (typeof TEXT_VARIANTS)[number];
type ThumbnailVariant = (typeof THUMBNAIL_VARIANTS)[number];
type ThumbnailSize = "32" | "48" | "72" | "128";
declare const skeletonVariants: (
  props?: {
    variant?: "circle" | "h1" | "h2" | "h3" | "h4" | "label" | "paragraph" | "rectangle" | "square" | null | undefined;
    size?: "128" | "32" | "48" | "72" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
declare const skeletonBarVariants: (
  props?: {
    variant?: "h1" | "h2" | "h3" | "h4" | "label" | "paragraph" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type SkeletonBaseProps = {
  /** Additional CSS class names applied to the skeleton element. */ className?: string;
  /**
   * Accessible name announced by screen readers while content is loading.
   * @default "Loading"
   */
  "aria-label"?: string /** Custom width for text skeleton variants (e.g. `"240px"`, `"100%"`). */;
  width?: CSSProperties["width"];
};
type TextSkeletonProps = SkeletonBaseProps & {
  /**
   * Text placeholder shape matching typography styles.
   * @default "paragraph"
   */
  variant?: TextVariant;
  size?: never;
};
type ThumbnailSkeletonProps = SkeletonBaseProps & {
  /** Thumbnail placeholder shape — circle, square, or rectangle. */ variant: ThumbnailVariant;
  /**
   * Thumbnail dimensions in pixels.
   * @default "48"
   */
  size?: ThumbnailSize;
};
type SkeletonProps = (TextSkeletonProps | ThumbnailSkeletonProps) & Omit<ComponentProps<"div">, "className">;
/** Loading placeholder with shimmer animation for text lines and circular, square, or rectangular thumbnails. */
declare function Skeleton({
  className,
  variant,
  size,
  width,
  "aria-label": ariaLabel,
  style,
  ...props
}: SkeletonProps): import("react").JSX.Element;
//#endregion
export { Skeleton, SkeletonProps, skeletonBarVariants, skeletonVariants };
