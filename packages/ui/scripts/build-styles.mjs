import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { compile, optimize } from "@tailwindcss/node";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pkgRoot = path.resolve(__dirname, "..");
const inputPath = path.resolve(pkgRoot, "src/tailwind.css");
const outputPath = path.resolve(pkgRoot, "dist/styles.css");
const vendorFilesDir = path.resolve(pkgRoot, "src/vendor/fonts/files");
const distFilesDir = path.resolve(pkgRoot, "dist/files");

const input = await fs.readFile(inputPath, "utf8");

const result = await compile(input, {
  base: path.dirname(inputPath),
  onDependency: () => {},
});

const css = result.build([]);
const { code } = optimize(css, { minify: true });

await fs.mkdir(path.dirname(outputPath), { recursive: true });
await fs.writeFile(outputPath, code);

// Copy vendored font binaries next to styles.css (url(./files/...)).
await fs.rm(distFilesDir, { recursive: true, force: true });
await fs.cp(vendorFilesDir, distFilesDir, { recursive: true });

console.log(`Built ${path.relative(pkgRoot, outputPath)} (${(code.length / 1024).toFixed(1)} KB)`);
