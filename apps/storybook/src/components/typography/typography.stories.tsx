import type { Meta, StoryObj } from "@storybook/react-vite";
import { Typography } from "@ds-12/ui/typography";
import { createHeadingA11yPlay, createTextA11yPlay } from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { hiddenArgType, selectArgType } from "../../lib/story-arg-types.ts";
import {
  HeadingShowcase,
  LabelShowcase,
  ParagraphShowcase,
  SemanticElementsShowcase,
} from "./typography-story-fixtures.tsx";

const sampleText = "The quick brown fox jumps over the lazy dog";

/** Semantic text styles for display copy, headings, paragraphs, and labels with optional font weight overrides. */
const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: selectArgType(
      [
        "display",
        "h1",
        "h2",
        "h3",
        "h4",
        "paragraph-xlarge",
        "paragraph-large",
        "paragraph",
        "paragraph-small",
        "label-large",
        "label",
        "label-small",
      ],
      "Typography style preset — pair with render to output the correct semantic element.",
    ),
    fontWeight: selectArgType(
      [undefined, "regular", "medium", "semibold", "bold"],
      "Optional font weight override for the chosen variant.",
    ),
    render: hiddenArgType,
  },
  args: {
    children: sampleText,
    variant: "paragraph",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the paragraph variant for standard body copy — it sets the base reading size and line height for comfortable long-form text. */
export const Default: Story = {
  play: createTextA11yPlay(sampleText),
};

/** Use the display variant for hero headlines and high-impact marketing copy. */
export const Display: Story = {
  args: {
    variant: "display",
    children: "Display",
  },
  play: createTextA11yPlay("Display"),
};

/** Use heading levels to establish a clear visual hierarchy — pair each level with the matching semantic element via `render`. */
export const Heading1: Story = {
  args: {
    variant: "h1",
    children: "Heading 1",
    render: "h1",
  },
  play: createHeadingA11yPlay(1, "Heading 1"),
};

/** Use h2 for section titles within a page that already has an h1. */
export const Heading2: Story = {
  args: {
    variant: "h2",
    children: "Heading 2",
    render: "h2",
  },
  play: createHeadingA11yPlay(2, "Heading 2"),
};

/** Use h3 for subsection headings nested under an h2. */
export const Heading3: Story = {
  args: {
    variant: "h3",
    children: "Heading 3",
    render: "h3",
  },
  play: createHeadingA11yPlay(3, "Heading 3"),
};

/** Use h4 for the smallest heading level — suitable for card titles or nested list group headers. */
export const Heading4: Story = {
  args: {
    variant: "h4",
    children: "Heading 4",
    render: "h4",
  },
  play: createHeadingA11yPlay(4, "Heading 4"),
};

/** Use label variants for form field labels, captions, and metadata. */
export const LabelLarge: Story = {
  args: {
    variant: "label-large",
    children: "Label Large",
    render: "label",
  },
  play: createTextA11yPlay("Label Large"),
};

/** Use the default label size for standard form field labels. */
export const Label: Story = {
  args: {
    variant: "label",
    children: "Label",
    render: "label",
  },
  play: createTextA11yPlay("Label"),
};

/** Use label-small for compact metadata, table headers, or dense form layouts. */
export const LabelSmall: Story = {
  args: {
    variant: "label-small",
    children: "Label Small",
    render: "label",
  },
  play: createTextA11yPlay("Label Small"),
};

/** Use smaller paragraph sizes for secondary body copy, descriptions, or helper text. */
export const ParagraphSmall: Story = {
  args: {
    variant: "paragraph-small",
    children: sampleText,
    render: "p",
  },
  play: createTextA11yPlay(sampleText),
};

/** Showcase of display and heading hierarchy (h1–h4) — for human reference only. */
export const Heading: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <HeadingShowcase />,
};

/** Showcase of all paragraph size variants — for human reference only. */
export const Paragraph: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <ParagraphShowcase />,
};

/** Showcase of all label variants — for human reference only. */
export const LabelVariants: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <LabelShowcase />,
};

/** Showcase demonstrating how Typography maps to semantic HTML elements (h1, h2, p, label) — for human reference only. */
export const SemanticElements: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <SemanticElementsShowcase />,
};
