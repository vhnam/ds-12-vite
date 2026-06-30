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
import type { SpacingTokenGroup } from './parse-theme-spacing.ts';

const previewTrackStyle = {
  display: 'flex',
  alignItems: 'center',
  minHeight: 24,
} as const;

const previewBarStyle = {
  height: 8,
  borderRadius: 'var(--radius-xxsmall)',
  backgroundColor: 'var(--color-semantic-brand-bold)',
} as const;

function SpacingTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const barRef = useRef<HTMLDivElement>(null);
  const [resolvedValue, setResolvedValue] = useState('…');

  useEffect(() => {
    const element = barRef.current;

    if (!element) {
      return;
    }

    const width = getComputedStyle(element).width.trim();
    setResolvedValue(width || '—');
  }, [token]);

  return (
    <TableRow>
      <FoundationTokenPreviewCell width={200}>
        <div style={previewTrackStyle}>
          <div
            ref={barRef}
            aria-hidden="true"
            style={{
              ...previewBarStyle,
              width: `var(--${token})`,
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

function SpacingTokenGroupCard({
  group,
  formatTokenDisplayName,
}: {
  group: SpacingTokenGroup;
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
          { label: 'Preview', width: 200 },
          { label: 'Token Name' },
          { label: 'CSS Variable' },
          { label: 'Value', width: 120 },
        ]}
      >
        {group.tokens.map((token) => (
          <SpacingTokenTableRow key={token} token={token} formatTokenDisplayName={formatTokenDisplayName} />
        ))}
      </FoundationTokenTable>
    </section>
  );
}

function SpacingTokensDoc({
  groups,
  formatTokenDisplayName,
}: {
  groups: readonly SpacingTokenGroup[];
  formatTokenDisplayName: (token: string) => string;
}) {
  return (
    <div style={pageStyle}>
      {groups.map((group) => (
        <SpacingTokenGroupCard key={group.id} group={group} formatTokenDisplayName={formatTokenDisplayName} />
      ))}
    </div>
  );
}

export { SpacingTokensDoc };
