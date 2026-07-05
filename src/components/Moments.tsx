"use client";

const moments = [
  { label: "On Stage", caption: "LIVE, 2025" },
  { label: "In Studio", caption: "RECORDING, 2024" },
  { label: "Behind Scenes", caption: "BTS, 2025" },
  { label: "Travel", caption: "ON THE ROAD" },
  { label: "Portraits", caption: "PORTRAITS" },
  { label: "Everyday", caption: "DAILY LIFE" },
];

export function Moments({ standalone = false }: { standalone?: boolean }) {
  return (
    <section
      id={standalone ? undefined : "moments"}
      className={`px-6 py-24 md:px-10 md:py-32 ${
        standalone ? "pt-32 md:pt-36" : ""
      }`}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div data-reveal>
            <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
              Gallery
            </p>
            <h2 className="mt-3 font-serif text-4xl text-cream md:text-5xl">
              Moments
            </h2>
          </div>
          <p data-reveal className="max-w-sm text-sm text-cream/40">
            Placeholders for now — swap in your photos anytime.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {moments.map((item, i) => (
            <article
              key={item.label}
              data-reveal
              data-magnetic
              className="moment-card group cursor-pointer"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="photo-frame moment-frame aspect-[4/5] bg-olive-dark/50">
                <div className="photo-placeholder moment-inner">
                  <span className="font-serif text-3xl text-cream/15 transition-transform duration-500 group-hover:scale-110">
                    +
                  </span>
                  <span className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/25">
                    {item.label}
                  </span>
                </div>
              </div>
              <p className="photo-caption static mt-3 transition-colors group-hover:text-lime/70">
                {item.caption}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
