import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/lib/motion";
import { templates } from "@/data/templates";
import { AutoScroll, Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";

export function Industries() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section id="industries" className="relative border-y border-border bg-secondary/30 py-28 lg:py-36">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <p className="eyebrow">Industries</p>
            <h2 className="mt-5 max-w-xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
              Thirteen trades. One standard of finish.
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="max-w-sm text-sm text-muted-foreground">
              Hover a category to preview the template we&apos;d start from — then take it live in the
              full demo viewer.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {templates.map((t, i) => (
            <Reveal as="li" key={t.slug} delay={(i % 4) * 0.04}>
              <Link
                to="/demo/$slug"
                params={{ slug: t.slug }}
                onMouseEnter={() => setActive(t.slug)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(t.slug)}
                onBlur={() => setActive(null)}
                className="group relative block h-full overflow-hidden rounded-lg border border-border bg-card p-5 shadow-[var(--shadow-soft)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                style={{ transitionTimingFunction: "var(--ease-silk)" }}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate text-base">{t.industry}</span>
                    <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                      {t.name}
                    </span>
                  </span>
                  <ArrowUpRight
                    className="h-4 w-4 shrink-0 text-muted-foreground transition-all duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-royal"
                    aria-hidden
                  />
                </div>

                <div className="mt-5 overflow-hidden rounded-sm border border-border">
                  <AutoScroll className="h-24" duration={22} paused={active !== t.slug}>
                    <Scaled designWidth={1280}>
                      <SitePreview t={t} />
                    </Scaled>
                  </AutoScroll>
                </div>

                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                  style={{ background: "var(--gradient-royal)" }}
                />
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}