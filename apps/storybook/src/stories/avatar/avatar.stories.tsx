import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Avatar } from "@ds-12/ui/avatar";
import { StoryCaption, StorySectionTitle } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

const sizes = ["sm", "md", "lg"] as const;
const shapes = ["user", "organisation"] as const;
const variants = ["initial", "image", "icon"] as const;

const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face";

const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: sizes,
    },
    shape: {
      control: "select",
      options: shapes,
    },
    variant: {
      control: "select",
      options: variants,
    },
    icon: { control: false },
  },
  args: {
    size: "md",
    shape: "user",
    variant: "initial",
    initials: "BL",
    src: PLACEHOLDER_IMAGE,
    alt: "User avatar",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const UserInitial: Story = {
  args: { shape: "user", variant: "initial", initials: "BL" },
};

export const UserImage: Story = {
  args: { shape: "user", variant: "image", src: PLACEHOLDER_IMAGE },
};

export const UserIcon: Story = {
  args: { shape: "user", variant: "icon" },
};

export const OrganisationInitial: Story = {
  args: { shape: "organisation", variant: "initial", initials: "BL" },
};

export const OrganisationImage: Story = {
  args: { shape: "organisation", variant: "image", src: PLACEHOLDER_IMAGE },
};

export const OrganisationIcon: Story = {
  args: { shape: "organisation", variant: "icon" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Medium: Story = {
  args: { size: "md" },
};

export const Large: Story = {
  args: { size: "lg" },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {shapes.map((shape) => (
        <div key={shape}>
          <StorySectionTitle>{shape}</StorySectionTitle>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {variants.map((variant) => (
              <div key={variant}>
                <StoryCaption>{variant}</StoryCaption>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  {sizes.map((size) => (
                    <Avatar
                      key={size}
                      shape={shape}
                      size={size}
                      variant={variant}
                      initials="BL"
                      src={PLACEHOLDER_IMAGE}
                      alt="Avatar"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  ),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { shape: "user", variant: "initial", initials: "BL" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("BL")).toBeInTheDocument();
    await expect(canvas.getByText("BL")).toHaveTextContent("BL");
  },
};
