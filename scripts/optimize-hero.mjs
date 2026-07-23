import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "hero.jpg");
const outDir = path.join(root, "public", "images", "hero");

const WIDTHS = [640, 1280, 1920, 2560];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  if (!(await exists(source))) {
    throw new Error(`Missing source image: ${source}`);
  }

  await mkdir(outDir, { recursive: true });

  const meta = await sharp(source).metadata();
  console.log(
    `Source: ${meta.width}×${meta.height}, format=${meta.format}`
  );

  for (const width of WIDTHS) {
    const base = path.join(outDir, `hero-${width}`);

    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 78, mozjpeg: true, progressive: true })
      .toFile(`${base}.jpg`);

    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toFile(`${base}.webp`);

    console.log(`Wrote hero-${width}.jpg / .webp`);
  }

  // Tiny blur placeholder for ProgressiveImage / loader skeleton
  await sharp(source)
    .rotate()
    .resize({ width: 32, withoutEnlargement: true })
    .blur(2)
    .jpeg({ quality: 40 })
    .toFile(path.join(outDir, "hero-placeholder.jpg"));

  console.log("Wrote hero-placeholder.jpg");
  console.log("Done. Original public/hero.jpg preserved.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
