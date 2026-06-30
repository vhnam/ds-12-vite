import { expect, test } from 'vite-plus/test';

import { Button } from '../src/index.ts';

test('Button export', () => {
  expect(Button).toBeTypeOf('function');
});
