import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Typography } from "@ds-12/ui/typography";
import {
  HeadingShowcase,
  LABEL_VARIANTS,
  LabelShowcase,
  PARAGRAPH_VARIANTS,
  ParagraphShowcase,
  SemanticElementsShowcase,
  VARIANTS,
} from "./typography-story-fixtures.tsx";

/** Semantic text styles for display copy, headings, paragraphs, and labels with optional font weight overrides. */
const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: VARIANTS,
    },
    fontWeight: {
      control: "select",
      options: [undefined, "regular", "medium", "semibold", "bold"],
    },
    render: { control: false },
  },
  args: {
    children: "The quick brown fox jumps over the lazy dog",
    variant: "paragraph",
  },
} satisfies Meta<typeof Typography>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Use the paragraph variant for standard body copy — it sets the base reading size and line height for comfortable long-form text. */
export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText("The quick brown fox jumps over the lazy dog");

    await expect(text).toBeInTheDocument();
    await expect(text).toHaveTextContent("The quick brown fox jumps over the lazy dog");
  },
};

/** Showcase of display and heading hierarchy (h1–h4) — for human reference only. */
export const Heading: Story = {
  tags: ["!manifest"],
  render: () => <HeadingShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Display")).toBeVisible();
    await expect(canvas.getByRole("heading", { level: 1 })).toHaveTextContent("Heading 1");
    await expect(canvas.getByRole("heading", { level: 2 })).toHaveTextContent("Heading 2");
    await expect(canvas.getByRole("heading", { level: 3 })).toHaveTextContent("Heading 3");
    await expect(canvas.getByRole("heading", { level: 4 })).toHaveTextContent("Heading 4");
  },
};

/** Showcase of all paragraph size variants — for human reference only. */
export const Paragraph: Story = {
  tags: ["!manifest"],
  render: () => <ParagraphShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const paragraphs = canvas.getAllByText("The quick brown fox jumps over the lazy dog");

    await expect(paragraphs).toHaveLength(PARAGRAPH_VARIANTS.length);
    await expect(paragraphs[0]).toBeVisible();
  },
};

/** Showcase of all label variants — for human reference only. */
export const Label: Story = {
  tags: ["!manifest"],
  render: () => <LabelShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByText("Label Large")).toBeVisible();
    await expect(canvas.getByText("Label Small")).toBeVisible();
    await expect(canvas.getAllByText(/^Label/)).toHaveLength(LABEL_VARIANTS.length);
  },
};

/** Showcase demonstrating how Typography maps to semantic HTML elements (h1, h2, p, label) — for human reference only. */
export const SemanticElements: Story = {
  tags: ["!manifest"],
  render: () => <SemanticElementsShowcase />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(canvas.getByRole("heading", { level: 1, name: "Page title" })).toBeInTheDocument();
    await expect(
      canvas.getByRole("heading", { level: 2, name: "Section heading" }),
    ).toBeInTheDocument();
    await expect(
      canvas.getByText("Body copy uses the paragraph variant with a semantic paragraph element."),
    ).toBeVisible();
    await expect(canvas.getByText("Form label")).toBeVisible();
  },
};
