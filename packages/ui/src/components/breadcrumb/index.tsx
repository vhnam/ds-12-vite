import { cva } from 'class-variance-authority';
import { createContext, Fragment, type ComponentProps, type ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';
import { getBreadcrumbSegments, type BreadcrumbItem, type BreadcrumbSegment } from './get-breadcrumb-segments.ts';

const BREADCRUMB_ICON_SIZE = 14;
const BREADCRUMB_LINK_CLASS = 'breadcrumb-link breadcrumb-label';
const BREADCRUMB_PAGE_CLASS = 'breadcrumb-page breadcrumb-label';

export const BreadcrumbIconSizeContext = createContext<number | undefined>(undefined);

const breadcrumbVariants = cva('breadcrumb', {
  variants: {
    collapsed: {
      true: '',
      false: '',
    },
  },
  defaultVariants: {
    collapsed: false,
  },
});

export type BreadcrumbLinkRenderProps = {
  href: string;
  label: string;
  className: string;
  'data-slot': 'breadcrumb-link';
};

export type BreadcrumbProps = Omit<ComponentProps<'nav'>, 'children'> & {
  /** Additional CSS class names applied to the navigation element. */
  className?: string;
  /** Ordered breadcrumb segments from root to the current page. */
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

function BreadcrumbSeparatorIcon() {
  return (
    <span className="breadcrumb-separator" data-slot="breadcrumb-separator" aria-hidden="true">
      <span className="breadcrumb-icon">
        <Icon name="chevron_forward" size={BREADCRUMB_ICON_SIZE} />
      </span>
    </span>
  );
}

function BreadcrumbEllipsisIcon() {
  return (
    <span className="breadcrumb-ellipsis" data-slot="breadcrumb-ellipsis" aria-hidden="true">
      <span className="breadcrumb-icon">
        <Icon name="more_horiz" size={BREADCRUMB_ICON_SIZE} />
      </span>
    </span>
  );
}

function renderSegment(segment: BreadcrumbSegment, key: string, renderLink?: BreadcrumbProps['renderLink']) {
  if (segment.type === 'ellipsis') {
    return <BreadcrumbEllipsisIcon key={key} />;
  }

  if (segment.render) {
    return <Fragment key={key}>{segment.render}</Fragment>;
  }

  if (segment.type === 'link') {
    if (renderLink) {
      return (
        <Fragment key={key}>
          {renderLink({
            href: segment.href,
            label: segment.label,
            className: BREADCRUMB_LINK_CLASS,
            'data-slot': 'breadcrumb-link',
          })}
        </Fragment>
      );
    }

    return (
      <a key={key} className={BREADCRUMB_LINK_CLASS} href={segment.href} data-slot="breadcrumb-link">
        {segment.label}
      </a>
    );
  }

  return (
    <span key={key} className={BREADCRUMB_PAGE_CLASS} data-slot="breadcrumb-page" aria-current="page">
      {segment.label}
    </span>
  );
}

/** Secondary navigation trail showing the user's location within a page hierarchy. */
export function Breadcrumb({
  className,
  items,
  collapsed = false,
  renderLink,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: BreadcrumbProps) {
  const segments = getBreadcrumbSegments(items, collapsed);
  const resolvedCollapsed = collapsed && items.length > 3;

  return (
    <BreadcrumbIconSizeContext.Provider value={BREADCRUMB_ICON_SIZE}>
      <nav
        className={cn(breadcrumbVariants({ collapsed, className }))}
        data-slot="breadcrumb"
        data-variant={resolvedCollapsed ? 'collapsed' : 'default'}
        aria-label={ariaLabel}
        {...props}
      >
        <ol className="breadcrumb-list">
          {segments.map((segment, index) => {
            const isLast = index === segments.length - 1;

            return (
              <li key={`${segment.type}-${index}`} className="breadcrumb-item" data-slot="breadcrumb-item">
                {renderSegment(segment, `${segment.type}-${index}`, renderLink)}
                {!isLast ? <BreadcrumbSeparatorIcon /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </BreadcrumbIconSizeContext.Provider>
  );
}

export { breadcrumbVariants, getBreadcrumbSegments, type BreadcrumbItem, type BreadcrumbSegment };
