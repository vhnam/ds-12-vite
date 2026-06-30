import type { ReactNode } from 'react';

import { Radio, RadioGroup } from '@ds-12/ui/radio';

import { StoryCaption, StorySectionTitle } from '../../lib/story-presentation.tsx';

export const RADIO_SIZES = ['sm', 'lg'] as const;

const gridStyle = {
  display: 'flex',
  gap: 24,
  flexWrap: 'wrap',
  alignItems: 'flex-start',
} as const;

const columnStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 12,
  alignItems: 'flex-start',
} as const;

function StateColumn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div style={columnStyle}>
      <StoryCaption>{title}</StoryCaption>
      {children}
    </div>
  );
}

export function RadioStatesMatrix() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <StorySectionTitle>Radio states</StorySectionTitle>
      <div style={gridStyle}>
        {RADIO_SIZES.map((size) => (
          <StateColumn key={size} title={size === 'sm' ? 'Small' : 'Large'}>
            <RadioGroup defaultValue="selected">
              <Radio size={size} value="unselected" aria-label="Unselected option" />
              <Radio size={size} value="selected" aria-label="Selected option" />
            </RadioGroup>
            <RadioGroup disabled defaultValue="selected">
              <Radio size={size} value="unselected" aria-label="Disabled unselected" />
              <Radio size={size} value="selected" aria-label="Disabled selected" />
            </RadioGroup>
            <Radio size={size} value="error" invalid aria-label="Error unselected" />
          </StateColumn>
        ))}
      </div>
    </div>
  );
}
