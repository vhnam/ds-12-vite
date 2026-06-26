import tokensCss from "@ds-12/design-tokens/tokens.generated.css?raw";

const RADIUS_TOKEN_PATTERN = /^\s*--(radius-[a-z]+):/gm;

const RADIUS_ORDER = ["xxsmall", "xsmall", "small", "medium", "large", "xlarge"] as const;

export type RadiusTokenGroup = {
  id: string;
  label: string;
  description: string;
  tokens: readonly string[];
};

function parseRadiusTokens(css: string): string[] {
  const tokens: string[] = [];

  for (const match of css.matchAll(RADIUS_TOKEN_PATTERN)) {
    tokens.push(match[1]!);
  }

  return tokens;
}

function compareRadiusTokens(left: string, right: string): number {
  const suffixLeft = left.slice("radius-".length);
  const suffixRight = right.slice("radius-".length);
  const indexLeft = RADIUS_ORDER.indexOf(suffixLeft as (typeof RADIUS_ORDER)[number]);
  const indexRight = RADIUS_ORDER.indexOf(suffixRight as (typeof RADIUS_ORDER)[number]);

  if (indexLeft === -1 || indexRight === -1) {
    return suffixLeft.localeCompare(suffixRight, undefined, { numeric: true });
  }

  return indexLeft - indexRight;
}

export function formatFoundationTokenDisplayName(token: string): string {
  return token
    .replace(/^radius-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

const parsedTokens = parseRadiusTokens(tokensCss).sort(compareRadiusTokens);

export const FOUNDATION_RADIUS_TOKEN_GROUPS: RadiusTokenGroup[] = [
  {
    id: "radius",
    label: "radius",
    description: "Consistent corner radius values for buttons, inputs, cards, and containers.",
    tokens: parsedTokens,
  },
];
