import { Calendar, type DateRange, type CalendarVariant } from '@ds-12/ui/calendar';
import { Typography } from '@ds-12/ui/typography';

export const VARIANTS = ['default', 'range'] as const;

const tableStyle = {
  borderCollapse: 'collapse',
  width: '100%',
} as const;

const headerCellStyle = {
  padding: '12px 16px',
  borderBottom: '1px solid var(--color-semantic-border-neutral-subtle)',
  textAlign: 'left' as const,
  verticalAlign: 'middle' as const,
};

const bodyCellStyle = {
  ...headerCellStyle,
  fontWeight: 400,
};

function DefaultCalendarShowcase({ defaultMonth, selected }: { defaultMonth: Date; selected: Date }) {
  return <Calendar variant="default" mode="single" defaultMonth={defaultMonth} selected={selected} />;
}

function RangeCalendarShowcase({ defaultMonth, selected }: { defaultMonth: Date; selected: DateRange }) {
  return <Calendar variant="range" mode="range" defaultMonth={defaultMonth} selected={selected} />;
}

export function CalendarVariantsTable() {
  const june2025 = new Date(2025, 5, 1);
  const rangeSelection: DateRange = {
    from: new Date(2025, 5, 25),
    to: new Date(2025, 6, 9),
  };

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>
            <Typography variant="label" size="sm">
              Variant
            </Typography>
          </th>
          <th style={headerCellStyle}>
            <Typography variant="label" size="sm">
              Preview
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td style={bodyCellStyle}>
            <Typography variant="paragraph" size="sm">
              Default
            </Typography>
          </td>
          <td style={bodyCellStyle}>
            <DefaultCalendarShowcase defaultMonth={june2025} selected={new Date(2025, 5, 25)} />
          </td>
        </tr>
        <tr>
          <td style={bodyCellStyle}>
            <Typography variant="paragraph" size="sm">
              Range
            </Typography>
          </td>
          <td style={bodyCellStyle}>
            <RangeCalendarShowcase defaultMonth={june2025} selected={rangeSelection} />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export type { CalendarVariant };
