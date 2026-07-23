"use client";

import {
  useCallback,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type ImgHTMLAttributes,
} from "react";
import { assetPath } from "@/lib/assetPath";

type ProgressiveImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string | number;
  sizes?: string;
  srcSet?: string;
  webpSrcSet?: string;
  placeholderSrc?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  /** Branded fallback label when the image fails */
  fallbackLabel?: string;
  onLoad?: () => void;
  onError?: () => void;
} & Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  "src" | "alt" | "width" | "height" | "sizes" | "srcSet" | "onLoad" | "onError"
>;

type LoadState = "loading" | "loaded" | "error";

function resolve(path: string) {
  return assetPath(path);
}

function resolveSrcSet(srcSet?: string) {
  if (!srcSet) return undefined;
  return srcSet
    .split(",")
    .map((part) => {
      const trimmed = part.trim();
      const space = trimmed.lastIndexOf(" ");
      if (space === -1) return resolve(trimmed);
      return `${resolve(trimmed.slice(0, space))} ${trimmed.slice(space + 1)}`;
    })
    .join(", ");
}

export function ProgressiveImage({
  src,
  alt,
  width,
  height,
  aspectRatio,
  sizes,
  srcSet,
  webpSrcSet,
  placeholderSrc,
  priority = false,
  className = "",
  imgClassName = "",
  fallbackLabel = "Image unavailable",
  onLoad,
  onError,
  ...rest
}: ProgressiveImageProps) {
  const reactId = useId();
  const imgRef = useRef<HTMLImageElement>(null);

  const resolvedSrc = resolve(src);
  const resolvedSrcSet = resolveSrcSet(srcSet);
  const resolvedWebpSrcSet = resolveSrcSet(webpSrcSet);
  const resolvedPlaceholder = placeholderSrc
    ? resolve(placeholderSrc)
    : undefined;

  const loadKey = `${resolvedSrc}|${resolvedSrcSet ?? ""}|${resolvedWebpSrcSet ?? ""}`;
  const [status, setStatus] = useState<{ key: string; state: LoadState }>({
    key: loadKey,
    state: "loading",
  });

  if (status.key !== loadKey) {
    setStatus({ key: loadKey, state: "loading" });
  }

  const state = status.key === loadKey ? status.state : "loading";

  const reveal = useCallback(async () => {
    const el = imgRef.current;
    if (!el) return;

    try {
      if (typeof el.decode === "function") {
        await el.decode();
      }
    } catch {
      // decode may reject; naturalWidth check below is authoritative
    }

    if (!el.complete || el.naturalWidth === 0) {
      setStatus({ key: loadKey, state: "error" });
      onError?.();
      return;
    }

    setStatus({ key: loadKey, state: "loaded" });
    onLoad?.();
  }, [loadKey, onError, onLoad]);

  const ratioStyle: CSSProperties | undefined = aspectRatio
    ? {
        aspectRatio:
          typeof aspectRatio === "number" ? `${aspectRatio}` : aspectRatio,
      }
    : undefined;

  const showSkeleton = state === "loading";
  const isLoaded = state === "loaded";
  const isError = state === "error";

  return (
    <div
      className={`progressive-image ${className}`.trim()}
      style={ratioStyle}
      data-state={state}
    >
      {resolvedPlaceholder && (
        // eslint-disable-next-line @next/next/no-img-element -- blur placeholder; not LCP
        <img
          src={resolvedPlaceholder}
          alt=""
          aria-hidden
          className="progressive-image-placeholder"
          draggable={false}
        />
      )}

      {showSkeleton && !isError && (
        <div className="progressive-image-skeleton" aria-hidden>
          <span className="progressive-image-scan" />
          <span className="progressive-image-noise" />
        </div>
      )}

      {!isError && (
        <picture>
          {resolvedWebpSrcSet && (
            <source
              type="image/webp"
              srcSet={resolvedWebpSrcSet}
              sizes={sizes}
            />
          )}
          {/* Native img required for picture/srcset + decode() before reveal */}
          <img
            ref={imgRef}
            src={resolvedSrc}
            srcSet={resolvedSrcSet}
            sizes={sizes}
            alt={alt}
            width={width}
            height={height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className={`progressive-image-img ${imgClassName}`.trim()}
            data-loaded={isLoaded ? "true" : "false"}
            onLoad={() => void reveal()}
            onError={() => {
              setStatus({ key: loadKey, state: "error" });
              onError?.();
            }}
            {...rest}
          />
        </picture>
      )}

      {isError && (
        <div
          className="progressive-image-fallback"
          role="img"
          aria-label={alt || fallbackLabel}
        >
          <span className="progressive-image-fallback-mark" aria-hidden>
            Λ
          </span>
          <span className="progressive-image-fallback-label">
            {fallbackLabel}
          </span>
        </div>
      )}

      <span className="sr-only" id={reactId}>
        {isLoaded ? alt : isError ? fallbackLabel : "Loading image"}
      </span>
    </div>
  );
}
