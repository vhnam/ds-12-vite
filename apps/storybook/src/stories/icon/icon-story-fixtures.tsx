import { Icon } from "@ds-12/ui/icon";
import { StoryCaption } from "../../lib/story-presentation.tsx";

export const VARIANTS = ["outlined", "filled"] as const;
export const SIZES = [12, 16, 20, 24, 32] as const;

const ICON_NAME = "check_circle";

const rowStyle = {
  display: "flex",
  gap: 24,
  alignItems: "center",
} as const;

const sizesRowStyle = {
  display: "flex",
  gap: 16,
  alignItems: "flex-end",
} as const;

const sizeItemStyle = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  alignItems: "center",
} as const;

export function VariantsShowcase() {
  return (
    <div style={rowStyle}>
      {VARIANTS.map((variant) => (
        <Icon key={variant} name={ICON_NAME} variant={variant} size={24} />
      ))}
    </div>
  );
}

export function SizesShowcase() {
  return (
    <div style={sizesRowStyle}>
      {SIZES.map((size) => (
        <div key={size} style={sizeItemStyle}>
          <StoryCaption>{size}px</StoryCaption>
          <Icon name={ICON_NAME} variant="filled" size={size} />
        </div>
      ))}
    </div>
  );
}
