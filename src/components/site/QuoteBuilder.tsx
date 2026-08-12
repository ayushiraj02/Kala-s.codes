import { useMemo, useState } from "react";
import { Reveal, Magnetic } from "@/lib/motion";
import { industries } from "@/data/templates";
import { cn } from "@/lib/utils";

const addons = [
  { id: "booking", label: "Booking / appointment system", price: 9000 },
  { id: "seo", label: "Technical SEO & local search setup", price: 7000 },
  { id: "maintenance", label: "Annual maintenance & support", price: 12000 },
  { id: "integrations", label: "WhatsApp, CRM & payment integrations", price: 8000 },
  { id: "hosting", label: "Managed hosting, domain & SSL", price: 5000 },
  { id: "branding", label: "Brand identity & art direction", price: 15000 },
  { id: "ecom", label: "E-commerce & online payments", price: 18000 },
];

const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export function QuoteBuilder() {
  const [industry, setIndustry] = useState<string>("Salon");
  const [pages, setPages] = useState(6);
  const [selected, setSelected] = useState<string[]>(["seo"]);

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const total = useMemo(() => {
    const base = 20000;
    const perPage = 2500 * Math.max(0, pages - 3);
    const complexity = industry === "E-commerce" || industry === "Real Estate" ? 10000 : 0;
    const extras = addons
      .filter((a) => selected.includes(a.id))
      .reduce((sum, a) => sum + a.price, 0);
    return base + perPage + complexity + extras;
  }, [industry, pages, selected]);

  return (
    <section id="quote" className="mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-36">
      <Reveal>
        <p className="eyebrow">Interactive quote builder</p>
        <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
          A transparent estimate, in about forty seconds.
        </h2>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
        <Reveal>
          <div className="rounded-xl border border-border bg-card p-7 shadow-[var(--shadow-soft)] lg:p-9">
            <fieldset>
              <legend className="text-sm">Business type</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {industries.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setIndustry(c)}
                    aria-pressed={industry === c}
                    className={cn(
                      "rounded-full border px-4 py-2 text-xs transition-all duration-300",
                      industry === c
                        ? "border-transparent text-primary-foreground"
                        : "border-border text-muted-foreground hover:text-foreground",
                    )}
                    style={industry === c ? { background: "var(--gradient-royal)" } : undefined}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-10">
              <label htmlFor="pages" className="flex items-center justify-between text-sm">
                <span>Pages required</span>
                <span className="font-display text-xl">{pages}</span>
              </label>
              <input
                id="pages"
                type="range"
                min={3}
                max={20}
                value={pages}
                onChange={(e) => setPages(Number(e.target.value))}
                className="mt-4 w-full accent-[var(--royal)]"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                First three pages are included in the base build.
              </p>
            </div>

            <fieldset className="mt-10">
              <legend className="text-sm">Add what you need</legend>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {addons.map((a) => {
                  const on = selected.includes(a.id);
                  return (
                    <li key={a.id}>
                      <button
                        type="button"
                        onClick={() => toggle(a.id)}
                        aria-pressed={on}
                        className={cn(
                          "grid w-full grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-lg border p-4 text-left transition-all duration-300",
                          on
                            ? "border-royal/40 bg-secondary shadow-[var(--shadow-soft)]"
                            : "border-border hover:bg-secondary/50",
                        )}
                      >
                        <span className="min-w-0 text-sm">{a.label}</span>
                        <span className="shrink-0 text-xs text-muted-foreground">+{inr(a.price)}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </fieldset>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <aside
            className="sticky top-24 overflow-hidden rounded-xl p-8 text-primary-foreground shadow-[var(--shadow-lift)]"
            style={{ background: "var(--gradient-royal)" }}
          >
            <p className="text-[10px] uppercase tracking-[0.22em] opacity-70">Estimated investment</p>
            <p className="mt-3 font-display text-[clamp(2.2rem,5vw,3rem)] leading-none tabular-nums">
              {inr(total)}
            </p>
            <p className="mt-3 text-xs opacity-70">
              Indicative range: {inr(Math.round(total * 0.9))} – {inr(Math.round(total * 1.2))}. Final
              scope confirmed after a 20-minute call.
            </p>

            <ul className="mt-7 space-y-2 border-t border-porcelain/20 pt-6 text-sm">
              <li className="flex justify-between gap-3">
                <span className="opacity-70">Business</span>
                <span>{industry}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="opacity-70">Pages</span>
                <span>{pages}</span>
              </li>
              <li className="flex justify-between gap-3">
                <span className="opacity-70">Add-ons</span>
                <span>{selected.length}</span>
              </li>
            </ul>

            <Magnetic strength={0.2}>
              <a
                href="#contact"
                className="mt-8 inline-flex rounded-sm bg-porcelain px-6 py-3 text-sm text-royal-deep transition-opacity hover:opacity-90"
              >
                Send me this quote
              </a>
            </Magnetic>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}