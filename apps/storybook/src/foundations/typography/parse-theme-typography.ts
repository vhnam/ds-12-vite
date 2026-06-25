import tokensCss from "@ds-12/design-tokens/tokens.generated.css?raw";

const TOKEN_PATTERN = /^\s*--([a-z0-9-]+):/gm;

const FOUNDATION_GROUPS = [
  {
    id: "font-family",
    prefix: "font-family-",
    label: "font family",
    description: "Typeface families for brand and body text.",
  },
  {
    id: "font-size",
    prefix: "font-size-",
    label: "font size",
    description: "Scale of font sizes from compact labels to display copy.",
  },
  {
    id: "font-weight",
    prefix: "font-weight-",
    label: "font weight",
    description: "Weight scale from regular body copy to bold emphasis.",
  },
  {
    id: "line-height",
    prefix: "line-height-",
    label: "line height",
    description: "Vertical rhythm values paired with font sizes.",
  },
  {
    id: "letter-spacing",
    prefix: "letter-spacing-",
    label: "letter spacing",
    description: "Tracking adjustments for dense headings and loose labels.",
  },
] as const;

const SEMANTIC_CATEGORY_ORDER = ["display", "heading", "paragraph", "label"] as const;

const SEMANTIC_CATEGORY_DESCRIPTIONS: Record<string, string> = {
  display: "Hero and high-impact marketing headlines.",
  heading: "Heading levels for page and section hierarchy.",
  paragraph: "Body copy sizes for long-form and supporting text.",
  label: "Compact styles for form labels, captions, and metadata.",
};

const SEMANTIC_STYLE_ORDER = [
  "display-default",
  "heading-h1-bold",
  "heading-h1-regular",
  "heading-h2-bold",
  "heading-h2-regular",
  "heading-h3-bold",
  "heading-h3-regular",
  "heading-h4-bold",
  "heading-h4-regular",
  "paragraph-xlarge-strong",
  "paragraph-large",
  "paragraph-large-strong",
  "paragraph-default",
  "paragraph-default-strong",
  "paragraph-small",
  "label-large",
  "label-default",
  "label-small",
] as const;

const STYLE_PROPERTIES = [
  "font-family",
  "font-size",
  "font-weight",
  "letter-spacing",
  "line-height",
] as const;

export type TypographyTokenGroup = {
  id: string;
  label: string;
  description: string;
  tokens: readonly string[];
};

export type SemanticTypographyStyle = {
  id: string;
  label: string;
  category: string;
  description: string;
  properties: readonly {
    suffix: (typeof STYLE_PROPERTIES)[number];
    token: string;
  }[];
};

function parseTokens(css: string): string[] {
  const tokens: string[] = [];

  for (const match of css.matchAll(TOKEN_PATTERN)) {
    tokens.push(match[1]!);
  }

  return tokens;
}

function compareNumericSuffix(left: string, right: string, prefix: string): number {
  const suffixLeft = left.slice(prefix.length);
  const suffixRight = right.slice(prefix.length);
  const numericLeft = Number(suffixLeft);
  const numericRight = Number(suffixRight);

  if (!Number.isNaN(numericLeft) && !Number.isNaN(numericRight)) {
    return numericLeft - numericRight;
  }

  return suffixLeft.localeCompare(suffixRight, undefined, { numeric: true });
}

export function formatFoundationTokenDisplayName(token: string): string {
  return token
    .replace(/^(font-family|font-size|font-weight|line-height|letter-spacing)-/, "")
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function formatSemanticStyleDisplayName(styleId: string): string {
  return styleId
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function groupFoundationTokens(tokens: readonly string[]): TypographyTokenGroup[] {
  return FOUNDATION_GROUPS.flatMap((group) => {
    const groupTokens = tokens
      .filter((token) => token.startsWith(group.prefix))
      .sort((left, right) => compareNumericSuffix(left, right, group.prefix));

    if (!groupTokens.length) {
      return [];
    }

    return [
      {
        id: group.id,
        label: group.label,
        description: group.description,
        tokens: groupTokens,
      },
    ];
  });
}

function getSemanticCategory(styleId: string): string {
  if (styleId.startsWith("display-")) {
    return "display";
  }

  if (styleId.startsWith("heading-")) {
    return "heading";
  }

  if (styleId.startsWith("paragraph-")) {
    return "paragraph";
  }

  if (styleId.startsWith("label-")) {
    return "label";
  }

  return "other";
}

function getSemanticStyleDescription(styleId: string): string {
  const category = getSemanticCategory(styleId);
  return SEMANTIC_CATEGORY_DESCRIPTIONS[category] ?? "Semantic typography style.";
}

function compareSemanticStyles(left: string, right: string): number {
  const indexLeft = SEMANTIC_STYLE_ORDER.indexOf(left as (typeof SEMANTIC_STYLE_ORDER)[number]);
  const indexRight = SEMANTIC_STYLE_ORDER.indexOf(right as (typeof SEMANTIC_STYLE_ORDER)[number]);

  if (indexLeft === -1 || indexRight === -1) {
    return left.localeCompare(right);
  }

  return indexLeft - indexRight;
}

function groupSemanticStyles(tokens: readonly string[]): SemanticTypographyStyle[] {
  const styleIds = new Set<string>();

  for (const token of tokens) {
    const match = token.match(
      /^(display-default|heading-h[1-4]-(?:bold|regular)|paragraph-[\w-]+|label-[\w-]+)-font-family$/,
    );

    if (match) {
      styleIds.add(match[1]!);
    }
  }

  return [...styleIds].sort(compareSemanticStyles).map((styleId) => ({
    id: styleId,
    label: formatSemanticStyleDisplayName(styleId),
    category: getSemanticCategory(styleId),
    description: getSemanticStyleDescription(styleId),
    properties: STYLE_PROPERTIES.map((suffix) => ({
      suffix,
      token: `${styleId}-${suffix}`,
    })),
  }));
}

const parsedTokens = parseTokens(tokensCss);

export const FOUNDATION_TYPOGRAPHY_TOKEN_GROUPS = groupFoundationTokens(parsedTokens);
export const SEMANTIC_TYPOGRAPHY_STYLES = groupSemanticStyles(parsedTokens);

export const SEMANTIC_TYPOGRAPHY_CATEGORIES = SEMANTIC_CATEGORY_ORDER.flatMap((category) => {
  const styles = SEMANTIC_TYPOGRAPHY_STYLES.filter((style) => style.category === category);

  if (!styles.length) {
    return [];
  }

  return [
    {
      id: category,
      label: category,
      description: SEMANTIC_CATEGORY_DESCRIPTIONS[category] ?? "Semantic typography styles.",
      styles,
    },
  ];
});
