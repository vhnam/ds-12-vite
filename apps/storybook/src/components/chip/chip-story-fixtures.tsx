import { Chip } from '@ds-12/ui/chip';
import { Icon } from '@ds-12/ui/icon';
import { Typography } from '@ds-12/ui/typography';

const CHIP_ICON_SIZE = 16;

export const VARIANT_ROWS = [
  { active: false, label: 'Inactive' },
  { active: true, label: 'Active' },
] as const;

const LAYOUT_ROWS = [
  { key: 'leading', label: 'Leading' },
  { key: 'trailing', label: 'Trailing' },
  { key: 'both', label: 'Both' },
] as const;

const STATE_COLUMNS = [
  { state: 'default', label: 'Default' },
  { state: 'hover', label: 'Hover' },
  { state: 'pressed', label: 'Pressed' },
  { state: 'focus', label: 'Focus' },
] as const;

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

type ChipStoryState = (typeof STATE_COLUMNS)[number]['state'];

function StateChip({ active, state }: { active: boolean; state: ChipStoryState }) {
  return (
    <Chip active={active} {...(state === 'default' ? {} : { 'data-story-chip-state': state })}>
      Label
    </Chip>
  );
}

function LeadingChip({ active }: { active: boolean }) {
  return (
    <Chip active={active} showLeadingIcon leadingIcon={<Icon name="person" size={CHIP_ICON_SIZE} />}>
      User
    </Chip>
  );
}

function TrailingChip({ active }: { active: boolean }) {
  return (
    <Chip active={active} showTrailingIcon>
      Label
    </Chip>
  );
}

function BothChip({ active }: { active: boolean }) {
  return (
    <Chip active={active} showLeadingIcon showTrailingIcon>
      Filters
    </Chip>
  );
}

function IconLayoutCell({ layout, active }: { layout: (typeof LAYOUT_ROWS)[number]['key']; active: boolean }) {
  switch (layout) {
    case 'leading':
      return <LeadingChip active={active} />;
    case 'trailing':
      return <TrailingChip active={active} />;
    case 'both':
      return <BothChip active={active} />;
  }
}

export function VariantStatesMatrixTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle} />
          {STATE_COLUMNS.map(({ state, label }) => (
            <th key={state} scope="col" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {label}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANT_ROWS.map(({ active, label }) => (
          <tr key={label}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {label}
              </Typography>
            </th>
            {STATE_COLUMNS.map(({ state }) => (
              <td key={state} style={bodyCellStyle}>
                <StateChip active={active} state={state} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function IconLayoutsShowcase() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle} />
          {VARIANT_ROWS.map(({ label }) => (
            <th key={label} scope="col" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {label}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {LAYOUT_ROWS.map(({ key, label }) => (
          <tr key={key}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {label}
              </Typography>
            </th>
            {VARIANT_ROWS.map(({ active, label: variantLabel }) => (
              <td key={variantLabel} style={bodyCellStyle}>
                <IconLayoutCell layout={key} active={active} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
