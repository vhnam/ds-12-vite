import type { ReactNode } from 'react';

import { Input } from '@ds-12/ui/input';

import { StoryCaption } from '../../lib/story-presentation.tsx';

export const VARIANTS = ['default', 'suffix'] as const;
export const SIZES = ['sm', 'lg'] as const;

const stateGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: 343,
} as const;

function FocusedInputWrapper({ children }: { children: ReactNode }) {
  return <div data-story-input-state="focus">{children}</div>;
}

function StateInput({
  state,
  variant,
}: {
  state: 'enabled' | 'focused' | 'disabled' | 'error';
  variant: (typeof VARIANTS)[number];
}) {
  const input = (
    <Input
      variant={variant}
      showLeadingIcon
      showTrailingIcon={variant === 'default'}
      suffix={variant === 'suffix' ? 'Suffix' : undefined}
      placeholder="Input"
      aria-label="Input"
      defaultValue={state === 'disabled' || state === 'error' ? 'Input' : undefined}
      disabled={state === 'disabled'}
      invalid={state === 'error'}
    />
  );

  if (state === 'focused') {
    return <FocusedInputWrapper>{input}</FocusedInputWrapper>;
  }

  return input;
}

export function InputStatesShowcase({ variant }: { variant: (typeof VARIANTS)[number] }) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        <StateInput state="enabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>focused</StoryCaption>
        <StateInput state="focused" variant={variant} />
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        <StateInput state="disabled" variant={variant} />
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        <StateInput state="error" variant={variant} />
      </div>
    </div>
  );
}
