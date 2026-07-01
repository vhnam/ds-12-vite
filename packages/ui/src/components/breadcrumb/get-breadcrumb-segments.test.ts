import { expect, test } from 'vite-plus/test';

import { getBreadcrumbSegments } from './get-breadcrumb-segments.ts';

test('returns all segments when collapsed is false', () => {
  expect(
    getBreadcrumbSegments(
      [{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }],
      false,
    ),
  ).toEqual([
    { type: 'link', label: 'Home', href: '/' },
    { type: 'link', label: 'Components', href: '/components' },
    { type: 'page', label: 'Breadcrumb' },
  ]);
});

test('returns all segments when collapsed is true but there are three or fewer items', () => {
  expect(
    getBreadcrumbSegments(
      [{ label: 'Home', href: '/' }, { label: 'Components', href: '/components' }, { label: 'Breadcrumb' }],
      true,
    ),
  ).toEqual([
    { type: 'link', label: 'Home', href: '/' },
    { type: 'link', label: 'Components', href: '/components' },
    { type: 'page', label: 'Breadcrumb' },
  ]);
});

test('collapses middle segments when collapsed and more than three items exist', () => {
  expect(
    getBreadcrumbSegments(
      [
        { label: 'Home', href: '/' },
        { label: 'Hidden', href: '/hidden' },
        { label: 'Components', href: '/components' },
        { label: 'Breadcrumb' },
      ],
      true,
    ),
  ).toEqual([
    { type: 'link', label: 'Home', href: '/' },
    { type: 'ellipsis' },
    { type: 'link', label: 'Components', href: '/components' },
    { type: 'page', label: 'Breadcrumb' },
  ]);
});

test('returns an empty array when no items are provided', () => {
  expect(getBreadcrumbSegments([], true)).toEqual([]);
});

test('treats the last item as the current page even when href is provided', () => {
  expect(
    getBreadcrumbSegments(
      [
        { label: 'Home', href: '/' },
        { label: 'Breadcrumb', href: '/breadcrumb' },
      ],
      false,
    ),
  ).toEqual([
    { type: 'link', label: 'Home', href: '/' },
    { type: 'page', label: 'Breadcrumb' },
  ]);
});
