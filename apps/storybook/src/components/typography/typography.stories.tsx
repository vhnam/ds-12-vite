import type { Meta, StoryObj } from '@storybook/react-vite';

import {
  Typography,
  type TypographyProps,
  type TypographySize,
  type TypographyVariant,
  type TypographyWeight,
} from '@ds-12/ui/typography';

import { createHeadingA11yPlay, createTextA11yPlay } from '../../lib/component-tests.ts';
import { hiddenArgType, selectArgType } from '../../lib/story-arg-types.ts';
import { showcaseParameters } from '../../lib/story-test-config.ts';
import {
  HeadingShowcase,
  LabelShowcase,
  ParagraphShowcase,
  SemanticElementsShowcase,
} from './typography-story-fixtures.tsx';

const sampleText = 'The quick brown fox jumps over the lazy dog';

/** Default semantic element per variant when `render` is not set explicitly. */
const VARIANT_RENDER: Partial<Record<TypographyVariant, 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'label'>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  paragraph: 'p',
  label: 'label',
};

/** Args accepted by the Storybook wrapper — wider than the discriminated union for Controls. */
type TypographyStoryArgs = {
  variant: TypographyVariant;
  size?: TypographySize;
  weight?: TypographyWeight;
  render?: TypographyProps['render'];
  children?: TypographyProps['children'];
  className?: string;
};

/** Storybook wrapper — resolves the semantic `render` element from `variant`. */
function TypographyStory(args: TypographyStoryArgs) {
  const props = {
    ...args,
    render: args.render ?? VARIANT_RENDER[args.variant],
  } as unknown as TypographyProps;

  return <Typography {...props} />;
}

/** Semantic text styles for display copy, headings, paragraphs, and labels. */
const meta = {
  title: 'Components/Typography',
  component: TypographyStory,
  tags: ['autodocs'],
  render: (args) => <TypographyStory {...args} />,
  argTypes: {
    variant: selectArgType(
      ['display', 'h1', 'h2', 'h3', 'h4', 'paragraph', 'label'],
      'Typography style preset — pair with render to output the correct semantic element.',
    ),
    size: {
      ...selectArgType(['sm', 'md', 'lg', 'xl'], 'Applies to paragraph (sm–xl) and label (sm–lg) variants.'),
      if: { arg: 'variant', eq: 'paragraph' },
    },
    weight: {
      ...selectArgType(
        ['regular', 'semibold', 'bold'],
        'Headings (h1–h4): regular | bold. Paragraph: constrained per size.',
      ),
    },
    render: hiddenArgType,
  },
  args: {
    children: sampleText,
    variant: 'paragraph',
    size: 'md',
    weight: 'regular',
  },
} satisfies Meta<typeof TypographyStory>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the paragraph variant for standard body copy — it sets the base reading size and line height for comfortable long-form text. */
export const Default: Story = {
  play: createTextA11yPlay(sampleText),
};

/** Use the display variant for hero headlines and high-impact marketing copy. */
export const Display: Story = {
  args: {
    variant: 'display',
    children: 'Display',
  },
  play: createTextA11yPlay('Display'),
};

/** Use h1 for the page title — pair with `render="h1"` for correct document outline. */
export const H1: Story = {
  name: 'Heading 1',
  args: {
    variant: 'h1',
    children: 'Heading 1',
    weight: 'bold',
  },
  play: createHeadingA11yPlay(1, 'Heading 1'),
};

/** Use h2 for section titles within a page that already has an h1. */
export const H2: Story = {
  name: 'Heading 2',
  args: {
    variant: 'h2',
    children: 'Heading 2',
    weight: 'bold',
  },
  play: createHeadingA11yPlay(2, 'Heading 2'),
};

/** Use h3 for subsection headings nested under an h2. */
export const H3: Story = {
  name: 'Heading 3',
  args: {
    variant: 'h3',
    children: 'Heading 3',
    weight: 'bold',
  },
  play: createHeadingA11yPlay(3, 'Heading 3'),
};

/** Use h4 for the smallest heading level — suitable for card titles or nested list group headers. */
export const H4: Story = {
  name: 'Heading 4',
  args: {
    variant: 'h4',
    children: 'Heading 4',
    weight: 'bold',
  },
  play: createHeadingA11yPlay(4, 'Heading 4'),
};

/** Use weight="regular" on a heading when a lighter hierarchy step is needed within the same level. */
export const HeadingRegular: Story = {
  args: {
    variant: 'h2',
    children: 'Heading 2 (regular)',
    weight: 'regular',
  },
  play: createHeadingA11yPlay(2, 'Heading 2 (regular)'),
};

/** Use paragraph size sm for secondary body copy, descriptions, or helper text. */
export const ParagraphSmall: Story = {
  args: {
    variant: 'paragraph',
    size: 'sm',
    weight: 'regular',
    children: sampleText,
  },
  play: createTextA11yPlay(sampleText),
};

/** Use paragraph size lg for emphasized body copy or lead paragraphs. */
export const ParagraphLarge: Story = {
  args: {
    variant: 'paragraph',
    size: 'lg',
    weight: 'regular',
    children: sampleText,
  },
  play: createTextA11yPlay(sampleText),
};

/** Use paragraph size xl with semibold weight for standout inline emphasis or subheadings in body content. */
export const ParagraphXLarge: Story = {
  args: {
    variant: 'paragraph',
    size: 'xl',
    weight: 'semibold',
    children: sampleText,
  },
  play: createTextA11yPlay(sampleText),
};

/** Use semibold weight at md size for inline emphasis within standard body copy. */
export const ParagraphSemibold: Story = {
  args: {
    variant: 'paragraph',
    size: 'md',
    weight: 'semibold',
    children: sampleText,
  },
  play: createTextA11yPlay(sampleText),
};

/** Use label size lg for prominent form field labels or section captions. */
export const LabelLarge: Story = {
  args: {
    variant: 'label',
    size: 'lg',
    children: 'Label Large',
  },
  play: createTextA11yPlay('Label Large'),
};

/** Use the default label size for standard form field labels. */
export const Label: Story = {
  args: {
    variant: 'label',
    size: 'md',
    children: 'Label',
  },
  play: createTextA11yPlay('Label'),
};

/** Use label size sm for compact metadata, table headers, or dense form layouts. */
export const LabelSmall: Story = {
  args: {
    variant: 'label',
    size: 'sm',
    children: 'Label Small',
  },
  play: createTextA11yPlay('Label Small'),
};

/** Showcase of display and heading hierarchy (h1–h4) — for human reference only. */
export const Heading: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <HeadingShowcase />,
};

/** Showcase of all paragraph size variants — for human reference only. */
export const Paragraph: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <ParagraphShowcase />,
};

/** Showcase of all label variants — for human reference only. */
export const LabelVariants: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <LabelShowcase />,
};

/** Showcase demonstrating how Typography maps to semantic HTML elements (h1, h2, p, label) — for human reference only. */
export const SemanticElements: Story = {
  tags: ['!manifest'],
  parameters: showcaseParameters,
  render: () => <SemanticElementsShowcase />,
};
