import { ComponentProps } from "react";

//#region src/components/pagination/get-pagination-items.d.ts
type PaginationItem =
  | {
      type: "page";
      page: number;
    }
  | {
      type: "ellipsis";
    };
declare function getPaginationItems(currentPage: number, totalPages: number): PaginationItem[];
//#endregion
//#region src/components/pagination/index.d.ts
declare const paginationVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        layout?: "centered" | "end" | "spread" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const paginationButtonVariants: (
  props?:
    | ({
        size?: "lg" | "sm" | null | undefined;
        state?: "active" | "default" | "disabled" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type PaginationSize = "sm" | "lg";
type PaginationBaseProps = {
  /** Additional CSS class names applied to the navigation element. */ className?: string /** Currently active page (1-based). */;
  page: number /** Total number of pages available. */;
  totalPages: number /** Called when the user selects a different page. */;
  onPageChange?: (page: number) => void;
  /**
   * Visual size of the pagination controls.
   * @default "lg"
   */
  size?: PaginationSize;
  /**
   * Shows Back and Next buttons alongside page numbers.
   * Defaults to `true` when `size` is `"lg"`.
   */
  showNavigation?: boolean;
  /**
   * Accessible label for the previous-page button.
   * @default "Back"
   */
  previousLabel?: string;
  /**
   * Accessible label for the next-page button.
   * @default "Next"
   */
  nextLabel?: string;
  /**
   * Accessible name for the pagination landmark.
   * @default "Pagination"
   */
  "aria-label"?: string;
};
type PaginationProps = PaginationBaseProps & Omit<ComponentProps<"nav">, "className" | "aria-label">;
/** Page navigation control with numbered pages, ellipsis for long ranges, and optional previous and next actions. */
declare function Pagination({
  className,
  page,
  totalPages,
  onPageChange,
  size,
  showNavigation,
  previousLabel,
  nextLabel,
  "aria-label": ariaLabel,
  ...props
}: PaginationProps): import("react").JSX.Element;
//#endregion
export {
  getPaginationItems as a,
  paginationVariants as i,
  PaginationProps as n,
  paginationButtonVariants as r,
  Pagination as t,
};
