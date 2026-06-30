import type { ReactNode } from 'react';

import { Checkbox } from '@ds-12/ui/checkbox';

import { StoryCaption, StorySectionTitle } from '../../lib/story-presentation.tsx';

export const CHECKBOX_SIZES = ['sm', 'lg'] as const;

const gridStyle = {
  display: 'flex',
  gap: 24,
  flexWrap: 'wrap',
  alignItems: 'center',
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

export function CheckboxStatesMatrix() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <StorySectionTitle>Checkbox states</StorySectionTitle>
      <div style={gridStyle}>
        {CHECKBOX_SIZES.map((size) => (
          <StateColumn key={size} title={size === 'sm' ? 'Small' : 'Large'}>
            <Checkbox size={size} aria-label="Default unchecked" />
            <Checkbox size={size} defaultChecked aria-label="Default checked" />
            <Checkbox size={size} disabled aria-label="Disabled unchecked" />
            <Checkbox size={size} disabled defaultChecked aria-label="Disabled checked" />
            <Checkbox size={size} invalid aria-label="Error unchecked" />
          </StateColumn>
        ))}
      </div>
    </div>
  );
}
