import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Skeleton } from "@ds-12/ui/skeleton";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

const textVariants = ["h1", "h2", "h3", "h4", "paragraph", "label"] as const;
const thumbnailVariants = ["circle", "square", "rectangle"] as const;
const thumbnailSizes = ["128", "72", "48", "32"] as const;

const meta = {
  title: "Components/Skeleton",
  component: Skeleton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: [...textVariants, ...thumbnailVariants],
    },
    size: {
      control: "select",
      options: thumbnailSizes,
      if: { arg: "variant", neq: "h1" },
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

export const Default: Story = {};

export const TextH1: Story = {
  args: { variant: "h1" },
};

export const TextH2: Story = {
  args: { variant: "h2" },
};

export const TextH3: Story = {
  args: { variant: "h3" },
};

export const TextH4: Story = {
  args: { variant: "h4" },
};

export const TextParagraph: Story = {
  args: { variant: "paragraph" },
};

export const TextLabel: Story = {
  args: { variant: "label" },
};

export const ThumbnailCircle: Story = {
  args: { variant: "circle", size: "48", width: undefined },
};

export const ThumbnailSquare: Story = {
  args: { variant: "square", size: "48", width: undefined },
};

export const ThumbnailRectangle: Story = {
  args: { variant: "rectangle", size: "48", width: undefined },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <StorySectionTitle>Text Skeleton</StorySectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: 311 }}>
          {textVariants.map((variant) => (
            <div key={variant}>
              <StoryCaption>{variant}</StoryCaption>
              <Skeleton variant={variant} />
            </div>
          ))}
        </div>
      </div>

      <div>
        <StorySectionTitle>Thumbnail Skeleton</StorySectionTitle>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {thumbnailVariants.map((variant) => (
            <div key={variant}>
              <StoryCaption>{variant}</StoryCaption>
              <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
                {thumbnailSizes.map((size) => (
                  <Skeleton key={size} variant={variant} size={size} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const A11y: Story = {
  ...testStoryParams(),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const status = canvas.getByRole("status", { name: "Loading" });
    await expect(status).toBeInTheDocument();
    await expect(status).toHaveAccessibleName("Loading");
    await expect(status).toHaveAttribute("aria-busy", "true");
  },
};
