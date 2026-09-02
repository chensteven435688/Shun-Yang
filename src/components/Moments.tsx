import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ProgressiveImage } from "@/components/media/ProgressiveImage";
import {
  getMomentPreview,
  hasRealMomentPhotos,
  moments,
  type MomentItem,
} from "@/data/moments";

type Props = {
  standalone?: boolean;
};

function MomentCard({ item }: { item: MomentItem }) {
  const hasImage = Boolean(item.src);

  return (
    <article
      data-reveal-item
      data-cursor={hasImage ? "view" : undefined}
      className="moment-card group"
    >
      <div className="photo-frame moment-frame aspect-[4/5]">
        {hasImage && item.src ? (
          <ProgressiveImage
            src={item.src}
            alt={item.alt ?? item.label}
            width={item.width ?? 800}
            height={item.height ?? 1000}
            aspectRatio={`${item.width ?? 4} / ${item.height ?? 5}`}
            sizes="(max-width: 768px) 90vw, 33vw"
            className="moment-inner h-full w-full"
            fallbackLabel="Photo unavailable"
          />
        ) : (
          <div className="photo-placeholder moment-inner">
            <span className="font-serif text-3xl text-cream/15 transition-transform duration-500 group-hover:scale-110">
              +
            </span>
            <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/25">
              {item.label}
            </span>
          </div>
        )}
      </div>
      <p className="photo-caption static mt-3 transition-colors group-hover:text-lime/70">
        {item.caption}
      </p>
    </article>
  );
}

export function Moments({ standalone = false }: Props) {
  const items = standalone ? moments : getMomentPreview(4);
  const hasPhotos = hasRealMomentPhotos();

  return (
    <section
      id={standalone ? undefined : "moments"}
      data-reveal-scope
      className={`moments-section section-tone--light px-6 py-24 md:px-10 md:py-32 ${
        standalone ? "pt-32 md:pt-36" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="ui-card">
        <SectionHeader
          as={standalone ? "h1" : "h2"}
          index="04"
          eyebrow="Gallery"
          title="Moments"
          description={
            hasPhotos
              ? "Selected frames from stage, studio, and everyday life."
              : "An evolving visual archive — categories are ready for photography."
          }
          align="split"
          action={
            !standalone ? (
              <Link href="/moments/" data-cursor="view" className="section-text-link">
                Open Archive →
              </Link>
            ) : undefined
          }
        />

        <div
          data-reveal="group"
          className={`moment-grid mt-12 md:mt-16 ${
            standalone ? "moment-grid--full" : "moment-grid--preview"
          }`}
        >
          {items.map((item) => (
            <MomentCard key={item.id} item={item} />
          ))}
        </div>

        {standalone && !hasPhotos && (
          <p
            data-reveal="text"
            className="mt-10 max-w-lg text-sm leading-relaxed text-cream/40"
          >
            To add photographs, place files in <code className="text-cream/55">public/images/moments/</code>{" "}
            and update entries in <code className="text-cream/55">src/data/moments.ts</code> with{" "}
            <code className="text-ink-muted">src</code>, <code className="text-ink-muted">width</code>,{" "}
            <code className="text-ink-muted">height</code>, and <code className="text-ink-muted">alt</code>.
          </p>
        )}
        </div>
      </div>
    </section>
  );
}
