import { ComponentProps } from "react";

//#region src/components/progress/get-progress-step-status.d.ts
type ProgressStepStatus = "upcoming" | "current" | "past";
/** Maps a 0-based step index and 1-based current step to a visual status. */
declare function getProgressStepStatus(stepIndex: number, currentStep: number): ProgressStepStatus;
//#endregion
//#region src/components/progress/index.d.ts
declare const ProgressIconSizeContext: import("react").Context<number | undefined>;
declare const progressVariants: (
  props?: ({} & import("class-variance-authority/types").ClassProp) | undefined,
) => string;
declare const progressStepVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const progressIndicatorVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const progressLabelVariants: (
  props?:
    | ({
        status?: "current" | "past" | "upcoming" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type ProgressStepItem = {
  /** Step label shown beside the indicator. */ label: string;
};
type ProgressStepProps = ComponentProps<"div"> & {
  /** Additional CSS class names applied to the step element. */ className?: string /** Step label shown beside the indicator. */;
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
type ProgressProps = Omit<ComponentProps<"nav">, "children"> & {
  /** Additional CSS class names applied to the navigation element. */ className?: string /** Ordered steps from first to last. */;
  steps: ProgressStepItem[];
  /**
   * 1-based index of the active step.
   * Steps before this index render as completed; steps after render as upcoming.
   */
  currentStep: number;
};
/** Single progress step with numbered or completed indicator and label. */
declare function ProgressStep({
  className,
  label,
  status,
  stepNumber,
  ...props
}: ProgressStepProps): import("react").JSX.Element;
/** Horizontal step indicator for multi-step flows on desktop. */
declare function Progress({
  className,
  steps,
  currentStep,
  "aria-label": ariaLabel,
  ...props
}: ProgressProps): import("react").JSX.Element;
//#endregion
export {
  ProgressStepItem as a,
  progressLabelVariants as c,
  ProgressStepStatus as d,
  getProgressStepStatus as f,
  ProgressStep as i,
  progressStepVariants as l,
  ProgressIconSizeContext as n,
  ProgressStepProps as o,
  ProgressProps as r,
  progressIndicatorVariants as s,
  Progress as t,
  progressVariants as u,
};
