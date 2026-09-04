import { mkdir, access } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const source = path.join(root, "public", "lobby-future.png");
const outDir = path.join(root, "public", "images", "lobby");

/** Display max is 520px; 2× retina ≈ 1024 (source size). */
const WIDTHS = [640, 1024];

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
  console.log(
    `Source: ${meta.width}×${meta.height}, format=${meta.format}`
  );

  for (const width of WIDTHS) {
    const base = path.join(outDir, `lobby-${width}`);

    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true })
      .toFile(`${base}.jpg`);

    await sharp(source)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 5 })
      .toFile(`${base}.webp`);

    console.log(`Wrote lobby-${width}.jpg / .webp`);
  }

  await sharp(source)
    .rotate()
    .resize({ width: 32, withoutEnlargement: true })
    .blur(2)
    .jpeg({ quality: 40 })
    .toFile(path.join(outDir, "lobby-placeholder.jpg"));

  console.log("Wrote lobby-placeholder.jpg");
  console.log("Done. Original public/lobby-future.png preserved.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
