import { readFileSync } from 'node:fs';
import path from 'node:path';

import type { TokenTree } from './types';

export const getSourceFile = () => path.resolve(process.cwd(), 'src/assets/tokens.json');

export const getDistPath = () => path.resolve(process.cwd(), 'dist');

export const getCssFilePath = (distPath: string) => path.join(distPath, 'variables.css');

export const loadSourceTokensFromFile = (sourceFile: string): TokenTree =>
  JSON.parse(readFileSync(sourceFile, 'utf8')) as TokenTree;
