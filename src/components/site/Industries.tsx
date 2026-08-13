import { useEffect, useRef } from "react";

/* ── 13 industries, each assigned to one of 4 scroll-driven groups ── */
const ITEMS: { name: string; g: number; x: number; y: number; cap: string }[] = [
  // Group 0 — Lifestyle & Wellness
  { name: "Salon",         g: 0, x: 6,  y: 9,  cap: "Booking · Gallery · Reviews" },
  { name: "Restaurant",    g: 0, x: 42, y: 4,  cap: "Menu · Reservations · Story" },
  { name: "Spa",           g: 0, x: 76, y: 8,  cap: "Treatments · Packages · Rituals" },
  { name: "Gym",           g: 0, x: 78, y: 24, cap: "Classes · Membership · Coaching" },
  // Group 1 — Care & Hospitality
  { name: "Clinic",        g: 1, x: 4,  y: 28, cap: "Appointments · Departments · Doctors" },
  { name: "Dentist",       g: 1, x: 6,  y: 46, cap: "Treatments · Before/After · Finance" },
  { name: "Hotel",         g: 1, x: 74, y: 40, cap: "Rooms · Direct Booking · Offers" },
  // Group 2 — Built Environment
  { name: "Real Estate",   g: 2, x: 4,  y: 60, cap: "Listings · Map View · Enquiry" },
  { name: "Architecture",  g: 2, x: 28, y: 78, cap: "Case Studies · Awards · Portfolio" },
  { name: "Construction",  g: 2, x: 68, y: 56, cap: "Projects · Safety · Certifications" },
  // Group 3 — Professional & Digital
  { name: "Lawyer",        g: 3, x: 5,  y: 74, cap: "Practice Areas · Case Results · Insights" },
  { name: "Coaching",      g: 3, x: 42, y: 84, cap: "Programs · Testimonials · Calendar" },
  { name: "E-commerce",    g: 3, x: 68, y: 78, cap: "Product Grid · Checkout · Payments" },
];

/** Variable type size — short words are visually larger for rhythm. */
function typeSize(name: string): string {
  const l = name.length;
  if (l <= 3) return "clamp(1.6rem, 4.5vw, 4.8rem)";
  if (l <= 6) return "clamp(1.4rem, 3.6vw, 3.6rem)";
  if (l <= 8) return "clamp(1.1rem, 2.6vw, 2.6rem)";
  return "clamp(0.9rem, 2.1vw, 2.1rem)";
}

export function Industries() {
  const wrap = useRef<HTMLElement>(null);
  const isMobileRef = useRef(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    isMobileRef.current = isMobile;
    let kill = () => {};

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        if (isMobile) {
          buildMobileTimeline(gsap, ScrollTrigger, wrap.current!);
        } else {
          buildDesktopTimeline(gsap, ScrollTrigger, wrap.current!);
        }
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
      aria-label="Industries we serve"
    >
      {/* ── Section heading — in normal page flow, scrolls naturally ── */}
      <div className="kc-ind-heading relative z-10 flex min-h-[45vh] items-center justify-center px-5 lg:min-h-[55vh]">
        <div className="text-center">
          <p className="eyebrow">Industries</p>
          <h2 className="mt-5 mx-auto max-w-xl font-display text-[clamp(2rem,4vw,3.2rem)] leading-[1.06]">
            Thirteen trades. One standard&nbsp;of&nbsp;finish.
          </h2>
        </div>
      </div>

      {/* ── Sticky canvas — the scroll-animated composition ── */}
      <div className="sticky top-0 h-screen overflow-hidden grain">

        {/* ── Background decoration (desktop only) ── */}
        <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
          <div
            className="kc-ind-ring absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              width: "min(30rem, 65vw)",
              height: "min(30rem, 65vw)",
              border: "1px solid var(--border)",
            }}
          />
          <div
            className="kc-ind-cross absolute left-1/2 w-px -translate-x-1/2"
            style={{ top: "14%", bottom: "14%", background: "var(--border)" }}
          />
          <div
            className="kc-ind-cross absolute top-1/2 h-px -translate-y-1/2"
            style={{ left: "10%", right: "10%", background: "var(--border)" }}
          />
        </div>

        {/* ════════════════════  DESKTOP CANVAS  ════════════════════ */}
        <div className="kc-ind-canvas hidden lg:block absolute inset-0 z-10">
          {/* Positioning container */}
          <div className="kc-ind-field relative mx-auto h-full w-full max-w-7xl px-8">
            {ITEMS.map((item) => (
              <div
                key={item.name}
                className="kc-ind absolute will-change-transform"
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
                  className="kc-ind-cap mt-1.5 block"
                  data-g={item.g}
                  style={{
                    fontSize: "clamp(0.5rem, 0.65vw, 0.62rem)",
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

          {/* Central statement */}
          <div className="kc-ind-stmt absolute inset-0 flex items-center justify-center pointer-events-none px-8">
            <h3
              className="text-center font-display tracking-tight"
              style={{
                fontSize: "clamp(1.3rem, 2.8vw, 2.6rem)",
                lineHeight: 1.16,
                maxWidth: "24rem",
              }}
            >
              Built for businesses<br />
              that care how<br />
              <span className="italic royal-text">they are seen.</span>
            </h3>
          </div>

          {/* Closing statement */}
          <div className="kc-ind-close absolute inset-0 flex items-center justify-center pointer-events-none px-8">
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

        {/* ════════════════════  MOBILE CANVAS  ════════════════════ */}
        <div className="kc-ind-mob block lg:hidden absolute inset-0 z-10 flex items-center justify-center px-6">
          <div className="text-center w-full">
            {/* Central statement — always visible anchor */}
            <div className="kc-ind-mob-stmt">
              <h3
                className="font-display tracking-tight"
                style={{
                  fontSize: "clamp(1.4rem, 6vw, 2rem)",
                  lineHeight: 1.18,
                }}
              >
                Built for businesses<br />
                that care how<br />
                <span className="italic royal-text">they are seen.</span>
              </h3>
            </div>

            {/* Mobile groups — 4 groups instead of 13 individual items */}
            <div className="relative mt-8" style={{ minHeight: "6rem" }}>
              {[0, 1, 2, 3].map((g) => (
                <div
                  key={g}
                  className="kc-ind-mob-group absolute inset-x-0 top-0 flex flex-wrap justify-center gap-x-3 gap-y-2"
                  data-g={g}
                >
                  {ITEMS.filter((item) => item.g === g).map((item, i, arr) => (
                    <span key={item.name} className="flex items-center gap-3">
                      <span
                        className="block font-display"
                        style={{
                          fontSize: "clamp(1.6rem, 7.5vw, 2.4rem)",
                          letterSpacing: "-0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {item.name}
                      </span>
                      {/* Separator dot */}
                      {i < arr.length - 1 && (
                        <span className="text-muted-foreground opacity-30 text-[0.6rem]">•</span>
                      )}
                    </span>
                  ))}
                </div>
              ))}
            </div>

            {/* Closing statement */}
            <div className="kc-ind-mob-close absolute inset-0 flex items-center justify-center pointer-events-none px-6">
              <div className="text-center">
                <h3
                  className="font-display"
                  style={{
                    fontSize: "clamp(1.8rem, 8vw, 3rem)",
                    lineHeight: 1.1,
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
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
 * DESKTOP TIMELINE — constellation with group highlights
 * ═══════════════════════════════════════════════════════════════════════ */
function buildDesktopTimeline(
  gsap: any,
  _ST: any,
  trigger: HTMLElement,
) {
  // Section height for desktop (set dynamically)
  trigger.style.height = "420vh";

  /* Initial state */
  gsap.set(".kc-ind-canvas", { opacity: 0 });
  gsap.set(".kc-ind", { opacity: 0 });
  gsap.set(".kc-ind-cap", { opacity: 0, y: 8 });
  gsap.set(".kc-ind-stmt", { opacity: 0, y: 20 });
  gsap.set(".kc-ind-close", { opacity: 0, y: 20 });
  gsap.set(".kc-ind-ring", { opacity: 0, scale: 0.85 });
  gsap.set(".kc-ind-cross", { opacity: 0 });

  /* Heading fade — separate ScrollTrigger on the heading itself so it
     fades only as it scrolls toward the viewport top. */
  gsap.to(".kc-ind-heading", {
    opacity: 0,
    y: -40,
    filter: "blur(8px)",
    ease: "none",
    scrollTrigger: {
      trigger: ".kc-ind-heading",
      start: "center 35%",    // begins when heading center reaches 35% from top
      end: "bottom top",      // complete when heading bottom exits viewport
      scrub: true,
    },
  });

  /* Main constellation timeline */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.6,
    },
  });

  // Canvas entrance (0.00 → 0.10)
  tl.to(".kc-ind-canvas", { opacity: 1, duration: 0.05 }, 0.02);
  tl.to(".kc-ind-cross", { opacity: 0.20, duration: 0.06 }, 0.04);
  tl.to(".kc-ind-ring", { opacity: 0.40, scale: 1, duration: 0.08, ease: "power2.out" }, 0.04);
  tl.to(".kc-ind-stmt", { opacity: 1, y: 0, duration: 0.07, ease: "power3.out" }, 0.05);
  tl.to(".kc-ind", { opacity: 0.12, duration: 0.06, stagger: 0.003 }, 0.05);

  /* Group highlight helper */
  const hi = (g: number, inAt: number, outAt: number) => {
    tl.to(`.kc-ind[data-g="${g}"]`, {
      opacity: 1, scale: 1.05, duration: 0.08, stagger: 0.012,
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

  hi(0, 0.12, 0.26);   // Salon · Restaurant · Spa · Gym
  hi(1, 0.30, 0.44);   // Clinic · Dentist · Hotel
  hi(2, 0.48, 0.62);   // Real Estate · Architecture · Construction
  hi(3, 0.66, 0.78);   // Lawyer · Coaching · E-commerce

  /* Resolution */
  tl.to(".kc-ind", { opacity: 0.04, scale: 0.97, duration: 0.10 }, 0.82);
  tl.to(".kc-ind-ring", { opacity: 0, scale: 1.15, duration: 0.10 }, 0.82);
  tl.to(".kc-ind-cross", { opacity: 0, duration: 0.08 }, 0.82);
  tl.to(".kc-ind-stmt", { opacity: 0, y: -20, duration: 0.08 }, 0.82);
  tl.to(".kc-ind-close", { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" }, 0.87);
}

/* ═══════════════════════════════════════════════════════════════════════
 * MOBILE TIMELINE — 4 visual groups sequence
 * ═══════════════════════════════════════════════════════════════════════ */
function buildMobileTimeline(
  gsap: any,
  _ST: any,
  trigger: HTMLElement,
) {
  const groups = 4;
  // Shorter section height for grouped scrolling (compressed UX)
  trigger.style.height = "240vh";

  /* Initial state — hide all mobile items, show statement */
  gsap.set(".kc-ind-mob-stmt", { opacity: 0, y: 16 });
  gsap.set(".kc-ind-mob-group", { opacity: 0, y: 12 });
  gsap.set(".kc-ind-mob-close", { opacity: 0 });

  /* Heading fade — very gentle, only as it exits */
  gsap.to(".kc-ind-heading", {
    opacity: 0,
    y: -30,
    ease: "none",
    scrollTrigger: {
      trigger: ".kc-ind-heading",
      start: "center 30%",
      end: "bottom -10%",
      scrub: true,
    },
  });

  /* Main mobile timeline */
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.4,
    },
  });

  // Statement entrance (0.00 → 0.10)
  tl.to(".kc-ind-mob-stmt", { opacity: 1, y: 0, duration: 0.08 }, 0.02);

  // Sequential group reveals (0.10 → 0.85)
  const sliceLen = 0.75 / groups;
  const inDur = sliceLen * 0.4;
  const holdEnd = sliceLen * 0.7;
  const outDur = sliceLen * 0.3;

  for (let g = 0; g < groups; g++) {
    const start = 0.10 + g * sliceLen;
    const sel = `.kc-ind-mob-group[data-g="${g}"]`;

    // Fade in
    tl.to(sel, { opacity: 1, y: 0, duration: inDur, ease: "power2.out" }, start);
    // Fade out (overlaps slightly with next item's fade-in)
    tl.to(sel, { opacity: 0, y: -8, duration: outDur }, start + holdEnd);
  }

  // Statement fades, closing appears (0.85 → 1.00)
  tl.to(".kc-ind-mob-stmt", { opacity: 0, y: -12, duration: 0.06 }, 0.85);
  tl.to(".kc-ind-mob-close", { opacity: 1, duration: 0.10 }, 0.88);
}