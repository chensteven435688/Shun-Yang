import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "split";
  className?: string;
  action?: ReactNode;
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  action,
}: Props) {
  return (
    <header
      className={`section-header section-header--${align} ${className}`.trim()}
    >
      <div className="section-header-main">
        <p data-reveal="meta" className="section-eyebrow">
          <span className="section-index">{index}</span>
          <span className="section-eyebrow-rule" aria-hidden />
          <span>{eyebrow}</span>
        </p>
        <h2 data-reveal="heading" className="section-title">
          {title}
        </h2>
        {description && (
          <p data-reveal="text" className="section-desc">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal="meta" className="section-header-action">
          {action}
        </div>
      )}
    </header>
  );
}
