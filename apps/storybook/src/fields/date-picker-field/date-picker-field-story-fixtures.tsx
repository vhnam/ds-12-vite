import type { ReactNode } from 'react';
import { useState } from 'react';

import { DatePickerField } from '@ds-12/ui/fields/date-picker-field';

import { StoryCaption } from '../../lib/story-presentation.tsx';

export const SIZES = ['sm', 'lg'] as const;

const JUNE_2025 = new Date(2025, 5, 1);
const SELECTED_DATE = new Date(2025, 5, 25);

const stateGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: 343,
} as const;

function FocusedDatePickerFieldWrapper({ children }: { children: ReactNode }) {
  return <div data-story-date-picker-field-state="focus">{children}</div>;
}

function OpenDatePickerFieldWrapper({ children }: { children: ReactNode }) {
  return <div data-story-date-picker-field-state="open">{children}</div>;
}

function StateDatePickerField({
  state,
  size,
}: {
  state: 'enabled' | 'focused' | 'disabled' | 'error' | 'opened';
  size: (typeof SIZES)[number];
}) {
  const [date, setDate] = useState<Date | undefined>(
    state === 'disabled' || state === 'error' ? SELECTED_DATE : undefined,
  );

  const field = (
    <DatePickerField
      size={size}
      showLeadingIcon
      placeholder="Select date"
      value={date}
      onValueChange={setDate}
      defaultMonth={JUNE_2025}
      disabled={state === 'disabled'}
      invalid={state === 'error'}
      defaultOpen={state === 'opened'}
      helperText={state === 'error' ? 'This field is required' : 'Helper text'}
    />
  );

  if (state === 'focused') {
    return <FocusedDatePickerFieldWrapper>{field}</FocusedDatePickerFieldWrapper>;
  }

  if (state === 'opened') {
    return <OpenDatePickerFieldWrapper>{field}</OpenDatePickerFieldWrapper>;
  }

  return field;
}

export function DatePickerFieldStatesShowcase({ size }: { size: (typeof SIZES)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateDatePickerField state="enabled" size={size} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateDatePickerField state="focused" size={size} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateDatePickerField state="disabled" size={size} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateDatePickerField state="error" size={size} />
      </div>
      <div>
        <StoryCaption>opened</StoryCaption>
        <StateDatePickerField state="opened" size={size} />
      </div>
    </div>
  );
}
