import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Typography } from "@ds-12/ui/typography";
import { StoryCaption } from "../../lib/story-presentation.tsx";
import { testStoryParams } from "../../lib/component-tests.ts";

const variants = [
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
] as const;

const variantLabels: Record<(typeof variants)[number], string> = {
  display: "Display",
  h1: "Heading 1",
  h2: "Heading 2",
  h3: "Heading 3",
  h4: "Heading 4",
  "paragraph-xlarge": "Paragraph XLarge",
  "paragraph-large": "Paragraph Large",
  paragraph: "Paragraph",
  "paragraph-small": "Paragraph Small",
  "label-large": "Label Large",
  label: "Label",
  "label-small": "Label Small",
};

const meta = {
  title: "Components/Typography",
  component: Typography,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: variants,
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

export const Default: Story = {};

export const Display: Story = {
  args: { variant: "display" },
};

export const Heading1: Story = {
  args: { variant: "h1", render: "h1" },
};

export const Heading2: Story = {
  args: { variant: "h2", render: "h2" },
};

export const Heading3: Story = {
  args: { variant: "h3", render: "h3" },
};

export const Heading4: Story = {
  args: { variant: "h4", render: "h4" },
};

export const Paragraph: Story = {
  args: { variant: "paragraph", render: "p" },
};

export const Label: Story = {
  args: { variant: "label", children: "Label text" },
};

export const FontWeights: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography variant="paragraph" fontWeight="regular">
        Regular weight
      </Typography>
      <Typography variant="paragraph" fontWeight="medium">
        Medium weight
      </Typography>
      <Typography variant="paragraph" fontWeight="semibold">
        Semibold weight
      </Typography>
      <Typography variant="paragraph" fontWeight="bold">
        Bold weight
      </Typography>
    </div>
  ),
};

export const TypeScale: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {variants.map((variant) => (
        <div key={variant} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <StoryCaption>{variantLabels[variant]}</StoryCaption>
          <Typography variant={variant}>{variantLabels[variant]}</Typography>
        </div>
      ))}
    </div>
  ),
};

export const SemanticElements: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <Typography variant="h1" render="h1">
        Page title
      </Typography>
      <Typography variant="h2" render="h2">
        Section heading
      </Typography>
      <Typography variant="paragraph" render="p">
        Body copy uses the paragraph variant with a semantic paragraph element.
      </Typography>
      <Typography variant="label" render="label">
        Form label
      </Typography>
    </div>
  ),
};

export const A11y: Story = {
  ...testStoryParams(),
  args: { children: "Accessible text", variant: "paragraph" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const text = canvas.getByText("Accessible text");
    expect(text).toBeInTheDocument();
    expect(text).toHaveTextContent("Accessible text");
  },
};
