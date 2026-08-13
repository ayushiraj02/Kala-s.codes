import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "@/lib/motion";

const reviews = [
  {
    quote: "The website finally feels like our brand. Everything is clean, fast and incredibly polished.",
    name: "Elena Rossi",
    role: "Maison Salon",
    img: "1522337360788-8b13dee7a37e",
  },
  {
    quote: "Our online reservations doubled in the first month. The mobile experience is completely flawless.",
    name: "Marcus Chen",
    role: "Ember Restaurant",
    img: "1507003211169-0a1dd7228f2d",
  },
  {
    quote: "Patients constantly compliment the booking flow. It's elevated our entire practice's perception.",
    name: "Dr. Sarah Jenkins",
    role: "Renew Clinic",
    img: "1579684385127-1ef15d508118",
  },
  {
    quote: "The design is exactly what we envisioned—elegant, minimal, and completely frictionless for our clients.",
    name: "Sophia Laurent",
    role: "Lume Spa",
    img: "1544161515-4ab6ce6db874",
  },
  {
    quote: "Property listings have never looked this good. The attention to typography and spacing is unmatched.",
    name: "James Sterling",
    role: "Sterling Real Estate",
    img: "1560185127-6ed189bf02f4",
  },
  {
    quote: "Professional, authoritative, and fast. The new digital presence instantly separates us from competitors.",
    name: "David Wright",
    role: "Wright Legal",
    img: "1589829545856-d10d557cf95f",
  },
  {
    quote: "Sales increased 40% purely from the mobile checkout improvements. It's a gorgeous piece of engineering.",
    name: "Chloe Dubois",
    role: "Cove E-commerce",
    img: "1472851294608-062f824d29cc",
  },
];

function unsplash(id: string, w: number, h: number) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;
}

export function TestimonialsRibbon() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % reviews.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const getPositionClass = (index: number, activeIndex: number, total: number) => {
    if (index === activeIndex) {
      // Active state: visible, perfectly centered
      return "opacity-100 translate-y-0 blur-none pointer-events-auto z-10";
    }

    // Determine if this is the item that just exited
    const isPrev = index === (activeIndex - 1 + total) % total;

    if (isPrev) {
      // Exiting state: moves UP, fades, blurs
      return "opacity-0 -translate-y-8 blur-[4px] pointer-events-none z-0";
    }

    // Entering/Waiting state: waiting BELOW, transparent, blurred
    return "opacity-0 translate-y-8 blur-[4px] pointer-events-none z-0";
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-y border-border py-24 lg:py-28 text-primary-foreground"
      style={{ background: "var(--gradient-royal)" }}
    >
      <style>{`
        @keyframes kc-ribbon-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(0); }
        }
      `}</style>

      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal>
          <div className="flex flex-col items-center text-center">
            
            {/* Header */}
            <div className="mb-8 flex flex-col items-center">
              <span className="text-[10px] uppercase tracking-[0.24em] opacity-60 mb-3">
                Testimonials
              </span>
              <div className="flex gap-1 text-accent text-sm">★★★★★</div>
            </div>

            {/* Quotes Container */}
            <div className="relative w-full" style={{ minHeight: "14rem" }}>
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className={cn(
                    "absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000",
                    "ease-[cubic-bezier(0.22,1,0.36,1)]",
                    getPositionClass(i, active, reviews.length)
                  )}
                >
                  <p className="font-display text-[clamp(1.5rem,4vw,2.4rem)] leading-[1.2] max-w-3xl mx-auto">
                    "{r.quote}"
                  </p>
                  <div className="mt-8 flex items-center justify-center gap-4">
                    <img
                      src={unsplash(r.img, 100, 100)}
                      alt={r.name}
                      className="h-10 w-10 rounded-full border border-porcelain/20 object-cover"
                      loading="lazy"
                    />
                    <div className="text-left">
                      <div className="text-sm font-semibold">{r.name}</div>
                      <div className="text-xs opacity-60 mt-0.5">{r.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Progress Indicator */}
            <div className="mt-10 flex flex-col items-center gap-3">
              <div className="text-[11px] font-medium tracking-[0.2em] opacity-50">
                0{active + 1} / 0{reviews.length}
              </div>
              <div className="relative h-[2px] w-24 overflow-hidden bg-porcelain/15 rounded-full">
                <div
                  key={active}
                  className="absolute inset-y-0 left-0 w-full bg-porcelain rounded-full"
                  style={{ animation: "kc-ribbon-progress 4.5s linear forwards" }}
                />
              </div>
            </div>

          </div>
        </Reveal>
      </div>
    </section>
  );
}
