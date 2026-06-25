import { CheckboxField } from "@ds-12/ui/fields/checkbox-field";
import { RadioField } from "@ds-12/ui/fields/radio-field";
import { SwitchField } from "@ds-12/ui/fields/switch-field";
import { RadioGroup } from "@ds-12/ui/radio";
import type { ReactNode } from "react";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const SIZES = ["sm", "lg"] as const;

const stateGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
  width: 327,
} as const;

type SelectionFieldComponent = typeof CheckboxField | typeof SwitchField;

function StateCheckboxField({
  state,
  layout,
}: {
  state: "enabled" | "disabled" | "error";
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <CheckboxField
      size="sm"
      disabled={state === "disabled"}
      invalid={state === "error"}
      showSupportingText={layout === "supporting-text"}
      showInput={layout === "input"}
    />
  );
}

function StateSwitchField({
  state,
  layout,
}: {
  state: "enabled" | "disabled" | "error";
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <SwitchField
      size="sm"
      disabled={state === "disabled"}
      invalid={state === "error"}
      showSupportingText={layout === "supporting-text"}
      showInput={layout === "input"}
    />
  );
}

function StateRadioField({
  state,
  layout,
}: {
  state: "enabled" | "disabled" | "error";
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <RadioGroup defaultValue="">
      <RadioField
        value="option"
        size="sm"
        disabled={state === "disabled"}
        invalid={state === "error"}
        showSupportingText={layout === "supporting-text"}
        showInput={layout === "input"}
      />
    </RadioGroup>
  );
}

function SelectionFieldStatesShowcaseInner({
  renderField,
}: {
  renderField: (state: "enabled" | "disabled" | "error") => ReactNode;
}) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        {renderField("enabled")}
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        {renderField("disabled")}
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        {renderField("error")}
      </div>
    </div>
  );
}

export function CheckboxFieldStatesShowcase({
  layout,
}: {
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      renderField={(state) => <StateCheckboxField state={state} layout={layout} />}
    />
  );
}

export function RadioFieldStatesShowcase({
  layout,
}: {
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      renderField={(state) => <StateRadioField state={state} layout={layout} />}
    />
  );
}

export function SwitchFieldStatesShowcase({
  layout,
}: {
  layout: "default" | "supporting-text" | "input";
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      renderField={(state) => <StateSwitchField state={state} layout={layout} />}
    />
  );
}

export function createSelectionFieldDecorator(width = 327) {
  return function SelectionFieldDecorator(Story: () => ReactNode) {
    return (
      <div style={{ width }}>
        <Story />
      </div>
    );
  };
}

export type { SelectionFieldComponent };
