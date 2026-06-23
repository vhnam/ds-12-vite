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

export const Default: Story = {
  play: createSkeletonA11yPlay("Loading"),
};

export const TextSkeletons: Story = {
  render: () => <TextSkeletonsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvas.getAllByRole("status", { name: "Loading" });

    await expect(skeletons).toHaveLength(TEXT_VARIANTS.length);
    await expect(skeletons[0]).toHaveAccessibleName("Loading");
    await expect(skeletons[0]).toHaveAttribute("aria-busy", "true");
  },
};

export const ThumbnailSkeletons: Story = {
  render: () => <ThumbnailSkeletonsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const skeletons = canvas.getAllByRole("status", { name: "Loading" });

    await expect(skeletons).toHaveLength(THUMBNAIL_VARIANTS.length * THUMBNAIL_SIZES.length);
    await expect(skeletons[0]).toHaveAccessibleName("Loading");
    await expect(skeletons[0]).toHaveAttribute("aria-busy", "true");
  },
};
