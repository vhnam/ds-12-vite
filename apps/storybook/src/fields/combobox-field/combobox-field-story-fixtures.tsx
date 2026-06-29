import { ComboboxField } from "@ds-12/ui/fields/combobox-field";
import type { ComboboxOption } from "@ds-12/ui/fields/combobox-field";
import type { ReactNode } from "react";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const SIZES = ["sm", "lg"] as const;

export const DEFAULT_COMBOBOX_OPTIONS: readonly ComboboxOption[] = [
  { value: "item-1", label: "Item Name" },
  { value: "item-2", label: "Item Name" },
  { value: "item-3", label: "Item Name" },
  { value: "item-4", label: "Item Name" },
  { value: "item-5", label: "Item Name" },
  { value: "item-6", label: "Item Name" },
] as const;

const stateGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 343,
} as const;

function FocusedComboboxFieldWrapper({ children }: { children: ReactNode }) {
  return <div data-story-combobox-field-state="focus">{children}</div>;
}

function OpenComboboxFieldWrapper({ children }: { children: ReactNode }) {
  return <div data-story-combobox-field-state="open">{children}</div>;
}

function StateComboboxField({
  state,
  size,
  multiple = false,
}: {
  state: "enabled" | "focused" | "disabled" | "error" | "opened" | "results";
  size: (typeof SIZES)[number];
  multiple?: boolean;
}) {
  const field =
    multiple === true ? (
      <ComboboxField
        size={size}
        showLeadingIcon
        options={DEFAULT_COMBOBOX_OPTIONS}
        placeholder="Type to search"
        multiple
        defaultValue={
          state === "disabled" || state === "error"
            ? ["item-1"]
            : state === "results"
              ? ["item-1", "item-2", "item-3"]
              : undefined
        }
        disabled={state === "disabled"}
        invalid={state === "error"}
        defaultOpen={state === "opened"}
        defaultInputValue={state === "opened" ? "Item" : undefined}
        helperText={state === "error" ? "This field is required" : "Helper text"}
      />
    ) : (
      <ComboboxField
        size={size}
        showLeadingIcon
        options={DEFAULT_COMBOBOX_OPTIONS}
        placeholder="Type to search"
        defaultValue={state === "disabled" || state === "error" ? "item-1" : undefined}
        disabled={state === "disabled"}
        invalid={state === "error"}
        defaultOpen={state === "opened"}
        defaultInputValue={state === "opened" ? "Item" : undefined}
        helperText={state === "error" ? "This field is required" : "Helper text"}
      />
    );

  if (state === "focused") {
    return <FocusedComboboxFieldWrapper>{field}</FocusedComboboxFieldWrapper>;
  }

  if (state === "opened") {
    return <OpenComboboxFieldWrapper>{field}</OpenComboboxFieldWrapper>;
  }

  return field;
}

export function ComboboxFieldStatesShowcase({
  size,
  multiple = false,
}: {
  size: (typeof SIZES)[number];
  multiple?: boolean;
}) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateComboboxField state="enabled" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateComboboxField state="focused" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateComboboxField state="disabled" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateComboboxField state="error" size={size} multiple={multiple} />
      </div>
      {multiple ? (
        <div>
          <StoryCaption>results</StoryCaption>
          <StateComboboxField state="results" size={size} multiple />
        </div>
      ) : null}
      <div>
        <StoryCaption>opened</StoryCaption>
        <StateComboboxField state="opened" size={size} multiple={multiple} />
      </div>
    </div>
  );
}
