import { Skeleton } from "@ds-12/ui/skeleton";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const TEXT_VARIANTS = ["h1", "h2", "h3", "h4", "paragraph", "label"] as const;
export const THUMBNAIL_VARIANTS = ["circle", "square", "rectangle"] as const;
export const THUMBNAIL_SIZES = ["128", "72", "48", "32"] as const;

const textShowcaseStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 8,
  width: 311,
} as const;

const thumbnailGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
} as const;

const thumbnailRowStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
} as const;

export function TextSkeletonsShowcase() {
  return (
    <div style={textShowcaseStyle}>
      {TEXT_VARIANTS.map((variant) => (
        <div key={variant}>
          <StoryCaption>{variant}</StoryCaption>
          <Skeleton variant={variant} />
        </div>
      ))}
    </div>
  );
}

export function ThumbnailSkeletonsShowcase() {
  return (
    <div style={thumbnailGroupStyle}>
      {THUMBNAIL_VARIANTS.map((variant) => (
        <div key={variant}>
          <StoryCaption>{variant}</StoryCaption>
          <div style={thumbnailRowStyle}>
            {THUMBNAIL_SIZES.map((size) => (
              <Skeleton key={size} variant={variant} size={size} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
