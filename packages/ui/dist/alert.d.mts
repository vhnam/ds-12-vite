import { ComponentProps, ReactNode } from "react";

//#region src/components/alert/index.d.ts
type AlertLayout = "default" | "fullWidth";
type AlertVariant = "negative" | "information" | "positive" | "attention" | "neutral";
declare const alertVariants: (
  props?:
    | ({
        layout?: "default" | "fullWidth" | null | undefined;
        variant?: "attention" | "information" | "negative" | "neutral" | "positive" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
declare const alertIconVariants: (
  props?:
    | ({
        variant?: "attention" | "information" | "negative" | "neutral" | "positive" | null | undefined;
      } & import("class-variance-authority/types").ClassProp)
    | undefined,
) => string;
type AlertProps = Omit<ComponentProps<"div">, "title"> & {
  /** Additional CSS class names applied to the root element. */ className?: string;
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
  variant?: AlertVariant /** Primary message shown in semibold body text. */;
  title: ReactNode /** Optional supporting detail shown below the title in regular body text. */;
  description?: ReactNode /** Label for the optional text action rendered on the trailing edge. */;
  actionLabel?: string /** Called when the trailing text action is activated. */;
  onAction?: () => void /** Called when the dismiss control is activated. When omitted, the dismiss button is hidden. */;
  onDismiss?: () => void;
};
/** Contextual status banner with semantic colour, optional description, action, and dismiss controls. */
declare function Alert({
  className,
  layout,
  variant,
  title,
  description,
  actionLabel,
  onAction,
  onDismiss,
  ...props
}: AlertProps): import("react").JSX.Element;
//#endregion
export { Alert, type AlertLayout, AlertProps, type AlertVariant, alertIconVariants, alertVariants };
