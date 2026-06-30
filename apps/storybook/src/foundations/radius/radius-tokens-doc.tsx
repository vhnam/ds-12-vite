import { useEffect, useRef, useState } from 'react';

import { TableRow } from '@ds-12/ui/table';
import { Typography } from '@ds-12/ui/typography';

import {
  cardDescriptionStyle,
  cardHeaderStyle,
  cardStyle,
  cardTitleStyle,
  FoundationTokenNameCell,
  FoundationTokenPreviewCell,
  FoundationTokenTable,
  FoundationTokenValueCell,
  FoundationTokenVariableCell,
  pageStyle,
} from '../foundation-token-table.tsx';
import type { RadiusTokenGroup } from './parse-theme-radius.ts';

const previewTrackStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 72,
} as const;

const previewSurfaceStyle = {
  width: 64,
  height: 64,
  backgroundColor: 'var(--color-semantic-brand-bold)',
} as const;

function RadiusTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const surfaceRef = useRef<HTMLDivElement>(null);
  const [resolvedValue, setResolvedValue] = useState('…');

  useEffect(() => {
    const element = surfaceRef.current;

    if (!element) {
      return;
    }

    const borderRadius = getComputedStyle(element).borderRadius.trim();
    setResolvedValue(borderRadius || '—');
  }, [token]);

  return (
    <TableRow>
      <FoundationTokenPreviewCell width={120}>
        <div style={previewTrackStyle}>
          <div
            ref={surfaceRef}
            aria-hidden="true"
            style={{
              ...previewSurfaceStyle,
              borderRadius: `var(--${token})`,
            }}
          />
        </div>
      </FoundationTokenPreviewCell>
      <FoundationTokenNameCell>{formatTokenDisplayName(token)}</FoundationTokenNameCell>
      <FoundationTokenVariableCell>--{token}</FoundationTokenVariableCell>
      <FoundationTokenValueCell width={120}>{resolvedValue}</FoundationTokenValueCell>
    </TableRow>
  );
}

function RadiusTokenGroupCard({
  group,
  formatTokenDisplayName,
}: {
  group: RadiusTokenGroup;
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <section style={cardStyle}>
      <header style={cardHeaderStyle}>
        <Typography variant="h3" render="h3" style={cardTitleStyle}>
          {group.label}
        </Typography>
        <Typography variant="paragraph" size="sm" render="p" style={cardDescriptionStyle}>
          {group.description}
        </Typography>
      </header>
      <FoundationTokenTable
        columns={[
          { label: 'Preview', width: 120 },
          { label: 'Token Name' },
          { label: 'CSS Variable' },
          { label: 'Value', width: 120 },
        ]}
      >
        {group.tokens.map((token) => (
          <RadiusTokenTableRow key={token} token={token} formatTokenDisplayName={formatTokenDisplayName} />
        ))}
      </FoundationTokenTable>
    </section>
  );
}

function RadiusTokensDoc({
  groups,
  formatTokenDisplayName,
}: {
  groups: readonly RadiusTokenGroup[];
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <div style={pageStyle}>
      {groups.map((group) => (
        <RadiusTokenGroupCard key={group.id} group={group} formatTokenDisplayName={formatTokenDisplayName} />
      ))}
    </div>
  );
}

export { RadiusTokensDoc };
