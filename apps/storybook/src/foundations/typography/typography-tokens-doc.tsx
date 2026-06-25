import { useEffect, useRef, useState, type CSSProperties, type RefObject } from "react";
import { Typography } from "@ds-12/ui/typography";
import type { SemanticTypographyStyle, TypographyTokenGroup } from "./parse-theme-typography.ts";

const pageStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
} as const;

const cardStyle = {
  backgroundColor: "var(--color-neutral-00)",
  border: "1px solid var(--color-semantic-border-subtle)",
  borderRadius: "var(--radius-medium)",
  overflow: "hidden",
} as const;

const cardHeaderStyle = {
  padding: "20px 24px",
  borderBottom: "1px solid var(--color-semantic-border-subtle)",
} as const;

const cardTitleStyle = {
  margin: "0 0 4px",
  textTransform: "capitalize",
} as const;

const cardDescriptionStyle = {
  margin: 0,
  color: "var(--color-semantic-text-neutral-moderate)",
} as const;

const tableStyle = {
  width: "100%",
  marginTop: 0,
  borderTop: "none",
  borderCollapse: "collapse",
} as const;

const headerCellStyle = {
  padding: "12px 24px",
  textAlign: "left" as const,
  color: "var(--color-semantic-text-neutral-moderate)",
  fontWeight: 500,
  fontSize: "var(--font-size-12)",
  lineHeight: "var(--line-height-16)",
  borderBottom: "1px solid var(--color-semantic-border-subtle)",
} as const;

const bodyCellStyle = {
  padding: "14px 24px",
  verticalAlign: "middle" as const,
  borderTop: "1px solid var(--color-semantic-border-subtle)",
} as const;

const previewCellStyle = {
  ...bodyCellStyle,
  width: 160,
} as const;

const tokenNameCellStyle = {
  margin: 0,
  color: "var(--color-semantic-text-neutral-bold)",
} as const;

const variableCellStyle = {
  margin: 0,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "var(--font-size-12)",
  lineHeight: "var(--line-height-16)",
  color: "var(--color-semantic-text-neutral-moderate)",
} as const;

const valueCellStyle = {
  margin: 0,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "var(--font-size-12)",
  lineHeight: "var(--line-height-16)",
  color: "var(--color-semantic-text-neutral-bold)",
} as const;

const foundationPreviewBaseStyle = {
  margin: 0,
  color: "var(--color-semantic-text-neutral-bold)",
  whiteSpace: "nowrap" as const,
} as const;

function getFoundationPreviewStyle(token: string): CSSProperties {
  if (token.startsWith("font-family-")) {
    return { ...foundationPreviewBaseStyle, fontFamily: `var(--${token})` };
  }

  if (token.startsWith("font-size-")) {
    return {
      ...foundationPreviewBaseStyle,
      fontFamily: "var(--font-family-text)",
      fontSize: `var(--${token})`,
    };
  }

  if (token.startsWith("font-weight-")) {
    return {
      ...foundationPreviewBaseStyle,
      fontFamily: "var(--font-family-text)",
      fontSize: "var(--font-size-20)",
      fontWeight: `var(--${token})`,
    };
  }

  if (token.startsWith("line-height-")) {
    return {
      margin: 0,
      width: 120,
      fontFamily: "var(--font-family-text)",
      fontSize: "var(--font-size-12)",
      lineHeight: `var(--${token})`,
      color: "var(--color-semantic-text-neutral-bold)",
      background:
        "linear-gradient(var(--color-semantic-border-subtle), var(--color-semantic-border-subtle)) 0 0 / 100% 1px repeat-y",
    };
  }

  if (token.startsWith("letter-spacing-")) {
    return {
      ...foundationPreviewBaseStyle,
      fontFamily: "var(--font-family-text)",
      fontSize: "var(--font-size-16)",
      letterSpacing: `var(--${token})`,
    };
  }

  return foundationPreviewBaseStyle;
}

function getFoundationPreviewText(token: string): string {
  if (token.startsWith("line-height-")) {
    return "Line one\nLine two";
  }

  if (token.startsWith("letter-spacing-")) {
    return "Tracking";
  }

  return "Ag";
}

function getResolvedCSSValue(element: HTMLElement, property: string): string {
  const value = getComputedStyle(element).getPropertyValue(property).trim();
  return value || "—";
}

function FoundationTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const previewRef = useRef<HTMLParagraphElement>(null);
  const [resolvedValue, setResolvedValue] = useState("…");
  const previewStyle = getFoundationPreviewStyle(token);
  const previewText = getFoundationPreviewText(token);

  useEffect(() => {
    const element = previewRef.current;

    if (!element) {
      return;
    }

    if (token.startsWith("font-family-")) {
      setResolvedValue(getResolvedCSSValue(element, "font-family"));
      return;
    }

    if (token.startsWith("font-size-")) {
      setResolvedValue(getResolvedCSSValue(element, "font-size"));
      return;
    }

    if (token.startsWith("font-weight-")) {
      setResolvedValue(getResolvedCSSValue(element, "font-weight"));
      return;
    }

    if (token.startsWith("line-height-")) {
      setResolvedValue(getResolvedCSSValue(element, "line-height"));
      return;
    }

    if (token.startsWith("letter-spacing-")) {
      setResolvedValue(getResolvedCSSValue(element, "letter-spacing"));
    }
  }, [token]);

  return (
    <tr>
      <td style={previewCellStyle}>
        <p ref={previewRef} style={previewStyle}>
          {previewText}
        </p>
      </td>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={tokenNameCellStyle}>
          {formatTokenDisplayName(token)}
        </Typography>
      </td>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={variableCellStyle}>
          --{token}
        </Typography>
      </td>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={valueCellStyle}>
          {resolvedValue}
        </Typography>
      </td>
    </tr>
  );
}

function FoundationTokenGroupCard({
  group,
  formatTokenDisplayName,
}: {
  group: TypographyTokenGroup;
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <section style={cardStyle}>
      <header style={cardHeaderStyle}>
        <Typography variant="h3" render="h3" style={cardTitleStyle}>
          {group.label}
        </Typography>
        <Typography variant="paragraph-small" render="p" style={cardDescriptionStyle}>
          {group.description}
        </Typography>
      </header>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th scope="col" style={{ ...headerCellStyle, width: 160 }}>
              Preview
            </th>
            <th scope="col" style={headerCellStyle}>
              Token Name
            </th>
            <th scope="col" style={headerCellStyle}>
              CSS Variable
            </th>
            <th scope="col" style={{ ...headerCellStyle, width: 120 }}>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {group.tokens.map((token) => (
            <FoundationTokenTableRow
              key={token}
              token={token}
              formatTokenDisplayName={formatTokenDisplayName}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SemanticStyleCard({ style }: { style: SemanticTypographyStyle }) {
  const previewRef = useRef<HTMLParagraphElement>(null);
  const sampleText = "The quick brown fox jumps over the lazy dog";

  return (
    <section style={cardStyle}>
      <header style={cardHeaderStyle}>
        <Typography variant="h3" render="h3" style={cardTitleStyle}>
          {style.label}
        </Typography>
        <Typography variant="paragraph-small" render="p" style={cardDescriptionStyle}>
          {style.description}
        </Typography>
      </header>
      <div
        style={{
          padding: "20px 24px",
          borderBottom: "1px solid var(--color-semantic-border-subtle)",
        }}
      >
        <p
          ref={previewRef}
          style={{
            margin: 0,
            color: "var(--color-semantic-text-neutral-bolder)",
            fontFamily: `var(--${style.id}-font-family)`,
            fontSize: `var(--${style.id}-font-size)`,
            fontWeight: `var(--${style.id}-font-weight)`,
            letterSpacing: `var(--${style.id}-letter-spacing)`,
            lineHeight: `var(--${style.id}-line-height)`,
          }}
        >
          {sampleText}
        </p>
      </div>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th scope="col" style={headerCellStyle}>
              Property
            </th>
            <th scope="col" style={headerCellStyle}>
              CSS Variable
            </th>
            <th scope="col" style={{ ...headerCellStyle, width: 120 }}>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {style.properties.map((property) => (
            <SemanticPropertyRow key={property.token} property={property} previewRef={previewRef} />
          ))}
        </tbody>
      </table>
    </section>
  );
}

function SemanticPropertyRow({
  property,
  previewRef,
}: {
  property: SemanticTypographyStyle["properties"][number];
  previewRef: RefObject<HTMLParagraphElement | null>;
}) {
  const [resolvedValue, setResolvedValue] = useState("…");

  useEffect(() => {
    const element = previewRef.current;

    if (!element) {
      return;
    }

    const cssProperty = property.suffix;
    setResolvedValue(getResolvedCSSValue(element, cssProperty));
  }, [previewRef, property.suffix]);

  return (
    <tr>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={tokenNameCellStyle}>
          {property.suffix}
        </Typography>
      </td>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={variableCellStyle}>
          --{property.token}
        </Typography>
      </td>
      <td style={bodyCellStyle}>
        <Typography variant="label-small" render="p" style={valueCellStyle}>
          {resolvedValue}
        </Typography>
      </td>
    </tr>
  );
}

function FoundationTypographyTokensDoc({
  groups,
  formatTokenDisplayName,
}: {
  groups: readonly TypographyTokenGroup[];
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <div style={pageStyle}>
      {groups.map((group) => (
        <FoundationTokenGroupCard
          key={group.id}
          group={group}
          formatTokenDisplayName={formatTokenDisplayName}
        />
      ))}
    </div>
  );
}

function SemanticTypographyTokensDoc({
  categories,
}: {
  categories: readonly {
    id: string;
    label: string;
    description: string;
    styles: readonly SemanticTypographyStyle[];
  }[];
}) {
  return (
    <div style={pageStyle}>
      {categories.map((category) => (
        <section key={category.id} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <header>
            <Typography
              variant="h2"
              render="h2"
              style={{ margin: "0 0 4px", textTransform: "capitalize" }}
            >
              {category.label}
            </Typography>
            <Typography variant="paragraph-small" render="p" style={cardDescriptionStyle}>
              {category.description}
            </Typography>
          </header>
          {category.styles.map((style) => (
            <SemanticStyleCard key={style.id} style={style} />
          ))}
        </section>
      ))}
    </div>
  );
}

export { FoundationTypographyTokensDoc, SemanticTypographyTokensDoc };
