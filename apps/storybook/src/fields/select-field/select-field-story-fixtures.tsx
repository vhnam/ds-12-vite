import { SelectField } from "@ds-12/ui/fields/select-field";
import type { SelectOption } from "@ds-12/ui/fields/select-field";
import type { ReactNode } from "react";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const SIZES = ["sm", "lg"] as const;

export const DEFAULT_SELECT_OPTIONS: readonly SelectOption[] = [
  { value: "option-1", label: "Item One" },
  { value: "option-2", label: "Item Two" },
  { value: "option-3", label: "Item Three" },
  { value: "option-4", label: "Item Four" },
  { value: "option-5", label: "Item Five" },
  { value: "option-6", label: "Item Six" },
] as const;

const stateGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 343,
} as const;

function FocusedSelectWrapper({ children }: { children: ReactNode }) {
  return <div data-story-select-state="focus">{children}</div>;
}

function OpenSelectWrapper({ children }: { children: ReactNode }) {
  return <div data-story-select-state="open">{children}</div>;
}

function StateSelectField({
  state,
  size,
}: {
  state: "enabled" | "focused" | "disabled" | "error" | "opened";
  size: (typeof SIZES)[number];
}) {
  const field = (
    <SelectField
      size={size}
      showLeadingIcon
      options={DEFAULT_SELECT_OPTIONS}
      placeholder="Option"
      defaultValue={state === "disabled" || state === "error" ? "option-1" : undefined}
      disabled={state === "disabled"}
      invalid={state === "error"}
      defaultOpen={state === "opened"}
      helperText={state === "error" ? "This field is required" : "Helper text"}
    />
  );

  if (state === "focused") {
    return <FocusedSelectWrapper>{field}</FocusedSelectWrapper>;
  }

  if (state === "opened") {
    return <OpenSelectWrapper>{field}</OpenSelectWrapper>;
  }

  return field;
}

export function SelectFieldStatesShowcase({ size }: { size: (typeof SIZES)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateSelectField state="enabled" size={size} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateSelectField state="focused" size={size} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateSelectField state="disabled" size={size} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateSelectField state="error" size={size} />
      </div>
      <div>
        <StoryCaption>opened</StoryCaption>
        <StateSelectField state="opened" size={size} />
      </div>
    </div>
  );
}
