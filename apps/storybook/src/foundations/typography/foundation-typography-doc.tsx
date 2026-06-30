import { formatFoundationTokenDisplayName, FOUNDATION_TYPOGRAPHY_TOKEN_GROUPS } from './parse-theme-typography.ts';
import { FoundationTypographyTokensDoc } from './typography-tokens-doc.tsx';

function FoundationTypographyDoc() {
  return (
    <FoundationTypographyTokensDoc
      groups={FOUNDATION_TYPOGRAPHY_TOKEN_GROUPS}
      formatTokenDisplayName={formatFoundationTokenDisplayName}
    />
  );
}

export { FoundationTypographyDoc };
