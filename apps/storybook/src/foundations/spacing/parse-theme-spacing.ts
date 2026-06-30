import tokensCss from '@ds-12/design-tokens/tokens.generated.css?raw';

const SPACING_TOKEN_PATTERN = /^\s*--(spacing-[a-z]+):/gm;

const SPACING_ORDER = [
  'xxxsmall',
  'xxsmall',
  'xsmall',
  'small',
  'medium',
  'large',
  'xlarge',
  'xxlarge',
  'xxxlarge',
] as const;

export type SpacingTokenGroup = {
  id: string;
  label: string;
  description: string;
  tokens: readonly string[];
};

function parseSpacingTokens(css: string): string[] {
  const tokens: string[] = [];

  for (const match of css.matchAll(SPACING_TOKEN_PATTERN)) {
    tokens.push(match[1]!);
  }

  return tokens;
}

function compareSpacingTokens(left: string, right: string): number {
  const suffixLeft = left.slice('spacing-'.length);
  const suffixRight = right.slice('spacing-'.length);
  const indexLeft = SPACING_ORDER.indexOf(suffixLeft as (typeof SPACING_ORDER)[number]);
  const indexRight = SPACING_ORDER.indexOf(suffixRight as (typeof SPACING_ORDER)[number]);

  if (indexLeft === -1 || indexRight === -1) {
    return suffixLeft.localeCompare(suffixRight, undefined, { numeric: true });
  }

  return indexLeft - indexRight;
}

export function formatFoundationTokenDisplayName(token: string): string {
  return token
    .replace(/^spacing-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const parsedTokens = parseSpacingTokens(tokensCss).sort(compareSpacingTokens);

export const FOUNDATION_SPACING_TOKEN_GROUPS: SpacingTokenGroup[] = [
  {
    id: 'spacing',
    label: 'spacing',
    description: 'Consistent scale of spacing values for padding, margin, gaps, and layout rhythm.',
    tokens: parsedTokens,
  },
];
