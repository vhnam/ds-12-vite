import { Avatar } from "@ds-12/ui/avatar";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const SIZES = ["sm", "md", "lg"] as const;
export const SHAPES = ["user", "organisation"] as const;
export const VARIANTS = ["initial", "image", "icon"] as const;

export const PLACEHOLDER_IMAGE =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face";

const showcaseStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 24,
} as const;

const rowStyle = {
  display: "flex",
  gap: 12,
  alignItems: "center",
} as const;

export function VariantsShowcase() {
  return (
    <div style={showcaseStyle}>
      {SHAPES.map((shape) => (
        <div key={shape}>
          <StoryCaption>{shape}</StoryCaption>
          <div style={rowStyle}>
            {VARIANTS.map((variant) => (
              <Avatar
                key={variant}
                shape={shape}
                size="md"
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
  );
}

export function SizesShowcase() {
  return (
    <div style={rowStyle}>
      {SIZES.map((size) => (
        <Avatar
          key={size}
          shape="user"
          size={size}
          variant="initial"
          initials="BL"
          src={PLACEHOLDER_IMAGE}
          alt="Avatar"
        />
      ))}
    </div>
  );
}
