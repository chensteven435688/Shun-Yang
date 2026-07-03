import { siteOrigin } from "@/lib/site";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  if (!path.startsWith("/")) return path;
  return `${basePath}${path}`;
}

export function absoluteAssetUrl(path: string): string {
  return `${siteOrigin}${assetPath(path)}`;
}
