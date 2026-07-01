import { Breadcrumb } from '@ds-12/ui/breadcrumb';
import { Typography } from '@ds-12/ui/typography';

export const DEFAULT_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' },
] as const;

export const COLLAPSED_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Foundations', href: '/foundations' },
  { label: 'Components', href: '/components' },
  { label: 'Breadcrumb' },
] as const;

const showcaseStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
} as const;

const rowStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 8,
} as const;

export function VariantsShowcase() {
  return (
    <div style={showcaseStyle}>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Default
        </Typography>
        <Breadcrumb items={[...DEFAULT_ITEMS]} />
      </div>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Collapsed
        </Typography>
        <Breadcrumb items={[...COLLAPSED_ITEMS]} collapsed />
      </div>
    </div>
  );
}
