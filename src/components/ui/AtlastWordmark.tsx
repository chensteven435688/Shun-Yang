type Props = {
  /** sm = nav/footer, md = lobby, lg = hero */
  size?: "sm" | "md" | "lg";
  className?: string;
};

/**
 * ΛTLΛST logotype — matches atlastofficial.com serif wordmark (lambda A’s).
 */
export function AtlastWordmark({ size = "md", className = "" }: Props) {
  return (
    <span
      className={`atlast-wordmark atlast-wordmark--${size} ${className}`.trim()}
      aria-label="ΛTLΛST"
    >
      ΛTLΛST
    </span>
  );
}
