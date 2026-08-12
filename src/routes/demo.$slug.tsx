import { useState } from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft,
  Layers,
  Mail,
  Monitor,
  Smartphone,
  Sparkles,
  Tablet,
  Tag,
} from "lucide-react";
import { templateBySlug, templates, type Template } from "@/data/templates";
import { SitePreview } from "@/components/site/SitePreview";
import { Scaled } from "@/components/site/Frames";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/demo/$slug")({
  loader: ({ params }) => {
    const template = templateBySlug(params.slug);
    if (!template) throw notFound();
    return { template };
  },
  head: ({ loaderData }) => {
    const t = loaderData?.template;
    const title = t
      ? `${t.name} — ${t.industry} website template | Kala's.codes`
      : "Template demo | Kala's.codes";
    const description = t?.tagline ?? "Live premium website template demo by Kala's.codes.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: Demo,
});

type Device = "desktop" | "tablet" | "mobile";
const widths: Record<Device, number> = { desktop: 1280, tablet: 834, mobile: 390 };

function Demo() {
  const { template } = Route.useLoaderData() as { template: Template };
  const [device, setDevice] = useState<Device>("desktop");
  const [panel, setPanel] = useState<"features" | "pricing" | "customize" | null>(null);

  const related = templates.filter((t) => t.slug !== template.slug).slice(0, 4);

  return (
    <div className="min-h-screen bg-secondary/40">
      <a href="#preview" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4">
        Skip to preview
      </a>

      {/* Floating sidebar */}
      <nav
        aria-label="Demo actions"
        className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-2 rounded-full border border-border bg-card/90 px-3 py-2 shadow-[var(--shadow-lift)] backdrop-blur-xl lg:inset-y-0 lg:left-5 lg:right-auto lg:my-auto lg:h-fit lg:flex-col lg:rounded-2xl lg:px-2 lg:py-3"
      >
        <Link
          to="/"
          aria-label="Back to Kala's.codes"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
        </Link>
        {(
          [
            ["features", Layers, "Features"],
            ["pricing", Tag, "Pricing"],
            ["customize", Sparkles, "Customize"],
          ] as const
        ).map(([key, Icon, label]) => (
          <button
            key={key}
            type="button"
            aria-label={label}
            aria-pressed={panel === key}
            onClick={() => setPanel((p) => (p === key ? null : key))}
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-xl transition-colors",
              panel === key
                ? "bg-royal text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="h-4 w-4" aria-hidden />
          </button>
        ))}
        <Link
          to="/"
          hash="contact"
          aria-label="Contact the studio"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground"
          style={{ background: "var(--gradient-royal)" }}
        >
          <Mail className="h-4 w-4" aria-hidden />
        </Link>
      </nav>

      <main className="mx-auto max-w-[1500px] px-4 pb-28 pt-6 lg:pl-24 lg:pr-8 lg:pb-10">
        <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 pb-5 sm:flex sm:flex-wrap sm:justify-between">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              Live demo · {template.industry}
            </p>
            <h1 className="truncate font-display text-2xl sm:text-3xl">{template.name}</h1>
          </div>
          <div className="flex shrink-0 gap-1 rounded-full border border-border bg-card p-1">
            {(
              [
                ["desktop", Monitor],
                ["tablet", Tablet],
                ["mobile", Smartphone],
              ] as const
            ).map(([d, Icon]) => (
              <button
                key={d}
                type="button"
                onClick={() => setDevice(d)}
                aria-label={`${d} preview`}
                aria-pressed={device === d}
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-full transition-colors",
                  device === d ? "bg-royal text-primary-foreground" : "text-muted-foreground hover:bg-secondary",
                )}
              >
                <Icon className="h-4 w-4" aria-hidden />
              </button>
            ))}
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
          <section
            id="preview"
            aria-label={`${template.name} preview`}
            className="mx-auto w-full transition-all duration-700"
            style={{
              maxWidth: device === "desktop" ? "100%" : device === "tablet" ? 860 : 420,
              transitionTimingFunction: "var(--ease-silk)",
            }}
          >
            <div
              className={cn(
                "overflow-hidden border border-border bg-card shadow-[var(--shadow-lift)]",
                device === "mobile" ? "rounded-[2rem] p-2" : "rounded-xl",
              )}
            >
              <div className={cn("max-h-[78vh] overflow-y-auto", device === "mobile" && "rounded-[1.5rem]")}>
                <Scaled designWidth={widths[device]}>
                  <SitePreview t={template} mobile={device === "mobile"} />
                </Scaled>
              </div>
            </div>
            <p className="mt-3 text-center text-xs text-muted-foreground">
              Scroll inside the frame — this is the real, responsive layout.
            </p>
          </section>

          {panel ? (
            <aside className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] lg:w-80">
              {panel === "features" ? (
                <>
                  <h2 className="text-lg">What&apos;s included</h2>
                  <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                    {template.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-royal" aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              ) : null}
              {panel === "pricing" ? (
                <>
                  <h2 className="text-lg">Pricing</h2>
                  <p className="mt-3 font-display text-3xl">{template.price}</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Includes design adaptation, content setup, responsive QA, technical SEO and 90
                    days of support.
                  </p>
                  <Link
                    to="/"
                    hash="quote"
                    className="mt-5 inline-flex rounded-sm px-5 py-3 text-sm text-primary-foreground"
                    style={{ background: "var(--gradient-royal)" }}
                  >
                    Build a full quote
                  </Link>
                </>
              ) : null}
              {panel === "customize" ? (
                <>
                  <h2 className="text-lg">Make it yours</h2>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Every template is a starting point. We restyle typography, palette, imagery and
                    section order around your brand — or design from a blank page.
                  </p>
                  <div className="mt-5 flex gap-2">
                    {(Object.values(template.palette) as string[]).map((c) => (
                      <span
                        key={c}
                        className="h-8 w-8 rounded-full border border-border"
                        style={{ background: c }}
                      />
                    ))}
                  </div>
                </>
              ) : null}
            </aside>
          ) : null}
        </div>

        <section aria-label="More templates" className="mt-14">
          <h2 className="text-sm uppercase tracking-[0.18em] text-muted-foreground">More templates</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  to="/demo/$slug"
                  params={{ slug: t.slug }}
                  className="block rounded-lg border border-border bg-card p-4 transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)]"
                >
                  <span className="block truncate text-base">{t.name}</span>
                  <span className="mt-1 block text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {t.industry}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}