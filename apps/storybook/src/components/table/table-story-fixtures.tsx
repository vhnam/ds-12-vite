import { Avatar } from '@ds-12/ui/avatar';
import { Badge } from '@ds-12/ui/badge';
import { Button } from '@ds-12/ui/button';
import { Icon } from '@ds-12/ui/icon';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@ds-12/ui/table';

import { StoryCaption, StorySectionTitle } from '../../lib/story-presentation.tsx';

export const CELL_STATES = ['default', 'hovered', 'highlighted', 'disabled', 'focused'] as const;

export type TableCellStoryState = (typeof CELL_STATES)[number];

export const CELL_VARIANTS = [
  { key: 'default', label: 'Default' },
  { key: 'end', label: 'Right aligned' },
  { key: 'stacked', label: 'Stacked' },
  { key: 'avatar', label: 'With avatar' },
  { key: 'badge', label: 'With badge' },
  { key: 'custom', label: 'Custom' },
] as const;

const showcaseColumnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 0,
  minWidth: 150,
} as const;

const showcaseGridStyle = {
  display: 'flex',
  gap: 0,
  overflowX: 'auto',
} as const;

const sectionStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
} as const;

function DemoAvatar({ disabled = false }: { disabled?: boolean }) {
  return (
    <Avatar
      size="md"
      shape="user"
      variant="initial"
      initials="BL"
      aria-hidden
      style={disabled ? { opacity: 0.6 } : undefined}
    />
  );
}

function renderCellVariant(variantKey: (typeof CELL_VARIANTS)[number]['key'], state: TableCellStoryState) {
  const align = variantKey === 'end' ? 'end' : 'start';
  const variant =
    variantKey === 'end' ? 'default' : variantKey === 'badge' || variantKey === 'custom' ? 'custom' : variantKey;

  if (variantKey === 'badge') {
    return (
      <TableCell variant="custom" state={state}>
        <Badge size="sm" variant="information" icon={<Icon name="check_circle" variant="filled" />}>
          Badge
        </Badge>
      </TableCell>
    );
  }

  if (variantKey === 'custom') {
    return (
      <TableCell variant="custom" state={state}>
        <span />
      </TableCell>
    );
  }

  return (
    <TableCell
      variant={variant}
      align={align}
      state={state}
      text="Text"
      subText="Sub text"
      avatar={variant === 'avatar' ? <DemoAvatar disabled={state === 'disabled'} /> : undefined}
      showChevron={variant === 'default' || variant === 'stacked' || variant === 'avatar'}
    />
  );
}

export function HeadVariantsShowcase() {
  return (
    <div style={sectionStyle}>
      <div>
        <StorySectionTitle>Header cells</StorySectionTitle>
        <StoryCaption>Default, right-aligned, and avatar header variants.</StoryCaption>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable>Heading</TableHead>
          </TableRow>
          <TableRow>
            <TableHead align="end">Heading</TableHead>
          </TableRow>
          <TableRow>
            <TableHead variant="avatar" avatar={<DemoAvatar />}>
              Heading
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>
    </div>
  );
}

export function CellStatesShowcase() {
  return (
    <div style={sectionStyle}>
      <div>
        <StorySectionTitle>Cell states</StorySectionTitle>
        <StoryCaption>Content variants across default, hovered, highlighted, disabled, and focused.</StoryCaption>
      </div>
      <div style={showcaseGridStyle}>
        {CELL_STATES.map((state) => (
          <div key={state} style={showcaseColumnStyle}>
            <StoryCaption>{state}</StoryCaption>
            {CELL_VARIANTS.map((cellVariant) => (
              <Table key={`${state}-${cellVariant.key}`}>
                <TableBody>
                  <TableRow>{renderCellVariant(cellVariant.key, state)}</TableRow>
                </TableBody>
              </Table>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

const SAMPLE_ROWS = Array.from({ length: 10 }, (_, index) => index);

export function FullTableShowcase() {
  return (
    <Table aria-label="Sample data table">
      <TableHeader>
        <TableRow>
          <TableHead sortable>Heading</TableHead>
          <TableHead>Heading</TableHead>
          <TableHead sortable>Heading</TableHead>
          <TableHead align="end" sortable>
            Heading
          </TableHead>
          <TableHead align="end">Heading</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {SAMPLE_ROWS.map((row) => (
          <TableRow key={row} interactive>
            <TableCell variant="avatar" text="Text" subText="Sub text" avatar={<DemoAvatar />} />
            <TableCell text="Text" />
            <TableCell variant="custom">
              <Badge size="sm" variant="information" icon={<Icon name="check_circle" variant="filled" />}>
                Badge
              </Badge>
            </TableCell>
            <TableCell align="end" text="S$99,999" />
            <TableCell variant="custom" align="end">
              <Button variant="icon" size="sm" aria-label="Row actions">
                <Icon name="more_horiz" size={24} />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
