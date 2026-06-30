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
import type { ElevationTokenGroup } from './parse-theme-elevation.ts';

const previewContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 20,
  backgroundColor: 'var(--color-semantic-canvas-subtle)',
  borderRadius: 'var(--radius-small)',
} as const;

const previewSurfaceStyle = {
  width: 72,
  height: 48,
  backgroundColor: 'var(--color-neutral-00)',
  borderRadius: 'var(--radius-small)',
} as const;

function ElevationTokenTableRow({
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

    const boxShadow = getComputedStyle(element).boxShadow.trim();
    setResolvedValue(boxShadow || '—');
  }, [token]);

  return (
    <TableRow>
      <FoundationTokenPreviewCell width={180}>
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
      </FoundationTokenPreviewCell>
      <FoundationTokenNameCell>{formatTokenDisplayName(token)}</FoundationTokenNameCell>
      <FoundationTokenVariableCell>--{token}</FoundationTokenVariableCell>
      <FoundationTokenValueCell style={{ wordBreak: 'break-word', maxWidth: 360 }}>
        {resolvedValue}
      </FoundationTokenValueCell>
    </TableRow>
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
        <Typography variant="paragraph" size="sm" render="p" style={cardDescriptionStyle}>
          {group.description}
        </Typography>
      </header>
      <FoundationTokenTable
        columns={[
          { label: 'Preview', width: 180 },
          { label: 'Token Name' },
          { label: 'CSS Variable' },
          { label: 'Value' },
        ]}
      >
        {group.tokens.map((token) => (
          <ElevationTokenTableRow key={token} token={token} formatTokenDisplayName={formatTokenDisplayName} />
        ))}
      </FoundationTokenTable>
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
        <ElevationTokenGroupCard key={group.id} group={group} formatTokenDisplayName={formatTokenDisplayName} />
      ))}
    </div>
  );
}

export { ElevationTokensDoc };
