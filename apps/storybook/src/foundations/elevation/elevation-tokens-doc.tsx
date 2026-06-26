import { useEffect, useRef, useState } from "react";
import { Typography } from "@ds-12/ui/typography";
import type { ElevationTokenGroup } from "./parse-theme-elevation.ts";

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
  width: 180,
} as const;

const previewContainerStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  backgroundColor: "var(--color-semantic-canvas-subtle)",
  borderRadius: "var(--radius-small)",
} as const;

const previewSurfaceStyle = {
  width: 72,
  height: 48,
  backgroundColor: "var(--color-neutral-00)",
  borderRadius: "var(--radius-small)",
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
  wordBreak: "break-word" as const,
  maxWidth: 360,
} as const;

function ElevationTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [resolvedValue, setResolvedValue] = useState("…");

  useEffect(() => {
    const element = surfaceRef.current;

    if (!element) {
      return;
    }

    const boxShadow = getComputedStyle(element).boxShadow.trim();
    setResolvedValue(boxShadow || "—");
  }, [token]);

  return (
    <tr>
      <td style={previewCellStyle}>
        <div style={previewContainerStyle}>
          <div
            ref={surfaceRef}
            aria-hidden="true"
            style={{
              ...previewSurfaceStyle,
              boxShadow: `var(--${token})`,
            }}
          />
        </div>
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

function ElevationTokenGroupCard({
  group,
  formatTokenDisplayName,
}: {
  group: ElevationTokenGroup;
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
            <th scope="col" style={{ ...headerCellStyle, width: 180 }}>
              Preview
            </th>
            <th scope="col" style={headerCellStyle}>
              Token Name
            </th>
            <th scope="col" style={headerCellStyle}>
              CSS Variable
            </th>
            <th scope="col" style={headerCellStyle}>
              Value
            </th>
          </tr>
        </thead>
        <tbody>
          {group.tokens.map((token) => (
            <ElevationTokenTableRow
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

function ElevationTokensDoc({
  groups,
  formatTokenDisplayName,
}: {
  groups: readonly ElevationTokenGroup[];
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <div style={pageStyle}>
      {groups.map((group) => (
        <ElevationTokenGroupCard
          key={group.id}
          group={group}
          formatTokenDisplayName={formatTokenDisplayName}
        />
      ))}
    </div>
  );
}

export { ElevationTokensDoc };
