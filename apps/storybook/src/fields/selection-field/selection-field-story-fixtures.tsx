import type { ReactNode } from 'react';

import { CheckboxField } from '@ds-12/ui/fields/checkbox-field';
import { RadioField } from '@ds-12/ui/fields/radio-field';
import { SwitchField } from '@ds-12/ui/fields/switch-field';
import { RadioGroup } from '@ds-12/ui/radio';

import { StoryCaption } from '../../lib/story-presentation.tsx';

export const SIZES = ['sm', 'lg'] as const;

const stateGroupStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  width: 327,
} as const;

type SelectionFieldComponent = typeof CheckboxField | typeof SwitchField;

function StateCheckboxField({
  state,
  layout,
  size,
}: {
  state: 'enabled' | 'disabled' | 'error';
  layout: 'default' | 'supporting-text' | 'input';
  size: (typeof SIZES)[number];
}) {
  return (
    <CheckboxField
      size={size}
      disabled={state === 'disabled'}
      invalid={state === 'error'}
      helperText={state === 'error' ? 'This field is required' : 'Helper Text'}
      showSupportingText={layout === 'supporting-text'}
      showSuffix={false}
      showInput={layout === 'input'}
    />
  );
}

function StateSwitchField({
  state,
  layout,
  size,
}: {
  state: 'enabled' | 'disabled' | 'error';
  layout: 'default' | 'supporting-text' | 'input';
  size: (typeof SIZES)[number];
}) {
  return (
    <SwitchField
      size={size}
      disabled={state === 'disabled'}
      invalid={state === 'error'}
      helperText={state === 'error' ? 'This field is required' : 'Helper Text'}
      showSupportingText={layout === 'supporting-text'}
      showSuffix={false}
      showInput={layout === 'input'}
    />
  );
}

function StateRadioField({
  state,
  layout,
  size,
}: {
  state: 'enabled' | 'disabled' | 'error';
  layout: 'default' | 'supporting-text' | 'input';
  size: (typeof SIZES)[number];
}) {
  return (
    <RadioGroup defaultValue="">
      <RadioField
        value="option"
        size={size}
        disabled={state === 'disabled'}
        invalid={state === 'error'}
        helperText={state === 'error' ? 'This field is required' : 'Helper Text'}
        showSupportingText={layout === 'supporting-text'}
        showSuffix={false}
        showInput={layout === 'input'}
      />
    </RadioGroup>
  );
}

function SelectionFieldStatesShowcaseInner({
  renderField,
  size,
}: {
  renderField: (state: 'enabled' | 'disabled' | 'error', size: (typeof SIZES)[number]) => ReactNode;
  size: (typeof SIZES)[number];
}) {
  return (
    <div style={stateGroupStyle}>
      <div>
        <StoryCaption>enabled</StoryCaption>
        {renderField('enabled', size)}
      </div>
      <div>
        <StoryCaption>disabled</StoryCaption>
        {renderField('disabled', size)}
      </div>
      <div>
        <StoryCaption>error</StoryCaption>
        {renderField('error', size)}
      </div>
    </div>
  );
}

export function CheckboxFieldStatesShowcase({
  layout,
  size = 'sm',
}: {
  layout: 'default' | 'supporting-text' | 'input';
  size?: (typeof SIZES)[number];
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      size={size}
      renderField={(state, fieldSize) => <StateCheckboxField state={state} layout={layout} size={fieldSize} />}
    />
  );
}

export function RadioFieldStatesShowcase({
  layout,
  size = 'sm',
}: {
  layout: 'default' | 'supporting-text' | 'input';
  size?: (typeof SIZES)[number];
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      size={size}
      renderField={(state, fieldSize) => <StateRadioField state={state} layout={layout} size={fieldSize} />}
    />
  );
}

export function SwitchFieldStatesShowcase({
  layout,
  size = 'sm',
}: {
  layout: 'default' | 'supporting-text' | 'input';
  size?: (typeof SIZES)[number];
}) {
  return (
    <SelectionFieldStatesShowcaseInner
      size={size}
      renderField={(state, fieldSize) => <StateSwitchField state={state} layout={layout} size={fieldSize} />}
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
