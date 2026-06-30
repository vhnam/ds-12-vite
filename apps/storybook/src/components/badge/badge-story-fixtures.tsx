import { Badge } from '@ds-12/ui/badge';
import { Icon } from '@ds-12/ui/icon';
import { Typography } from '@ds-12/ui/typography';

export const VARIANTS = ['neutral', 'negative', 'attention', 'positive', 'information'] as const;
export const SIZES = ['sm', 'lg'] as const;
export const EMPHASIS = ['subtle', 'bold'] as const;

type BadgeVariant = (typeof VARIANTS)[number];
type BadgeSize = (typeof SIZES)[number];
type BadgeEmphasis = (typeof EMPHASIS)[number];

const VARIANT_LABELS: Record<BadgeVariant, string> = {
  neutral: 'Neutral',
  negative: 'Negative',
  attention: 'Attention',
  positive: 'Positive',
  information: 'Information',
};

const SIZE_LABELS: Record<BadgeSize, string> = {
  sm: 'Small',
  lg: 'Large',
};

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

function SampleBadge({
  variant,
  emphasis,
  size,
  children = 'Badge',
}: {
  variant: BadgeVariant;
  emphasis: BadgeEmphasis;
  size: BadgeSize;
  children?: string;
}) {
  return (
    <Badge size={size} variant={variant} emphasis={emphasis} icon={<Icon name="check_circle" variant="filled" />}>
      {children}
    </Badge>
  );
}

function BadgeTypePair({ variant, size }: { variant: BadgeVariant; size: BadgeSize }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-start' }}>
      <SampleBadge variant={variant} emphasis="subtle" size={size} />
      <SampleBadge variant={variant} emphasis="bold" size={size} />
    </div>
  );
}

export function SizesTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle} />
          {VARIANTS.map((variant) => (
            <th key={variant} scope="col" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {VARIANT_LABELS[variant]}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZES.map((size) => (
          <tr key={size}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {SIZE_LABELS[size]}
              </Typography>
            </th>
            {VARIANTS.map((variant) => (
              <td key={variant} style={bodyCellStyle}>
                <BadgeTypePair variant={variant} size={size} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
