import { cva } from 'class-variance-authority';
import type { ComponentProps, ReactNode } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';

const ALERT_ICON_SIZE = 24;

type AlertLayout = 'default' | 'fullWidth';
type AlertVariant = 'negative' | 'information' | 'positive' | 'attention' | 'neutral';

const ASSERTIVE_VARIANTS = new Set<AlertVariant>(['negative', 'attention']);

const ALERT_STATUS_ICONS: Record<AlertVariant, string> = {
  negative: 'warning',
  information: 'info',
  positive: 'check_circle',
  attention: 'error',
  neutral: 'info',
};

const alertVariants = cva('alert', {
  variants: {
    layout: {
      default: '',
      fullWidth: '',
    },
    variant: {
      negative: '',
      information: '',
      positive: '',
      attention: '',
      neutral: '',
    },
  },
  compoundVariants: [
    { layout: 'default', class: 'alert-preset-layout-default' },
    { layout: 'fullWidth', class: 'alert-preset-layout-full-width' },
    { variant: 'negative', class: 'alert-negative' },
    { variant: 'information', class: 'alert-information' },
    { variant: 'positive', class: 'alert-positive' },
    { variant: 'attention', class: 'alert-attention' },
    { variant: 'neutral', class: 'alert-neutral' },
  ],
  defaultVariants: {
    layout: 'default',
    variant: 'neutral',
  },
});

const alertIconVariants = cva('alert-icon', {
  variants: {
    variant: {
      negative: 'alert-icon-negative',
      information: 'alert-icon-information',
      positive: 'alert-icon-positive',
      attention: 'alert-icon-attention',
      neutral: 'alert-icon-neutral',
    },
  },
  defaultVariants: {
    variant: 'neutral',
  },
});

export type AlertProps = Omit<ComponentProps<'div'>, 'title'> & {
  /** Additional CSS class names applied to the root element. */
  className?: string;
  /**
   * Container layout — `default` is a rounded inline card; `fullWidth` spans edge-to-edge without radius.
   * @default "default"
   */
  layout?: AlertLayout;
  /**
   * Semantic colour and icon — negative for errors, positive for success, attention for warnings,
   * information for guidance, neutral for general notices.
   * @default "neutral"
   */
  variant?: AlertVariant;
  /** Primary message shown in semibold body text. */
  title: ReactNode;
  /** Optional supporting detail shown below the title in regular body text. */
  description?: ReactNode;
  /** Label for the optional text action rendered on the trailing edge. */
  actionLabel?: string;
  /** Called when the trailing text action is activated. */
  onAction?: () => void;
  /** Called when the dismiss control is activated. When omitted, the dismiss button is hidden. */
  onDismiss?: () => void;
};

/** Contextual status banner with semantic colour, optional description, action, and dismiss controls. */
export function Alert({
  className,
  layout = 'default',
  variant = 'neutral',
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  ...props
}: AlertProps) {
  const resolvedVariant = variant ?? 'neutral';
  const showAction = Boolean(actionLabel && onAction);
  const showDismiss = Boolean(onDismiss);
  const role = ASSERTIVE_VARIANTS.has(resolvedVariant) ? 'alert' : 'status';

  return (
    <div
      className={cn(alertVariants({ layout, variant, className }))}
      data-slot="alert"
      data-variant={resolvedVariant}
      role={role}
      {...props}
    >
      <span className={alertIconVariants({ variant: resolvedVariant })} data-slot="alert-icon">
        <Icon name={ALERT_STATUS_ICONS[resolvedVariant]} variant="filled" size={ALERT_ICON_SIZE} />
      </span>
      <div className="alert-content" data-slot="alert-content">
        <div className="alert-title" data-slot="alert-title">
          {title}
        </div>
        {description ? (
          <div className="alert-description" data-slot="alert-description">
            {description}
          </div>
        ) : null}
      </div>
      {showAction ? (
        <button type="button" className="alert-action" data-slot="alert-action" onClick={onAction}>
          {actionLabel}
        </button>
      ) : null}
      {showDismiss ? (
        <button
          type="button"
          className="alert-dismiss"
          data-slot="alert-dismiss"
          aria-label="Dismiss"
          onClick={onDismiss}
        >
          <Icon name="close" size={ALERT_ICON_SIZE} />
        </button>
      ) : null}
    </div>
  );
}

export { alertIconVariants, alertVariants, type AlertLayout, type AlertVariant };
