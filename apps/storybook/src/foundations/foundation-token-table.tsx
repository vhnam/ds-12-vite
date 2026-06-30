import type { CSSProperties, ReactNode } from 'react';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ds-12/ui/table';
import { Typography } from '@ds-12/ui/typography';

const pageStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
} as const;

const cardStyle = {
  backgroundColor: 'var(--color-neutral-00)',
  border: '1px solid var(--color-semantic-border-subtle)',
  borderRadius: 'var(--radius-medium)',
  overflow: 'hidden',
} as const;

const cardHeaderStyle = {
  padding: '20px 24px',
} as const;

const cardTitleStyle = {
  margin: '0 0 4px',
  textTransform: 'capitalize',
} as const;

const cardDescriptionStyle = {
  margin: 0,
  color: 'var(--color-semantic-text-neutral-moderate)',
} as const;

const embeddedTableStyle = {
  marginTop: 0,
  border: 'none',
  borderRadius: 0,
} as const;

const tokenNameCellStyle = {
  margin: 0,
  color: 'var(--color-semantic-text-neutral-bold)',
} as const;

const variableCellStyle = {
  margin: 0,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--line-height-16)',
  color: 'var(--color-semantic-text-neutral-moderate)',
} as const;

const valueCellStyle = {
  margin: 0,
  fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
  fontSize: 'var(--font-size-12)',
  lineHeight: 'var(--line-height-16)',
  color: 'var(--color-semantic-text-neutral-bold)',
} as const;

type FoundationTokenTableColumn = {
  label: string;
  width?: number;
};

function FoundationTokenTable({
  columns,
  children,
}: {
  columns: readonly FoundationTokenTableColumn[];
  children: ReactNode;
}) {
  return (
    <Table style={embeddedTableStyle}>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.label} style={column.width === undefined ? undefined : { width: column.width }}>
              {column.label}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>{children}</TableBody>
    </Table>
  );
}

function FoundationTokenNameCell({ children }: { children: ReactNode }) {
  return (
    <TableCell variant="custom">
      <Typography variant="label" size="sm" render="p" style={tokenNameCellStyle}>
        {children}
      </Typography>
    </TableCell>
  );
}

function FoundationTokenVariableCell({ children }: { children: ReactNode }) {
  return (
    <TableCell variant="custom">
      <Typography variant="label" size="sm" render="p" style={variableCellStyle}>
        {children}
      </Typography>
    </TableCell>
  );
}

function FoundationTokenValueCell({
  children,
  style,
  width,
}: {
  children: ReactNode;
  style?: CSSProperties;
  width?: number;
}) {
  return (
    <TableCell variant="custom" style={width === undefined ? undefined : { width }}>
      <Typography variant="label" size="sm" render="p" style={{ ...valueCellStyle, ...style }}>
        {children}
      </Typography>
    </TableCell>
  );
}

function FoundationTokenPreviewCell({ children, width }: { children: ReactNode; width?: number }) {
  return (
    <TableCell variant="custom" style={width === undefined ? undefined : { width }}>
      {children}
    </TableCell>
  );
}

export {
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
};
