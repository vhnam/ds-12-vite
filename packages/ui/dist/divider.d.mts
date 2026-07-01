import { Separator } from "@base-ui/react/separator";
import { ComponentProps } from "react";

//#region src/components/divider/index.d.ts
type DividerOrientation = "horizontal" | "vertical";
declare const dividerVariants: (
  props?:
    | ({
        orientation?: "horizontal" | "vertical" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type DividerProps = ComponentProps<typeof Separator> & {
  /** Additional CSS class names applied to the separator element. */ className?: string;
  /**
   * Layout direction of the separator line.
   * @default "horizontal"
   */
  orientation?: DividerOrientation;
};
/** Visual separator between content sections, rendered horizontally or vertically. */
declare function Divider({ className, orientation, ...props }: DividerProps): import("react").JSX.Element;
//#endregion
export { Divider, type DividerOrientation, DividerProps, dividerVariants };
