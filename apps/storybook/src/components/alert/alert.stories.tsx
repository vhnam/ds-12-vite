import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { Alert, type AlertLayout, type AlertVariant } from '@ds-12/ui/alert';

import { createAlertA11yPlay, createAlertDismissPlay, expectDataSlotVariant } from '../../lib/component-tests.ts';
import { booleanArgType, hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import { ContentLayoutsShowcase, LAYOUTS, VARIANTS, VariantsShowcase } from './alert-story-fixtures.tsx';

type AlertStoryArgs = {
  layout?: AlertLayout;
  variant?: AlertVariant;
  title?: ReactNode;
  description?: ReactNode;
  actionLabel?: string;
  showAction?: boolean;
  showDismiss?: boolean;
  className?: string;
};

function AlertStory({ showAction, showDismiss, actionLabel, title = 'Text', ...args }: AlertStoryArgs) {
  return (
    <Alert
      {...args}
      title={title}
      actionLabel={showAction ? (actionLabel ?? 'Action') : undefined}
      onAction={showAction ? () => undefined : undefined}
      onDismiss={showDismiss ? () => undefined : undefined}
    />
  );
}

async function expectAlertRoot(
  canvasElement: HTMLElement,
  {
    title,
    variant,
  }: {
    title: string;
    variant: AlertVariant;
  },
) {
  const canvas = within(canvasElement);
  const titleEl = canvas.getByText(title);
  const root = titleEl.closest('[data-slot="alert"]');

  await expect(titleEl).toBeVisible();
  await expect(root).toHaveAttribute('data-slot', 'alert');
  await expect(root).toHaveAttribute('data-variant', variant);
}

/** Contextual status banner with semantic colour, optional description, action, and dismiss controls. */
const meta = {
  title: 'Components/Alert',
  component: AlertStory,
  tags: ['autodocs'],
  render: (args) => <AlertStory {...args} />,
  argTypes: {
    variant: selectArgType(
      VARIANTS,
      'Semantic colour — negative for errors, positive for success, attention for warnings, information for guidance, neutral for general notices.',
    ),
    layout: selectArgType(
      LAYOUTS,
      'Container layout — default is a rounded card; fullWidth spans edge-to-edge without radius.',
    ),
    title: textArgType('Primary message shown in semibold body text.'),
    description: textArgType('Optional supporting detail shown below the title.'),
    actionLabel: textArgType('Label for the optional trailing text action.'),
    showAction: booleanArgType('Show the trailing text action.'),
    showDismiss: booleanArgType('Show the dismiss control on the trailing edge.'),
    className: hiddenArgType,
  },
  args: {
    title: 'Text',
    description: 'Subtext',
    variant: 'neutral',
    layout: 'default',
    actionLabel: 'Action',
    showAction: true,
    showDismiss: true,
  },
} satisfies Meta<typeof AlertStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the neutral default alert for general notices that do not require urgent action. */
export const Default: Story = {
  play: async (context) => {
    await createAlertA11yPlay('Text', 'status')(context);
    await expectAlertRoot(context.canvasElement, { title: 'Text', variant: 'neutral' });
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'alert',
      variant: 'neutral',
      role: 'status',
    });
  },
};

/** Use the negative variant for critical errors that need immediate attention (`role="alert"`). */
export const Negative: Story = {
  args: {
    variant: 'negative',
  },
  play: async (context) => {
    await createAlertA11yPlay('Text', 'alert')(context);
    await expectAlertRoot(context.canvasElement, { title: 'Text', variant: 'negative' });
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'alert',
      variant: 'negative',
      role: 'alert',
    });
  },
};

/** Use the information variant for neutral guidance that does not require urgent action. */
export const Information: Story = {
  args: {
    variant: 'information',
  },
  play: async (context) => {
    await createAlertA11yPlay('Text', 'status')(context);
    await expectAlertRoot(context.canvasElement, { title: 'Text', variant: 'information' });
    await expectDataSlotVariant(context.canvasElement, {
      slot: 'alert',
      variant: 'information',
      role: 'status',
    });
  },
};

/** Use full-width layout for page-level banners that span the content area edge to edge. */
export const FullWidth: Story = {
  args: {
    layout: 'fullWidth',
    variant: 'positive',
  },
  play: async (context) => {
    await createAlertA11yPlay('Text', 'status')(context);
    await expectAlertRoot(context.canvasElement, { title: 'Text', variant: 'positive' });
  },
};

/** Title-only alerts omit the description line for compact single-line notices. */
export const TitleOnly: Story = {
  args: {
    description: undefined,
    variant: 'attention',
  },
  play: async (context) => {
    const canvas = within(context.canvasElement);
    await expect(canvas.queryByText('Subtext')).not.toBeInTheDocument();
    await expectAlertRoot(context.canvasElement, { title: 'Text', variant: 'attention' });
  },
};

/** Dismiss control removes the alert when activated — wire `onDismiss` to update visibility in the parent. */
export const DismissInteraction: Story = {
  args: {
    showAction: false,
    variant: 'neutral',
  },
  play: async (context) => {
    await createAlertDismissPlay()(context);
  },
};

/** Keyboard users can reach the action and dismiss controls via Tab. */
export const KeyboardFocus: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const action = canvas.getByRole('button', { name: /action/i });
    const dismiss = canvas.getByRole('button', { name: /dismiss/i });

    await userEvent.tab();
    await expect(action).toHaveFocus();
    await userEvent.tab();
    await expect(dismiss).toHaveFocus();
  },
};

/** Matrix of semantic variants across default and full-width layouts — for human reference only. */
export const TypesAndVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantsShowcase />,
};

/** Content layout combinations — title with/without description, action, and dismiss — for human reference only. */
export const ContentLayouts: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ContentLayoutsShowcase />,
};
