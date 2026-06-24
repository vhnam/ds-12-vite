import { useEffect, useRef, useState } from "react";
import { Typography } from "@ds-12/ui/typography";
import { formatSemanticTokenHex, type ColorTokenGroup } from "./parse-theme-colors.ts";

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

const swatchStyle = {
  width: 40,
  height: 40,
  borderRadius: "var(--radius-small)",
  border: "1px solid var(--color-semantic-border-subtle)",
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

const hexCellStyle = {
  margin: 0,
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  fontSize: "var(--font-size-12)",
  lineHeight: "var(--line-height-16)",
  color: "var(--color-semantic-text-neutral-bold)",
} as const;

function ColorTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [hexValue, setHexValue] = useState("…");
  const isGradient = token === "color-gradient-skeleton";

  useEffect(() => {
    const element = swatchRef.current;

    if (!element) {
      return;
    }

    setHexValue(formatSemanticTokenHex(getComputedStyle(element).backgroundColor));
  }, [token]);

  return (
    <tr>
      <td style={bodyCellStyle}>
        <div
          ref={swatchRef}
          aria-hidden="true"
          style={{
            ...swatchStyle,
            background: isGradient ? `var(--${token})` : undefined,
            backgroundColor: isGradient ? undefined : `var(--${token})`,
            backgroundSize: isGradient ? "200% 100%" : undefined,
          }}
        />
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
        <Typography variant="label-small" render="p" style={hexCellStyle}>
          {hexValue}
        </Typography>
      </td>
    </tr>
  );
}

function ColorTokenGroupCard({
  group,
  formatTokenDisplayName,
}: {
  group: ColorTokenGroup;
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
            <th scope="col" style={{ ...headerCellStyle, width: 72 }}>
              Color
            </th>
            <th scope="col" style={headerCellStyle}>
              Token Name
            </th>
            <th scope="col" style={headerCellStyle}>
              CSS Variable
            </th>
            <th scope="col" style={{ ...headerCellStyle, width: 120 }}>
              Hex Value
            </th>
          </tr>
        </thead>
        <tbody>
          {group.tokens.map((token) => (
            <ColorTokenTableRow
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

function ColorTokensDoc({
  groups,
  formatTokenDisplayName,
}: {
  groups: readonly ColorTokenGroup[];
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <div style={pageStyle}>
      {groups.map((group) => (
        <ColorTokenGroupCard
          key={group.id}
          group={group}
          formatTokenDisplayName={formatTokenDisplayName}
        />
      ))}
    </div>
  );
}

export { ColorTokensDoc };
