import fs from "node:fs";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const fontPkgDir = path.dirname(require.resolve("@fontsource/nunito-sans/package.json"));
const vendorDir = path.resolve(pkgRoot, "src/vendor/fonts");
const vendorFilesDir = path.resolve(vendorDir, "files");

const weights = ["400", "500", "600", "700"];

fs.mkdirSync(vendorFilesDir, { recursive: true });

const referencedFiles = new Set();

for (const weight of weights) {
  const sourcePath = path.join(fontPkgDir, `${weight}.css`);
  let css = fs.readFileSync(sourcePath, "utf8");

  // Keep woff2 only — smaller bundle, sufficient for modern browsers.
  css = css.replace(
    /url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\), url\(\.\/files\/[^)]+\.woff\) format\('woff'\)/g,
    "url(./files/$1) format('woff2')",
  );

  for (const match of css.matchAll(/url\(\.\/files\/([^)]+)\)/g)) {
    referencedFiles.add(match[1]);
  }

  fs.writeFileSync(path.join(vendorDir, `${weight}.css`), css);
}

for (const fileName of referencedFiles) {
  fs.copyFileSync(path.join(fontPkgDir, "files", fileName), path.join(vendorFilesDir, fileName));
}

console.log(
  `Vendored Nunito Sans (${weights.join(", ")}) — ${referencedFiles.size} woff2 files to ${path.relative(pkgRoot, vendorDir)}`,
);
