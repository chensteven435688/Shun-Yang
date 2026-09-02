import type { ReactNode } from "react";

type Props = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "split";
  className?: string;
  action?: ReactNode;
  /**
   * `h2` suits a section within a longer page. Pass `h1` when the section is the
   * whole route, so the page still has exactly one top-level heading.
   */
  as?: "h1" | "h2";
};

export function SectionHeader({
  index,
  eyebrow,
  title,
  description,
  align = "left",
  className = "",
  action,
  as: Heading = "h2",
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
        <Heading data-reveal="heading" className="section-title">
          {title}
        </Heading>
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
