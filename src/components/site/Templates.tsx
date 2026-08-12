import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Eye } from "lucide-react";
import { Reveal, Tilt } from "@/lib/motion";
import { templates } from "@/data/templates";
import { AutoScroll, BrowserFrame, Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";
import { cn } from "@/lib/utils";

export function Templates() {
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(templates.map((t) => t.industry)))],
    [],
  );
  const [filter, setFilter] = useState("All");
  const [hover, setHover] = useState<string | null>(null);

  const shown = filter === "All" ? templates : templates.filter((t) => t.industry === filter);

  return (
    <section id="templates" className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36">
      <Reveal>
        <p className="eyebrow">Templates gallery</p>
        <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
          Living previews. Every one of them is a real, shippable site.
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter templates">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              aria-pressed={filter === c}
              className={cn(
                "rounded-full border px-4 py-2 text-xs transition-all duration-400",
                filter === c
                  ? "border-transparent text-primary-foreground shadow-[var(--shadow-soft)]"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
              style={filter === c ? { background: "var(--gradient-royal)" } : undefined}
            >
              {c}
            </button>
          ))}
        </div>
      </Reveal>

      <ul className="mt-12 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
        {shown.map((t, i) => (
          <Reveal as="li" key={t.slug} delay={(i % 3) * 0.05}>
            <Tilt max={5} className="h-full">
              <article
                onMouseEnter={() => setHover(t.slug)}
                onMouseLeave={() => setHover(null)}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]"
              >
                <BrowserFrame url={`${t.slug}.kalas.codes`} className="shadow-none">
                  <AutoScroll className="h-56" duration={28} paused={hover !== t.slug}>
                    <Scaled designWidth={1280}>
                      <SitePreview t={t} />
                    </Scaled>
                  </AutoScroll>
                </BrowserFrame>

                <div className="mt-5 flex flex-1 flex-col px-1">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="min-w-0 truncate text-xl">{t.name}</h3>
                    <span className="shrink-0 rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                      {t.industry}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.tagline}</p>

                  <div className="mt-5 flex items-center justify-between gap-3 pt-4">
                    <span className="text-sm text-muted-foreground">
                      from <span className="text-foreground">{t.price}</span>
                    </span>
                    <div className="flex translate-y-1 items-center gap-2 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 focus-within:translate-y-0 focus-within:opacity-100">
                      <Link
                        to="/demo/$slug"
                        params={{ slug: t.slug }}
                        className="inline-flex items-center gap-1.5 rounded-sm border border-border px-3 py-2 text-xs hover:bg-secondary"
                      >
                        <Eye className="h-3.5 w-3.5" aria-hidden />
                        Live demo
                      </Link>
                      <a
                        href="#quote"
                        className="inline-flex items-center gap-1.5 rounded-sm px-3 py-2 text-xs text-primary-foreground"
                        style={{ background: "var(--gradient-royal)" }}
                      >
                        Get this
                        <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}