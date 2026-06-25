import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Avatar } from "@ds-12/ui/avatar";
import {
  PLACEHOLDER_IMAGE,
  SHAPES,
  SIZES,
  SizesShowcase,
  VARIANTS,
  VariantsShowcase,
} from "./avatar-story-fixtures.tsx";

/** Displays a user or organisation profile image with initials, photo, or fallback icon. Available in user and organisation shapes with small, medium, and large sizes. */
const meta = {
  title: "Components/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: SIZES,
    },
    shape: {
      control: "select",
      options: SHAPES,
    },
    variant: {
      control: "select",
      options: VARIANTS,
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

/** Use the initial variant as the default when a user has provided their name but no profile photo. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getByText("BL");

    await expect(initials).toBeInTheDocument();
    await expect(initials).toHaveTextContent("BL");
  },
};

/** Use the image variant when a profile photo URL is available; it automatically falls back to initials if the image fails to load. */
export const WithImage: Story = {
  args: {
    variant: "image",
    src: PLACEHOLDER_IMAGE,
    alt: "User avatar",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const img = canvas.queryByRole("img");

    await expect(img ?? canvas.getByText("BL")).toBeInTheDocument();
  },
};

/** Use the icon variant as a generic placeholder when neither a photo nor initials are known — for example, representing an anonymous or deleted user. */
export const WithIcon: Story = {
  args: {
    variant: "icon",
    initials: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("person")).toBeInTheDocument();
  },
};

/** Use the organisation shape for company or team entities to visually distinguish them from individual user avatars. */
export const OrganisationShape: Story = {
  args: {
    shape: "organisation",
    variant: "icon",
    initials: undefined,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("apartment")).toBeInTheDocument();
  },
};

/** Use the small size in compact layouts such as comment threads, table rows, or inline mentions. */
export const Small: Story = {
  args: {
    size: "sm",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("BL")).toBeInTheDocument();
  },
};

/** Use the large size in profile headers, spotlight cards, or anywhere the avatar is the primary visual element. */
export const Large: Story = {
  args: {
    size: "lg",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("BL")).toBeInTheDocument();
  },
};

/** Showcase of all variants across both shapes — for human reference only. */
export const Variants: Story = {
  tags: ["!manifest"],
  render: () => <VariantsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getAllByText("BL").length).toBeGreaterThanOrEqual(SHAPES.length);
    await expect(canvas.getByText("person")).toBeInTheDocument();
    await expect(canvas.getByText("apartment")).toBeInTheDocument();
  },
};

/** Showcase of all available sizes side by side — for human reference only. */
export const Sizes: Story = {
  tags: ["!manifest"],
  render: () => <SizesShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const initials = canvas.getAllByText("BL");

    await expect(initials).toHaveLength(SIZES.length);
    await expect(initials[0]).toBeVisible();
  },
};
