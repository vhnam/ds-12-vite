import tokensCss from '@ds-12/design-tokens/tokens.generated.css?raw';

const ELEVATION_TOKEN_PATTERN = /^\s*--(elevation-[0-9]+):/gm;

export type ElevationTokenGroup = {
  id: string;
  label: string;
  description: string;
  tokens: readonly string[];
};

function parseElevationTokens(css: string): string[] {
  const tokens: string[] = [];

  for (const match of css.matchAll(ELEVATION_TOKEN_PATTERN)) {
    tokens.push(match[1]!);
  }

  return tokens;
}

function compareElevationTokens(left: string, right: string): number {
  const levelLeft = Number(left.slice('elevation-'.length));
  const levelRight = Number(right.slice('elevation-'.length));

  if (!Number.isNaN(levelLeft) && !Number.isNaN(levelRight)) {
    return levelLeft - levelRight;
  }

  return left.localeCompare(right, undefined, { numeric: true });
}

export function formatFoundationTokenDisplayName(token: string): string {
  return token.replace(/^elevation-/, 'Level ');
}

const parsedTokens = parseElevationTokens(tokensCss).sort(compareElevationTokens);

export const FOUNDATION_ELEVATION_TOKEN_GROUPS: ElevationTokenGroup[] = [
  {
    id: 'elevation',
    label: 'elevation',
    description: 'Layered box-shadow values for surfaces, cards, popovers, and floating elements.',
    tokens: parsedTokens,
  },
];
