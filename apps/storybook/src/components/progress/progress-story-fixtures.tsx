import { Progress, ProgressStep, type ProgressStepStatus } from '@ds-12/ui/progress';
import { Typography } from '@ds-12/ui/typography';

export const DEFAULT_STEPS = [{ label: 'Step 1' }, { label: 'Step 2' }, { label: 'Step 3' }] as const;

export const STEP_STATUSES: ProgressStepStatus[] = ['upcoming', 'current', 'past'];

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

export function DesktopShowcase() {
  return <Progress steps={[...DEFAULT_STEPS]} currentStep={1} />;
}

export function StepStatesShowcase() {
  return (
    <div style={showcaseStyle}>
      {STEP_STATUSES.map((status) => (
        <div key={status} style={rowStyle}>
          <Typography variant="label" size="sm">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Typography>
          <ProgressStep label="Label" status={status} stepNumber={1} />
        </div>
      ))}
    </div>
  );
}

export function VariantsShowcase() {
  return (
    <div style={showcaseStyle}>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Desktop — step 1 active
        </Typography>
        <DesktopShowcase />
      </div>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Desktop — step 2 active
        </Typography>
        <Progress steps={[...DEFAULT_STEPS]} currentStep={2} />
      </div>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Desktop — step 3 active
        </Typography>
        <Progress steps={[...DEFAULT_STEPS]} currentStep={3} />
      </div>
      <div style={rowStyle}>
        <Typography variant="label" size="sm">
          Component states
        </Typography>
        <StepStatesShowcase />
      </div>
    </div>
  );
}
