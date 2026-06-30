import { ColorTokensDoc } from './color-tokens-doc.tsx';
import { formatSemanticTokenDisplayName, SEMANTIC_COLOR_TOKEN_GROUPS } from './parse-theme-colors.ts';

function SemanticColorsDoc() {
  return (
    <ColorTokensDoc groups={SEMANTIC_COLOR_TOKEN_GROUPS} formatTokenDisplayName={formatSemanticTokenDisplayName} />
  );
}

export { SemanticColorsDoc };
