import { Button } from "@ds-12/ui/button";
import { Icon as IconComponent } from "@ds-12/ui/icon";
import { Typography } from "@ds-12/ui/typography";

export const VARIANTS = ["primary", "secondary", "danger", "icon"] as const;
export const SIZES = ["sm", "md", "lg"] as const;

const SIZE_ROWS = ["lg", "md", "sm"] as const;
const TEXT_VARIANTS = ["primary", "secondary", "danger"] as const;

type ButtonVariant = (typeof VARIANTS)[number];
type ButtonSize = (typeof SIZES)[number];

const VARIANT_LABELS: Record<ButtonVariant, string> = {
  primary: "Primary",
  secondary: "Secondary",
  danger: "Danger",
  icon: "Icon",
};

const SIZE_LABELS: Record<ButtonSize, string> = {
  sm: "Small",
  md: "Medium",
  lg: "Large",
};

export const leadingIconButtons = [
  { variant: "primary", icon: "download", label: "Download" },
  { variant: "secondary", icon: "search", label: "Search" },
  { variant: "danger", icon: "delete", label: "Delete" },
  { variant: "primary", icon: "add", label: "New item" },
  { variant: "secondary", icon: "notifications", label: "Subscribe" },
  { variant: "primary", icon: "check", label: "Confirm" },
] as const;

export const trailingIconButtons = [
  { variant: "primary", icon: "arrow_forward", label: "Continue" },
  { variant: "secondary", icon: "chevron_right", label: "View all" },
  { variant: "danger", icon: "arrow_forward", label: "Proceed" },
  { variant: "primary", icon: "arrow_forward", label: "Get started" },
  { variant: "secondary", icon: "chevron_right", label: "More" },
  { variant: "primary", icon: "arrow_forward", label: "Launch" },
] as const;

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

function VariantButton({ variant, size = "md" }: { variant: ButtonVariant; size?: ButtonSize }) {
  if (variant === "icon") {
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
              <Typography variant="label-small">{VARIANT_LABELS[variant]}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="label-small">Preview</Typography>
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
              <Typography variant="label-small">{VARIANT_LABELS[variant]}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZE_ROWS.map((size) => (
          <tr key={size}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label-small">{SIZE_LABELS[size]}</Typography>
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

function IconButton({
  icon,
  label,
  variant,
  iconPosition,
  size = "md",
}: {
  icon: string;
  label: string;
  variant: (typeof TEXT_VARIANTS)[number];
  iconPosition: "left" | "right";
  size?: ButtonSize;
}) {
  return (
    <Button
      variant={variant}
      size={size}
      icon={<IconComponent name={icon} variant="outlined" />}
      iconPosition={iconPosition}
    >
      {label}
    </Button>
  );
}

export function IconButtonMatrixTable({
  buttons,
  iconPosition,
}: {
  buttons: readonly {
    variant: (typeof TEXT_VARIANTS)[number];
    icon: string;
    label: string;
  }[];
  iconPosition: "left" | "right";
}) {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle} />
          {buttons.map(({ icon, label }) => (
            <th key={`${icon}-${label}`} scope="col" style={headerCellStyle}>
              <Typography variant="label-small">{label}</Typography>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SIZE_ROWS.map((size) => (
          <tr key={size}>
            <th scope="row" style={headerCellStyle}>
              <Typography variant="label-small">{SIZE_LABELS[size]}</Typography>
            </th>
            {buttons.map(({ variant, icon, label }) => (
              <td key={`${variant}-${icon}-${label}`} style={bodyCellStyle}>
                <IconButton
                  variant={variant}
                  icon={icon}
                  label={label}
                  iconPosition={iconPosition}
                  size={size}
                />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function IconOnlyMatrixTable() {
  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th scope="col" style={headerCellStyle} />
          {SIZE_ROWS.map((size) => (
            <th key={size} scope="col" style={headerCellStyle}>
              <Typography variant="label-small">{SIZE_LABELS[size]}</Typography>
            </th>
          ))}
          <th scope="col" style={headerCellStyle}>
            <Typography variant="label-small">Disabled</Typography>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row" style={headerCellStyle}>
            <Typography variant="label-small">Icon</Typography>
          </th>
          {SIZE_ROWS.map((size) => (
            <td key={size} style={bodyCellStyle}>
              <Button variant="icon" size={size} aria-label="Add">
                <IconComponent name="add" variant="outlined" />
              </Button>
            </td>
          ))}
          <td style={bodyCellStyle}>
            <Button variant="icon" size="md" disabled aria-label="Add">
              <IconComponent name="add" variant="outlined" />
            </Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
