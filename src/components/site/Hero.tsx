import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";
import { Magnetic } from "@/lib/motion";
import { AutoScroll, PhoneFrame, Scaled } from "@/components/site/Frames";
import { SitePreview } from "@/components/site/SitePreview";
import { templates } from "@/data/templates";

const hotel = templates.find((t) => t.slug === "verano-hotel")!;
const salon = templates.find((t) => t.slug === "maison-salon")!;

export function Hero() {
  const wrap = useRef<HTMLElement>(null);
  const zoom = useRef<HTMLDivElement>(null);
  const assembly = useRef<HTMLDivElement>(null);
  const copy = useRef<HTMLDivElement>(null);
  const back = useRef<HTMLDivElement>(null);
  const mid = useRef<HTMLDivElement>(null);
  const phone = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let kill = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        // Entrance
        gsap.from(".kc-hero-line", {
          yPercent: 115,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.09,
        });
        gsap.from(".kc-hero-fade", {
          opacity: 0,
          y: 18,
          duration: 1,
          delay: 0.5,
          ease: "power3.out",
          stagger: 0.08,
        });
        gsap.from(zoom.current, {
          opacity: 0,
          y: 60,
          scale: 0.94,
          duration: 1.6,
          ease: "power3.out",
        });

        // Scroll-driven camera move into the laptop display
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
          },
        });
        tl.to(copy.current, { opacity: 0, y: -70, filter: "blur(12px)", duration: 0.35 }, 0)
          .to(phone.current, { opacity: 0, x: 120, y: 40, duration: 0.3 }, 0)
          .to(assembly.current, { rotateX: 0, rotateY: 0, duration: 0.5 }, 0)
          .to(zoom.current, { scale: 5.6, y: "-6%", duration: 1, ease: "power2.in" }, 0.15)
          .to(".kc-hero-veil", { opacity: 0.82, duration: 0.35 }, 0.68);

        // Layered depth parallax
        gsap.to(back.current, {
          yPercent: 22,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(mid.current, {
          yPercent: -14,
          ease: "none",
          scrollTrigger: { trigger: wrap.current, start: "top top", end: "bottom top", scrub: true },
        });

        // Idle pointer tilt on the device
        const onMove = (e: MouseEvent) => {
          const rx = (e.clientY / window.innerHeight - 0.5) * -6 + 8;
          const ry = (e.clientX / window.innerWidth - 0.5) * 10;
          gsap.to(assembly.current, { rotateX: rx, rotateY: ry, duration: 1.1, ease: "power3.out" });
        };
        if (!window.matchMedia("(pointer: coarse)").matches) {
          window.addEventListener("mousemove", onMove, { passive: true });
          kill = () => window.removeEventListener("mousemove", onMove);
        }
      }, wrap);

      const prevKill = kill;
      kill = () => {
        prevKill();
        ctx.revert();
      };
    })();

    return () => kill();
  }, []);

  return (
    <section ref={wrap} className="relative h-[240vh]" aria-label="Introduction">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden grain">
        {/* depth layer 1 */}
        <div ref={back} aria-hidden className="pointer-events-none absolute inset-0">
          <div
            className="absolute -left-40 top-[-10%] h-[46rem] w-[46rem] rounded-full opacity-60 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--royal-soft) 20%, transparent), transparent 65%)",
            }}
          />
          <div
            className="absolute -right-32 bottom-[-20%] h-[38rem] w-[38rem] rounded-full opacity-50 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, color-mix(in oklab, var(--brass) 24%, transparent), transparent 65%)",
            }}
          />
        </div>

        {/* depth layer 2 — hairline grid */}
        <div
          ref={mid}
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5]"
          style={{
            backgroundImage:
              "linear-gradient(to right, color-mix(in oklab, var(--royal) 7%, transparent) 1px, transparent 1px)",
            backgroundSize: "9rem 100%",
          }}
        />

        <div className="relative mx-auto grid w-full max-w-7xl gap-12 px-5 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-center lg:px-8">
          <div ref={copy} className="min-w-0 pt-28 lg:pt-0">
            <span className="kc-hero-fade inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3 py-1.5 text-[11px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 text-royal-soft" aria-hidden />
              Premium web studio
            </span>

            <h1 className="mt-5 font-display text-[clamp(2.1rem,6.4vw,4.6rem)] leading-[1.03]">
              {["Websites built like", "landmark interiors —"].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span className="kc-hero-line block">{line}</span>
                </span>
              ))}
              <span className="block overflow-hidden">
                <span className="kc-hero-line block italic royal-text">considered, calm, exact.</span>
              </span>
            </h1>

            <p className="kc-hero-fade mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground sm:text-base">
              Kala&apos;s.codes designs and engineers premium business websites for salons, clinics,
              hotels, restaurants and ambitious brands — tuned for speed, search and enquiries that
              actually arrive.
            </p>

            <div className="kc-hero-fade mt-7 flex flex-wrap items-center gap-3">
              <Magnetic>
                <a
                  href="#templates"
                  className="group inline-flex items-center gap-2 rounded-sm px-6 py-3.5 text-sm text-primary-foreground shadow-[var(--shadow-lift)] transition-opacity hover:opacity-95"
                  style={{ background: "var(--gradient-royal)" }}
                >
                  Explore templates
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <a
                  href="#quote"
                  className="inline-flex items-center rounded-sm border border-border bg-card px-6 py-3.5 text-sm transition-colors hover:bg-secondary"
                >
                  Build your quote
                </a>
              </Magnetic>
            </div>

            <dl className="kc-hero-fade mt-8 hidden max-w-md grid-cols-3 gap-6 border-t border-border pt-6 sm:grid lg:mt-12">
              {[
                ["98+", "Lighthouse median"],
                ["120+", "Sites shipped"],
                ["11 days", "Average launch"],
              ].map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-2xl">{v}</dt>
                  <dd className="mt-1 text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {l}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Device stage */}
          <div className="relative min-w-0">
            <div
              ref={zoom}
              className="relative will-change-transform"
              style={{ transformOrigin: "58% 40%" }}
            >
              <div style={{ perspective: "1600px" }}>
                <div
                  ref={assembly}
                  className="kc-float will-change-transform"
                  style={{ transformStyle: "preserve-3d", transform: "rotateX(8deg) rotateY(-6deg)" }}
                >
                  {/* lid */}
                  <div
                    className="overflow-hidden rounded-t-xl border border-b-0 border-border bg-ink p-2 shadow-[var(--shadow-device)]"
                  >
                    <div className="overflow-hidden rounded-lg bg-background">
                      <AutoScroll className="h-[15rem] sm:h-[19rem] lg:h-[21rem]" duration={30}>
                        <Scaled designWidth={1280}>
                          <SitePreview t={hotel} />
                        </Scaled>
                      </AutoScroll>
                    </div>
                  </div>
                  {/* base */}
                  <div className="relative h-3 rounded-b-xl bg-ink/95">
                    <span className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b-full bg-porcelain/20" />
                  </div>
                  <div
                    aria-hidden
                    className="mx-auto h-6 w-[86%] rounded-b-[999px] opacity-40 blur-md"
                    style={{ background: "color-mix(in oklab, var(--royal-deep) 40%, transparent)" }}
                  />
                </div>
              </div>
            </div>

            {/* floating phone — mobile view of the same site */}
            <div
              ref={phone}
              className="absolute -bottom-16 -left-6 hidden w-[8rem] sm:block lg:-left-24 lg:w-[9.5rem]"
            >
              <PhoneFrame>
                <AutoScroll className="h-[17rem] lg:h-[20rem]" duration={30}>
                  <Scaled designWidth={390}>
                    <SitePreview t={salon} mobile />
                  </Scaled>
                </AutoScroll>
              </PhoneFrame>
            </div>
          </div>
        </div>

        <div className="kc-hero-fade pointer-events-none absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground">
          <span className="text-[10px] uppercase tracking-[0.28em]">Scroll to enter</span>
          <ArrowDown className="h-4 w-4 animate-bounce" aria-hidden />
        </div>

        <div
          aria-hidden
          className="kc-hero-veil pointer-events-none absolute inset-0 opacity-0"
          style={{ background: "var(--porcelain)", backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
        />
      </div>
    </section>
  );
}