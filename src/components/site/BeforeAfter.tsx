import { useCallback, useRef, useState } from "react";
import { Reveal } from "@/lib/motion";
import { Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";
import { templates, type Template } from "@/data/templates";
import { GripVertical } from "lucide-react";

const after = templates.find((t) => t.slug === "lume-spa")!;

/**
 * Believable outdated small-business website preview.
 * Uses generic typography, cramped spacing, weak hierarchy, and no images.
 * But retains the same exact business name and services to prove the transformation.
 */
function OldSitePreview({ t }: { t: Template }) {
  const font = "Arial, Helvetica, sans-serif";
  return (
    <div
      style={{
        background: "#ffffff",
        color: "#222222",
        fontFamily: font,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── Basic header ── */}
      <div
        style={{
          padding: "15px 30px",
          borderBottom: "1px solid #cccccc",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          background: "#f4f4f4",
        }}
      >
        <h1 style={{ fontSize: 28, margin: 0, fontWeight: "bold", color: "#000000" }}>{t.name}</h1>
        <div style={{ display: "flex", gap: 20 }}>
          {t.nav.map((n) => (
            <a key={n} href="#" style={{ color: "#0000EE", textDecoration: "underline", fontSize: 16 }}>
              {n}
            </a>
          ))}
        </div>
      </div>

      {/* ── Clunky Hero ── */}
      <div
        style={{
          padding: "80px 40px",
          textAlign: "center",
          borderBottom: "1px solid #dddddd",
          background: "#e9e9e9",
        }}
      >
        <h2 style={{ fontSize: 42, margin: "0 0 15px 0", color: "#111111" }}>{t.hero.title}</h2>
        <p style={{ fontSize: 18, margin: "0 auto 30px auto", maxWidth: 700, lineHeight: 1.5 }}>
          {t.hero.sub}
        </p>
        <button
          style={{
            background: "#dddddd",
            color: "#000000",
            border: "1px solid #aaaaaa",
            borderRadius: "3px",
            padding: "12px 24px",
            fontSize: 18,
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          {t.hero.cta}
        </button>
      </div>

      {/* ── Services & Testimonial Split ── */}
      <div style={{ display: "flex", padding: "40px", gap: "60px", flex: 1 }}>
        {/* Left: Services */}
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: 24, borderBottom: "2px solid #cccccc", paddingBottom: 8, marginBottom: 20 }}>
            Our Services
          </h3>
          <ul style={{ lineHeight: 2, fontSize: 18, paddingLeft: 25, margin: 0 }}>
            {t.features.map((f) => (
              <li key={f}>{f} - Call for pricing</li>
            ))}
          </ul>
        </div>

        {/* Right: Testimonial & Basic Info */}
        <div style={{ flex: 1 }}>
          <div style={{ padding: "25px", background: "#f9f9f9", border: "1px dashed #cccccc" }}>
            <h3 style={{ fontSize: 20, marginBottom: 15, marginTop: 0 }}>What our customers say:</h3>
            <p style={{ fontStyle: "italic", fontSize: 16, margin: 0, lineHeight: 1.6 }}>"{t.tagline}"</p>
            <p style={{ marginTop: 10, fontWeight: "bold", fontSize: 15 }}>- Happy Customer</p>
          </div>
          <div style={{ marginTop: 30 }}>
            <h3 style={{ fontSize: 18, marginBottom: 10 }}>Location</h3>
            <p style={{ fontSize: 16, margin: 0, lineHeight: 1.5 }}>
              123 Main Street<br />
              City, State 12345<br />
              <strong>Phone:</strong> (555) 123-4567
            </p>
          </div>
        </div>
      </div>

      {/* ── Clunky Footer ── */}
      <div
        style={{
          padding: "30px",
          background: "#333333",
          color: "#cccccc",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <p style={{ margin: "0 0 10px 0", fontSize: 14 }}>© 2012 {t.name}. All rights reserved.</p>
        <p style={{ margin: 0, fontSize: 12 }}>Designed by Webmaster.</p>
      </div>
    </div>
  );
}

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
            {/* Base layer: After (Premium Site) */}
            <div className="h-[22rem] overflow-hidden sm:h-[32rem]">
              <Scaled designWidth={1280}>
                <SitePreview t={after} />
              </Scaled>
            </div>

            {/* Top layer: Before (Outdated Site) clipped by pos */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            >
              <Scaled designWidth={1280}>
                <OldSitePreview t={after} />
              </Scaled>
            </div>

            {/* Slider Handle & Line */}
            <div
              className="absolute inset-y-0 w-px bg-porcelain shadow-[0_0_0_1px_rgba(0,0,0,0.08)]"
              style={{ left: `${pos}%` }}
              aria-hidden
            >
              {/* Elegant draggable pill handle */}
              <div
                className="absolute top-1/2 left-1/2 flex h-10 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md"
                style={{ cursor: "ew-resize" }}
              >
                <GripVertical className="h-4 w-4 text-muted-foreground" aria-hidden />
              </div>
            </div>

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
              className="absolute inset-x-0 bottom-4 mx-auto w-[80%] cursor-ew-resize opacity-0"
              style={{ zIndex: 10 }}
            />
            
            {/* Labels */}
            <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-foreground/80 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-background backdrop-blur">
              Before
            </span>
            <span
              className="pointer-events-none absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-primary-foreground"
              style={{ background: "var(--gradient-royal)", boxShadow: "var(--shadow-soft)" }}
            >
              After
            </span>
          </div>

          {/* Subtle supporting line */}
          <p className="mt-6 text-center text-sm font-medium text-muted-foreground">
            Same business · Same services · New digital presence
          </p>
        </Reveal>
      </div>
    </section>
  );
}