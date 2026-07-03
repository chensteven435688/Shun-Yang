const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const siteOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (basePath
    ? `https://chensteven435688.github.io${basePath}`
    : "https://shunyang.com")
).replace(/\/$/, "");

export function siteUrl(path = ""): string {
  if (!path) return `${siteOrigin}/`;
  return `${siteOrigin}${path.startsWith("/") ? path : `/${path}`}`;
}
