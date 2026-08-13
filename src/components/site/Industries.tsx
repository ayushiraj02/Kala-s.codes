import { useEffect, useRef } from "react";

/* ── 13 industries, each assigned to one of 4 scroll-driven groups ── */
const ITEMS: { name: string; g: number; x: number; y: number; cap: string }[] = [
  // Group 0 — Lifestyle & Wellness
  { name: "Salon",         g: 0, x: 4,  y: 7,  cap: "Booking · Gallery · Reviews" },
  { name: "Restaurant",    g: 0, x: 42, y: 3,  cap: "Menu · Reservations · Story" },
  { name: "Spa",           g: 0, x: 80, y: 6,  cap: "Treatments · Packages · Rituals" },
  { name: "Gym",           g: 0, x: 84, y: 22, cap: "Classes · Membership · Coaching" },
  // Group 1 — Care & Hospitality
  { name: "Clinic",        g: 1, x: 2,  y: 26, cap: "Appointments · Departments · Doctors" },
  { name: "Dentist",       g: 1, x: 4,  y: 46, cap: "Treatments · Before/After · Finance" },
  { name: "Hotel",         g: 1, x: 80, y: 38, cap: "Rooms · Direct Booking · Offers" },
  // Group 2 — Built Environment
  { name: "Real Estate",   g: 2, x: 2,  y: 60, cap: "Listings · Map View · Enquiry" },
  { name: "Architecture",  g: 2, x: 26, y: 82, cap: "Case Studies · Awards · Portfolio" },
  { name: "Construction",  g: 2, x: 74, y: 56, cap: "Projects · Safety · Certifications" },
  // Group 3 — Professional & Digital
  { name: "Lawyer",        g: 3, x: 3,  y: 76, cap: "Practice Areas · Case Results · Insights" },
  { name: "Coaching",      g: 3, x: 44, y: 88, cap: "Programs · Testimonials · Calendar" },
  { name: "E-commerce",    g: 3, x: 72, y: 82, cap: "Product Grid · Checkout · Payments" },
];

/** Variable type size — short words are visually larger for rhythm. */
function typeSize(name: string): string {
  const l = name.length;
  if (l <= 3) return "clamp(1.8rem, 5.5vw, 5.5rem)";
  if (l <= 6) return "clamp(1.5rem, 4.2vw, 4.2rem)";
  if (l <= 8) return "clamp(1.2rem, 3vw, 3rem)";
  return "clamp(1rem, 2.4vw, 2.4rem)";
}

export function Industries() {
  const wrap = useRef<HTMLElement>(null);

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
        /* ── Initial state — everything hidden until scroll begins ── */
        gsap.set(".kc-ind-heading", { opacity: 1 });
        gsap.set(".kc-ind-canvas", { opacity: 0 });
        gsap.set(".kc-ind", { opacity: 0 });
        gsap.set(".kc-ind-cap", { opacity: 0, y: 8 });
        gsap.set(".kc-ind-stmt", { opacity: 0, y: 24 });
        gsap.set(".kc-ind-close", { opacity: 0, y: 24 });
        gsap.set(".kc-ind-ring", { opacity: 0, scale: 0.8 });
        gsap.set(".kc-ind-cross", { opacity: 0 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrap.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.6,
          },
        });

        /* ── Entrance: heading dissolves, constellation appears (0.00 → 0.12) ── */
        tl.to(".kc-ind-heading", {
          opacity: 0, y: -60, filter: "blur(10px)", duration: 0.07,
        }, 0);
        tl.to(".kc-ind-canvas", { opacity: 1, duration: 0.04 }, 0.04);
        tl.to(".kc-ind-cross", { opacity: 0.22, duration: 0.06 }, 0.05);
        tl.to(".kc-ind-ring", {
          opacity: 0.45, scale: 1, duration: 0.08, ease: "power2.out",
        }, 0.05);
        tl.to(".kc-ind-stmt", {
          opacity: 1, y: 0, duration: 0.08, ease: "power3.out",
        }, 0.06);
        tl.to(".kc-ind", {
          opacity: 0.12, duration: 0.06, stagger: 0.003,
        }, 0.06);

        /* ── Group highlight helper ── */
        const hi = (g: number, inAt: number, outAt: number) => {
          tl.to(`.kc-ind[data-g="${g}"]`, {
            opacity: 1, scale: 1.06, duration: 0.08, stagger: 0.012,
          }, inAt);
          tl.to(`.kc-ind-cap[data-g="${g}"]`, {
            opacity: 0.55, y: 0, duration: 0.06, stagger: 0.008,
          }, inAt + 0.02);
          tl.to(`.kc-ind[data-g="${g}"]`, {
            opacity: 0.12, scale: 1, duration: 0.06,
          }, outAt);
          tl.to(`.kc-ind-cap[data-g="${g}"]`, {
            opacity: 0, y: 8, duration: 0.04,
          }, outAt);
        };

        /* ── Sequential group highlights ── */
        hi(0, 0.14, 0.28);   // Salon · Restaurant · Spa · Gym
        hi(1, 0.32, 0.46);   // Clinic · Dentist · Hotel
        hi(2, 0.50, 0.64);   // Real Estate · Architecture · Construction
        hi(3, 0.68, 0.80);   // Lawyer · Coaching · E-commerce

        /* ── Resolution: constellation quiets, closing statement appears ── */
        tl.to(".kc-ind", { opacity: 0.04, scale: 0.97, duration: 0.10 }, 0.84);
        tl.to(".kc-ind-ring", { opacity: 0, scale: 1.2, duration: 0.10 }, 0.84);
        tl.to(".kc-ind-cross", { opacity: 0, duration: 0.08 }, 0.84);
        tl.to(".kc-ind-stmt", { opacity: 0, y: -24, duration: 0.08 }, 0.84);
        tl.to(".kc-ind-close", {
          opacity: 1, y: 0, duration: 0.12, ease: "power2.out",
        }, 0.88);

      }, wrap);

      kill = () => ctx.revert();
    })();

    return () => kill();
  }, []);

  return (
    <section
      ref={wrap}
      id="industries"
      className="kc-ind-section relative"
      style={{ height: "400vh" }}
      aria-label="Industries we serve"
    >
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden grain">

        {/* ── Architectural background decoration ── */}
        <div className="pointer-events-none absolute inset-0" aria-hidden>
          {/* Large centred ring */}
          <div
            className="kc-ind-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "min(34rem, 72vw)",
              height: "min(34rem, 72vw)",
              border: "1px solid var(--border)",
            }}
          />
          {/* Crosshairs */}
          <div
            className="kc-ind-cross absolute left-1/2 w-px -translate-x-1/2"
            style={{ top: "12%", bottom: "12%", background: "var(--border)" }}
          />
          <div
            className="kc-ind-cross absolute top-1/2 h-px -translate-y-1/2"
            style={{ left: "8%", right: "8%", background: "var(--border)" }}
          />
        </div>

        {/* ── Section heading — visible first, dissolves into constellation ── */}
        <div className="kc-ind-heading absolute inset-0 z-20 flex items-center justify-center px-5">
          <div className="text-center">
            <p className="eyebrow">Industries</p>
            <h2 className="mt-5 mx-auto max-w-xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
              Thirteen trades. One standard&nbsp;of&nbsp;finish.
            </h2>
          </div>
        </div>

        {/* ── Constellation canvas ── */}
        <div className="kc-ind-canvas absolute inset-0 z-10">

          {/* Positioning container — flex-wrap on mobile, block on desktop */}
          <div className="kc-ind-field relative mx-auto flex h-full w-full max-w-7xl flex-wrap items-center justify-center content-center gap-x-6 gap-y-3 px-6 lg:block lg:px-8">
            {ITEMS.map((item) => (
              <div
                key={item.name}
                className="kc-ind relative will-change-transform lg:absolute"
                data-g={item.g}
                style={
                  {
                    "--ix": `${item.x}%`,
                    "--iy": `${item.y}%`,
                    transformOrigin: "center center",
                  } as React.CSSProperties
                }
              >
                <span
                  className="block font-display"
                  style={{
                    fontSize: typeSize(item.name),
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {item.name}
                </span>
                <span
                  className="kc-ind-cap mt-1.5 hidden lg:block"
                  data-g={item.g}
                  style={{
                    fontSize: "clamp(0.5rem, 0.7vw, 0.68rem)",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase" as const,
                    color: "var(--muted-foreground)",
                  }}
                >
                  {item.cap}
                </span>
              </div>
            ))}
          </div>

          {/* Central statement — anchors the composition */}
          <div className="kc-ind-stmt absolute inset-0 flex items-center justify-center pointer-events-none px-5">
            <h3
              className="text-center font-display tracking-tight"
              style={{
                fontSize: "clamp(1.5rem, 3.5vw, 3.4rem)",
                lineHeight: 1.14,
                maxWidth: "28rem",
              }}
            >
              Built for businesses<br />
              that care how<br />
              <span className="italic royal-text">they are seen.</span>
            </h3>
          </div>

          {/* Closing resolution statement */}
          <div className="kc-ind-close absolute inset-0 flex items-center justify-center pointer-events-none px-5">
            <div className="text-center">
              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(2rem, 4.5vw, 4.2rem)",
                  lineHeight: 1.08,
                  letterSpacing: "-0.015em",
                }}
              >
                One standard.<br />
                <span className="italic royal-text">Every industry.</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}