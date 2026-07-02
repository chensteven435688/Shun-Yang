import { shows } from "@/data/shows";

export function Live() {
  return (
    <section id="live" className="section-divider px-6 py-24 md:px-10 md:py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 md:mb-16" data-reveal>
          <p className="text-[11px] font-medium uppercase tracking-[0.35em] text-lime">
            ΛTLΛST · Tour
          </p>
          <h2 className="mt-3 font-serif text-4xl text-cream md:text-6xl">
            Live &amp; <em className="text-lime">Present</em>
          </h2>
        </div>

        <div className="divide-y divide-cream/8">
          {shows.map((show, i) => (
            <div
              key={show.date + show.venue}
              data-reveal
              className="grid gap-3 py-7 md:grid-cols-12 md:items-center md:gap-6"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <p className="font-serif text-xl text-cream/80 md:col-span-2 md:text-2xl">
                {show.date}
              </p>
              <div className="md:col-span-6">
                <p className="text-base text-cream md:text-lg">{show.venue}</p>
                <p className="text-sm text-cream/40">{show.detail}</p>
              </div>
              <p className="text-sm text-cream/40 md:col-span-2">{show.city}</p>
              <p
                className={`text-[10px] uppercase tracking-[0.2em] md:col-span-2 md:text-right ${
                  show.upcoming ? "text-lime" : "text-cream/30"
                }`}
              >
                {show.status}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
