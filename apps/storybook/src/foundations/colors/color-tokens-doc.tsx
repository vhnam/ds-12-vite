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
import { formatSemanticTokenHex, type ColorTokenGroup } from './parse-theme-colors.ts';

const swatchStyle = {
  width: 40,
  height: 40,
  borderRadius: 'var(--radius-small)',
  border: '1px solid var(--color-semantic-border-subtle)',
} as const;

function ColorTokenTableRow({
  token,
  formatTokenDisplayName,
}: {
  token: string;
  formatTokenDisplayName: (token: string) => string;
}) {
  const swatchRef = useRef<HTMLDivElement>(null);
  const [hexValue, setHexValue] = useState('…');
  const isGradient = token === 'color-gradient-skeleton';

  useEffect(() => {
    const element = swatchRef.current;

    if (!element) {
      return;
    }

    setHexValue(formatSemanticTokenHex(getComputedStyle(element).backgroundColor));
  }, [token]);

  return (
    <TableRow>
      <FoundationTokenPreviewCell width={72}>
        <div
          ref={swatchRef}
          aria-hidden="true"
          style={{
            ...swatchStyle,
            background: isGradient ? `var(--${token})` : undefined,
            backgroundColor: isGradient ? undefined : `var(--${token})`,
            backgroundSize: isGradient ? '200% 100%' : undefined,
          }}
        />
      </FoundationTokenPreviewCell>
      <FoundationTokenNameCell>{formatTokenDisplayName(token)}</FoundationTokenNameCell>
      <FoundationTokenVariableCell>--{token}</FoundationTokenVariableCell>
      <FoundationTokenValueCell width={120}>{hexValue}</FoundationTokenValueCell>
    </TableRow>
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
        <Typography variant="paragraph" size="sm" render="p" style={cardDescriptionStyle}>
          {group.description}
        </Typography>
      </header>
      <FoundationTokenTable
        columns={[
          { label: 'Color', width: 72 },
          { label: 'Token Name' },
          { label: 'CSS Variable' },
          { label: 'Hex Value', width: 120 },
        ]}
      >
        {group.tokens.map((token) => (
          <ColorTokenTableRow key={token} token={token} formatTokenDisplayName={formatTokenDisplayName} />
        ))}
      </FoundationTokenTable>
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
        <ColorTokenGroupCard key={group.id} group={group} formatTokenDisplayName={formatTokenDisplayName} />
      ))}
    </div>
  );
}

export { ColorTokensDoc };
