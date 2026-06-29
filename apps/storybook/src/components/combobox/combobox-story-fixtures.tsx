import { Combobox } from "@ds-12/ui/combobox";
import type { ComboboxOption } from "@ds-12/ui/combobox";
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

function FocusedComboboxWrapper({ children }: { children: ReactNode }) {
  return <div data-story-combobox-state="focus">{children}</div>;
}

function OpenComboboxWrapper({ children }: { children: ReactNode }) {
  return <div data-story-combobox-state="open">{children}</div>;
}

function StateCombobox({
  state,
  size,
  multiple = false,
}: {
  state: "enabled" | "focused" | "disabled" | "error" | "opened" | "results";
  size: (typeof SIZES)[number];
  multiple?: boolean;
}) {
  const combobox =
    multiple === true ? (
      <Combobox
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
        aria-label="Combobox"
      />
    ) : (
      <Combobox
        size={size}
        showLeadingIcon
        options={DEFAULT_COMBOBOX_OPTIONS}
        placeholder="Type to search"
        defaultValue={state === "disabled" || state === "error" ? "item-1" : undefined}
        disabled={state === "disabled"}
        invalid={state === "error"}
        defaultOpen={state === "opened"}
        defaultInputValue={state === "opened" ? "Item" : undefined}
        aria-label="Combobox"
      />
    );

  if (state === "focused") {
    return <FocusedComboboxWrapper>{combobox}</FocusedComboboxWrapper>;
  }

  if (state === "opened") {
    return <OpenComboboxWrapper>{combobox}</OpenComboboxWrapper>;
  }

  return combobox;
}

export function ComboboxStatesShowcase({
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
        <StateCombobox state="enabled" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateCombobox state="focused" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateCombobox state="disabled" size={size} multiple={multiple} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateCombobox state="error" size={size} multiple={multiple} />
      </div>
      {multiple ? (
        <div>
          <StoryCaption>results</StoryCaption>
          <StateCombobox state="results" size={size} multiple />
        </div>
      ) : null}
      <div>
        <StoryCaption>opened</StoryCaption>
        <StateCombobox state="opened" size={size} multiple={multiple} />
      </div>
    </div>
  );
}
