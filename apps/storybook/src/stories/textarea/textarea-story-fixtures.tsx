import { Textarea } from "@ds-12/ui/textarea";
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

function StateTextarea({
  state,
  variant,
}: {
  state: "enabled" | "focused" | "disabled" | "error";
  variant: (typeof VARIANTS)[number];
}) {
  const textarea = (
    <Textarea
      variant={variant}
      showLeadingIcon
      suffix={variant === "suffix" ? "0/100" : undefined}
      placeholder="Input"
      aria-label="Input"
      defaultValue={state === "disabled" || state === "error" ? "Input" : undefined}
      disabled={state === "disabled"}
      invalid={state === "error"}
    />
  );

  if (state === "focused") {
    return <FocusedInputWrapper>{textarea}</FocusedInputWrapper>;
  }

  return textarea;
}

export function TextareaStatesShowcase({ variant }: { variant: (typeof VARIANTS)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateTextarea state="enabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateTextarea state="focused" variant={variant} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateTextarea state="disabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateTextarea state="error" variant={variant} />
      </div>
    </div>
  );
}
