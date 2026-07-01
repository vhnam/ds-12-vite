import type { ReactNode } from 'react';
import { useState } from 'react';

import { DatePicker } from '@ds-12/ui/date-picker';

import { StoryCaption } from '../../lib/story-presentation.tsx';

export const SIZES = ['sm', 'lg'] as const;

const TODAY = new Date();
const CURRENT_MONTH = new Date(TODAY.getFullYear(), TODAY.getMonth(), 1);

const stateGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: 343,
} as const;

function FocusedDatePickerWrapper({ children }: { children: ReactNode }) {
  return <div data-story-date-picker-state="focus">{children}</div>;
}

function OpenDatePickerWrapper({ children }: { children: ReactNode }) {
  return <div data-story-date-picker-state="open">{children}</div>;
}

function StateDatePicker({
  state,
  size,
}: {
  state: 'enabled' | 'focused' | 'disabled' | 'error' | 'opened';
  size: (typeof SIZES)[number];
}) {
  const [date, setDate] = useState<Date | undefined>(state === 'disabled' || state === 'error' ? TODAY : undefined);

  const picker = (
    <DatePicker
      size={size}
      showLeadingIcon
      placeholder="Select date"
      aria-label="Date"
      value={date}
      onValueChange={setDate}
      defaultMonth={CURRENT_MONTH}
      disabled={state === 'disabled'}
      invalid={state === 'error'}
      defaultOpen={state === 'opened'}
    />
  );

  if (state === 'focused') {
    return <FocusedDatePickerWrapper>{picker}</FocusedDatePickerWrapper>;
  }

  if (state === 'opened') {
    return <OpenDatePickerWrapper>{picker}</OpenDatePickerWrapper>;
  }

  return picker;
}

export function DatePickerStatesShowcase({ size }: { size: (typeof SIZES)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateDatePicker state="enabled" size={size} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateDatePicker state="focused" size={size} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateDatePicker state="disabled" size={size} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateDatePicker state="error" size={size} />
      </div>
      <div>
        <StoryCaption>opened</StoryCaption>
        <StateDatePicker state="opened" size={size} />
      </div>
    </div>
  );
}
