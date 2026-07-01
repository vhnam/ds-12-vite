import type { ReactNode } from 'react';

export type BreadcrumbItem = {
  /** Visible label for the breadcrumb segment. */
  label: string;
  /** Destination URL for ancestor segments. Omit on the current page. */
  href?: string;
  /** Custom segment content — use for framework-specific links when `renderLink` is not enough. */
  render?: ReactNode;
};

export type BreadcrumbSegment =
  | { type: 'link'; label: string; href: string; render?: ReactNode }
  | { type: 'page'; label: string; render?: ReactNode }
  | { type: 'ellipsis' };

/**
 * Resolves breadcrumb items into renderable segments.
 * When collapsed and more than three items exist, shows the first item, an ellipsis,
 * then the last two segments — matching the Figma `collapsed` variant.
 */
export function getBreadcrumbSegments(items: BreadcrumbItem[], collapsed: boolean): BreadcrumbSegment[] {
  if (items.length === 0) {
    return [];
  }

  const toSegment = (item: BreadcrumbItem, isLast: boolean): BreadcrumbSegment => {
    if (!isLast && item.href) {
      return { type: 'link', label: item.label, href: item.href, render: item.render };
    }

    return { type: 'page', label: item.label, render: item.render };
  };

  if (!collapsed || items.length <= 3) {
    return items.map((item, index) => toSegment(item, index === items.length - 1));
  }

  const trailing = items.slice(-2);

  return [
    toSegment(items[0], false),
    { type: 'ellipsis' },
    toSegment(trailing[0], trailing.length === 1),
    ...(trailing.length > 1 ? [toSegment(trailing[1], true)] : []),
  ];
}
