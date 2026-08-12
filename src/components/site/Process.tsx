import { useEffect, useRef } from "react";
import { Reveal } from "@/lib/motion";

const steps = [
  { n: "01", t: "Discovery", d: "Positioning, competitors, enquiry goals and the words your customers use." },
  { n: "02", t: "Design", d: "Art direction, type system, and full page designs reviewed in the browser." },
  { n: "03", t: "Development", d: "Component architecture, motion, CMS-ready structure, integrations." },
  { n: "04", t: "Testing", d: "Cross-device QA, Lighthouse passes, accessibility and form testing." },
  { n: "05", t: "Launch", d: "DNS, SSL, analytics, search console, redirects — with zero downtime." },
  { n: "06", t: "Support", d: "90 days included: edits, monitoring, performance and content updates." },
];

export function Process() {
  const wrap = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = line.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let kill = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        el,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: wrap.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        },
      );
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();
    return () => kill();
  }, []);

  return (
    <section id="process" className="mx-auto max-w-5xl px-5 py-28 lg:px-8 lg:py-36">
      <Reveal>
        <p className="eyebrow">Process</p>
        <h2 className="mt-5 max-w-2xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
          Six stages. No mystery, no drift.
        </h2>
      </Reveal>

      <div ref={wrap} className="relative mt-16 pl-10 sm:pl-16">
        <span aria-hidden className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-border sm:left-[15px]" />
        <span
          ref={line}
          aria-hidden
          className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px origin-top sm:left-[15px]"
          style={{ background: "var(--gradient-royal)" }}
        />
        <ol className="space-y-12">
          {steps.map((s, i) => (
            <Reveal as="li" key={s.n} delay={i * 0.03}>
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute -left-10 top-2 h-[15px] w-[15px] rounded-full border-2 border-background sm:-left-16"
                  style={{ background: "var(--royal)" }}
                />
                <div className="grid gap-1 sm:grid-cols-[auto_minmax(0,1fr)] sm:gap-8">
                  <span className="font-display text-sm text-muted-foreground">{s.n}</span>
                  <div className="min-w-0">
                    <h3 className="text-xl">{s.t}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">{s.d}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}