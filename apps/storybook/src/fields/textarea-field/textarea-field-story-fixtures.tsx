import { TextareaField } from "@ds-12/ui/fields/textarea-field";
import type { ReactNode } from "react";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const VARIANTS = ["default", "suffix"] as const;
export const SIZES = ["sm", "lg"] as const;

const stateGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 343,
} as const;

function FocusedInputWrapper({ children }: { children: ReactNode }) {
  return <div data-story-input-state="focus">{children}</div>;
}

function StateTextareaField({
  state,
  variant,
}: {
  state: "enabled" | "focused" | "disabled" | "error";
  variant: (typeof VARIANTS)[number];
}) {
  const field = (
    <TextareaField
      variant={variant}
      showLeadingIcon
      suffix={variant === "suffix" ? "0/100" : undefined}
      placeholder="Input"
      defaultValue={state === "disabled" || state === "error" ? "Input" : undefined}
      disabled={state === "disabled"}
      invalid={state === "error"}
    />
  );

  if (state === "focused") {
    return <FocusedInputWrapper>{field}</FocusedInputWrapper>;
  }

  return field;
}

export function TextareaFieldStatesShowcase({ variant }: { variant: (typeof VARIANTS)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateTextareaField state="enabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateTextareaField state="focused" variant={variant} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateTextareaField state="disabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateTextareaField state="error" variant={variant} />
      </div>
    </div>
  );
}
