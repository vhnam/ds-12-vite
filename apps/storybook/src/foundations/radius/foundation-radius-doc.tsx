import { formatFoundationTokenDisplayName, FOUNDATION_RADIUS_TOKEN_GROUPS } from './parse-theme-radius.ts';
import { RadiusTokensDoc } from './radius-tokens-doc.tsx';

function FoundationRadiusDoc() {
  return (
    <RadiusTokensDoc
      groups={FOUNDATION_RADIUS_TOKEN_GROUPS}
      formatTokenDisplayName={formatFoundationTokenDisplayName}
    />
  );
}

export { FoundationRadiusDoc };
