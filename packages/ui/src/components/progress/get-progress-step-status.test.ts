import { expect, test } from 'vite-plus/test';

import { getProgressStepStatus } from './get-progress-step-status.ts';

test('returns current for the active step', () => {
  expect(getProgressStepStatus(0, 1)).toBe('current');
  expect(getProgressStepStatus(1, 2)).toBe('current');
});

test('returns past for steps before the active step', () => {
  expect(getProgressStepStatus(0, 2)).toBe('past');
  expect(getProgressStepStatus(0, 3)).toBe('past');
  expect(getProgressStepStatus(1, 3)).toBe('past');
});

test('returns upcoming for steps after the active step', () => {
  expect(getProgressStepStatus(1, 1)).toBe('upcoming');
  expect(getProgressStepStatus(2, 1)).toBe('upcoming');
  expect(getProgressStepStatus(2, 2)).toBe('upcoming');
});
