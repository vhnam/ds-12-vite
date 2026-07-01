import { Alert } from '@ds-12/ui/alert';
import { Typography } from '@ds-12/ui/typography';

export const VARIANTS = ['negative', 'positive', 'attention', 'information', 'neutral'] as const;
export const LAYOUTS = ['default', 'fullWidth'] as const;

type AlertVariant = (typeof VARIANTS)[number];
type AlertLayout = (typeof LAYOUTS)[number];

const VARIANT_LABELS: Record<AlertVariant, string> = {
  negative: 'Negative',
  positive: 'Positive',
  attention: 'Attention',
  information: 'Information',
  neutral: 'Neutral',
};

const LAYOUT_LABELS: Record<AlertLayout, string> = {
  default: 'Default',
  fullWidth: 'Full width',
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

function SampleAlert({
  variant,
  layout,
  title = 'Text',
  description,
  actionLabel,
  onAction,
  onDismiss,
}: {
  variant: AlertVariant;
  layout: AlertLayout;
  title?: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <Alert
      variant={variant}
      layout={layout}
      title={title}
      description={description}
      actionLabel={actionLabel}
      onAction={onAction}
      onDismiss={onDismiss}
    />
  );
}

export function VariantsShowcase() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={headerCellStyle}>
            <Typography variant="label" size="sm">
              Variant
            </Typography>
          </th>
          {LAYOUTS.map((layout) => (
            <th key={layout} style={headerCellStyle}>
              <Typography variant="label" size="sm">
                {LAYOUT_LABELS[layout]}
              </Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {VARIANTS.map((variant) => (
          <tr key={variant}>
            <td style={bodyCellStyle}>
              <Typography variant="label" size="sm">
                {VARIANT_LABELS[variant]}
              </Typography>
            </td>
            {LAYOUTS.map((layout) => (
              <td key={layout} style={bodyCellStyle}>
                <SampleAlert
                  variant={variant}
                  layout={layout}
                  title="Text"
                  description="Subtext"
                  actionLabel="Action"
                  onAction={() => undefined}
                  onDismiss={() => undefined}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ContentLayoutsShowcase() {
  const rows = [
    { title: 'Title and description', description: 'Subtext', actionLabel: 'Action', dismiss: true },
    { title: 'Title only', description: undefined, actionLabel: 'Action', dismiss: true },
    { title: 'With action only', description: 'Subtext', actionLabel: 'Action', dismiss: false },
    { title: 'Dismiss only', description: 'Subtext', actionLabel: undefined, dismiss: true },
    { title: 'Content only', description: 'Subtext', actionLabel: undefined, dismiss: false },
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '480px' }}>
      {rows.map((row) => (
        <Alert
          key={row.title}
          variant="information"
          title={row.title}
          description={row.description}
          actionLabel={row.actionLabel}
          onAction={row.actionLabel ? () => undefined : undefined}
          onDismiss={row.dismiss ? () => undefined : undefined}
        />
      ))}
    </div>
  );
}
