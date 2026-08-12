import { useCallback, useRef, useState } from "react";
import { Reveal } from "@/lib/motion";
import { Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";
import { templates, type Template } from "@/data/templates";

const after = templates.find((t) => t.slug === "lume-spa")!;
const before: Template = {
  ...after,
  name: "Old site",
  serif: false,
  palette: { bg: "#e9e9e6", ink: "#4a4a48", accent: "#8c8c86", soft: "#d6d6d1" },
  hero: {
    eyebrow: "Welcome to our website",
    title: "SPA & WELLNESS CENTER",
    sub: "We offer the best services in town. Call us today for more information.",
    cta: "Click here",
  },
  features: ["Home", "About us", "Services", "Contact"],
};

export function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const wrap = useRef<HTMLDivElement>(null);

  const setFromClient = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }, []);

  return (
    <section id="before-after" className="border-y border-border bg-secondary/30 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow">Before &amp; after</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
            Same business. Entirely different first impression.
          </h2>
        </Reveal>

        <Reveal delay={0.08}>
          <div
            ref={wrap}
            className="relative mt-12 select-none overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]"
            onMouseMove={(e) => e.buttons === 1 && setFromClient(e.clientX)}
            onMouseDown={(e) => setFromClient(e.clientX)}
            onTouchMove={(e) => setFromClient(e.touches[0]!.clientX)}
          >
            <div className="h-[22rem] overflow-hidden sm:h-[30rem]">
              <Scaled designWidth={1280}>
                <SitePreview t={after} />
              </Scaled>
            </div>

            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Scaled designWidth={1280}>
                <SitePreview t={before} />
              </Scaled>
            </div>

            <span
              className="absolute inset-y-0 w-px bg-porcelain shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
              style={{ left: `${pos}%` }}
              aria-hidden
            />
            <label className="sr-only" htmlFor="ba-range">
              Compare before and after redesign
            </label>
            <input
              id="ba-range"
              type="range"
              min={0}
              max={100}
              value={pos}
              onChange={(e) => setPos(Number(e.target.value))}
              className="absolute inset-x-0 bottom-4 mx-auto w-[80%] cursor-ew-resize accent-[var(--royal)]"
            />
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-background/85 px-3 py-1 text-[10px] uppercase tracking-[0.18em] backdrop-blur">
              Before
            </span>
            <span className="pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground" style={{ background: "var(--gradient-royal)" }}>
              After
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}