import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return reduced;
}

/** Cinematic smooth scrolling (Lenis) synced to the GSAP ticker. */
export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let destroy = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        duration: 1.15,
        smoothWheel: true,
        lerp: 0.09,
        wheelMultiplier: 1,
      });
      lenis.on("scroll", ScrollTrigger.update);
      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
      ScrollTrigger.refresh();

      destroy = () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      destroy();
    };
  }, []);
}

/** Scroll-triggered entrance: fade, rise and gentle blur/perspective lift. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 34,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "header" | "article";
}) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.opacity = "1";
      el.style.transform = "none";
      el.style.filter = "none";
      return;
    }
    let kill = () => {};
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        el,
        { opacity: 0, y, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.1,
          delay,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        },
      );
      kill = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();
    return () => kill();
  }, [delay, y]);

  const Comp = Tag as any;
  return (
    <Comp ref={ref as any} className={cn("reveal-up", className)}>
      {children}
    </Comp>
  );
}

/** Magnetic hover for premium buttons. */
export function Magnetic({
  children,
  strength = 0.32,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - (r.left + r.width / 2)) * strength;
      const y = (e.clientY - (r.top + r.height / 2)) * strength;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [strength]);

  return (
    <span
      ref={ref}
      className={cn("inline-block will-change-transform transition-transform duration-500", className)}
      style={{ transitionTimingFunction: "var(--ease-silk)" }}
    >
      {children}
    </span>
  );
}

/** Subtle 3D tilt on pointer move. */
export function Tilt({
  children,
  className,
  max = 7,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    const move = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1100px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translate3d(0,-6px,0)`;
        el.style.setProperty("--mx", `${(px + 0.5) * 100}%`);
        el.style.setProperty("--my", `${(py + 0.5) * 100}%`);
      });
    };
    const leave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg) translate3d(0,0,0)";
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
    };
  }, [max]);

  return (
    <div
      ref={ref}
      className={cn("will-change-transform transition-transform duration-700", className)}
      style={{ transitionTimingFunction: "var(--ease-silk)" }}
    >
      {children}
    </div>
  );
}

/** Soft cursor glow that follows the pointer (desktop only). */
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    let raf = 0;
    let tx = 0,
      ty = 0,
      x = 0,
      y = 0;
    const move = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      x += (tx - x) * 0.12;
      y += (ty - y) * 0.12;
      el.style.transform = `translate3d(${x - 240}px, ${y - 240}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", move, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-30 hidden h-[480px] w-[480px] rounded-full opacity-70 mix-blend-multiply lg:block"
      style={{
        background:
          "radial-gradient(circle, color-mix(in oklab, var(--royal-soft) 16%, transparent) 0%, transparent 62%)",
      }}
    />
  );
}