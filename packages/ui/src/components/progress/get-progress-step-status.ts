export type ProgressStepStatus = 'upcoming' | 'current' | 'past';

/** Maps a 0-based step index and 1-based current step to a visual status. */
export function getProgressStepStatus(stepIndex: number, currentStep: number): ProgressStepStatus {
  const stepNumber = stepIndex + 1;

  if (stepNumber < currentStep) {
    return 'past';
  }

  if (stepNumber === currentStep) {
    return 'current';
  }

  return 'upcoming';
}
