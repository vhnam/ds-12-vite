import { Button as BaseButton } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps, ReactNode } from "react";

import { cn } from "../../lib/utils.ts";
import { Icon } from "../icon/index.tsx";
import "./table.css";

const tableHeadVariants = cva("ds-table__head-cell", {
  variants: {
    align: {
      start: null,
      end: "ds-table__head-cell--end",
    },
    variant: {
      default: null,
      avatar: "ds-table__head-cell--avatar",
    },
  },
  defaultVariants: {
    align: "start",
    variant: "default",
  },
});

const tableCellVariants = cva("ds-table__cell", {
  variants: {
    variant: {
      default: null,
      stacked: "ds-table__cell--stacked",
      avatar: "ds-table__cell--avatar",
      custom: "ds-table__cell--custom",
    },
    align: {
      start: null,
      end: "ds-table__cell--end",
    },
    state: {
      default: "ds-table__cell--default",
      hovered: "ds-table__cell--hovered",
      focused: "ds-table__cell--focused",
      highlighted: "ds-table__cell--highlighted",
      disabled: "ds-table__cell--disabled",
    },
  },
  defaultVariants: {
    variant: "default",
    align: "start",
    state: "default",
  },
});

const tableRowVariants = cva("ds-table__row", {
  variants: {
    interactive: {
      true: "ds-table__row--interactive",
      false: null,
    },
  },
  defaultVariants: {
    interactive: false,
  },
});

type TableCellVariant = NonNullable<VariantProps<typeof tableCellVariants>["variant"]>;
type TableCellState = NonNullable<VariantProps<typeof tableCellVariants>["state"]>;

export type TableSortDirection = "ascending" | "descending" | "none";

function resolveAriaSort(
  sortable: boolean,
  sortDirection?: TableSortDirection,
): TableSortDirection | undefined {
  if (!sortable) {
    return undefined;
  }

  return sortDirection ?? "none";
}

function resolveSortLabel(heading: string, sortDirection?: TableSortDirection) {
  if (sortDirection === "ascending") {
    return `${heading}, sorted ascending`;
  }

  if (sortDirection === "descending") {
    return `${heading}, sorted descending`;
  }

  return `Sort by ${heading}`;
}

export type TableProps = ComponentProps<"table"> & {
  /** Additional CSS class names applied to the table element. */
  className?: string;
};

export type TableHeaderProps = ComponentProps<"thead"> & {
  className?: string;
};

export type TableBodyProps = ComponentProps<"tbody"> & {
  className?: string;
};

export type TableRowProps = ComponentProps<"tr"> &
  VariantProps<typeof tableRowVariants> & {
    className?: string;
  };

export type TableHeadProps = Omit<ComponentProps<"th">, "align"> &
  VariantProps<typeof tableHeadVariants> & {
    className?: string;
    /** Optional avatar rendered before the heading label when `variant` is `"avatar"`. */
    avatar?: ReactNode;
    /** Enables the sort affordance for this column. @default false */
    sortable?: boolean;
    /** Current sort direction for this column — drives `aria-sort` and the sort button label. */
    sortDirection?: TableSortDirection;
    /** Accessible label for the sort button. Defaults based on `children` and `sortDirection`. */
    sortLabel?: string;
    /** Called when the sort button is activated. Wire to TanStack's `column.getToggleSortingHandler()`. */
    onSort?: ComponentProps<typeof BaseButton>["onClick"];
  };

export type TableCellProps = Omit<ComponentProps<"td">, "align"> &
  VariantProps<typeof tableCellVariants> & {
    className?: string;
    /** Primary text for default, stacked, and avatar variants. */
    text?: string;
    /** Secondary text for stacked and avatar variants. */
    subText?: string;
    /** Avatar element for the avatar variant. */
    avatar?: ReactNode;
    /** Shows a trailing chevron icon. */
    showChevron?: boolean;
  };

/** Bordered data table container with token-driven row, header, and cell styling. */
export function Table({ className, children, ...props }: TableProps) {
  return (
    <table className={cn("ds-table", className)} {...props}>
      {children}
    </table>
  );
}

/** Table header section (`thead`). */
export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn("ds-table__head", className)} {...props}>
      {children}
    </thead>
  );
}

/** Table body section (`tbody`). */
export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn("ds-table__body", className)} {...props}>
      {children}
    </tbody>
  );
}

/** Table row (`tr`) with optional interactive hover styling. */
export function TableRow({ className, interactive, children, ...props }: TableRowProps) {
  return (
    <tr className={cn(tableRowVariants({ interactive, className }))} {...props}>
      {children}
    </tr>
  );
}

function resolveSortIcon(sortDirection?: TableSortDirection) {
  if (sortDirection === "ascending") {
    return "keyboard_arrow_up";
  }

  if (sortDirection === "descending") {
    return "keyboard_arrow_down";
  }

  return "unfold_more";
}

function TableSortButton({
  label,
  sortDirection,
  onClick,
}: {
  label: string;
  sortDirection?: TableSortDirection;
  onClick?: ComponentProps<typeof BaseButton>["onClick"];
}) {
  return (
    <BaseButton
      type="button"
      className="ds-table__sort-button"
      aria-label={label}
      onClick={onClick}
    >
      <Icon name={resolveSortIcon(sortDirection)} size={20} />
    </BaseButton>
  );
}

/** Column header cell with optional sort button and avatar. */
export function TableHead({
  className,
  align = "start",
  variant = "default",
  avatar,
  sortable = false,
  sortDirection,
  sortLabel,
  children,
  onSort,
  ...props
}: TableHeadProps) {
  const resolvedAlign = align ?? "start";
  const resolvedVariant = variant ?? "default";
  const heading =
    typeof children === "string" || typeof children === "number" ? String(children) : "column";
  const resolvedSortLabel = sortLabel ?? resolveSortLabel(heading, sortDirection);

  return (
    <th
      scope="col"
      className={cn(
        tableHeadVariants({ align: resolvedAlign, variant: resolvedVariant, className }),
      )}
      aria-sort={resolveAriaSort(sortable, sortDirection)}
      {...props}
    >
      <div className="ds-table__head-inner">
        {resolvedVariant === "avatar" && avatar ? (
          <span className="ds-table__head-avatar">{avatar}</span>
        ) : null}
        <span className="ds-table__head-label">{children}</span>
        {sortable ? (
          <TableSortButton
            label={resolvedSortLabel}
            sortDirection={sortDirection}
            onClick={onSort}
          />
        ) : null}
      </div>
    </th>
  );
}

function TableCellContent({
  variant,
  state,
  text,
  subText,
  avatar,
  showChevron,
  children,
}: {
  variant: TableCellVariant;
  state: TableCellState;
  text?: string;
  subText?: string;
  avatar?: ReactNode;
  showChevron?: boolean;
  children?: ReactNode;
}) {
  const isDisabled = state === "disabled";

  if (variant === "custom") {
    return <div className="ds-table__cell-slot">{children}</div>;
  }

  if (variant === "stacked" || variant === "avatar") {
    return (
      <>
        {variant === "avatar" && avatar ? avatar : null}
        <div className="ds-table__cell-stack">
          {text ? <span className="ds-table__cell-primary">{text}</span> : null}
          {subText ? <span className="ds-table__cell-subtext">{subText}</span> : null}
        </div>
        {showChevron && !isDisabled ? (
          <Icon name="chevron_forward" size={20} className="ds-table__cell-chevron" />
        ) : null}
      </>
    );
  }

  return (
    <>
      {text || children ? <span className="ds-table__cell-text">{text ?? children}</span> : null}
      {showChevron && !isDisabled ? (
        <Icon name="chevron_forward" size={20} className="ds-table__cell-chevron" />
      ) : null}
    </>
  );
}

/** Table body cell supporting text, stacked, avatar, and custom content layouts. */
export function TableCell({
  className,
  variant = "default",
  align = "start",
  state = "default",
  text,
  subText,
  avatar,
  showChevron = false,
  children,
  ...props
}: TableCellProps) {
  const resolvedVariant = variant ?? "default";
  const resolvedAlign = align ?? "start";
  const resolvedState = state ?? "default";
  const usesChildrenOnly = resolvedVariant === "custom" || (resolvedVariant === "default" && !text);

  return (
    <td
      className={cn(
        tableCellVariants({
          variant: resolvedVariant,
          align: resolvedAlign,
          state: resolvedState,
          className,
        }),
      )}
      {...props}
    >
      <div className="ds-table__cell-inner">
        <TableCellContent
          variant={resolvedVariant}
          state={resolvedState}
          text={text}
          subText={subText}
          avatar={avatar}
          showChevron={showChevron}
        >
          {usesChildrenOnly ? children : undefined}
        </TableCellContent>
      </div>
      {resolvedState === "focused" ? (
        <span className="ds-table__cell-focus-ring" aria-hidden />
      ) : null}
    </td>
  );
}

export { tableCellVariants, tableHeadVariants, tableRowVariants };
