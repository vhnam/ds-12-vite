import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, within } from 'storybook/test';

import { Progress, type ProgressStepItem, type ProgressStepStatus } from '@ds-12/ui/progress';

import {
  createProgressA11yPlay,
  createProgressCurrentStepPlay,
  expectDataSlotVariant,
} from '../../lib/component-tests.ts';
import { numberArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { DEFAULT_STEPS, StepStatesShowcase, VariantsShowcase } from './progress-story-fixtures.tsx';

type ProgressStoryArgs = {
  steps: ProgressStepItem[];
  currentStep: number;
  className?: string;
};

function ProgressStory({ steps, ...props }: ProgressStoryArgs) {
  return <Progress steps={steps} {...props} />;
}

async function expectProgressStep(
  canvasElement: HTMLElement,
  {
    label,
    status,
  }: {
    label: string;
    status: ProgressStepStatus;
  },
) {
  const canvas = within(canvasElement);
  const stepLabel = canvas.getByText(label);
  const step = stepLabel.closest('[data-slot="progress-step"]');

  await expect(stepLabel).toBeVisible();
  await expect(step).toHaveAttribute('data-slot', 'progress-step');
  await expect(step).toHaveAttribute('data-variant', status);
}

/** Horizontal step indicator for multi-step flows on desktop. */
const meta = {
  title: 'Components/Progress',
  component: ProgressStory,
  tags: ['autodocs'],
  render: (args) => <ProgressStory {...args} />,
  argTypes: {
    currentStep: numberArgType('1-based index of the active step.'),
    steps: { control: false },
  },
  args: {
    steps: [...DEFAULT_STEPS],
    currentStep: 1,
  },
} satisfies Meta<typeof ProgressStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the default progress bar at the start of a flow when step 1 is the active step. */
export const Default: Story = {
  play: async (context) => {
    await createProgressA11yPlay()(context);
    await createProgressCurrentStepPlay('Step 1')(context);
    await expectProgressStep(context.canvasElement, { label: 'Step 1', status: 'current' });
    await expectProgressStep(context.canvasElement, { label: 'Step 2', status: 'upcoming' });
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'progress',
      variant: 'default',
      role: 'navigation',
      name: /progress/i,
    });
  },
};

/** Advance `currentStep` as the user completes each stage — step 2 active shows step 1 as completed. */
export const StepTwoActive: Story = {
  args: {
    currentStep: 2,
  },
  play: async (context) => {
    await createProgressA11yPlay()(context);
    await createProgressCurrentStepPlay('Step 2')(context);
    await expectProgressStep(context.canvasElement, { label: 'Step 1', status: 'past' });
    await expectProgressStep(context.canvasElement, { label: 'Step 2', status: 'current' });
    await expectProgressStep(context.canvasElement, { label: 'Step 3', status: 'upcoming' });
  },
};

/** Showcase of desktop progress and individual step states — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantsShowcase />,
};

/** Individual step states for reference — upcoming, current, and completed. */
export const StepStates: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <StepStatesShowcase />,
};
