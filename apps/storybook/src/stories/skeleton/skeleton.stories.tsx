import type { Meta, StoryObj } from "@storybook/react-vite";
import { Skeleton } from "@ds-12/ui/skeleton";
import { createSkeletonA11yPlay } from "../../lib/component-tests.ts";
import { showcaseParameters } from "../../lib/story-test-config.ts";
import { selectArgType, textArgType } from "../../lib/story-arg-types.ts";
import {
  TEXT_VARIANTS,
  TextSkeletonsShowcase,
  THUMBNAIL_SIZES,
  THUMBNAIL_VARIANTS,
  ThumbnailSkeletonsShowcase,
} from "./skeleton-story-fixtures.tsx";

/** Loading placeholder with shimmer animation for text lines and circular, square, or rectangular thumbnails. */
const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: selectArgType(
      [...TEXT_VARIANTS, ...THUMBNAIL_VARIANTS],
      "Placeholder shape — text variants match typography, thumbnail variants for image areas.",
    ),
    size: selectArgType(
      THUMBNAIL_SIZES,
      "Thumbnail dimensions in pixels (thumbnail variants only).",
    ),
    width: textArgType("Custom width for text skeleton variants (e.g. 240px, 100%)."),
  },
  args: {
    variant: "paragraph",
    width: "311px",
    "aria-label": "Loading",
  },
} satisfies Meta<typeof Skeleton>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the paragraph skeleton for body text areas while content is fetching — it signals that text is coming without exposing content length prematurely. */
export const Default: Story = {
  play: createSkeletonA11yPlay("Loading"),
};

/** Use the heading skeleton while page titles or section headers are loading. */
export const Heading: Story = {
  args: {
    variant: "h1",
    width: "240px",
  },
  play: createSkeletonA11yPlay("Loading"),
};

/** Use the circular thumbnail skeleton as an avatar placeholder while user profile data is loading. */
export const CircularThumbnail: Story = {
  args: {
    variant: "circle",
    size: "48",
    width: undefined,
  },
  play: createSkeletonA11yPlay("Loading"),
};

/** Use the rectangular thumbnail skeleton for image or card placeholders. */
export const RectangularThumbnail: Story = {
  args: {
    variant: "rectangle",
    size: "128",
    width: undefined,
  },
  play: createSkeletonA11yPlay("Loading"),
};

/** Use the square thumbnail skeleton for compact image or icon placeholders. */
export const SquareThumbnail: Story = {
  args: {
    variant: "square",
    size: "72",
    width: undefined,
  },
  play: createSkeletonA11yPlay("Loading"),
};

/** Showcase of all text skeleton variants — for human reference only. */
export const TextSkeletons: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <TextSkeletonsShowcase />,
};

/** Showcase of all thumbnail skeleton shapes and sizes — for human reference only. */
export const ThumbnailSkeletons: Story = {
  tags: ["!manifest"],
  parameters: showcaseParameters,
  render: () => <ThumbnailSkeletonsShowcase />,
};
