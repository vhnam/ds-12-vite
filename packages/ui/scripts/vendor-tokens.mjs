import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const tokensSrc = path.resolve(pkgRoot, "../design-tokens/src");
const vendorDir = path.resolve(pkgRoot, "src/vendor/tokens");

const files = [
  ["tokens.web.css", "tokens.css"],
  ["tokens.theme.css", "theme.css"],
  ["tokens.generated.css", "tokens.generated.css"],
];

fs.mkdirSync(vendorDir, { recursive: true });

for (const [srcName, destName] of files) {
  fs.copyFileSync(path.join(tokensSrc, srcName), path.join(vendorDir, destName));
}

console.log(`Vendored design tokens to ${path.relative(pkgRoot, vendorDir)}`);
