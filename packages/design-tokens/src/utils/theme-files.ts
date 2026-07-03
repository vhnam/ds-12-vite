import { readFileSync } from 'node:fs';
import path from 'node:path';

import type { TokenTree } from './types';

export const getSourceFile = () => path.resolve(process.cwd(), 'src/assets/tokens.json');

export const getDistPath = () => path.resolve(process.cwd(), 'dist');

export const getCssFilePath = () => path.resolve(process.cwd(), 'src/tokens.generated.css');

export const loadSourceTokensFromFile = (sourceFile: string): TokenTree =>
  JSON.parse(readFileSync(sourceFile, 'utf8')) as TokenTree;
