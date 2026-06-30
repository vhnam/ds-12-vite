import { Typography, type TypographyRender } from '@ds-12/ui/typography';

export const HEADING_VARIANTS = ['display', 'h1', 'h2', 'h3', 'h4'] as const;

const HEADING_RENDER: Record<(typeof HEADING_VARIANTS)[number], string | undefined> = {
  display: 'div',
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
};

export const PARAGRAPH_SHOWCASE = [
  { size: 'xl', weight: 'semibold', label: 'Paragraph XLarge' },
  { size: 'lg', weight: 'regular', label: 'Paragraph Large' },
  { size: 'md', weight: 'regular', label: 'Paragraph' },
  { size: 'sm', weight: 'regular', label: 'Paragraph Small' },
] as const;

export const LABEL_SIZES = [
  { size: 'lg', label: 'Label Large' },
  { size: 'md', label: 'Label' },
  { size: 'sm', label: 'Label Small' },
] as const;

export const HEADING_LABELS: Record<(typeof HEADING_VARIANTS)[number], string> = {
  display: 'Display',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
};

const showcaseStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 16,
} as const;

const sampleText = 'The quick brown fox jumps over the lazy dog';

export function HeadingShowcase() {
  return (
    <div style={showcaseStyle}>
      {HEADING_VARIANTS.map((variant) => (
        <div key={variant}>
          <Typography variant={variant} render={HEADING_RENDER[variant] as TypographyRender}>
            {HEADING_LABELS[variant]}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function ParagraphShowcase() {
  return (
    <div style={showcaseStyle}>
      {PARAGRAPH_SHOWCASE.map(({ size, weight, label }) => (
        <div key={`${size}-${weight}`}>
          <Typography variant="paragraph" size={size} weight={weight} render="p">
            {label}: {sampleText}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function LabelShowcase() {
  return (
    <div style={showcaseStyle}>
      {LABEL_SIZES.map(({ size, label }) => (
        <div key={size}>
          <Typography variant="label" size={size} render="label">
            {label}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function SemanticElementsShowcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <Typography variant="h1" render="h1">
        Page title
      </Typography>
      <Typography variant="h2" render="h2">
        Section heading
      </Typography>
      <Typography variant="paragraph" render="p">
        Body copy uses the paragraph variant with a semantic paragraph element.
      </Typography>
      <Typography variant="label" render="label">
        Form label
      </Typography>
    </div>
  );
}
