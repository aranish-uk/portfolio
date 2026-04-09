import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function main() {
  const bundled = await bundle({
    entryPoint: path.resolve(__dirname, "../src/remotion/index.ts"),
    webpackOverride: (config) => config,
  });

  const composition = await selectComposition({
    serveUrl: bundled,
    id: "OgImage",
  });

  const outputPath = path.resolve(__dirname, "../public/og-image.png");

  await renderStill({
    composition,
    serveUrl: bundled,
    output: outputPath,
    imageFormat: "png",
  });

  console.log(`OG image rendered to ${outputPath}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
