import { ComponentProps } from "react";

//#region src/components/icon/index.d.ts
type IconVariant = "outlined" | "filled";
type IconAlign = "inline-start" | "inline-end";
declare const DEFAULT_ICON_SIZE = 20;
type IconProps = ComponentProps<"span"> & {
  /** Material Symbols icon name (e.g. `"check_circle"`, `"download"`). */ name: string;
  /**
   * Visual style — use `"filled"` for active or selected states.
   * @default "outlined"
   */
  variant?: IconVariant;
  /**
   * Nudges the icon flush with adjacent inline text.
   */
  align?: IconAlign;
  /**
   * Icon size in pixels. Inherits from the nearest parent component context when nested inside one.
   * @default 20
   */
  size?: number;
};
/** Material Symbols icon with outlined or filled style and a configurable pixel size. */
declare function Icon({
  name,
  variant,
  align,
  size,
  className,
  style,
  ...props
}: IconProps): import("react").JSX.Element;
//#endregion
export { DEFAULT_ICON_SIZE, Icon, type IconAlign, IconProps, type IconVariant };
