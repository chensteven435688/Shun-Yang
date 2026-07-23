/**
 * First-class CSS / SVG Λ sculpture — used while WebGL loads and as permanent fallback.
 */
export function Hero3DFallback() {
  return (
    <div className="hero-fallback" aria-hidden>
      <div className="hero-fallback-glow" />
      <div className="hero-fallback-orbit" />
      <svg
        className="hero-fallback-lambda"
        viewBox="0 0 200 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="hero-blade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8eaef" stopOpacity="0.92" />
            <stop offset="55%" stopColor="#9aa3b2" stopOpacity="0.75" />
            <stop offset="100%" stopColor="#6a7382" stopOpacity="0.55" />
          </linearGradient>
          <linearGradient id="hero-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c4a574" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#c4a574" stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <path
          className="hero-fallback-blade"
          d="M78 28 L42 188 L62 188 L92 78 L122 188 L142 188 L106 28 Z"
          fill="url(#hero-blade)"
          fillRule="evenodd"
        />
        <path
          className="hero-fallback-seam"
          d="M100 42 C106 78 94 112 102 148 C106 168 98 186 100 198"
          stroke="url(#hero-gold)"
          strokeWidth="2.2"
          strokeLinecap="round"
        />
        <ellipse
          className="hero-fallback-ring"
          cx="100"
          cy="112"
          rx="78"
          ry="48"
          stroke="rgba(232,233,236,0.28)"
          strokeWidth="1"
          strokeDasharray="3 7"
        />
      </svg>
      <div className="hero-fallback-base" />
    </div>
  );
}
