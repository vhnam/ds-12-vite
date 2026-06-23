import { Badge } from "@ds-12/ui/badge";
import { Icon } from "@ds-12/ui/icon";
import { Typography } from "@ds-12/ui/typography";

export const VARIANTS = ["neutral", "negative", "attention", "positive", "information"] as const;
export const SIZES = ["sm", "lg"] as const;
export const EMPHASIS = ["subtle", "bold"] as const;

type BadgeVariant = (typeof VARIANTS)[number];
type BadgeSize = (typeof SIZES)[number];
type BadgeEmphasis = (typeof EMPHASIS)[number];

const VARIANT_LABELS: Record<BadgeVariant, string> = {
  neutral: "Neutral",
  negative: "Negative",
  attention: "Attention",
  positive: "Positive",
  information: "Information",
};

const SIZE_LABELS: Record<BadgeSize, string> = {
  sm: "Small",
  lg: "Large",
};

const tableStyle = {
  borderCollapse: "collapse",
  width: "100%",
} as const;

const headerCellStyle = {
  padding: "12px 16px",
  borderBottom: "1px solid var(--color-semantic-border-neutral-subtle)",
  textAlign: "left" as const,
  verticalAlign: "middle" as const,
};

const bodyCellStyle = {
  ...headerCellStyle,
  fontWeight: 400,
};

const statusListItems = [
  { label: "User permissions", variant: "positive", badge: "Active" },
  { label: "Payment gateway", variant: "attention", badge: "Degraded" },
  { label: "Email service", variant: "negative", badge: "Failed" },
  { label: "Documentation", variant: "information", badge: "Beta" },
  { label: "Account tier", variant: "neutral", badge: "Standard" },
] as const satisfies readonly {
  label: string;
  variant: BadgeVariant;
  badge: string;
}[];

function SampleBadge({
  variant,
  emphasis,
  size,
  children = "Badge",
}: {
  variant: BadgeVariant;
  emphasis: BadgeEmphasis;
  size: BadgeSize;
  children?: string;
}) {
  return (
    <Badge
      size={size}
      variant={variant}
      emphasis={emphasis}
      icon={<Icon name="check_circle" variant="filled" />}
    >
      {children}
    </Badge>
  );
}

function BadgeTypePair({ variant, size }: { variant: BadgeVariant; size: BadgeSize }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-start" }}>
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
              <Typography variant="label-small">{VARIANT_LABELS[variant]}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZES.map((size) => (
          <tr key={size}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label-small">{SIZE_LABELS[size]}</Typography>
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

export function StatusListTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle}>
            <Typography variant="label-small">Item</Typography>
          </th>
          <th scope="col" style={headerCellStyle}>
            <Typography variant="label-small">Status</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        {statusListItems.map(({ label, variant, badge }) => (
          <tr key={label}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="paragraph-small">{label}</Typography>
            </th>
            <td style={bodyCellStyle}>
              <SampleBadge variant={variant} emphasis="subtle" size="sm">
                {badge}
              </SampleBadge>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function InlineProseTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle}>
            <Typography variant="label-small">Context</Typography>
          </th>
          <th scope="col" style={headerCellStyle}>
            <Typography variant="label-small">Preview</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="paragraph-small">Feature announcement</Typography>
          </th>
          <td style={bodyCellStyle}>
            <Typography variant="paragraph-small">
              Your workspace now includes real-time sync.{" "}
              <SampleBadge variant="information" emphasis="subtle" size="sm">
                New
              </SampleBadge>
            </Typography>
          </td>
        </tr>
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="paragraph-small">Deployment status</Typography>
          </th>
          <td style={bodyCellStyle}>
            <Typography variant="paragraph-small">
              The deployment is{" "}
              <SampleBadge variant="positive" emphasis="subtle" size="sm">
                Live
              </SampleBadge>{" "}
              and serving traffic.
            </Typography>
          </td>
        </tr>
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="paragraph-small">Account warning</Typography>
          </th>
          <td style={bodyCellStyle}>
            <Typography variant="paragraph-small">
              Your trial expires in 3 days.{" "}
              <SampleBadge variant="attention" emphasis="subtle" size="sm">
                Action required
              </SampleBadge>
            </Typography>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
