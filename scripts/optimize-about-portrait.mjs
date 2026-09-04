import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

/**
 * Cuts a 4:5 About portrait from the full-resolution hero master.
 * The About page used to feed landscape hero-* sources into a tall frame with
 * sizes="220px", so Retina browsers picked the 640×360 file and upscaled it.
 */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "hero.jpg");
const outDir = path.join(root, "public", "images", "about");

/** Display widths for 1× / 2× / 3× of the ~220–480px portrait column. */
const WIDTHS = [480, 960, 1440];
const ASPECT = { width: 4, height: 5 };

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

  const meta = await sharp(source).rotate().metadata();
  console.log(`Source: ${meta.width}×${meta.height}, format=${meta.format}`);

  for (const width of WIDTHS) {
    const height = Math.round((width * ASPECT.height) / ASPECT.width);
    const base = path.join(outDir, `portrait-${width}`);

    const pipeline = () =>
      sharp(source)
        .rotate()
        .resize({
          width,
          height,
          fit: "cover",
          position: "centre",
          withoutEnlargement: false,
        });

    await pipeline()
      .jpeg({ quality: 82, mozjpeg: true, progressive: true })
      .toFile(`${base}.jpg`);

    await pipeline()
      .webp({ quality: 80, effort: 5 })
      .toFile(`${base}.webp`);

    console.log(`Wrote portrait-${width}.jpg / .webp (${width}×${height})`);
  }

  await sharp(source)
    .rotate()
    .resize({
      width: 32,
      height: 40,
      fit: "cover",
      position: "centre",
    })
    .blur(2)
    .jpeg({ quality: 40 })
    .toFile(path.join(outDir, "portrait-placeholder.jpg"));

  console.log("Wrote portrait-placeholder.jpg");
  console.log("Done.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
