import { InputField } from "@ds-12/ui/fields/input-field";
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

function StateInputField({
  state,
  variant,
}: {
  state: "enabled" | "focused" | "disabled" | "error";
  variant: (typeof VARIANTS)[number];
}) {
  const field = (
    <InputField
      variant={variant}
      showLeadingIcon
      showTrailingIcon={variant === "default"}
      suffix={variant === "suffix" ? "Suffix" : undefined}
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

export function InputFieldStatesShowcase({ variant }: { variant: (typeof VARIANTS)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateInputField state="enabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateInputField state="focused" variant={variant} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateInputField state="disabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateInputField state="error" variant={variant} />
      </div>
    </div>
  );
}
