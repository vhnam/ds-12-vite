import { ColorTokensDoc } from './color-tokens-doc.tsx';
import { formatFoundationTokenDisplayName, FOUNDATION_COLOR_TOKEN_GROUPS } from './parse-theme-colors.ts';

function FoundationColorsDoc() {
  return (
    <ColorTokensDoc groups={FOUNDATION_COLOR_TOKEN_GROUPS} formatTokenDisplayName={formatFoundationTokenDisplayName} />
  );
}

export { FoundationColorsDoc };
