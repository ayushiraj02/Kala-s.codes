import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-primary-foreground grain"
      style={{ background: "var(--gradient-royal)" }}
    >
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 lg:px-8 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="font-display text-[clamp(2.6rem,9vw,6.5rem)] leading-[0.95]">
              Kala&apos;s<span className="text-brass">.</span>codes
            </p>
            <p className="mt-6 max-w-md text-sm opacity-75">
              A premium web design and development studio building calm, fast, high-converting
              websites for businesses that care how they&apos;re seen.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 text-sm">
            <nav aria-label="Footer">
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-60">Navigate</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["Philosophy", "#philosophy"],
                  ["Industries", "#industries"],
                  ["Templates", "#templates"],
                  ["Pricing", "#compare"],
                  ["Quote builder", "#quote"],
                  ["FAQ", "#faq"],
                ].map(([l, h]) => (
                  <li key={h}>
                    <a href={h} className="opacity-75 transition-opacity hover:opacity-100">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="text-[10px] uppercase tracking-[0.22em] opacity-60">Elsewhere</p>
              <ul className="mt-4 space-y-2.5">
                {[
                  ["Instagram", "https://instagram.com"],
                  ["LinkedIn", "https://linkedin.com"],
                  ["Dribbble", "https://dribbble.com"],
                  ["WhatsApp", "https://wa.me/919876543210"],
                  ["studio@kalas.codes", "mailto:studio@kalas.codes"],
                ].map(([l, h]) => (
                  <li key={l}>
                    <a
                      href={h}
                      className="opacity-75 transition-opacity hover:opacity-100"
                      rel="noreferrer"
                      target="_blank"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-porcelain/15 pt-6 text-[11px] opacity-65">
          <p>© {new Date().getFullYear()} Kala&apos;s.codes. All rights reserved.</p>
          <Link to="/" className="hover:opacity-100">
            Designed &amp; engineered in-house
          </Link>
        </div>
      </div>
    </footer>
  );
}