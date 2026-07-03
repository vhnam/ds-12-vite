import { Button as BaseButton } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';
import { isValidElement, type ComponentProps, type ReactElement, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const tableHeadVariants = cva('table-head-cell', {
  variants: {
    align: {
      start: '',
      end: '',
    },
    variant: {
      default: '',
      avatar: '',
    },
  },
  compoundVariants: [{ align: 'end', class: 'table-head-cell-end' }],
  defaultVariants: {
    align: 'start',
    variant: 'default',
  },
});

const tableCellVariants = cva('table-cell', {
  variants: {
    variant: {
      default: '',
      stacked: '',
      avatar: '',
      custom: '',
    },
    align: {
      start: '',
      end: '',
    },
    state: {
      default: '',
      hovered: '',
      focused: '',
      highlighted: '',
      disabled: '',
    },
  },
  compoundVariants: [
    { variant: 'stacked', class: 'table-cell-stacked' },
    { variant: 'avatar', class: 'table-cell-avatar' },
    { variant: 'custom', class: 'table-cell-custom' },
    { align: 'end', class: 'table-cell-end' },
    { state: 'default', class: 'table-cell-default' },
    { state: 'hovered', class: 'table-cell-hovered' },
    { state: 'focused', class: 'table-cell-focused' },
    { state: 'highlighted', class: 'table-cell-highlighted' },
    { state: 'disabled', class: 'table-cell-disabled' },
  ],
  defaultVariants: {
    variant: 'default',
    align: 'start',
    state: 'default',
  },
});

const tableRowVariants = cva('table-row', {
  variants: {
    interactive: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [{ interactive: true, class: 'table-row-interactive' }],
  defaultVariants: {
    interactive: false,
  },
});

type TableCellVariant = NonNullable<VariantProps<typeof tableCellVariants>['variant']>;
type TableCellState = NonNullable<VariantProps<typeof tableCellVariants>['state']>;

export type TableSortDirection = 'ascending' | 'descending' | 'none';

function resolveAriaSort(sortable: boolean, sortDirection?: TableSortDirection): TableSortDirection | undefined {
  if (!sortable) {
    return undefined;
  }

  return sortDirection ?? 'none';
}

function resolveSortLabel(heading: string, sortDirection?: TableSortDirection) {
  if (sortDirection === 'ascending') {
    return `${heading}, sorted ascending`;
  }

  if (sortDirection === 'descending') {
    return `${heading}, sorted descending`;
  }

  return `Sort by ${heading}`;
}

function getNodeText(node: ReactNode): string | undefined {
  if (node === null || node === undefined || typeof node === 'boolean') {
    return undefined;
  }

  if (typeof node === 'string' || typeof node === 'number') {
    return String(node);
  }

  if (Array.isArray(node)) {
    const text = node.map(getNodeText).filter(Boolean).join(' ');
    return text || undefined;
  }

  if (isValidElement(node)) {
    return getNodeText((node as ReactElement<{ children?: ReactNode }>).props.children);
  }

  return undefined;
}

export type TableProps = ComponentProps<'table'> & {
  /** Additional CSS class names applied to the table element. */
  className?: string;
};

export type TableHeaderProps = ComponentProps<'thead'> & {
  className?: string;
};

export type TableBodyProps = ComponentProps<'tbody'> & {
  className?: string;
};

export type TableRowProps = ComponentProps<'tr'> &
  VariantProps<typeof tableRowVariants> & {
    className?: string;
  };

export type TableHeadProps = Omit<ComponentProps<'th'>, 'align'> &
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
    onSort?: ComponentProps<typeof BaseButton>['onClick'];
  };

export type TableCellProps = Omit<ComponentProps<'td'>, 'align'> &
  VariantProps<typeof tableCellVariants> & {
    className?: string;
    /**
     * Static visual state for design previews and Storybook.
     * Interactive rows apply hover and focus styles automatically via CSS when `state` is `"default"`.
     */
    state?: TableCellState;
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
    <table className={cn('table', className)} data-slot="table" {...props}>
      {children}
    </table>
  );
}

/** Table header section (`thead`). */
export function TableHeader({ className, children, ...props }: TableHeaderProps) {
  return (
    <thead className={cn('table-head', className)} data-slot="table-head" {...props}>
      {children}
    </thead>
  );
}

/** Table body section (`tbody`). */
export function TableBody({ className, children, ...props }: TableBodyProps) {
  return (
    <tbody className={cn('table-body', className)} data-slot="table-body" {...props}>
      {children}
    </tbody>
  );
}

/** Table row (`tr`) with optional interactive hover styling. */
export function TableRow({ className, interactive, children, ...props }: TableRowProps) {
  return (
    <tr className={cn(tableRowVariants({ interactive, className }))} data-slot="table-row" {...props}>
      {children}
    </tr>
  );
}

function resolveSortIcon(sortDirection?: TableSortDirection) {
  if (sortDirection === 'ascending') {
    return 'keyboard_arrow_up';
  }

  if (sortDirection === 'descending') {
    return 'keyboard_arrow_down';
  }

  return 'unfold_more';
}

function TableSortButton({
  label,
  sortDirection,
  onClick,
}: {
  label: string;
  sortDirection?: TableSortDirection;
  onClick?: ComponentProps<typeof BaseButton>['onClick'];
}) {
  return (
    <BaseButton
      type="button"
      className="table-sort-button"
      data-slot="table-sort-button"
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
  align = 'start',
  variant = 'default',
  avatar,
  sortable = false,
  sortDirection,
  sortLabel,
  children,
  onSort,
  ...props
}: TableHeadProps) {
  const resolvedAlign = align ?? 'start';
  const resolvedVariant = variant ?? 'default';
  const heading = getNodeText(children) ?? 'column';
  const resolvedSortLabel = sortLabel ?? resolveSortLabel(heading, sortDirection);

  return (
    <th
      scope="col"
      className={cn(tableHeadVariants({ align: resolvedAlign, variant: resolvedVariant, className }))}
      data-slot="table-head-cell"
      data-variant={resolvedVariant}
      aria-sort={resolveAriaSort(sortable, sortDirection)}
      {...props}
    >
      <div className="table-head-inner" data-slot="table-head-inner">
        {resolvedVariant === 'avatar' && avatar ? (
          <span className="table-head-avatar" data-slot="table-head-avatar">
            {avatar}
          </span>
        ) : null}
        <span className="table-head-label" data-slot="table-head-label">
          {children}
        </span>
        {sortable ? <TableSortButton label={resolvedSortLabel} sortDirection={sortDirection} onClick={onSort} /> : null}
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
  const isDisabled = state === 'disabled';

  if (variant === 'custom') {
    return (
      <div className="table-cell-slot" data-slot="table-cell-slot">
        {children}
      </div>
    );
  }

  if (variant === 'stacked' || variant === 'avatar') {
    return (
      <>
        {variant === 'avatar' && avatar ? avatar : null}
        <div className="table-cell-stack" data-slot="table-cell-stack">
          {text ? (
            <span className="table-cell-primary" data-slot="table-cell-primary">
              {text}
            </span>
          ) : null}
          {subText ? (
            <span className="table-cell-subtext" data-slot="table-cell-subtext">
              {subText}
            </span>
          ) : null}
        </div>
        {showChevron && !isDisabled ? (
          <Icon name="chevron_forward" size={20} className="table-cell-chevron" data-slot="table-cell-chevron" />
        ) : null}
      </>
    );
  }

  return (
    <>
      {text || children ? (
        <span className="table-cell-text" data-slot="table-cell-text">
          {text ?? children}
        </span>
      ) : null}
      {showChevron && !isDisabled ? (
        <Icon name="chevron_forward" size={20} className="table-cell-chevron" data-slot="table-cell-chevron" />
      ) : null}
    </>
  );
}

/** Table body cell supporting text, stacked, avatar, and custom content layouts. */
export function TableCell({
  className,
  variant = 'default',
  align = 'start',
  state = 'default',
  text,
  subText,
  avatar,
  showChevron = false,
  children,
  ...props
}: TableCellProps) {
  const resolvedVariant = variant ?? 'default';
  const resolvedAlign = align ?? 'start';
  const resolvedState = state ?? 'default';
  const usesChildrenOnly = resolvedVariant === 'custom' || (resolvedVariant === 'default' && !text);

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
      data-slot="table-cell"
      data-variant={resolvedVariant}
      {...props}
    >
      <div className="table-cell-inner" data-slot="table-cell-inner">
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
      {resolvedState === 'focused' ? (
        <span className="table-cell-focus-ring" data-slot="table-cell-focus-ring" aria-hidden />
      ) : null}
    </td>
  );
}

export { tableCellVariants, tableHeadVariants, tableRowVariants };
