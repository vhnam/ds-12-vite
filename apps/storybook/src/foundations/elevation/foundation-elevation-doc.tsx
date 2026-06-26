import {
  formatFoundationTokenDisplayName,
  FOUNDATION_ELEVATION_TOKEN_GROUPS,
} from "./parse-theme-elevation.ts";
import { ElevationTokensDoc } from "./elevation-tokens-doc.tsx";

function FoundationElevationDoc() {
  return (
    <ElevationTokensDoc
      groups={FOUNDATION_ELEVATION_TOKEN_GROUPS}
      formatTokenDisplayName={formatFoundationTokenDisplayName}
    />
  );
}

export { FoundationElevationDoc };
