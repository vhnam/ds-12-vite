import { cva } from "class-variance-authority";
import type { ComponentProps, CSSProperties } from "react";

import "@ds-12/design-tokens/tokens.css";
import { cn } from "../../lib/utils.ts";
import "./skeleton.css";

const TEXT_VARIANTS = ["h1", "h2", "h3", "h4", "paragraph", "label"] as const;
const THUMBNAIL_VARIANTS = ["circle", "square", "rectangle"] as const;

type TextVariant = (typeof TEXT_VARIANTS)[number];
type ThumbnailVariant = (typeof THUMBNAIL_VARIANTS)[number];
type SkeletonVariant = TextVariant | ThumbnailVariant;
type ThumbnailSize = "32" | "48" | "72" | "128";

const skeletonVariants = cva("ds-skeleton", {
  variants: {
    variant: {
      h1: "ds-skeleton--h1",
      h2: "ds-skeleton--h2",
      h3: "ds-skeleton--h3",
      h4: "ds-skeleton--h4",
      paragraph: "ds-skeleton--paragraph",
      label: "ds-skeleton--label",
      circle: "ds-skeleton--circle",
      square: "ds-skeleton--square",
      rectangle: "ds-skeleton--rectangle",
    },
    size: {
      "32": "ds-skeleton--32",
      "48": "ds-skeleton--48",
      "72": "ds-skeleton--72",
      "128": "ds-skeleton--128",
    },
  },
  defaultVariants: {
    variant: "paragraph",
    size: "48",
  },
});

type SkeletonBaseProps = {
  className?: string;
  "aria-label"?: string;
  width?: CSSProperties["width"];
};

type TextSkeletonProps = SkeletonBaseProps & {
  variant?: TextVariant;
  size?: never;
};

type ThumbnailSkeletonProps = SkeletonBaseProps & {
  variant: ThumbnailVariant;
  size?: ThumbnailSize;
};

export type SkeletonProps = (TextSkeletonProps | ThumbnailSkeletonProps) &
  Omit<ComponentProps<"div">, "className">;

function isTextVariant(variant: SkeletonVariant): variant is TextVariant {
  return (TEXT_VARIANTS as readonly string[]).includes(variant);
}

export function Skeleton({
  className,
  variant = "paragraph",
  size = "48",
  width,
  "aria-label": ariaLabel = "Loading",
  style,
  ...props
}: SkeletonProps) {
  const resolvedVariant = variant ?? "paragraph";
  const isText = isTextVariant(resolvedVariant);
  const classes = cn(
    skeletonVariants({
      variant: resolvedVariant,
      size: isText ? undefined : size,
      className,
    }),
  );
  const mergedStyle = width !== undefined ? { ...style, width } : style;

  if (isText) {
    return (
      <div
        className={classes}
        style={mergedStyle}
        role="status"
        aria-busy="true"
        aria-label={ariaLabel}
        {...props}
      >
        <div className="ds-skeleton__bar" aria-hidden="true" />
      </div>
    );
  }

  return (
    <div
      className={classes}
      style={mergedStyle}
      role="status"
      aria-busy="true"
      aria-label={ariaLabel}
      {...props}
    />
  );
}

export { skeletonVariants };
