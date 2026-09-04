import { siteUrl } from "@/lib/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/** Root-relative URL for use in the browser. */
export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

/** Apply `assetPath` to every URL in a `srcset` string. */
export function assetSrcSet(srcSet: string): string {
  return srcSet
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const space = trimmed.lastIndexOf(" ");
      if (space === -1) return assetPath(trimmed);
      return `${assetPath(trimmed.slice(0, space))} ${trimmed.slice(space + 1)}`;
    })
    .join(", ");
}

/**
 * Fully-qualified URL for metadata (OG/Twitter cards need absolute URLs).
 * `siteUrl` builds on an origin that already carries the base path, so the
 * path must NOT be run through `assetPath` first or it gets applied twice.
 */
export function absoluteAssetUrl(path: string): string {
  return siteUrl(path);
}
