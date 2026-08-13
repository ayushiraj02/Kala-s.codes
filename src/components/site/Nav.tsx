import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Magnetic } from "@/lib/motion";
import { cn } from "@/lib/utils";

const links = [
  { label: "Philosophy", href: "#philosophy" },
  { label: "Industries", href: "#industries" },
  { label: "Templates", href: "#templates" },
  { label: "Pricing", href: "#compare" },
  { label: "Quote", href: "#quote" },
  { label: "FAQ", href: "#faq" },
];

export function Nav() {
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 40);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid ? "border-b border-border bg-background/80 backdrop-blur-xl" : "border-b border-transparent",
      )}
      style={{ transitionTimingFunction: "var(--ease-silk)" }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center">
          <img
            src="/logo-cropped.png"
            alt="कla's"
            className="h-8 w-auto object-contain lg:h-10"
            draggable={false}
          />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Magnetic className="hidden sm:inline-block">
            <a
              href="#contact"
              className="inline-flex items-center rounded-sm px-5 py-2.5 text-sm text-primary-foreground shadow-[var(--shadow-soft)] transition-opacity hover:opacity-90"
              style={{ background: "var(--gradient-royal)" }}
            >
              Book a consultation
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-11 w-11 place-items-center rounded-sm border border-border lg:hidden"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-px w-5 bg-foreground" />
              <span className="block h-px w-5 bg-foreground" />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          aria-label="Mobile"
          className="border-t border-border bg-background/95 px-5 py-4 backdrop-blur-xl lg:hidden"
        >
          <ul className="grid gap-1">
            {[...links, { label: "Contact", href: "#contact" }].map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-sm px-2 py-3 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}