import { SEMANTIC_TYPOGRAPHY_CATEGORIES } from "./parse-theme-typography.ts";
import { SemanticTypographyTokensDoc } from "./typography-tokens-doc.tsx";

function SemanticTypographyDoc() {
  return <SemanticTypographyTokensDoc categories={SEMANTIC_TYPOGRAPHY_CATEGORIES} />;
}

export { SemanticTypographyDoc };
