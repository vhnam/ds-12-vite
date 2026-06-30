import { Button as BaseButton } from '@base-ui/react/button';
import { cva } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';
import { getPaginationItems } from './get-pagination-items.ts';

const paginationVariants = cva('pagination', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    layout: {
      centered: '',
      spread: '',
      end: '',
    },
  },
  compoundVariants: [
    { size: 'lg', layout: 'centered', class: 'pagination-preset-lg-centered' },
    { size: 'lg', layout: 'spread', class: 'pagination-preset-lg-spread' },
    { size: 'lg', layout: 'end', class: 'pagination-preset-lg-end' },
    { size: 'sm', layout: 'end', class: 'pagination-preset-sm-end' },
  ],
  defaultVariants: {
    size: 'lg',
    layout: 'centered',
  },
});

const paginationButtonVariants = cva('pagination-button', {
  variants: {
    size: {
      sm: '',
      lg: '',
    },
    state: {
      default: '',
      active: '',
      disabled: '',
    },
  },
  compoundVariants: [
    { size: 'lg', state: 'default', class: 'pagination-button-preset-lg-default' },
    { size: 'lg', state: 'active', class: 'pagination-button-preset-lg-active' },
    { size: 'lg', state: 'disabled', class: 'pagination-button-preset-lg-disabled' },
    { size: 'sm', state: 'default', class: 'pagination-button-preset-sm-default' },
    { size: 'sm', state: 'active', class: 'pagination-button-preset-sm-active' },
    { size: 'sm', state: 'disabled', class: 'pagination-button-preset-sm-disabled' },
  ],
  defaultVariants: {
    size: 'lg',
    state: 'default',
  },
});

type PaginationSize = 'sm' | 'lg';

type PaginationBaseProps = {
  /** Additional CSS class names applied to the navigation element. */
  className?: string;
  /** Currently active page (1-based). */
  page: number;
  /** Total number of pages available. */
  totalPages: number;
  /** Called when the user selects a different page. */
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
  'aria-label'?: string;
};

export type PaginationProps = PaginationBaseProps & Omit<ComponentProps<'nav'>, 'className' | 'aria-label'>;

type PaginationButtonProps = {
  className?: string;
  size: PaginationSize;
  state: 'default' | 'active' | 'disabled';
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  'aria-label'?: string;
  'aria-current'?: 'page' | undefined;
};

function PaginationButton({
  className,
  size,
  state,
  label,
  onClick,
  disabled,
  'aria-label': ariaLabel,
  'aria-current': ariaCurrent,
}: PaginationButtonProps) {
  const isDisabled = disabled || state === 'disabled';

  return (
    <BaseButton
      type="button"
      className={cn(paginationButtonVariants({ size, state, className }))}
      data-slot="pagination-button"
      disabled={isDisabled}
      focusableWhenDisabled
      onClick={onClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
      tabIndex={state === 'disabled' && label === '...' ? -1 : undefined}
    >
      <span className="pagination-label">{label}</span>
    </BaseButton>
  );
}

/** Page navigation control with numbered pages, ellipsis for long ranges, and optional previous and next actions. */
export function Pagination({
  className,
  page,
  totalPages,
  onPageChange,
  size = 'lg',
  showNavigation,
  previousLabel = 'Back',
  nextLabel = 'Next',
  'aria-label': ariaLabel = 'Pagination',
  ...props
}: PaginationProps) {
  const resolvedSize = size ?? 'lg';
  const resolvedShowNavigation = showNavigation ?? resolvedSize === 'lg';
  const safePage = Math.min(Math.max(page, 1), Math.max(totalPages, 1));
  const items = getPaginationItems(safePage, totalPages);
  const layout = resolvedSize === 'lg' && resolvedShowNavigation && totalPages >= 5 ? 'spread' : 'centered';

  const handlePageChange = (nextPage: number) => {
    if (nextPage < 1 || nextPage > totalPages || nextPage === safePage) {
      return;
    }
    onPageChange?.(nextPage);
  };

  const pageButtons = items.map((item, index) => {
    if (item.type === 'ellipsis') {
      return (
        <PaginationButton
          key={`ellipsis-${index}`}
          size={resolvedSize}
          state="disabled"
          label="..."
          disabled
          aria-label="More pages"
        />
      );
    }

    const isActive = item.page === safePage;

    return (
      <PaginationButton
        key={item.page}
        size={resolvedSize}
        state={isActive ? 'active' : 'default'}
        label={String(item.page)}
        onClick={() => handlePageChange(item.page)}
        aria-label={`Page ${item.page}`}
        aria-current={isActive ? 'page' : undefined}
      />
    );
  });

  if (resolvedShowNavigation) {
    return (
      <nav
        className={cn(paginationVariants({ size: resolvedSize, layout, className }))}
        data-slot="pagination"
        aria-label={ariaLabel}
        {...props}
      >
        <PaginationButton
          size={resolvedSize}
          state={safePage <= 1 ? 'disabled' : 'default'}
          label={previousLabel}
          disabled={safePage <= 1}
          onClick={() => handlePageChange(safePage - 1)}
          aria-label={previousLabel}
        />
        <div className="pagination-pages">{pageButtons}</div>
        <PaginationButton
          size={resolvedSize}
          state={safePage >= totalPages ? 'disabled' : 'default'}
          label={nextLabel}
          disabled={safePage >= totalPages}
          onClick={() => handlePageChange(safePage + 1)}
          aria-label={nextLabel}
        />
      </nav>
    );
  }

  return (
    <nav
      className={cn(paginationVariants({ size: resolvedSize, layout: 'end', className }))}
      data-slot="pagination"
      aria-label={ariaLabel}
      {...props}
    >
      {pageButtons}
    </nav>
  );
}

export { getPaginationItems, paginationButtonVariants, paginationVariants };
