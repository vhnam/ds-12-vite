import themeCss from '@ds-12/design-tokens/theme.css?raw';

const COLOR_TOKEN_PATTERN = /^\s*--(color-[a-z0-9-]+):/gm;

const SHADE_ORDER = ['00', '50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950', '1000'] as const;

const PRIMITIVE_PALETTES = ['blue', 'brand', 'green', 'neutral', 'red', 'yellow'] as const;

const FOUNDATION_GROUP_DESCRIPTIONS: Record<string, string> = {
  blue: 'Blue palette for informational accents and links.',
  brand: 'Brand palette for primary identity colors.',
  green: 'Green palette for positive and success states.',
  neutral: 'Neutral grayscale palette for UI chrome and surfaces.',
  red: 'Red palette for errors and destructive actions.',
  yellow: 'Yellow palette for warnings and attention states.',
  other: 'Additional foundation color tokens.',
};

function getFoundationGroupDescription(groupId: string): string {
  return FOUNDATION_GROUP_DESCRIPTIONS[groupId] ?? 'Foundation color tokens for this palette.';
}

export function formatFoundationTokenDisplayName(token: string): string {
  return token
    .replace(/^color-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

const SEMANTIC_GROUP_ORDER = [
  'canvas',
  'border',
  'brand',
  'neutral',
  'negative',
  'positive',
  'attention',
  'information',
  'text-attention',
  'text-brand',
  'text-information',
  'text-negative',
  'text-neutral',
  'text-positive',
] as const;

const SEMANTIC_GROUP_DESCRIPTIONS: Record<string, string> = {
  canvas: 'Background surface values for pages, containers, and disabled states.',
  border: 'Border colors for dividers, inputs, and outlines.',
  brand: 'Brand identity fills for primary actions and highlights.',
  neutral: 'Neutral fills for secondary surfaces and elements.',
  negative: 'Error and destructive state colors.',
  positive: 'Success and positive state colors.',
  attention: 'Warning and attention state colors.',
  information: 'Informational state colors.',
  'text-attention': 'Foreground values for attention-related text.',
  'text-brand': 'Foreground values for brand-related text.',
  'text-information': 'Foreground values for informational text.',
  'text-negative': 'Foreground values for error and destructive text.',
  'text-neutral': 'Foreground values for body copy, labels, and headings.',
  'text-positive': 'Foreground values for success-related text.',
  other: 'Additional semantic color tokens.',
};

function getSemanticGroupDescription(groupId: string): string {
  return SEMANTIC_GROUP_DESCRIPTIONS[groupId] ?? 'Semantic color tokens for this role.';
}

export function formatSemanticTokenDisplayName(token: string): string {
  return token
    .replace(/^color-semantic-/, '')
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function formatSemanticTokenHex(color: string): string {
  if (!color || color === 'rgba(0, 0, 0, 0)') {
    return '—';
  }

  const rgbMatch = color.match(/^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)/);

  if (!rgbMatch) {
    return color;
  }

  const [, red, green, blue] = rgbMatch;

  return `#${[red, green, blue].map((channel) => Number(channel).toString(16).padStart(2, '0')).join('')}`;
}

export type ColorTokenGroup = {
  id: string;
  label: string;
  description: string;
  tokens: readonly string[];
};

function parseColorTokens(css: string): string[] {
  const tokens: string[] = [];

  for (const match of css.matchAll(COLOR_TOKEN_PATTERN)) {
    tokens.push(match[1]!);
  }

  return tokens;
}

function compareShades(left: string, right: string, palette: string): number {
  const prefix = `color-${palette}-`;
  const shadeLeft = left.slice(prefix.length);
  const shadeRight = right.slice(prefix.length);
  const indexLeft = SHADE_ORDER.indexOf(shadeLeft as (typeof SHADE_ORDER)[number]);
  const indexRight = SHADE_ORDER.indexOf(shadeRight as (typeof SHADE_ORDER)[number]);

  if (indexLeft === -1 || indexRight === -1) {
    return shadeLeft.localeCompare(shadeRight, undefined, { numeric: true });
  }

  return indexLeft - indexRight;
}

function getSemanticGroupId(token: string): string {
  const rest = token.slice('color-semantic-'.length);

  if (rest.startsWith('text-')) {
    const textRole = rest.match(/^text-([a-z]+)/)?.[1];
    return textRole ? `text-${textRole}` : 'text';
  }

  if (rest.startsWith('border-')) {
    return 'border';
  }

  if (rest.startsWith('canvas-')) {
    return 'canvas';
  }

  const role = rest.match(/^([a-z]+)/)?.[1];
  return role ?? 'other';
}

function getSemanticGroupLabel(groupId: string): string {
  if (groupId.startsWith('text-')) {
    return `text / ${groupId.slice('text-'.length)}`;
  }

  return groupId;
}

function compareSemanticGroupOrder(left: string, right: string): number {
  const indexLeft = SEMANTIC_GROUP_ORDER.indexOf(left as (typeof SEMANTIC_GROUP_ORDER)[number]);
  const indexRight = SEMANTIC_GROUP_ORDER.indexOf(right as (typeof SEMANTIC_GROUP_ORDER)[number]);

  if (indexLeft === -1 || indexRight === -1) {
    return left.localeCompare(right);
  }

  return indexLeft - indexRight;
}

function groupSemanticTokens(tokens: readonly string[]): ColorTokenGroup[] {
  const groups = new Map<string, string[]>();

  for (const token of tokens) {
    const groupId = getSemanticGroupId(token);
    const groupTokens = groups.get(groupId) ?? [];
    groupTokens.push(token);
    groups.set(groupId, groupTokens);
  }

  return [...groups.entries()]
    .sort(([left], [right]) => compareSemanticGroupOrder(left, right))
    .map(([groupId, groupTokens]) => ({
      id: groupId,
      label: getSemanticGroupLabel(groupId),
      description: getSemanticGroupDescription(groupId),
      tokens: [...groupTokens].sort((left, right) => left.localeCompare(right)),
    }));
}

function groupColorTokens(tokens: readonly string[]) {
  const primitives = new Map<string, string[]>();
  const semantic: string[] = [];
  const other: string[] = [];

  for (const token of tokens) {
    if (token.startsWith('color-semantic-')) {
      semantic.push(token);
      continue;
    }

    const primitiveMatch = token.match(/^color-([a-z]+)-(.+)$/);
    const palette = primitiveMatch?.[1];

    if (palette && (PRIMITIVE_PALETTES as readonly string[]).includes(palette)) {
      const paletteTokens = primitives.get(palette) ?? [];
      paletteTokens.push(token);
      primitives.set(palette, paletteTokens);
      continue;
    }

    other.push(token);
  }

  const primitiveGroups: ColorTokenGroup[] = PRIMITIVE_PALETTES.flatMap((palette) => {
    const paletteTokens = primitives.get(palette);

    if (!paletteTokens?.length) {
      return [];
    }

    return [
      {
        id: palette,
        label: palette,
        description: getFoundationGroupDescription(palette),
        tokens: [...paletteTokens].sort((left, right) => compareShades(left, right, palette)),
      },
    ];
  });

  const semanticGroups = groupSemanticTokens(semantic);

  const otherGroup: ColorTokenGroup | null = other.length
    ? {
        id: 'other',
        label: 'other',
        description: getFoundationGroupDescription('other'),
        tokens: [...other].sort((left, right) => left.localeCompare(right)),
      }
    : null;

  return {
    primitiveGroups,
    semanticGroups,
    otherGroup,
  };
}

const parsedTokens = parseColorTokens(themeCss);
const groupedTokens = groupColorTokens(parsedTokens);

export const FOUNDATION_COLOR_TOKEN_GROUPS: ColorTokenGroup[] = [
  ...groupedTokens.primitiveGroups,
  ...(groupedTokens.otherGroup ? [groupedTokens.otherGroup] : []),
];

export const SEMANTIC_COLOR_TOKEN_GROUPS: ColorTokenGroup[] = groupedTokens.semanticGroups;
