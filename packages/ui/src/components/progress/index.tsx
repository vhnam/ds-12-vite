import { cva } from 'class-variance-authority';
import { createContext, type ComponentProps } from 'react';

import { cn } from '../../lib/utils.ts';
import { Icon } from '../icon/index.tsx';
import { getProgressStepStatus, type ProgressStepStatus } from './get-progress-step-status.ts';

const PROGRESS_SEPARATOR_ICON_SIZE = 24;
const PROGRESS_CHECK_ICON_SIZE = 15;

export const ProgressIconSizeContext = createContext<number | undefined>(undefined);

const progressVariants = cva('progress', {
  variants: {},
  defaultVariants: {},
});

const progressStepVariants = cva('progress-step', {
  variants: {
    status: {
      upcoming: '',
      current: '',
      past: '',
    },
  },
  defaultVariants: {
    status: 'upcoming',
  },
});

const progressIndicatorVariants = cva('progress-indicator', {
  variants: {
    status: {
      upcoming: '',
      current: '',
      past: '',
    },
  },
  compoundVariants: [
    { status: 'upcoming', class: 'progress-indicator-upcoming' },
    { status: 'current', class: 'progress-indicator-current' },
    { status: 'past', class: 'progress-indicator-past' },
  ],
  defaultVariants: {
    status: 'upcoming',
  },
});

const progressIndicatorNumberVariants = cva('progress-indicator-number', {
  variants: {
    status: {
      upcoming: 'progress-indicator-number-upcoming',
      current: 'progress-indicator-number-current',
      past: '',
    },
  },
  defaultVariants: {
    status: 'upcoming',
  },
});

const progressLabelVariants = cva('progress-label', {
  variants: {
    status: {
      upcoming: 'progress-label-upcoming',
      current: 'progress-label-current',
      past: 'progress-label-past',
    },
  },
  defaultVariants: {
    status: 'upcoming',
  },
});

export type ProgressStepItem = {
  /** Step label shown beside the indicator. */
  label: string;
};

export type ProgressStepProps = ComponentProps<'div'> & {
  /** Additional CSS class names applied to the step element. */
  className?: string;
  /** Step label shown beside the indicator. */
  label: string;
  /**
   * Visual state — `current` for the active step, `past` for completed steps, `upcoming` for future steps.
   * @default "upcoming"
   */
  status?: ProgressStepStatus;
  /**
   * Step number shown inside the indicator for upcoming and current states.
   * Ignored when `status` is `past` (checkmark is shown instead).
   */
  stepNumber?: number;
};

export type ProgressProps = Omit<ComponentProps<'nav'>, 'children'> & {
  /** Additional CSS class names applied to the navigation element. */
  className?: string;
  /** Ordered steps from first to last. */
  steps: ProgressStepItem[];
  /**
   * 1-based index of the active step.
   * Steps before this index render as completed; steps after render as upcoming.
   */
  currentStep: number;
};

function ProgressSeparatorIcon() {
  return (
    <span className="progress-separator" data-slot="progress-separator" aria-hidden="true">
      <span className="progress-icon">
        <Icon name="chevron_forward" size={PROGRESS_SEPARATOR_ICON_SIZE} />
      </span>
    </span>
  );
}

/** Single progress step with numbered or completed indicator and label. */
export function ProgressStep({ className, label, status = 'upcoming', stepNumber, ...props }: ProgressStepProps) {
  const resolvedStatus = status ?? 'upcoming';
  const showNumber = resolvedStatus !== 'past' && stepNumber !== undefined;

  return (
    <div
      className={cn(progressStepVariants({ status: resolvedStatus, className }))}
      data-slot="progress-step"
      data-variant={resolvedStatus}
      {...props}
    >
      <span className={progressIndicatorVariants({ status: resolvedStatus })} data-slot="progress-indicator">
        {resolvedStatus === 'past' ? (
          <span className="progress-indicator-check" data-slot="progress-indicator-check">
            <Icon name="check" variant="filled" size={PROGRESS_CHECK_ICON_SIZE} />
          </span>
        ) : showNumber ? (
          <span
            className={progressIndicatorNumberVariants({ status: resolvedStatus })}
            data-slot="progress-indicator-number"
          >
            {stepNumber}
          </span>
        ) : null}
      </span>
      <span className={progressLabelVariants({ status: resolvedStatus })} data-slot="progress-label">
        {label}
      </span>
    </div>
  );
}

/** Horizontal step indicator for multi-step flows on desktop. */
export function Progress({
  className,
  steps,
  currentStep,
  'aria-label': ariaLabel = 'Progress',
  ...props
}: ProgressProps) {
  return (
    <ProgressIconSizeContext.Provider value={PROGRESS_SEPARATOR_ICON_SIZE}>
      <nav
        className={cn(progressVariants({ className }))}
        data-slot="progress"
        data-variant="default"
        aria-label={ariaLabel}
        {...props}
      >
        <ol className="progress-list">
          {steps.map((step, index) => {
            const status = getProgressStepStatus(index, currentStep);
            const isLast = index === steps.length - 1;

            return (
              <li
                key={`${step.label}-${index}`}
                className="progress-item"
                data-slot="progress-item"
                aria-current={status === 'current' ? 'step' : undefined}
              >
                <ProgressStep label={step.label} status={status} stepNumber={index + 1} />
                {!isLast ? <ProgressSeparatorIcon /> : null}
              </li>
            );
          })}
        </ol>
      </nav>
    </ProgressIconSizeContext.Provider>
  );
}

export {
  getProgressStepStatus,
  progressIndicatorVariants,
  progressLabelVariants,
  progressStepVariants,
  progressVariants,
  type ProgressStepStatus,
};
