import { useEffect, useRef } from "react";
import { Reveal } from "@/lib/motion";
import { AutoScroll, PhoneFrame, Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";
import { templates } from "@/data/templates";

const picks = ["maison-salon", "ember-restaurant", "verano-hotel", "cove-ecommerce"];
const phones = picks.map((s) => templates.find((t) => t.slug === s)!);

export function MobileShowcase() {
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let kill = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const ctx = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(".kc-phone").forEach((p, i) => {
          gsap.to(p, {
            yPercent: i % 2 === 0 ? -12 : 10,
            ease: "none",
            scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.7 },
          });
        });
      }, wrap);
      kill = () => ctx.revert();
    })();
    return () => kill();
  }, []);

  return (
    <section
      id="mobile"
      className="relative overflow-hidden border-y border-border py-28 text-primary-foreground lg:py-36"
      style={{ background: "var(--gradient-royal)" }}
    >
      <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:px-8">
        <Reveal>
          <p className="text-[11px] uppercase tracking-[0.22em] opacity-60">Thirteen trades. One standard.</p>
          <h2 className="mt-5 font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
            Beautiful on every screen.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed opacity-75">
            From salon bookings to hotel reservations, every site is designed to feel considered on the device your customers actually use.
          </p>
        </Reveal>

        <div ref={wrap} className="grid grid-cols-2 gap-5 sm:grid-cols-4">
          {phones.map((p, i) => (
            <div
              key={p.slug}
              className="kc-phone transition-all duration-700 opacity-90 hover:opacity-100 hover:scale-[1.02]"
              style={{ transitionTimingFunction: "var(--ease-silk)" }}
            >
              <PhoneFrame label={p.industry}>
                <AutoScroll className="h-[19rem] sm:h-[21rem]" duration={20 + i * 3}>
                  <Scaled designWidth={390}>
                    <SitePreview t={p} mobile />
                  </Scaled>
                </AutoScroll>
              </PhoneFrame>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}