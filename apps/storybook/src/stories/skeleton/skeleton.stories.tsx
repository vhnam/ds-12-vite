import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Skeleton } from "@ds-12/ui/skeleton";
import { createSkeletonA11yPlay } from "../../lib/component-tests.ts";
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
    variant: {
      control: "select",
      options: [...TEXT_VARIANTS, ...THUMBNAIL_VARIANTS],
    },
    size: {
      control: "select",
      options: THUMBNAIL_SIZES,
    },
    width: {
      control: "text",
    },
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

/** Use the circular thumbnail skeleton as an avatar placeholder while user profile data is loading. */
export const CircularThumbnail: Story = {
  args: {
    variant: "circle",
    size: "48",
    width: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeleton = canvas.getByRole("status", { name: "Loading" });

    await expect(skeleton).toHaveAttribute("aria-busy", "true");
  },
};

/** Showcase of all text skeleton variants — for human reference only. */
export const TextSkeletons: Story = {
  tags: ["!manifest"],
  render: () => <TextSkeletonsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvas.getAllByRole("status", { name: "Loading" });

    await expect(skeletons).toHaveLength(TEXT_VARIANTS.length);
    await expect(skeletons[0]).toHaveAccessibleName("Loading");
    await expect(skeletons[0]).toHaveAttribute("aria-busy", "true");
  },
};

/** Showcase of all thumbnail skeleton shapes and sizes — for human reference only. */
export const ThumbnailSkeletons: Story = {
  tags: ["!manifest"],
  render: () => <ThumbnailSkeletonsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvas.getAllByRole("status", { name: "Loading" });

    await expect(skeletons).toHaveLength(THUMBNAIL_VARIANTS.length * THUMBNAIL_SIZES.length);
    await expect(skeletons[0]).toHaveAccessibleName("Loading");
    await expect(skeletons[0]).toHaveAttribute("aria-busy", "true");
  },
};
