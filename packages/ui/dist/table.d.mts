import { Button } from "@base-ui/react/button";
import { VariantProps } from "class-variance-authority";
import { ComponentProps, ReactNode } from "react";

//#region src/components/table/index.d.ts
declare const tableHeadVariants: (
  props?:
    | ({
        align?: "end" | "start" | null | undefined;
        variant?: "avatar" | "default" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const tableCellVariants: (
  props?:
    | ({
        variant?: "avatar" | "custom" | "default" | "stacked" | null | undefined;
        align?: "end" | "start" | null | undefined;
        state?: "default" | "disabled" | "focused" | "highlighted" | "hovered" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const tableRowVariants: (
  props?:
    | ({
        interactive?: boolean | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type TableCellState = NonNullable<VariantProps<typeof tableCellVariants>["state"]>;
type TableSortDirection = "ascending" | "descending" | "none";
type TableProps = ComponentProps<"table"> & {
  /** Additional CSS class names applied to the table element. */ className?: string;
};
type TableHeaderProps = ComponentProps<"thead"> & {
  className?: string;
};
type TableBodyProps = ComponentProps<"tbody"> & {
  className?: string;
};
type TableRowProps = ComponentProps<"tr"> &
  VariantProps<typeof tableRowVariants> & {
    className?: string;
  };
type TableHeadProps = Omit<ComponentProps<"th">, "align"> &
  VariantProps<typeof tableHeadVariants> & {
    className?: string /** Optional avatar rendered before the heading label when `variant` is `"avatar"`. */;
    avatar?: ReactNode /** Enables the sort affordance for this column. @default false */;
    sortable?: boolean /** Current sort direction for this column — drives `aria-sort` and the sort button label. */;
    sortDirection?: TableSortDirection /** Accessible label for the sort button. Defaults based on `children` and `sortDirection`. */;
    sortLabel?: string /** Called when the sort button is activated. Wire to TanStack's `column.getToggleSortingHandler()`. */;
    onSort?: ComponentProps<typeof Button>["onClick"];
  };
type TableCellProps = Omit<ComponentProps<"td">, "align"> &
  VariantProps<typeof tableCellVariants> & {
    className?: string;
    /**
     * Static visual state for design previews and Storybook.
     * Interactive rows apply hover and focus styles automatically via CSS when `state` is `"default"`.
     */
    state?: TableCellState /** Primary text for default, stacked, and avatar variants. */;
    text?: string /** Secondary text for stacked and avatar variants. */;
    subText?: string /** Avatar element for the avatar variant. */;
    avatar?: ReactNode /** Shows a trailing chevron icon. */;
    showChevron?: boolean;
  };
/** Bordered data table container with token-driven row, header, and cell styling. */
declare function Table({ className, children, ...props }: TableProps): import("react").JSX.Element;
/** Table header section (`thead`). */
declare function TableHeader({ className, children, ...props }: TableHeaderProps): import("react").JSX.Element;
/** Table body section (`tbody`). */
declare function TableBody({ className, children, ...props }: TableBodyProps): import("react").JSX.Element;
/** Table row (`tr`) with optional interactive hover styling. */
declare function TableRow({ className, interactive, children, ...props }: TableRowProps): import("react").JSX.Element;
/** Column header cell with optional sort button and avatar. */
declare function TableHead({
  className,
  align,
  variant,
  avatar,
  sortable,
  sortDirection,
  sortLabel,
  children,
  onSort,
  ...props
}: TableHeadProps): import("react").JSX.Element;
/** Table body cell supporting text, stacked, avatar, and custom content layouts. */
declare function TableCell({
  className,
  variant,
  align,
  state,
  text,
  subText,
  avatar,
  showChevron,
  children,
  ...props
}: TableCellProps): import("react").JSX.Element;
//#endregion
export {
  Table,
  TableBody,
  TableBodyProps,
  TableCell,
  TableCellProps,
  TableHead,
  TableHeadProps,
  TableHeader,
  TableHeaderProps,
  TableProps,
  TableRow,
  TableRowProps,
  TableSortDirection,
  tableCellVariants,
  tableHeadVariants,
  tableRowVariants,
};
