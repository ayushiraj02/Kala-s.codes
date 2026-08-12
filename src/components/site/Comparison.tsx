import { Check, Minus } from "lucide-react";
import { Reveal, Tilt, Magnetic } from "@/lib/motion";

const basic = [
  "Template layout, lightly recoloured",
  "5 standard pages",
  "Generic stock imagery",
  "Contact form to inbox",
  "Basic meta tags",
  "Delivered and handed over",
];

const premium = [
  "Bespoke art direction & design system",
  "Unlimited sections, built to your funnel",
  "Custom photography direction & asset optimisation",
  "Booking, WhatsApp, CRM and payment flows",
  "Technical SEO, schema, sitemap, analytics",
  "Scroll storytelling & micro-interactions",
  "Accessibility audit (WCAG AA)",
  "90 days of support & performance tuning",
];

export function Comparison() {
  return (
    <section id="compare" className="relative border-y border-border bg-secondary/30 py-28 lg:py-36">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <Reveal>
          <p className="eyebrow">Basic vs premium</p>
          <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
            The difference isn&apos;t pages. It&apos;s intent.
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2 lg:items-start">
          <Reveal>
            <Tilt max={4}>
              <article className="rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-soft)]">
                <h3 className="text-xl">Basic website</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  What most agencies ship. It exists — it just doesn&apos;t work very hard.
                </p>
                <ul className="mt-7 space-y-3">
                  {basic.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Minus className="mt-0.5 h-4 w-4 shrink-0 opacity-50" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
              </article>
            </Tilt>
          </Reveal>

          <Reveal delay={0.08}>
            <Tilt max={4}>
              <article
                className="relative overflow-hidden rounded-xl border p-8 text-primary-foreground shadow-[var(--shadow-lift)]"
                style={{ background: "var(--gradient-royal)", borderColor: "transparent" }}
              >
                <span className="inline-flex items-center rounded-full border border-brass/50 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-brass">
                  Kala&apos;s premium
                </span>
                <h3 className="mt-5 text-xl">Premium digital experience</h3>
                <p className="mt-2 text-sm opacity-80">
                  A designed, engineered asset that earns its cost back in enquiries.
                </p>
                <ul className="mt-7 space-y-3">
                  {premium.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-sm">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-brass" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <Magnetic strength={0.2}>
                  <a
                    href="#quote"
                    className="mt-8 inline-flex rounded-sm bg-porcelain px-6 py-3 text-sm text-royal-deep transition-opacity hover:opacity-90"
                  >
                    Estimate my project
                  </a>
                </Magnetic>
              </article>
            </Tilt>
          </Reveal>
        </div>
      </div>
    </section>
  );
}