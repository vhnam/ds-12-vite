import { Switch } from '@ds-12/ui/switch';

import { StoryCaption, StorySectionTitle } from '../../lib/story-presentation.tsx';

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

export function SwitchStatesMatrix() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <StorySectionTitle>Switch states</StorySectionTitle>
      <div style={gridStyle}>
        <div style={columnStyle}>
          <StoryCaption>Default</StoryCaption>
          <Switch aria-label="Notifications off" />
          <Switch defaultChecked aria-label="Notifications on" />
        </div>
        <div style={columnStyle}>
          <StoryCaption>Disabled</StoryCaption>
          <Switch disabled aria-label="Disabled off" />
          <Switch disabled defaultChecked aria-label="Disabled on" />
        </div>
      </div>
    </div>
  );
}
