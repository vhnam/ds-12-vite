import {
  formatFoundationTokenDisplayName,
  FOUNDATION_SPACING_TOKEN_GROUPS,
} from "./parse-theme-spacing.ts";
import { SpacingTokensDoc } from "./spacing-tokens-doc.tsx";

function FoundationSpacingDoc() {
  return (
    <SpacingTokensDoc
      groups={FOUNDATION_SPACING_TOKEN_GROUPS}
      formatTokenDisplayName={formatFoundationTokenDisplayName}
    />
  );
}

export { FoundationSpacingDoc };
