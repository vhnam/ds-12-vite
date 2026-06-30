import { useRender } from "@base-ui/react/use-render";
import { JSX } from "react";

//#region src/components/typography/index.d.ts
declare const typographyVariants: (
  props?: {
    variant?: "display" | "h1" | "h2" | "h3" | "h4" | "label" | "paragraph" | null | undefined;
    size?: "lg" | "md" | "sm" | "xl" | null | undefined;
    weight?: "bold" | "regular" | "semibold" | null | undefined;
  } & import("class-variance-authority/types").ClassProp,
) => string;
type TypographyVariant = "display" | "h1" | "h2" | "h3" | "h4" | "paragraph" | "label";
type TypographySize = "sm" | "md" | "lg" | "xl";
type TypographyWeight = "regular" | "semibold" | "bold";
type TypographyState = {
  slot: "typography";
  variant: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
};
type TypographyRender = keyof JSX.IntrinsicElements | useRender.RenderProp<TypographyState>;
type TypographyBaseProps = Omit<useRender.ComponentProps<"div">, "render"> & {
  /**
   * Semantic HTML element or render prop. Use a tag name (e.g. `"h1"`, `"p"`, `"label"`)
   * to output the correct element for the chosen variant.
   */
  render?: TypographyRender;
};
type TypographyDisplayProps = TypographyBaseProps & {
  variant: "display";
  size?: never;
  weight?: never;
};
type TypographyHeadingProps = TypographyBaseProps & {
  variant: "h1" | "h2" | "h3" | "h4";
  size?: never /** Only `regular` and `bold` are valid. Defaults to `bold`. */;
  weight?: "regular" | "bold";
};
type TypographyParagraphProps = TypographyBaseProps & {
  variant: "paragraph" /** Defaults to `md`. */;
  size?: "sm" | "md" | "lg" | "xl";
  /**
   * Constrained per size: `sm` → `regular` only; `xl` → `semibold` only;
   * `md`/`lg` → `regular` or `semibold`. Defaults to `regular`.
   */
  weight?: "regular" | "semibold";
};
type TypographyLabelProps = TypographyBaseProps & {
  variant: "label" /** Defaults to `md`. Weight is always semibold and is not configurable. */;
  size?: "sm" | "md" | "lg";
  weight?: never;
};
type TypographyProps =
  | TypographyDisplayProps
  | TypographyHeadingProps
  | TypographyParagraphProps
  | TypographyLabelProps;
/** Semantic text styles for display copy, headings, paragraphs, and labels. */
declare function Typography({
  className,
  variant,
  size,
  weight,
  children,
  render,
  ...props
}: TypographyProps): import("react").ReactElement<unknown, string | import("react").JSXElementConstructor<any>>;
//#endregion
export {
  Typography,
  type TypographyProps,
  type TypographyRender,
  type TypographySize,
  type TypographyVariant,
  type TypographyWeight,
  typographyVariants,
};
