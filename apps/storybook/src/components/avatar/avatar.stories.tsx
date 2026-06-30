import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ReactNode } from 'react';
import { expect, within } from 'storybook/test';

import { Avatar, type AvatarShape, type AvatarSize, type AvatarVariant } from '@ds-12/ui/avatar';

import { createAvatarInitialsA11yPlay } from '../../lib/component-tests.ts';
import { hiddenArgType, selectArgType, textArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import {
  PLACEHOLDER_IMAGE,
  SHAPES,
  SIZES,
  SizesShowcase,
  VARIANTS,
  VariantsShowcase,
} from './avatar-story-fixtures.tsx';

/** Args accepted by the Storybook wrapper for Controls — mirrors AvatarProps. */
type AvatarStoryArgs = {
  size?: AvatarSize;
  shape?: AvatarShape;
  variant?: AvatarVariant;
  initials?: string;
  src?: string;
  alt?: string;
  icon?: ReactNode;
  className?: string;
};

function AvatarStory(args: AvatarStoryArgs) {
  return <Avatar {...args} />;
}

/** Displays a profile image with initials, photo, or fallback icon. Available in circle and square shapes with small, medium, and large sizes. */
const meta = {
  title: 'Components/Avatar',
  component: AvatarStory,
  tags: ['autodocs'],
  render: (args) => <AvatarStory {...args} />,
  argTypes: {
    size: selectArgType(SIZES, 'Avatar dimensions — sm for compact layouts, lg for profile headers.'),
    shape: selectArgType(SHAPES, 'Circle for round avatars; square for rounded-square avatars.'),
    variant: selectArgType(
      VARIANTS,
      'Content type — initials, profile image (with fallback), or generic icon placeholder.',
    ),
    initials: {
      ...textArgType('One or two characters — used for the initial variant or as an image fallback.'),
      if: { arg: 'variant', neq: 'icon' },
    },
    src: {
      ...textArgType('Profile image URL — only applies when variant is "image".'),
      if: { arg: 'variant', eq: 'image' },
    },
    alt: {
      ...textArgType('Accessible alternative text for the profile image.'),
      if: { arg: 'variant', eq: 'image' },
    },
    icon: hiddenArgType,
  },
  args: {
    size: 'md',
    shape: 'circle',
    variant: 'initial',
    initials: 'BL',
    src: PLACEHOLDER_IMAGE,
    alt: 'Profile avatar',
  },
} satisfies Meta<typeof AvatarStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the initial variant when a name is available but no profile photo. */
export const Default: Story = {
  play: createAvatarInitialsA11yPlay('BL'),
};

/** Use the image variant when a profile photo URL is available; it automatically falls back to initials if the image fails to load. */
export const WithImage: Story = {
  args: {
    variant: 'image',
    src: PLACEHOLDER_IMAGE,
    alt: 'Profile avatar',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.queryByRole('img', { name: 'Profile avatar' });

    await expect(img ?? canvas.getByText('BL')).toBeInTheDocument();
    if (img) {
      await expect(img).toHaveAccessibleName('Profile avatar');
    }
  },
};

/** Use the icon variant as a generic placeholder when neither a photo nor initials are known. */
export const WithIcon: Story = {
  args: {
    variant: 'icon',
    initials: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('person')).toBeInTheDocument();
  },
};

/** Use the circle shape for standard round profile avatars. */
export const CircleShape: Story = {
  args: {
    shape: 'circle',
    variant: 'initial',
    initials: 'BL',
  },
  play: createAvatarInitialsA11yPlay('BL'),
};

/** Use the square shape for rounded-square avatars — for example teams, organisations, or branded entities. */
export const SquareShape: Story = {
  args: {
    shape: 'square',
    variant: 'icon',
    initials: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText('apartment')).toBeInTheDocument();
  },
};

/** Use the small size in compact layouts such as comment threads, table rows, or inline mentions. */
export const Small: Story = {
  args: {
    size: 'sm',
  },
  play: createAvatarInitialsA11yPlay('BL'),
};

/** Use the large size in profile headers, spotlight cards, or anywhere the avatar is the primary visual element. */
export const Large: Story = {
  args: {
    size: 'lg',
  },
  play: createAvatarInitialsA11yPlay('BL'),
};

/** Showcase of all variants across both shapes — for human reference only. */
export const Variants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <VariantsShowcase />,
};

/** Showcase of all available sizes side by side — for human reference only. */
export const Sizes: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SizesShowcase />,
};
