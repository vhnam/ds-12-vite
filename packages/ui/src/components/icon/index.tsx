import type { ComponentProps, CSSProperties } from "react";
import { useContext } from "react";

import { BadgeIconSizeContext } from "../badge/index.tsx";
import { cn } from "../../lib/utils.ts";
import "./icon.css";

type IconVariant = "outlined" | "filled";
type IconAlign = "inline-start" | "inline-end";

const DEFAULT_ICON_SIZE = 20;

function iconVariationSettings(
  variant: IconVariant,
  size: number,
): CSSProperties["fontVariationSettings"] {
  const fill = variant === "filled" ? 1 : 0;
  return `"FILL" ${fill}, "wght" 400, "GRAD" 0, "opsz" ${size}`;
}

type IconProps = ComponentProps<"span"> & {
  name: string;
  variant?: IconVariant;
  align?: IconAlign;
  size?: number;
};

function Icon({ name, variant = "outlined", align, size, className, style, ...props }: IconProps) {
  const badgeIconSize = useContext(BadgeIconSizeContext);
  const resolvedSize = size ?? badgeIconSize ?? DEFAULT_ICON_SIZE;

  return (
    <span
      className={cn("material-symbols-outlined", "ds-icon", className)}
      data-align={align}
      style={{
        fontSize: resolvedSize,
        fontVariationSettings: iconVariationSettings(variant, resolvedSize),
        ...style,
      }}
      aria-hidden
      {...props}
    >
      {name}
    </span>
  );
}

export { DEFAULT_ICON_SIZE, Icon, type IconAlign, type IconVariant };
