import { expect, test } from 'vite-plus/test';

import { getPaginationItems } from '../src/components/pagination/get-pagination-items.ts';

test('returns empty array when totalPages is zero or negative', () => {
  expect(getPaginationItems(1, 0)).toEqual([]);
  expect(getPaginationItems(1, -1)).toEqual([]);
});

test('returns all pages when totalPages is five or fewer', () => {
  expect(getPaginationItems(1, 3)).toEqual([
    { type: 'page', page: 1 },
    { type: 'page', page: 2 },
    { type: 'page', page: 3 },
  ]);
});

test('shows leading pages and trailing page when near the start', () => {
  expect(getPaginationItems(3, 10)).toEqual([
    { type: 'page', page: 1 },
    { type: 'page', page: 2 },
    { type: 'page', page: 3 },
    { type: 'page', page: 4 },
    { type: 'page', page: 5 },
    { type: 'ellipsis' },
    { type: 'page', page: 10 },
  ]);
});

test('shows trailing pages when near the end', () => {
  expect(getPaginationItems(9, 10)).toEqual([
    { type: 'page', page: 1 },
    { type: 'ellipsis' },
    { type: 'page', page: 6 },
    { type: 'page', page: 7 },
    { type: 'page', page: 8 },
    { type: 'page', page: 9 },
    { type: 'page', page: 10 },
  ]);
});

test('shows middle window with ellipses for central pages', () => {
  expect(getPaginationItems(5, 10)).toEqual([
    { type: 'page', page: 1 },
    { type: 'ellipsis' },
    { type: 'page', page: 4 },
    { type: 'page', page: 5 },
    { type: 'page', page: 6 },
    { type: 'ellipsis' },
    { type: 'page', page: 10 },
  ]);
});
