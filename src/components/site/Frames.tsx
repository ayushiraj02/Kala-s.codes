import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Renders children at a fixed design width and scales them to fit the container. */
export function Scaled({
  designWidth,
  children,
  className,
}: {
  designWidth: number;
  children: ReactNode;
  className?: string;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.3);
  const [visualHeight, setVisualHeight] = useState<number | undefined>(undefined);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;
    let prevWidth = 0;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width ?? outer.clientWidth;
      // Guard against infinite loop: only update when width actually changes
      if (Math.abs(w - prevWidth) < 1) return;
      prevWidth = w;
      const s = w / designWidth;
      setScale(s);
      setVisualHeight(inner.scrollHeight * s);
    });
    ro.observe(outer);
    return () => ro.disconnect();
  }, [designWidth]);

  return (
    <div
      ref={outerRef}
      className={cn("relative w-full min-w-0 overflow-hidden", className)}
      style={{ contain: "inline-size", height: visualHeight != null ? visualHeight : undefined }}
    >
      <div
        ref={innerRef}
        style={{
          width: designWidth,
          transform: `scale(${scale})`,
          transformOrigin: "top left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/** Auto-scrolling viewport used for live template previews. */
export function AutoScroll({
  children,
  duration = 26,
  className,
  paused = false,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
  paused?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div
        className="kc-autoscroll"
        style={{
          animationDuration: `${duration}s`,
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export function BrowserFrame({
  url,
  children,
  className,
}: {
  url: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-soft)]",
        className,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border bg-secondary/60 px-3 py-2">
        <span className="flex gap-1.5">
          {["#e0736a", "#e3bd63", "#7fbd77"].map((c) => (
            <span key={c} className="h-2 w-2 rounded-full" style={{ background: c }} />
          ))}
        </span>
        <span className="ml-2 truncate rounded-full bg-background px-3 py-1 text-[10px] text-muted-foreground">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}

export function PhoneFrame({
  children,
  className,
  label,
}: {
  children: ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-[2.2rem] border border-border bg-ink p-2 shadow-[var(--shadow-lift)]",
        className,
      )}
    >
      <div className="relative overflow-hidden rounded-[1.7rem] bg-background">
        <div className="pointer-events-none absolute left-1/2 top-2 z-10 h-4 w-20 -translate-x-1/2 rounded-full bg-ink/90" />
        {children}
      </div>
      {label ? (
        <p className="mt-3 text-center text-[10px] uppercase tracking-[0.22em] text-porcelain/70">
          {label}
        </p>
      ) : null}
    </div>
  );
}