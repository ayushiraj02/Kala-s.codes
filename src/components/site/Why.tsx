import { Accessibility, Gauge, MousePointerClick, Search, Smartphone, ShieldCheck } from "lucide-react";
import { Reveal, Tilt } from "@/lib/motion";

const pillars = [
  {
    icon: Gauge,
    title: "Performance as a feature",
    body: "Sub-second loads, GPU-accelerated motion and images served in AVIF/WebP. Speed is the first impression.",
  },
  {
    icon: Search,
    title: "SEO built in, not bolted on",
    body: "Semantic markup, structured data, clean routing and copy written for the searches your buyers actually make.",
  },
  {
    icon: Smartphone,
    title: "Mobile-first, always",
    body: "Designed at 390px before 1440px, because that's where four in five of your enquiries come from.",
  },
  {
    icon: Accessibility,
    title: "Accessible by default",
    body: "WCAG AA contrast, keyboard paths, focus states and reduced-motion support on every interaction.",
  },
  {
    icon: MousePointerClick,
    title: "Conversion engineering",
    body: "Every page has one job. Booking flows, call buttons and forms are placed where intent peaks.",
  },
  {
    icon: ShieldCheck,
    title: "Maintained, not abandoned",
    body: "Uptime monitoring, backups, updates and a human who answers when something needs changing.",
  },
];

export function Why() {
  return (
    <section id="philosophy" className="relative mx-auto max-w-7xl px-5 py-28 lg:px-8 lg:py-40">
      <Reveal>
        <p className="eyebrow">Why Kala&apos;s.codes</p>
      </Reveal>
      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end">
        <Reveal delay={0.05}>
          <h2 className="max-w-2xl font-display text-[clamp(2rem,4.2vw,3.4rem)] leading-[1.06]">
            We don&apos;t build websites. We build the <em className="italic royal-text">first room</em> your
            client walks into.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="text-muted-foreground lg:pb-3">
            A premium digital experience is an act of hospitality: it anticipates, it guides, it never
            makes anyone wait. We treat typography, motion and load time the way an architect treats
            light — as the thing people feel before they can name it.
          </p>
        </Reveal>
      </div>

      <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pillars.map((p, i) => (
          <Reveal as="li" key={p.title} delay={i * 0.04}>
            <Tilt className="h-full">
              <article className="group relative h-full overflow-hidden rounded-lg border border-border bg-card p-7 shadow-[var(--shadow-soft)] transition-shadow duration-500 hover:shadow-[var(--shadow-lift)]">
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(360px circle at var(--mx,50%) var(--my,50%), color-mix(in oklab, var(--royal-soft) 9%, transparent), transparent 70%)",
                  }}
                />
                <p.icon className="h-5 w-5 text-royal" aria-hidden />
                <h3 className="mt-5 text-lg">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}