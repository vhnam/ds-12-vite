import { Typography } from "@ds-12/ui/typography";

export const HEADING_VARIANTS = ["display", "h1", "h2", "h3", "h4"] as const;
export const PARAGRAPH_VARIANTS = [
  "paragraph-xlarge",
  "paragraph-large",
  "paragraph",
  "paragraph-small",
] as const;
export const LABEL_VARIANTS = ["label-large", "label", "label-small"] as const;

export const VARIANTS = [...HEADING_VARIANTS, ...PARAGRAPH_VARIANTS, ...LABEL_VARIANTS] as const;

export const VARIANT_LABELS: Record<(typeof VARIANTS)[number], string> = {
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

const showcaseStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 16,
} as const;

const sampleText = "The quick brown fox jumps over the lazy dog";

export function HeadingShowcase() {
  return (
    <div style={showcaseStyle}>
      {HEADING_VARIANTS.map((variant) => (
        <div key={variant}>
          <Typography variant={variant} render={variant === "display" ? undefined : variant}>
            {VARIANT_LABELS[variant]}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function ParagraphShowcase() {
  return (
    <div style={showcaseStyle}>
      {PARAGRAPH_VARIANTS.map((variant) => (
        <div key={variant}>
          <Typography variant={variant} render="p">
            {sampleText}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function LabelShowcase() {
  return (
    <div style={showcaseStyle}>
      {LABEL_VARIANTS.map((variant) => (
        <div key={variant}>
          <Typography variant={variant} render="label">
            {VARIANT_LABELS[variant]}
          </Typography>
        </div>
      ))}
    </div>
  );
}

export function SemanticElementsShowcase() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
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
  );
}
