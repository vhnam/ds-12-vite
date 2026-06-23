import type { ReactNode } from "react";
import { Typography } from "@ds-12/ui/typography";

function StorySectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="h3"
      render="h3"
      style={{ margin: "0 0 12px", textTransform: "capitalize" }}
    >
      {children}
    </Typography>
  );
}

function StoryCaption({ children }: { children: ReactNode }) {
  return (
    <Typography
      variant="label-small"
      style={{ margin: "0 0 8px", color: "var(--color-semantic-text-neutral-moderate)" }}
    >
      {children}
    </Typography>
  );
}

export { StoryCaption, StorySectionTitle };
