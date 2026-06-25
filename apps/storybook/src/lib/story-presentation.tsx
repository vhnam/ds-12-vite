import type { ReactNode } from "react";
import { Typography } from "@ds-12/ui/typography";

function StorySectionTitle({ children }: { children: ReactNode }) {
  return (
    <Typography variant="h3" render="h3" className="m-0 mb-small capitalize">
      {children}
    </Typography>
  );
}

function StoryCaption({ children }: { children: ReactNode }) {
  return (
    <Typography variant="label-small" className="m-0 mb-xsmall text-semantic-text-neutral-moderate">
      {children}
    </Typography>
  );
}

export { StoryCaption, StorySectionTitle };
