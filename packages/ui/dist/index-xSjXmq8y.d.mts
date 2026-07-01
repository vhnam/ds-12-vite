import { ComponentProps, ReactNode } from "react";

//#region src/components/breadcrumb/get-breadcrumb-segments.d.ts
type BreadcrumbItem = {
  /** Visible label for the breadcrumb segment. */ label: string /** Destination URL for ancestor segments. Omit on the current page. */;
  href?: string /** Custom segment content — use for framework-specific links when `renderLink` is not enough. */;
  render?: ReactNode;
};
type BreadcrumbSegment =
  | {
      type: "link";
      label: string;
      href: string;
      render?: ReactNode;
    }
  | {
      type: "page";
      label: string;
      render?: ReactNode;
    }
  | {
      type: "ellipsis";
    };
/**
 * Resolves breadcrumb items into renderable segments.
 * When collapsed and more than three items exist, shows the first item, an ellipsis,
 * then the last two segments — matching the Figma `collapsed` variant.
 */
declare function getBreadcrumbSegments(items: BreadcrumbItem[], collapsed: boolean): BreadcrumbSegment[];
//#endregion
//#region src/components/breadcrumb/index.d.ts
declare const BreadcrumbIconSizeContext: import("react").Context<number | undefined>;
declare const breadcrumbVariants: (
  props?:
    | ({
        collapsed?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type BreadcrumbLinkRenderProps = {
  href: string;
  label: string;
  className: string;
  "data-slot": "breadcrumb-link";
};
type BreadcrumbProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Additional CSS class names applied to the navigation element. */ className?: string /** Ordered breadcrumb segments from root to the current page. */;
  items: BreadcrumbItem[];
  /**
   * Collapses middle segments with an ellipsis when more than three items are present.
   * Matches the Figma `collapsed` variant.
   * @default false
   */
  collapsed?: boolean;
  /**
   * Renders ancestor link segments — use for framework routers such as TanStack Router or Next.js.
   * Receives DS breadcrumb link classes via `className`.
   */
  renderLink?: (props: BreadcrumbLinkRenderProps) => ReactNode;
};
/** Secondary navigation trail showing the user's location within a page hierarchy. */
declare function Breadcrumb({
  className,
  items,
  collapsed,
  renderLink,
  "aria-label": ariaLabel,
  ...props
}: BreadcrumbProps): import("react").JSX.Element;
//#endregion
export {
  breadcrumbVariants as a,
  getBreadcrumbSegments as c,
  BreadcrumbProps as i,
  BreadcrumbIconSizeContext as n,
  BreadcrumbItem as o,
  BreadcrumbLinkRenderProps as r,
  BreadcrumbSegment as s,
  Breadcrumb as t,
};
