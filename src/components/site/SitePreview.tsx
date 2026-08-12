import type { Template } from "@/data/templates";

/**
 * A lightweight, dependency-free rendering of a template's website.
 * Rendered at a fixed design width and scaled by its container, so previews
 * stay razor sharp and cost nothing in network requests.
 */
export function SitePreview({ t, mobile = false }: { t: Template; mobile?: boolean }) {
  const p = t.palette;
  const font = t.serif ? "Instrument Serif, Georgia, serif" : "Work Sans, sans-serif";

  return (
    <div
      style={{ background: p.bg, color: p.ink, width: "100%" }}
      className="select-none"
      aria-hidden
    >
      {/* nav */}
      <div
        style={{ borderBottom: `1px solid ${p.soft}` }}
        className={mobile ? "flex items-center justify-between px-4 py-3" : "flex items-center justify-between px-10 py-5"}
      >
        <span style={{ fontFamily: font }} className={mobile ? "text-sm" : "text-lg"}>
          {t.name}
        </span>
        {mobile ? (
          <span className="flex flex-col gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span key={i} style={{ background: p.ink }} className="block h-[1.5px] w-4 opacity-70" />
            ))}
          </span>
        ) : (
          <span className="flex items-center gap-7 text-[11px] uppercase tracking-[0.18em] opacity-70">
            {t.nav.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </span>
        )}
      </div>

      {/* hero */}
      <div className={mobile ? "px-4 py-8" : "px-10 py-16"}>
        <p
          style={{ color: p.accent }}
          className={mobile ? "text-[8px] uppercase tracking-[0.24em]" : "text-[10px] uppercase tracking-[0.28em]"}
        >
          {t.hero.eyebrow}
        </p>
        <h2
          style={{ fontFamily: font, lineHeight: 1.05 }}
          className={mobile ? "mt-2 text-2xl" : "mt-4 text-5xl"}
        >
          {t.hero.title}
        </h2>
        <p className={mobile ? "mt-2 max-w-[90%] text-[10px] opacity-70" : "mt-4 max-w-md text-sm opacity-70"}>
          {t.hero.sub}
        </p>
        <span
          style={{ background: p.accent, color: p.bg }}
          className={
            mobile
              ? "mt-4 inline-block rounded-sm px-3 py-2 text-[9px] tracking-wide"
              : "mt-7 inline-block rounded-sm px-6 py-3 text-xs tracking-wide"
          }
        >
          {t.hero.cta}
        </span>

        <div
          style={{ background: p.soft }}
          className={mobile ? "mt-6 h-28 w-full rounded-sm" : "mt-12 h-64 w-full rounded-sm"}
        >
          <div
            style={{
              background: `linear-gradient(120deg, ${p.accent}22, transparent 60%)`,
              height: "100%",
            }}
          />
        </div>
      </div>

      {/* feature strip */}
      <div
        style={{ borderTop: `1px solid ${p.soft}`, borderBottom: `1px solid ${p.soft}` }}
        className={mobile ? "grid grid-cols-2 gap-3 px-4 py-6" : "grid grid-cols-4 gap-6 px-10 py-10"}
      >
        {t.features.map((f) => (
          <div key={f}>
            <div style={{ background: p.accent }} className="h-[2px] w-6" />
            <p className={mobile ? "mt-2 text-[9px]" : "mt-3 text-xs"}>{f}</p>
          </div>
        ))}
      </div>

      {/* gallery */}
      <div className={mobile ? "grid grid-cols-2 gap-2 px-4 py-6" : "grid grid-cols-3 gap-4 px-10 py-14"}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            style={{
              background: i % 3 === 1 ? `${p.accent}1f` : p.soft,
              aspectRatio: i % 2 ? "4/5" : "1/1",
            }}
            className="rounded-sm"
          />
        ))}
      </div>

      {/* quote */}
      <div className={mobile ? "px-4 py-8 text-center" : "px-10 py-16 text-center"}>
        <p style={{ fontFamily: font }} className={mobile ? "text-sm" : "text-2xl"}>
          “{t.tagline}”
        </p>
      </div>

      {/* footer */}
      <div
        style={{ background: p.ink, color: p.bg }}
        className={mobile ? "px-4 py-6" : "px-10 py-12"}
      >
        <p style={{ fontFamily: font }} className={mobile ? "text-lg" : "text-3xl"}>
          {t.name}
        </p>
        <p className={mobile ? "mt-2 text-[8px] opacity-60" : "mt-3 text-[11px] opacity-60"}>
          © {new Date().getFullYear()} — Built by Kala's.codes
        </p>
      </div>
    </div>
  );
}