import { Button } from '@ds-12/ui/button';
import { Icon as IconComponent } from '@ds-12/ui/icon';
import { Typography } from '@ds-12/ui/typography';

export const VARIANTS = ['primary', 'secondary', 'danger', 'icon'] as const;
export const SIZES = ['sm', 'md', 'lg'] as const;

const SIZE_ROWS = ['lg', 'md', 'sm'] as const;

type ButtonVariant = (typeof VARIANTS)[number];
type ButtonSize = (typeof SIZES)[number];

const VARIANT_LABELS: Record<ButtonVariant, string> = {
  primary: 'Primary',
  secondary: 'Secondary',
  danger: 'Danger',
  icon: 'Icon',
};

const SIZE_LABELS: Record<ButtonSize, string> = {
  sm: 'Small',
  md: 'Medium',
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

function VariantButton({ variant, size = 'md' }: { variant: ButtonVariant; size?: ButtonSize }) {
  if (variant === 'icon') {
    return (
      <Button variant="icon" size={size} aria-label="Add">
        <IconComponent name="add" variant="outlined" />
      </Button>
    );
  }

  return (
    <Button variant={variant} size={size}>
      Button
    </Button>
  );
}

export function VariantsTable() {
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
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="label" size="sm">
              Preview
            </Typography>
          </th>
          {VARIANTS.map((variant) => (
            <td key={variant} style={bodyCellStyle}>
              <VariantButton variant={variant} />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

export function VariantSizeMatrixTable({ loading = false }: { loading?: boolean }) {
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
        {SIZE_ROWS.map((size) => (
          <tr key={size}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {SIZE_LABELS[size]}
              </Typography>
            </th>
            {VARIANTS.map((variant) => (
              <td key={variant} style={bodyCellStyle}>
                {loading ? (
                  <Button variant={variant} size={size} loading aria-label="Loading">
                    Button
                  </Button>
                ) : (
                  <VariantButton variant={variant} size={size} />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
